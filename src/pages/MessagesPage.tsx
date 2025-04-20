
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Send, Plus, MessageSquare, User, Phone } from "lucide-react";
import { studentData, advisorData } from "@/data/mockData";

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

interface Contact {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount: number;
}

// Mock data for messages
const mockMessages: Message[] = [
  {
    id: "msg1",
    senderId: "a1", // advisor
    receiverId: "1", // student
    content: "Hello Arjun, I'd like to schedule an advising session to discuss your course selection for next semester.",
    timestamp: "2024-04-18T14:30:00",
    read: true,
  },
  {
    id: "msg2",
    senderId: "1", // student
    receiverId: "a1", // advisor
    content: "Hello Dr. Sharma, that would be great. When are you available?",
    timestamp: "2024-04-18T15:45:00",
    read: true,
  },
  {
    id: "msg3",
    senderId: "a1", // advisor
    receiverId: "1", // student
    content: "I have availability next Tuesday at 2:00 PM or Wednesday at 10:00 AM. Which works better for you?",
    timestamp: "2024-04-19T09:15:00",
    read: true,
  },
  {
    id: "msg4",
    senderId: "1", // student
    receiverId: "a1", // advisor
    content: "Tuesday at 2:00 PM works perfect for me. Should I come to your office?",
    timestamp: "2024-04-19T10:30:00",
    read: true,
  },
  {
    id: "msg5",
    senderId: "a1", // advisor
    receiverId: "1", // student
    content: "Yes, please come to my office in the Science Building, Room 305. I'll see you then!",
    timestamp: "2024-04-19T11:00:00",
    read: false,
  },
];

// Contacts for student view
const studentContacts: Contact[] = [
  {
    id: "a1",
    name: advisorData.name,
    role: "Academic Advisor",
    unreadCount: 1,
    lastMessage: "Yes, please come to my office in the Science Building, Room 305. I'll see you then!",
    lastMessageTime: "11:00 AM",
  },
  {
    id: "prof1",
    name: "Dr. Rajesh Kumar",
    role: "Professor - CS301",
    unreadCount: 0,
    lastMessage: "The assignment deadline has been extended to next Friday.",
    lastMessageTime: "Yesterday",
  },
  {
    id: "prof2",
    name: "Dr. Meera Gupta",
    role: "Professor - CS302",
    unreadCount: 0,
    lastMessage: "Please check the updated lecture notes on the portal.",
    lastMessageTime: "Apr 15",
  },
];

const MessagesPage = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(studentContacts[0]);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter contacts based on search
  const filteredContacts = studentContacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    contact.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get messages for selected contact
  const contactMessages = selectedContact 
    ? messages.filter(msg => 
        (msg.senderId === selectedContact.id && msg.receiverId === studentData.id) || 
        (msg.senderId === studentData.id && msg.receiverId === selectedContact.id)
      )
    : [];

  // Send a new message
  const handleSendMessage = () => {
    if (newMessage.trim() === "" || !selectedContact) return;

    const newMsg: Message = {
      id: `msg${messages.length + 1}`,
      senderId: studentData.id,
      receiverId: selectedContact.id,
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: false,
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  // Format date for display
  const formatMessageDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground">
          Communicate with advisors, professors, and academic staff
        </p>
      </div>

      <Card className="flex flex-col md:flex-row h-[calc(100vh-220px)]">
        {/* Contacts sidebar */}
        <div className="w-full md:w-1/3 border-r">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <Tabs defaultValue="all" className="px-4 pt-2">
            <TabsList className="w-full justify-start mb-2">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">
                Unread
                <Badge className="ml-1 bg-primary h-5 w-5 p-0 flex items-center justify-center rounded-full text-xs">
                  1
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="important">Important</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="overflow-y-auto h-[calc(100%-110px)]">
            {filteredContacts.map((contact) => (
              <div 
                key={contact.id}
                className={`flex items-center gap-3 p-3 border-b cursor-pointer hover:bg-muted/50 transition-colors ${selectedContact?.id === contact.id ? 'bg-muted/70' : ''}`}
                onClick={() => setSelectedContact(contact)}
              >
                <Avatar>
                  <AvatarFallback>{contact.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <span className="font-medium truncate">{contact.name}</span>
                    <span className="text-xs text-muted-foreground">{contact.lastMessageTime}</span>
                  </div>
                  <div className="text-xs text-muted-foreground truncate">{contact.role}</div>
                  {contact.lastMessage && (
                    <p className="text-sm truncate mt-1">{contact.lastMessage}</p>
                  )}
                </div>
                {contact.unreadCount > 0 && (
                  <Badge className="bg-primary h-5 w-5 p-0 flex items-center justify-center rounded-full text-xs">
                    {contact.unreadCount}
                  </Badge>
                )}
              </div>
            ))}
          </div>
          
          <div className="p-3 border-t">
            <Button variant="outline" className="w-full" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Message
            </Button>
          </div>
        </div>

        {/* Message content */}
        <div className="w-full md:w-2/3 flex flex-col">
          {selectedContact ? (
            <>
              {/* Contact header */}
              <div className="flex justify-between items-center p-3 border-b bg-muted/20">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{selectedContact.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{selectedContact.name}</div>
                    <div className="text-xs text-muted-foreground">{selectedContact.role}</div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <User className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {contactMessages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex ${msg.senderId === studentData.id ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.senderId !== studentData.id && (
                      <Avatar className="h-8 w-8 mr-2 mt-1">
                        <AvatarFallback>{selectedContact.name[0]}</AvatarFallback>
                      </Avatar>
                    )}
                    <div>
                      <div 
                        className={`rounded-lg py-2 px-3 max-w-xs md:max-w-md inline-block ${
                          msg.senderId === studentData.id 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted'
                        }`}
                      >
                        {msg.content}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {formatMessageDate(msg.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Message input */}
              <div className="border-t p-3">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={newMessage.trim() === ""}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center">
              <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-1">No conversation selected</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Select a contact to start a conversation
              </p>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                New Message
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default MessagesPage;
