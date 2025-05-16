
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NotFoundState = () => {
  const navigate = useNavigate();
  
  // Sample provider IDs for demo purposes
  const sampleProviders = [
    { id: "1", name: "נטע ברסלר - אמן מחשבות" },
    { id: "2", name: "להקת מלודי מייקרס" },
    { id: "3", name: "סטודיו צילום זכרונות חיים" }
  ];
  
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">ספק לא נמצא</h1>
      <p className="text-gray-600 mb-6">
        לא הצלחנו למצוא את הספק המבוקש. אנא בדוק את הקישור ונסה שנית.
      </p>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">ספקים לדוגמה</h2>
        <p className="text-gray-600 mb-4">
          אתה מוזמן לצפות בספקים הבאים לצורך הדגמה:
        </p>
        <div className="flex flex-col space-y-2 max-w-sm mx-auto">
          {sampleProviders.map(provider => (
            <Button 
              key={provider.id} 
              variant="outline" 
              onClick={() => navigate(`/providers/${provider.id}`)}
              className="w-full"
            >
              {provider.name}
            </Button>
          ))}
        </div>
      </div>
      
      <Link to="/">
        <Button>חזרה לדף הבית</Button>
      </Link>
    </div>
  );
};

export default NotFoundState;
