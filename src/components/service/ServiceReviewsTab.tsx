
import React from "react";
import { format } from 'date-fns';
import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ServiceReviewsTabProps {
  reviews: any[];
  averageRating: number;
}

const ServiceReviewsTab = ({ reviews, averageRating }: ServiceReviewsTabProps) => {
  return (
    <div className="pt-4">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">דירוג וביקורות</h3>
        <div className="flex items-center mb-4">
          <div className="text-4xl font-bold ml-3">{averageRating.toFixed(1)}</div>
          <div>
            <div className="flex">
              {Array(5).fill(0).map((_, idx) => (
                <Star 
                  key={idx} 
                  className={`h-5 w-5 ${
                    idx < Math.floor(averageRating) 
                      ? "text-yellow-400 fill-yellow-400" 
                      : "text-gray-300"
                  }`} 
                />
              ))}
            </div>
            <div className="text-sm text-gray-500">{reviews.length} ביקורות</div>
          </div>
        </div>
      </div>
      
      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review: any) => (
            <div key={review.id} className="border-b pb-4">
              <div className="flex items-start">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{review.customer_name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="mr-3 flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <div className="font-medium">{review.customer_name}</div>
                    <div className="text-sm text-gray-500">
                      {format(new Date(review.created_at), 'dd/MM/yyyy')}
                    </div>
                  </div>
                  <div className="flex mb-2">
                    {Array(5).fill(0).map((_, idx) => (
                      <Star 
                        key={idx} 
                        className={`h-4 w-4 ${
                          idx < review.rating 
                            ? "text-yellow-400 fill-yellow-400" 
                            : "text-gray-300"
                        }`} 
                      />
                    ))}
                  </div>
                  {review.comment && <p className="text-gray-700">{review.comment}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <Star className="h-10 w-10 mx-auto mb-2 text-gray-300" />
          <h3 className="text-lg font-medium mb-1">אין ביקורות עדיין</h3>
          <p className="text-gray-500">היה הראשון לכתוב ביקורת על שירות זה!</p>
        </div>
      )}
    </div>
  );
};

export default ServiceReviewsTab;
