import React, { useState, useRef, useEffect } from 'react';
import { NavBar } from "@/components/NavBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Send, Phone, Image, Paperclip, ArrowLeft, Info, Clock } from "lucide-react";
import { ChatContact, ChatMessage, PendingTransaction } from "@/types/middleman";
import { useNavigate, useLocation } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const ChatPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [selectedContact, setSelectedContact] = useState<ChatContact | null>(null);
  const [showPendingTransactions, setShowPendingTransactions] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  
  const params = new URLSearchParams(location.search);
  const middlemanId = params.get('middleman');
  
  const [contacts, setContacts] = useState<ChatContact[]>([
    {
      id: "1",
      name: "Joshua Oswald G. Santos",
      avatar: "/lovable-uploads/a0248aef-fed3-4b14-b572-2feb6e9ffa76.png",
      lastMessage: "I'll help facilitate your transaction safely",
      type: "middleman"
    },
    {
      id: "2",
      name: "Maria Rodriguez",
      avatar: "",
      lastMessage: "Let me know when the item is ready",
      type: "buyer"
    }
  ]);
  
  const [pendingTransactions, setPendingTransactions] = useState<PendingTransaction[]>([
    {
      id: "pt1",
      buyerName: "Maria Rodriguez",
      sellerName: "Me",
      middlemanName: "Joshua Oswald G. Santos",
      item: "iPhone 15 Pro",
      price: "₱85,000",
      date: "2025-04-12",
      status: "pending"
    },
    {
      id: "pt2",
      buyerName: "John Smith",
      sellerName: "Me",
      middlemanName: "Karina Delgado",
      item: "MacBook Pro",
      price: "₱95,500",
      date: "2025-04-15",
      status: "in-progress"
    }
  ]);

  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>({
    "1": [
      { id: "m1", sender: "Joshua Oswald G. Santos", senderType: "middleman", content: "Hello! I'll be your middleman for this transaction", timestamp: new Date(Date.now() - 3600000) },
      { id: "m2", sender: "Me", senderType: "seller", content: "Thanks for helping with this sale", timestamp: new Date(Date.now() - 3500000) },
      { id: "m3", sender: "Joshua Oswald G. Santos", senderType: "middleman", content: "Can you provide details about the product you're selling?", timestamp: new Date(Date.now() - 3400000) },
      { id: "m4", sender: "Me", senderType: "seller", content: "Sure, I'm selling a brand new iPhone 15 Pro. It's still sealed in the box.", timestamp: new Date(Date.now() - 3300000) },
    ],
    "2": [
      { id: "m5", sender: "Maria Rodriguez", senderType: "buyer", content: "Hi, I'm the buyer for the iPhone", timestamp: new Date(Date.now() - 7200000) },
      { id: "m6", sender: "Me", senderType: "seller", content: "Hello Maria! Yes, I have it ready for you", timestamp: new Date(Date.now() - 7100000) },
      { id: "m7", sender: "Maria Rodriguez", senderType: "buyer", content: "Great, when can we proceed with the transaction?", timestamp: new Date(Date.now() - 7000000) },
    ]
  });

  const sellerProfile = {
    name: "Tech Gadgets Shop",
    email: "techgadgets@example.com",
    phone: "+639311111111",
    shopAddress: "123 Tech Street, Manila",
    avatar: ""
  };

  // Set the selected contact based on the middlemanId from URL or default to the first contact
  useEffect(() => {
    if (middlemanId) {
      const contact = contacts.find(c => c.id === middlemanId);
      if (contact) {
        setSelectedContact(contact);
      }
    }
  }, [middlemanId, contacts]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedContact, messages]);

  const handleSendMessage = () => {
    if (message.trim() && selectedContact) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: "Me",
        senderType: "seller",
        content: message,
        timestamp: new Date()
      };

      setMessages(prevMessages => ({
        ...prevMessages,
        [selectedContact.id]: [...(prevMessages[selectedContact.id] || []), newMessage]
      }));
      
      setMessage("");
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleBack = () => {
    navigate("/dashboard/seller");
  };

  const filteredContacts = contacts.filter(contact => {
    // Only show middleman contacts
    return contact.type === 'middleman' && (!searchQuery || contact.name.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const togglePendingTransactions = () => {
    setShowPendingTransactions(!showPendingTransactions);
  };

  return (
    <div className="page-container">
      <NavBar userType="seller" />
      <main className="flex-1 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto p-0 md:p-4 h-[calc(100vh-8rem)] flex flex-col">
          {/* Back button */}
          <div className="px-4 py-2">
            <Button 
              variant="ghost" 
              className="mb-2 text-green-600 hover:bg-green-50 hover:text-green-700 flex items-center"
              onClick={handleBack}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
            </Button>
          </div>
          
          <Card className="flex-1 border-green-200 shadow-xl flex flex-col md:flex-row overflow-hidden">
            {/* Contacts List */}
            <div className="w-full md:w-1/4 border-r border-green-100 flex flex-col bg-white">
              <div className="p-4 border-b border-green-100 bg-white">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-green-800">Chats</h2>
                </div>
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    className="pl-9 border-green-200 focus:border-green-400 focus:ring focus:ring-green-200" 
                    placeholder="Search conversations" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Tabs defaultValue="middleman" value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-1 bg-green-100 w-full">
                    <TabsTrigger 
                      value="middleman" 
                      className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
                    >
                      Middleman
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Pending Transactions List */}
              {showPendingTransactions && (
                <div className="flex-1 overflow-y-auto bg-green-50 border-b border-green-100">
                  <div className="p-3 bg-green-100 text-green-800 font-medium flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Pending Transactions
                  </div>
                  {pendingTransactions.map(transaction => (
                    <div key={transaction.id} className="p-4 border-b border-green-100 hover:bg-green-100 cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-green-800">{transaction.item}</span>
                        <span className="text-green-700 font-medium">{transaction.price}</span>
                      </div>
                      <div className="text-sm text-gray-600 mb-1">
                        <span className="font-medium">Buyer:</span> {transaction.buyerName}
                      </div>
                      <div className="text-sm text-gray-600 mb-1">
                        <span className="font-medium">Middleman:</span> {transaction.middlemanName}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center mt-2">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatDate(transaction.date)}
                      </div>
                      <div className="flex mt-2 space-x-2">
                        <Button 
                          size="sm" 
                          className="w-full text-xs bg-green-500 hover:bg-green-600"
                        >
                          View Details
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-xs border-green-300 text-green-600"
                        >
                          Chat
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Contacts */}
              <div className={`${showPendingTransactions ? 'hidden md:block md:flex-1' : 'flex-1'} overflow-y-auto bg-white`}>
                {filteredContacts.length > 0 ? (
                  filteredContacts.map((contact) => (
                    <div 
                      key={contact.id} 
                      className={`flex items-center p-4 hover:bg-green-50 cursor-pointer transition-colors border-b border-gray-100 ${selectedContact?.id === contact.id ? 'bg-green-100' : ''}`}
                      onClick={() => setSelectedContact(contact)}
                    >
                      <Avatar className="h-12 w-12 mr-4">
                        <AvatarImage src={contact.avatar} />
                        <AvatarFallback className={`${contact.type === 'buyer' ? 'bg-blue-200 text-blue-700' : 'bg-purple-200 text-purple-700'}`}>
                          {contact.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h3 className="text-sm font-semibold truncate">{contact.name}</h3>
                          <span className="text-xs text-gray-500">
                            {messages[contact.id]?.length > 0 
                              ? formatTime(messages[contact.id][messages[contact.id].length - 1].timestamp) 
                              : ''}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${contact.type === 'buyer' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'} capitalize`}>
                          {contact.type}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    No contacts found
                  </div>
                )}
              </div>
            </div>

            {/* Chat Window */}
            <div className="flex-1 flex flex-col">
              {selectedContact ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-green-100 bg-white flex justify-between items-center">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={selectedContact.avatar} />
                        <AvatarFallback className={`${selectedContact.type === 'buyer' ? 'bg-blue-200 text-blue-700' : 'bg-purple-200 text-purple-700'}`}>
                          {selectedContact.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-green-800">{selectedContact.name}</h3>
                        <p className="text-xs text-gray-500 capitalize">{selectedContact.type}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm"
                        variant="outline"
                        className="border-green-200 text-green-600 hover:bg-green-50"
                      >
                        <Info className="h-4 w-4 mr-1" />
                        Transaction Info
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost"
                        className="text-green-600 hover:bg-green-50 hover:text-green-700"
                      >
                        <Phone className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-br from-green-50/30 to-white">
                    {messages[selectedContact.id]?.map((msg) => (
                      <div 
                        key={msg.id} 
                        className={`flex mb-4 ${msg.senderType === 'seller' ? 'justify-end' : 'justify-start'}`}
                      >
                        {msg.senderType !== 'seller' && (
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarFallback className={`${msg.senderType === 'buyer' ? 'bg-blue-200 text-blue-700' : 'bg-purple-200 text-purple-700'}`}>
                              {msg.sender[0].toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div 
                          className={`max-w-[70%] p-3 rounded-2xl ${
                            msg.senderType === 'seller' 
                              ? 'bg-green-500 text-white rounded-tr-none shadow-lg' 
                              : 'bg-white rounded-tl-none shadow-md'
                          }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                          <p className="text-xs mt-1 opacity-70 text-right">
                            {formatTime(msg.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messageEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="p-3 border-t border-green-100 bg-white flex items-center">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-green-600 hover:bg-green-50 hover:text-green-700"
                    >
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-green-600 hover:bg-green-50 hover:text-green-700"
                    >
                      <Image className="h-5 w-5" />
                    </Button>
                    <div className="flex-1 mx-2 relative">
                      <Input 
                        className="pr-10 focus-visible:ring-green-500 border-green-200"
                        placeholder="Type your message" 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
                      />
                    </div>
                    <Button 
                      className="bg-green-500 hover:bg-green-600 transition-colors"
                      size="icon" 
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col md:flex-row">
                  {/* Welcome/Empty state */}
                  <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-green-50 to-white">
                    <div className="text-center p-6">
                      <div className="mb-4 bg-green-100 p-6 rounded-full inline-block">
                        <Search className="h-12 w-12 text-green-500" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-green-800">Select a contact</h3>
                      <p className="text-gray-500 max-w-md">
                        Choose a buyer or middleman from the list to start chatting
                      </p>
                    </div>
                  </div>
                  
                  {/* Seller profile */}
                  <div className="w-full md:w-72 border-l border-green-100 bg-white p-6 flex flex-col items-center">
                    <Avatar className="h-32 w-32 mb-4 border-4 border-green-200">
                      <AvatarImage src={sellerProfile.avatar} />
                      <AvatarFallback className="bg-green-200 text-green-700 text-3xl">
                        {sellerProfile.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-semibold text-center mb-1 text-green-800">{sellerProfile.name}</h3>
                    <p className="text-sm text-gray-500 mb-4">{sellerProfile.email}</p>
                    <div className="w-full space-y-3">
                      <div className="bg-green-500 text-white p-3 rounded-md text-center overflow-hidden text-ellipsis">
                        {sellerProfile.phone}
                      </div>
                      <div className="bg-green-500 text-white p-3 rounded-md text-center overflow-hidden text-ellipsis">
                        {sellerProfile.shopAddress}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Seller profile sidebar (when chat is active) */}
            {selectedContact && (
              <div className="hidden lg:block w-72 border-l border-green-100 bg-white">
                <div className="p-6 flex flex-col items-center">
                  <Avatar className="h-32 w-32 mb-4 border-4 border-green-200">
                    <AvatarImage src={sellerProfile.avatar} />
                    <AvatarFallback className="bg-green-200 text-green-700 text-3xl">
                      {sellerProfile.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-semibold text-center mb-1 text-green-800">{sellerProfile.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{sellerProfile.email}</p>
                  <div className="w-full space-y-3">
                    <div className="bg-green-500 text-white p-3 rounded-md text-center overflow-hidden text-ellipsis">
                      {sellerProfile.phone}
                    </div>
                    <div className="bg-green-500 text-white p-3 rounded-md text-center overflow-hidden text-ellipsis">
                      {sellerProfile.shopAddress}
                    </div>
                  </div>
                  <div className="mt-6 w-full space-y-3">
                    <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-colors">
                      Transaction Details
                    </Button>
                    <Button variant="outline" className="w-full border-green-300 text-green-700 hover:bg-green-50">
                      Contact Support
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </main>
      <footer className="bg-gradient-to-r from-green-100 to-green-200 py-4 text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} Sellmate. All rights reserved.
      </footer>
    </div>
  );
};

export default ChatPage;
