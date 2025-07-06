"use client";

import { useEffect, useState, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Send, Loader2, MessageSquare } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

type MessageStatus = 'sent' | 'delivered' | 'read';
type Message = { _id: string; senderId: string; text: string; timestamp: string; status?: MessageStatus };
type Conversation = {
  _id: string;
  participants: string[];
  messages: Message[];
  unreadCount?: number;
};

export default function MessagesPage() {
  const { isAuthenticated, user, loading: authLoading, setHasUnreadMessages } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [myConversations, setMyConversations] = useState<Conversation[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated || !user) {
        router.push('/login?redirect_url=/messages');
      } else {
        setHasUnreadMessages(false);
        setPageLoading(true);
        fetch('/api/messages')
          .then(res => res.json())
          .then(data => {
            setMyConversations(data.conversations || []);
            setPageLoading(false);
          });
      }
    }
  }, [isAuthenticated, authLoading, user, router, setHasUnreadMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [myConversations, selectedConversationId]);

  const handleSelectConversation = (convoId: string) => {
    setSelectedConversationId(convoId);
    // Optionally mark as read in backend
  };

  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) return myConversations;
    return myConversations.filter(convo =>
      convo.participants.some(pid => pid !== user?.id && pid.includes(searchQuery))
    );
  }, [searchQuery, myConversations, user]);

  const selectedConversation = useMemo(() => {
    if (!selectedConversationId) return null;
    return myConversations.find(c => c._id === selectedConversationId);
  }, [selectedConversationId, myConversations]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversationId || !user) return;

    const selectedConvo = myConversations.find(c => c._id === selectedConversationId);
    const recipientId = selectedConvo?.participants.find((id: string) => id !== user.id);

    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        conversationId: selectedConversationId,
        recipientId,
        text: newMessage.trim(),
      }),
    });

    if (res.ok) {
      setNewMessage('');
      fetch('/api/messages')
        .then(res => res.json())
        .then(data => setMyConversations(data.conversations || []));
    } else {
      toast({ title: "Failed to send message" });
    }
  };

  if (authLoading || pageLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="ml-4 text-lg text-muted-foreground">Loading Messages...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-0 sm:px-4 lg:px-8 py-0 pt-20 sm:pt-24">
        <Card className="h-full flex shadow-xl overflow-hidden rounded-none sm:rounded-lg bg-card/90 backdrop-blur-sm">
          {/* Sidebar */}
          <div className="w-1/3 border-r flex flex-col">
            <div className="p-4 border-b">
              <h2 className="font-headline text-xl text-primary">Messages</h2>
              <div className="relative mt-2">
                <Input
                  type="search"
                  placeholder="Search conversations..."
                  className="pl-8 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <ScrollArea className="flex-grow">
              {filteredConversations.map(convo => (
                <div 
                  key={convo._id} 
                  className={`p-4 border-b hover:bg-accent/10 cursor-pointer transition-colors duration-150 relative ${convo._id === selectedConversationId ? 'bg-accent/20' : ''}`}
                  onClick={() => handleSelectConversation(convo._id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-grow overflow-hidden">
                      <p className="text-sm truncate font-semibold text-foreground">
                        {convo.participants.filter(pid => pid !== user?.id).join(', ')}
                      </p>
                      <p className="text-xs truncate text-muted-foreground">
                        {convo.messages[convo.messages.length - 1]?.text || 'No messages yet'}
                      </p>
                    </div>
                  </div>
                  {convo.unreadCount ? (
                    <div className="absolute top-1/2 -translate-y-1/2 right-4 text-xs bg-red-600 text-white rounded-full h-5 w-5 flex items-center justify-center font-bold shrink-0">
                      {convo.unreadCount}
                    </div>
                  ) : null}
                </div>
              ))}
            </ScrollArea>
          </div>
          {/* Chat Area */}
          <div className="w-2/3 flex flex-col">
            {selectedConversation ? (
              <>
                <div className="p-4 border-b flex items-center justify-between">
                  <div>
                    <p className="font-semibold">
                      {selectedConversation.participants.filter(pid => pid !== user?.id).join(', ')}
                    </p>
                  </div>
                </div>
                <ScrollArea className="flex-grow bg-secondary/20">
                  <div className="p-4 space-y-2">
                    {selectedConversation.messages.map(msg => (
                      <div key={msg._id} className={`flex ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-md p-3 rounded-lg ${msg.senderId === user?.id ? 'bg-primary text-primary-foreground' : 'bg-card shadow-sm'}`}>
                          <p className="text-sm">{msg.text}</p>
                          <div className={`text-xs mt-1 flex items-center gap-1 ${msg.senderId === user?.id ? 'text-primary-foreground/70 justify-end' : 'text-muted-foreground justify-start'}`}>
                            <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
                <div className="p-4 border-t bg-card">
                  <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                    <Input 
                      type="text" 
                      placeholder="Type your message..." 
                      className="flex-grow text-sm" 
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground"><Send className="h-5 w-5"/></Button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
                <MessageSquare className="h-16 w-16 text-muted-foreground/30 mb-4" />
                <h3 className="font-headline text-xl text-muted-foreground">Select a conversation</h3>
                <p className="text-sm text-muted-foreground/70">Choose a chat from the left panel to view messages.</p>
              </div>
            )}
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
}