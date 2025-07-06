import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// Get all conversations for the logged-in user
export async function GET(req: NextRequest) {
  // You should extract userId from session/cookie/JWT
  const userId = req.cookies.get('userId')?.value; // Replace with your auth logic
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const client = await clientPromise;
  const db = client.db();

  // Find all conversations for this user
  const conversations = await db.collection('conversations').find({
    participants: { $in: [new ObjectId(userId)] }
  }).toArray();

  // For each conversation, get the last 20 messages
  const conversationsWithMessages = await Promise.all(conversations.map(async (convo) => {
    const messages = await db.collection('messages')
      .find({ conversationId: convo._id })
      .sort({ timestamp: 1 })
      .limit(20)
      .toArray();
    return { ...convo, messages };
  }));

  return NextResponse.json({ conversations: conversationsWithMessages });
}

// Send a new message
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { conversationId, listingId, recipientId, text } = body;
  // You should extract userId from session/cookie/JWT
  const senderId = req.cookies.get('userId')?.value; // Replace with your auth logic
  if (!senderId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const client = await clientPromise;
  const db = client.db();

  // If conversationId is not provided, create a new conversation
  let convoId = conversationId;
  if (!convoId) {
    const convoRes = await db.collection('conversations').insertOne({
      participants: [new ObjectId(senderId), new ObjectId(recipientId)],
      listingId: listingId ? new ObjectId(listingId) : undefined,
      lastMessage: null,
      unreadCount: { [recipientId]: 1 }
    });
    convoId = convoRes.insertedId;
  }

  const message = {
    conversationId: new ObjectId(convoId),
    listingId: listingId ? new ObjectId(listingId) : undefined,
    senderId: new ObjectId(senderId),
    recipientId: new ObjectId(recipientId),
    text,
    timestamp: new Date(),
    status: "sent"
  };

  await db.collection('messages').insertOne(message);

  // Update lastMessage in conversation
  await db.collection('conversations').updateOne(
    { _id: new ObjectId(convoId) },
    { $set: { lastMessage: message } }
  );

  return NextResponse.json({ message: "Message sent", convoId });
}