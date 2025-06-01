
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface OnboardingChatbotProps {
  currentStep: number;
  formData: any;
}

const OnboardingChatbot: React.FC<OnboardingChatbotProps> = ({ currentStep, formData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // הודעות עזרה לפי שלב
  const getStepHelp = (step: number) => {
    const helpMessages: Record<number, string> = {
      1: "שלום! אני כאן לעזור לך בתהליך ההרשמה. בשלב זה אנחנו צריכים את הפרטים האישיים שלך. האם יש לך שאלות על איזה מידע נדרש?",
      2: "עכשיו אנחנו צריכים להעלות מסמכים חשובים. זה כולל תעודת זהות, רישיון עסק וביטוח. האם אתה צריך עזרה עם העלאת הקבצים?",
      3: "בשלב זה אנחנו בונים את הפרופיל העסקי שלך. זה מה שלקוחות יראו כשהם מחפשים שירותים. רוצה עצות לכתיבה אטרקטיבית?",
      4: "עכשיו זה הזמן לבחור את הקטגוריה והתת-קטגוריה של השירותים שלך. זה עוזר ללקוחות למצוא אותך בחיפוש. צריך עזרה בבחירה?",
      5: "הגענו לשלב הוספת השירותים! כאן אתה מגדיר את המוצרים שלך, מחירים ותיאורים. רוצה טיפים למחירי שירותים תחרותיים?",
      6: "עכשיו אנחנו יוצרים את דף הספק שלך - זה החזית שלך אל הלקוחות. בואו נוודא שהוא נראה מקצועי ואטרקטיבי!",
      7: "כמעט סיימנו! עכשיו סקירה אחרונה של כל הפרטים. אני יכול לעזור לך לבדוק שהכל מושלם לפני השליחה.",
      8: "זמן חתימה דיגיטלית על ההסכם. זה מאבטח את השותפות שלנו. יש לך שאלות על התנאים?",
      9: "מזל טוב! סיימת בהצלחה! אני כאן אם יש לך שאלות נוספות על השימוש במערכת."
    };
    return helpMessages[step] || "אני כאן לעזור לך בכל שלב של ההרשמה. מה השאלה שלך?";
  };

  // הודעות אוטומטיות מומלצות
  const getAutoResponses = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes("מחיר") || message.includes("עלות")) {
      return "התכלס לא גובה עמלות הרשמה! אנחנו לוקחים רק אחוז קטן מכל מכירה מוצלחת. זה אומר שאתה משלם רק כשאתה מרווח. רוצה לדעת יותר על מבנה העמלות?";
    }
    
    if (message.includes("זמן") || message.includes("כמה זמן")) {
      return "תהליך ההרשמה הרגיל לקח כ-15-20 דקות. אחרי השליחה, צוות התכלס בודק את הפרטים תוך 24-48 שעות. מה עוד תרצה לדעת?";
    }
    
    if (message.includes("מסמכים") || message.includes("קבצים")) {
      return "המסמכים הנדרשים: תעודת זהות, רישיון עסק (אם רלוונטי), ביטוח צד ג'. הקבצים צריכים להיות בפורמט JPG/PNG/PDF ועד 5MB. צריך עזרה עם סריקה?";
    }
    
    if (message.includes("תמונה") || message.includes("תמונות")) {
      return "תמונות איכותיות הן הכי חשובות! המלצות: רזולוציה גבוהה, תאורה טובה, תמונות מקצועיות של העבודה שלך. רוצה טיפים לצילום עצמי?";
    }
    
    if (message.includes("קטגוריה") || message.includes("תחום")) {
      return "בחירת הקטגוריה הנכונה קריטית למציאה בחיפושים. אם אתה לא בטוח, בחר את הקטגוריה הכי קרובה ותוכל לשנות מאוחר יותר. איזה תחום אתה מספק?";
    }
    
    if (message.includes("עזרה") || message.includes("לא יודע")) {
      return "אין בעיה! אני כאן בדיוק בשביל זה. אתה יכול לשאול אותי כל שאלה על התהליך, או שאני יכול להסביר לך על השלב הנוכחי. מה הכי מבלבל אותך?";
    }
    
    if (message.includes("לקוחות") || message.includes("הזמנות")) {
      return "אחרי האישור, הפרופיל שלך יהיה זמין לחיפוש ללקוחות. אנחנו נעזור לך לקדם את השירותים ולקבל הזמנות ראשונות. רוצה טיפים לשיווק?";
    }
    
    return "תודה על השאלה! אני עדיין לומד וטוב שתפנה לתמיכה הטכנית שלנו לעזרה מפורטת יותר. בינתיים, האם יש משהו ספציפי בשלב הנוכחי שאני יכול לעזור בו?";
  };

  // הוספת הודעה חדשה
  const addMessage = (content: string, sender: 'user' | 'bot') => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  // שליחת הודעה
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    addMessage(userMessage, 'user');
    setInputValue("");
    setIsTyping(true);

    // השהיה קצרה לאפקט הקלדה
    setTimeout(() => {
      const botResponse = getAutoResponses(userMessage);
      addMessage(botResponse, 'bot');
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  // הודעת פתיחה אוטומטית
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = getStepHelp(currentStep);
      setTimeout(() => addMessage(welcomeMessage, 'bot'), 500);
    }
  }, [isOpen, currentStep]);

  // גלילה למטה אוטומטית
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      {/* כפתור פתיחת הצ'אט */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg z-50"
          size="lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* חלון הצ'אט */}
      {isOpen && (
        <Card className="fixed bottom-6 left-6 w-80 h-96 shadow-xl z-50 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Bot className="h-4 w-4 text-blue-600" />
              עוזר ההרשמה של תכלס
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-4">
            {/* אזור ההודעות */}
            <ScrollArea className="flex-1 mb-4" ref={scrollAreaRef}>
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg text-sm ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {message.sender === 'bot' && (
                          <Bot className="h-4 w-4 mt-0.5 text-blue-600" />
                        )}
                        {message.sender === 'user' && (
                          <User className="h-4 w-4 mt-0.5" />
                        )}
                        <span>{message.content}</span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* אינדיקטור הקלדה */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <div className="flex items-center gap-1">
                        <Bot className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-gray-600">מקליד...</span>
                        <div className="flex gap-1">
                          <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* שדה הקלט */}
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="שאל אותי משהו..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                size="sm"
                disabled={!inputValue.trim() || isTyping}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default OnboardingChatbot;
