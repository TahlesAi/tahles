
import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const ReviewsTabContent = () => (
  <TabsContent value="reviews" className="p-6 text-right" dir="rtl">
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center">
        <div className="flex items-center ml-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star 
              key={star} 
              className="h-5 w-5 text-yellow-400 fill-yellow-400" 
            />
          ))}
        </div>
        <span className="font-medium">4.9</span>
        <span className="text-gray-500 mr-1">(87)</span>
      </div>
      <h2 className="text-2xl font-bold">חוות דעת</h2>
    </div>
    
    <div className="space-y-6">
      <div className="border-b pb-6">
        <div className="flex justify-between mb-2">
          <div className="text-gray-500 text-sm">
            18 באפריל, 2025
          </div>
          <div className="font-semibold">שרה כהן</div>
        </div>
        <div className="flex mb-2 justify-end">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star 
              key={star} 
              className="h-4 w-4 text-yellow-400 fill-yellow-400"
            />
          ))}
        </div>
        <p>פשוט מדהים! הופיע בחתונה שלנו והיה פנומנלי. האורחים לא מפסיקים לדבר על כמה המופע היה מרשים. ממליצה בחום!</p>
      </div>
      
      <div className="border-b pb-6">
        <div className="flex justify-between mb-2">
          <div className="text-gray-500 text-sm">
            22 במרץ, 2025
          </div>
          <div className="font-semibold">מיכאל לוי</div>
        </div>
        <div className="flex mb-2 justify-end">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star 
              key={star} 
              className="h-4 w-4 text-yellow-400 fill-yellow-400"
            />
          ))}
        </div>
        <p>הזמנו אותו לאירוע חברה והוא היה מקצועי ביותר. תקשורת מצוינת לפני האירוע, הגיע בזמן, והציג מופע יוצא מן הכלל.</p>
      </div>
      
      <div className="border-b pb-6">
        <div className="flex justify-between mb-2">
          <div className="text-gray-500 text-sm">
            5 במרץ, 2025
          </div>
          <div className="font-semibold">יסמין אברהם</div>
        </div>
        <div className="flex mb-2 justify-end">
          {[1, 2, 3, 4].map((star) => (
            <Star 
              key={star} 
              className="h-4 w-4 text-yellow-400 fill-yellow-400"
            />
          ))}
          <Star 
            className="h-4 w-4 text-gray-300"
          />
        </div>
        <p>מופע טוב מאוד עם רפרטואר רחב. הם נענו לבקשות שלנו והשאירו את האנרגיה גבוהה לאורך כל הערב. הבעיה היחידה הייתה שההתארגנות לקחה קצת יותר זמן ממה שציפינו.</p>
      </div>
    </div>
    
    <div className="text-center mt-6">
      <Button variant="outline">
        טען עוד חוות דעת
      </Button>
    </div>
  </TabsContent>
);

export default ReviewsTabContent;
