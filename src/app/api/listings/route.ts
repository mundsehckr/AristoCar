import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import clientPromise from '@/lib/mongodb';

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

  // Parse listing data from request body
  let listingData;
  try {
    listingData = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  // Basic validation (customize as needed)
  if (!listingData.title || !listingData.price) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Save listing to MongoDB
  try {
    const client = await clientPromise;
    const db = client.db();
    const listings = db.collection('listings');
    const result = await listings.insertOne({
      ...listingData,
      userId: user.userId,
      createdAt: new Date(),
    });
    return NextResponse.json({ message: 'Listing created', listingId: result.insertedId });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create listing' }, { status: 500 });
  }
}