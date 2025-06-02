
import React, { useState, useEffect } from 'react';
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Trophy, Gift } from "lucide-react";
import { useDetailedReviews } from '@/hooks/useDetailedReviews';
import { format } from 'date-fns';
import { he } from 'date-fns/locale';

interface ReviewsTabContentProps {
  providerId?: string;
}

const ReviewsTabContent: React.FC<ReviewsTabContentProps> = ({ providerId }) => {
  const { getProviderReviews } = useDetailedReviews();
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (providerId) {
      setLoading(true);
      getProviderReviews(providerId).then(data => {
        setReviews(data);
        setLoading(false);
      });
    }
  }, [providerId, getProviderReviews]);

  const calculateAverageRating = (reviews: any[]) => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + (review.overall_rating || 0), 0);
    return sum / reviews.length;
  };

  const averageRating = calculateAverageRating(reviews);

  return (
    <TabsContent value="reviews" className="p-6 text-right" dir="rtl">
      {/* כרטיס הגרלה */}
      <Card className="mb-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-full">
                <Gift className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-purple-800">הגרלה מיוחדת!</h3>
                <p className="text-sm text-purple-600">הביקורת ה-500 זוכה ב-₪100</p>
              </div>
            </div>
            <Trophy className="h-8 w-8 text-yellow-500" />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="flex items-center ml-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star} 
                className={`h-5 w-5 ${
                  star <= averageRating 
                    ? 'text-yellow-400 fill-yellow-400' 
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="font-medium">{averageRating.toFixed(1)}</span>
          <span className="text-gray-500 mr-1">({reviews.length})</span>
        </div>
        <h2 className="text-2xl font-bold">חוות דעת מפורטות</h2>
      </div>
      
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-gray-600">טוען ביקורות...</p>
        </div>
      )}

      {!loading && reviews.length === 0 && (
        <div className="text-center py-8">
          <Star className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium mb-2">אין ביקורות עדיין</h3>
          <p className="text-gray-500">היו הראשונים לכתוב ביקורת!</p>
        </div>
      )}
      
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-6">
            <div className="flex justify-between mb-2">
              <div className="text-gray-500 text-sm">
                {format(new Date(review.created_at), 'dd בMMMM, yyyy', { locale: he })}
              </div>
              <div className="font-semibold">{review.customer_name}</div>
            </div>
            
            {/* דירוגים מפורטים */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
              <div className="text-center">
                <div className="text-xs text-gray-600">שירות</div>
                <div className="flex justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`h-3 w-3 ${
                        star <= review.service_rating 
                          ? 'text-blue-400 fill-blue-400' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-xs text-gray-600">איכות</div>
                <div className="flex justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`h-3 w-3 ${
                        star <= review.quality_rating 
                          ? 'text-green-400 fill-green-400' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-xs text-gray-600">מחיר</div>
                <div className="flex justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`h-3 w-3 ${
                        star <= review.price_rating 
                          ? 'text-orange-400 fill-orange-400' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-xs text-gray-600">זמנים</div>
                <div className="flex justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`h-3 w-3 ${
                        star <= review.timing_rating 
                          ? 'text-purple-400 fill-purple-400' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex mb-2 justify-end">
              <div className="text-lg font-bold text-yellow-600">
                {review.overall_rating.toFixed(1)} ⭐
              </div>
            </div>
            
            {review.comment && (
              <p className="text-gray-700">{review.comment}</p>
            )}
            
            {review.is_verified && (
              <div className="mt-2">
                <span className="inline-flex items-center px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                  ✓ ביקורת מאומתת
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {reviews.length > 0 && (
        <div className="text-center mt-6">
          <Button variant="outline">
            טען עוד ביקורות
          </Button>
        </div>
      )}
    </TabsContent>
  );
};

export default ReviewsTabContent;
