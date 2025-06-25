
"use client";

import { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Send, Paperclip, Loader2, MessageSquare, Image as ImageIcon, FileText, Video, Check, CheckCheck } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from '@/components/ui/badge';


// MOCK DATA - In a real app, this would come from an API
const mockUsers = {
  '1': { name: 'You', avatar: 'https://placehold.co/40x40.png?text=YOU', online: true },
  '2': { name: 'John Seller', avatar: 'https://placehold.co/40x40.png?text=JS', online: true },
  '3': { name: 'Alice Buyer', avatar: 'https://placehold.co/40x40.png?text=AB', online: false },
  '4': { name: 'Carversal Support', avatar: 'https://placehold.co/40x40.png?text=CS', online: true },
  '5': { name: 'Rohan Sharma', avatar: 'https://placehold.co/40x40.png?text=RS', online: false },
  '6': { name: 'Priya Singh', avatar: 'https://placehold.co/40x40.png?text=PS', online: true },
};

type MessageStatus = 'sent' | 'delivered' | 'read';
type Message = { id: string; senderId: string; text: string; timestamp: string; status?: MessageStatus };

const initialMockConversations: { id: string; participants: string[]; unreadCount: number; messages: Message[] }[] = [
  {
    id: 'conv1',
    participants: ['1', '2'], // You and John Seller
    unreadCount: 2, 
    messages: [
      { id: 'm1-1', senderId: '2', text: 'Hi there! Interested in the 2022 Porsche 911?', timestamp: '10:30 AM' },
      { id: 'm1-2', senderId: '1', text: 'Yes, very interested! Is it still available?', timestamp: '10:31 AM', status: 'read' },
      { id: 'm1-3', senderId: '2', text: 'Yes, the car is still available. When would you like to see it?', timestamp: '10:32 AM' },
      { id: 'm1-4', senderId: '2', text: 'I am available tomorrow afternoon.', timestamp: '10:32 AM' },
    ],
  },
  {
    id: 'conv2',
    participants: ['1', '3'], // You and Alice Buyer
    unreadCount: 0,
    messages: [
      { id: 'm2-1', senderId: '3', text: 'About the Swift you sold, I have a quick question about the service history.', timestamp: 'Yesterday' },
      { id: 'm2-2', senderId: '1', text: 'Sure, what would you like to know?', timestamp: 'Yesterday', status: 'read' },
    ],
  },
  {
    id: 'conv3',
    participants: ['1', '4'], // You and Support
    unreadCount: 1,
    messages: [
      { id: 'm3-1', senderId: '4', text: 'Your verification documents have been approved. You can now access all features.', timestamp: '2 days ago' },
    ],
  },
  {
    id: 'conv4',
    participants: ['1', '5'], // You and Rohan Sharma
    unreadCount: 0,
    messages: [
      { id: 'm4-1', senderId: '5', text: 'Hey! I saw your message about the Maruti Swift. Is the price negotiable?', timestamp: '10:45 AM' },
      { id: 'm4-2', senderId: '1', text: 'Hi Rohan, yes, the price is slightly negotiable for serious buyers. Feel free to make an offer.', timestamp: '10:46 AM', status: 'delivered' },
    ],
  },
  {
    id: 'conv5',
    participants: ['1', '6'], // You and Priya Singh
    unreadCount: 5,
    messages: [
        { id: 'm5-1', senderId: '6', text: 'Hi! I saw your listing for the Hyundai Creta.', timestamp: '9:00 AM' },
        { id: 'm5-2', senderId: '6', text: 'Is it the SX(O) model?', timestamp: '9:01 AM' },
        { id: 'm5-3', senderId: '6', text: 'And does it have a sunroof?', timestamp: '9:01 AM' },
        { id: 'm5-4', senderId: '6', text: 'Also curious about the mileage.', timestamp: '9:02 AM' },
        { id: 'm5-5', senderId: '6', text: 'Please let me know!', timestamp: '9:02 AM' },
    ]
  }
];
// END MOCK DATA

const MessageStatusIndicator = ({ status }: { status: MessageStatus | undefined }) => {
    if (!status) return null;
    if (status === 'sent') return <Check className="h-4 w-4 text-primary-foreground/70" />;
    if (status === 'delivered') return <CheckCheck className="h-4 w-4 text-primary-foreground/70" />;
    if (status === 'read') return <CheckCheck className="h-4 w-4 text-accent" />; 
    return null;
};


export default function MessagesPage() {
  const { isAuthenticated, user, loading: authLoading, setHasUnreadMessages } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [myConversations, setMyConversations] = useState<typeof initialMockConversations>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated || !user) {
        router.push('/login?redirect_url=/messages');
      } else {
        // Clear the global unread indicator as soon as the user visits this page
        setHasUnreadMessages(false);
        
        // Simulate fetching conversations for the current user
        const userConversations = initialMockConversations.filter(c => c.participants.includes(user.id));
        setMyConversations(userConversations);
        setPageLoading(false);
      }
    }
  }, [isAuthenticated, authLoading, user, router, setHasUnreadMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [myConversations, selectedConversationId]);

  const handleSelectConversation = (convoId: string) => {
    setSelectedConversationId(convoId);
    // Mark messages as read locally
    setMyConversations(prevConvos => 
        prevConvos.map(convo => 
            convo.id === convoId ? { ...convo, unreadCount: 0 } : convo
        )
    );
  };

  const getOtherParticipant = useCallback((participants: string[]) => {
    if (!user) return null;
    const otherId = participants.find(p => p !== user.id);
    return otherId ? mockUsers[otherId as keyof typeof mockUsers] : null;
  }, [user]);

  const filteredConversations = useMemo(() => {
    // THIS IS THE FIX: Always create a new array to ensure React re-renders.
    let conversationsToFilter = [...myConversations];
    if (!searchQuery.trim()) {
      return conversationsToFilter;
    }
    return conversationsToFilter.filter(convo => {
      const otherUser = getOtherParticipant(convo.participants);
      return otherUser?.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [searchQuery, myConversations, getOtherParticipant]);

  const selectedConversation = useMemo(() => {
    if (!selectedConversationId) return null;
    return myConversations.find(c => c.id === selectedConversationId);
  }, [selectedConversationId, myConversations]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversationId || !user) return;

    const message: Message = {
      id: `m-new-${Date.now()}`,
      senderId: user.id,
      text: newMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
    };

    setMyConversations(prevConvos =>
      prevConvos.map(convo => {
        if (convo.id === selectedConversationId) {
          return { ...convo, messages: [...convo.messages, message] };
        }
        return convo;
      })
    );

    setNewMessage('');
  };
  
  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast({
        title: "Attachment Selected",
        description: `Selected: ${file.name}. Compression & upload happen upon sending (simulated).`,
      });
      // Reset the input value so the same file can be selected again
      if (e.target) {
        e.target.value = '';
      }
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
      <main className="flex-grow container mx-auto px-0 sm:px-4 lg:px-8 py-0 pt-20 sm:pt-24 h-[calc(100vh-theme(spacing.20))] sm:h-[calc(100vh-theme(spacing.24))]">
        <Card className="h-full flex shadow-xl overflow-hidden rounded-none sm:rounded-lg bg-card/90 backdrop-blur-sm">
          {/* Sidebar with conversations list */}
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
              {filteredConversations.map(convo => {
                 const otherUser = getOtherParticipant(convo.participants);
                 const lastMessage = convo.messages[convo.messages.length - 1];
                 const isUnread = convo.unreadCount > 0;
                 
                 return (
                    <div 
                        key={convo.id} 
                        className={cn(
                            "p-4 border-b hover:bg-accent/10 cursor-pointer transition-colors duration-150 relative",
                            convo.id === selectedConversationId ? 'bg-accent/20' : '',
                            isUnread && !(convo.id === selectedConversationId) ? 'bg-primary/5' : ''
                        )}
                        onClick={() => handleSelectConversation(convo.id)}
                    >
                        <div className="flex items-center space-x-3">
                            <div className="relative shrink-0">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={otherUser?.avatar} alt={otherUser?.name} data-ai-hint="user avatar"/>
                                    <AvatarFallback>{otherUser?.name.split(" ").map(n=>n[0]).join("")}</AvatarFallback>
                                </Avatar>
                                {otherUser?.online && (
                                    <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-card" />
                                )}
                            </div>
                            <div className="flex-grow overflow-hidden">
                                <p className={cn(
                                    "text-sm truncate",
                                    isUnread ? "font-bold text-primary" : "font-semibold text-foreground"
                                )}>
                                    {otherUser?.name || 'Unknown User'}
                                </p>
                                <p className={cn(
                                    "text-xs truncate",
                                    isUnread ? "text-primary/90" : "text-muted-foreground"
                                )}>
                                    {lastMessage?.text || 'No messages yet'}
                                </p>
                            </div>
                        </div>
                         {isUnread && (
                          <div className="absolute top-1/2 -translate-y-1/2 right-4 text-xs bg-red-600 text-white rounded-full h-5 w-5 flex items-center justify-center font-bold shrink-0">
                            {convo.unreadCount}
                          </div>
                        )}
                    </div>
                )
              })}
            </ScrollArea>
          </div>

          {/* Chat Area */}
          <div className="w-2/3 flex flex-col">
            {selectedConversation ? (
              <>
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {(() => {
                      const otherUser = getOtherParticipant(selectedConversation.participants);
                      if (!otherUser) return null;
                      return (
                        <div className="relative shrink-0">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={otherUser.avatar} alt={otherUser.name} data-ai-hint="user avatar"/>
                                <AvatarFallback>{otherUser.name.split(" ").map(n=>n[0]).join("")}</AvatarFallback>
                            </Avatar>
                            {otherUser.online && (
                                <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-card" />
                            )}
                        </div>
                      )
                    })()}
                    <div>
                        <p className="font-semibold">{getOtherParticipant(selectedConversation.participants)?.name || '...'}</p>
                        <p className="text-xs text-muted-foreground">{getOtherParticipant(selectedConversation.participants)?.online ? "Online" : "Offline"}</p>
                    </div>
                  </div>
                </div>
                <ScrollArea className="flex-grow bg-secondary/20">
                    <div className="p-4 space-y-2">
                        {selectedConversation.messages.map(msg => (
                            <div key={msg.id} className={`flex ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'}`}>
                                <div className={cn(
                                    'max-w-xs lg:max-w-md p-3 rounded-lg',
                                    msg.senderId === user?.id 
                                        ? 'bg-primary text-primary-foreground animate-scale-in' 
                                        : 'bg-card shadow-sm animate-slide-in-left'
                                )}>
                                    <p className="text-sm">{msg.text}</p>
                                    <div className={`text-xs mt-1 flex items-center gap-1 ${msg.senderId === user?.id ? 'text-primary-foreground/70 justify-end' : 'text-muted-foreground justify-start'}`}>
                                        <span>{msg.timestamp}</span>
                                        {msg.senderId === user?.id && <MessageStatusIndicator status={msg.status} />}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                </ScrollArea>
                <div className="p-4 border-t bg-card">
                  <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" type="button">
                            <Paperclip className="h-5 w-5 text-muted-foreground"/>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-2">
                          <div className="flex flex-col gap-1">
                              <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => imageInputRef.current?.click()}>
                                  <ImageIcon className="h-5 w-5"/>
                              </Button>
                              <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => videoInputRef.current?.click()}>
                                  <Video className="h-5 w-5"/>
                              </Button>
                              <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => documentInputRef.current?.click()}>
                                  <FileText className="h-5 w-5"/>
                              </Button>
                          </div>
                      </PopoverContent>
                    </Popover>

                    <input 
                      type="file" 
                      ref={imageInputRef} 
                      className="hidden" 
                      onChange={handleAttachmentChange}
                      accept="image/*"
                    />
                     <input 
                      type="file" 
                      ref={videoInputRef} 
                      className="hidden" 
                      onChange={handleAttachmentChange}
                      accept="video/*"
                    />
                     <input 
                      type="file" 
                      ref={documentInputRef} 
                      className="hidden" 
                      onChange={handleAttachmentChange}
                      accept=".pdf,.doc,.docx,.txt"
                    />
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
    </div>
  );
}
