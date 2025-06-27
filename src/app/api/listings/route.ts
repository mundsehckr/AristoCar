import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db();

    // Fetch all listings
    const listings = await db.collection('listings').find({}).toArray();

    // Get all unique userIds from listings
    const userIds = listings.map(l => l.userId).filter(Boolean);
    const uniqueUserIds = Array.from(new Set(userIds.map(id => id.toString())));

    // Fetch all users whose _id is in userIds
    const users = await db
      .collection('users')
      .find({ _id: { $in: uniqueUserIds.map(id => new ObjectId(id)) } })
      .toArray();

    // Map users by their _id as string
    const usersMap = Object.fromEntries(users.map(u => [u._id.toString(), u]));

    // Attach seller info to each listing
    const listingsWithSeller = listings.map(listing => {
      const sellerUser = usersMap[listing.userId?.toString()];
      return {
        ...listing,
        seller: sellerUser
          ? {
              _id: sellerUser._id.toString(),
              name: sellerUser.name,
              email: sellerUser.email,
              phone: sellerUser.phone,
              avatar: sellerUser.avatar || "https://placehold.co/80x80.png",
              rating: sellerUser.rating ?? 4.9,
              reviewsCount: sellerUser.reviewsCount ?? 0,
              verified: sellerUser.verified ?? true,
              memberSince: sellerUser.memberSince || "",
              profileUrl: `/profile/${sellerUser._id}`,
            }
          : undefined,
      };
    });

    return NextResponse.json({ listings: listingsWithSeller });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch listings' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  let user;
  try {
    user = jwt.verify(token, JWT_SECRET) as { userId: string };
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { listingId, update } = body;
  if (!listingId || !update || typeof update !== 'object') {
    return NextResponse.json({ error: 'Missing listingId or update' }, { status: 400 });
  }

  if ('_id' in update) delete update._id;
  if ('userId' in update) delete update.userId;
  if ('createdAt' in update) delete update.createdAt;

  try {
    const client = await clientPromise;
    const db = client.db();
    const listings = db.collection('listings');
    const result = await listings.updateOne(
      { _id: new ObjectId(listingId), userId: user.userId },
      { $set: update }
    );
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Listing not found or unauthorized' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Listing updated' });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update listing' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  let user;
  try {
    user = jwt.verify(token, JWT_SECRET) as { userId: string };
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { listingId } = body;
  if (!listingId) {
    return NextResponse.json({ error: 'Missing listingId' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const listings = db.collection('listings');
    const result = await listings.deleteOne({ _id: new ObjectId(listingId), userId: user.userId });
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Listing not found or unauthorized' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Listing deleted' });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete listing' }, { status: 500 });
  }
}