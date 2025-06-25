import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  const { fullName, email, password, phone } = await req.json();

  if (!fullName || !email || !password) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db();
  const users = db.collection('users');

  // Check if user already exists
  const existingUser = await users.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 409 });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert new user
  const result = await users.insertOne({
    fullName,
    email,
    password: hashedPassword,
    phone: phone || null,
    createdAt: new Date(),
  });

  return NextResponse.json({ message: 'User created successfully' });
}