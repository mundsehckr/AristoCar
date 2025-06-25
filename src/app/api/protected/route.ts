import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const user = jwt.verify(token, JWT_SECRET);
    // user contains userId, email, fullName
    return NextResponse.json({ message: 'Protected content', user });
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}