import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  let user;
  try {
    user = jwt.verify(token, JWT_SECRET) as { userId: string; email: string; fullName: string };
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  let listingData;
  try {
    listingData = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (
    !listingData.make ||
    !listingData.model ||
    !listingData.year ||
    !listingData.photoUrls ||
    !Array.isArray(listingData.photoUrls) ||
    listingData.photoUrls.length === 0
  ) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const listings = db.collection('listings');
    const result = await listings.insertOne({
      ...listingData,
      userId: user.userId,
      status: "Active",
      createdAt: new Date(),
    });
    return NextResponse.json({ message: 'Listing created', listingId: result.insertedId });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create listing' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  let user;
  try {
    user = jwt.verify(token, JWT_SECRET) as { userId: string; email: string; fullName: string };
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const listings = db.collection('listings');
    const users = db.collection('users');

    // Fetch all listings (or filter as needed)
    const allListings = await listings.find({}).toArray();

    // Fetch all unique userIds from listings
    const userIds = Array.from(new Set(allListings.map(l => l.userId))).map(id => new ObjectId(id));
    const usersMap: Record<string, any> = {};

    // Fetch user details for all userIds
    if (userIds.length > 0) {
      const usersArr = await users.find({ _id: { $in: userIds } }).toArray();
      usersArr.forEach(u => {
        usersMap[u._id.toString()] = u;
      });
    }

    // Attach seller info to each listing
    const listingsWithSeller = allListings.map(listing => {
      const seller = usersMap[listing.userId?.toString()];
      return {
        ...listing,
        seller: seller
          ? {
              name: seller.fullName || seller.name || "Unknown User",
              phone: seller.phone || "",
              email: seller.email || "",
              rating: seller.rating ?? 4.9,
              reviewsCount: seller.reviewsCount ?? 0,
              verified: seller.verified ?? true,
              memberSince: seller.memberSince || "",
              profileUrl: `/profile/${seller._id}`,
              avatar: seller.avatar || "https://placehold.co/80x80.png"
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