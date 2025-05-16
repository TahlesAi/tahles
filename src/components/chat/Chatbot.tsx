
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MessageSquare, Send, X } from "lucide-react";

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const initialMessages: Message[] = [
  {
    id: '1',
    content: 'שלום! אני עוזר הצ\'אט של תכל\'ס. כיצד אוכל לעזור לך היום?',
    sender: 'bot',
    timestamp: new Date(),
  },
];

const commonQuestions = [
  'איך אוכל להזמין שירות?',
  'מה תהליך התשלום?',
  'האם אפשר לבטל הזמנה?',
  'איך בודקים זמינות של ספק?',
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    
    // Store the question for future training
    storeQuestion(newMessage);
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(newMessage),
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };
  
  const storeQuestion = (question: string) => {
    // In a real implementation, this would send the question to a database
    console.log('Storing question for training:', question);
  };
  
  const getBotResponse = (question: string): string => {
    // In a real implementation, this would use a trained model or API
    // This is just a simple simulation
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('זמינות') || lowerQuestion.includes('תאריך')) {
      return 'ניתן לבדוק זמינות של ספק על ידי לחיצה על כפתור "בדוק זמינות" בכרטיס הספק. מומלץ גם לעבור על לוח השנה בטאב "זמינות והזמנה".';
    }
    
    if (lowerQuestion.includes('תשלום') || lowerQuestion.includes('מחיר')) {
      return 'התשלום מתבצע באופן מאובטח דרך האתר. ניתן לשלם בכרטיס אשראי, העברה בנקאית או אמצעים אחרים בהתאם לשירות שבחרת.';
    }
    
    if (lowerQuestion.includes('ביטול') || lowerQuestion.includes('לבטל')) {
      return 'ניתן לבטל הזמנה עד 48 שעות לפני מועד האירוע. לפרטים מלאים אנא בדוק את מדיניות הביטולים של הספק הספציפי.';
    }
    
    return 'תודה על שאלתך! אחד מנציגי השירות שלנו יענה לך בקרוב. בינתיים, אולי תמצא תשובה בעמוד "איך זה עובד" שלנו.';
  };
  
  const handleCommonQuestionClick = (question: string) => {
    setNewMessage(question);
  };
  
  return (
    <>
      {/* Floating chat button */}
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button
            className="fixed bottom-6 left-6 rounded-full h-14 w-14 shadow-lg"
            size="icon"
          >
            <MessageSquare className="h-6 w-6" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-[70vh]">
          <DrawerHeader className="border-b p-4">
            <DrawerTitle className="text-center">צ׳אט עם נציג תכל׳ס</DrawerTitle>
            <DrawerClose className="absolute right-4 top-4">
              <X className="h-4 w-4" />
            </DrawerClose>
          </DrawerHeader>
          <CardContent className="flex-grow overflow-y-auto p-4 space-y-4 h-[calc(70vh-140px)]">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-brand-600 text-white'
                      : 'bg-gray-100'
                  }`}
                  dir="rtl"
                >
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </CardContent>
          
          {/* Common questions chips */}
          {messages.length <= 2 && (
            <div className="px-4 pb-2">
              <p className="text-sm text-gray-500 mb-2 text-right">שאלות נפוצות:</p>
              <div className="flex flex-wrap gap-2 justify-end">
                {commonQuestions.map((question, index) => (
                  <Button 
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleCommonQuestionClick(question)}
                    className="text-xs"
                    dir="rtl"
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          <DrawerFooter className="border-t p-4 mt-auto">
            <div className="flex gap-2">
              <Input
                placeholder="הקלד את שאלתך כאן..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-grow"
                dir="rtl"
              />
              <Button size="icon" onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Chatbot;
