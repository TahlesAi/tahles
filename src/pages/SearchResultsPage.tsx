
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Users, Clock, Phone, Mail } from 'lucide-react';

interface SearchResult {
  id: string;
  name: string;
  providerName: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
  subcategory: string;
  location: string;
  duration: string;
  maxParticipants: number;
  phone: string;
  email: string;
  features: string[];
}

// Demo data for search results
const demoResults: SearchResult[] = [
  {
    id: '1',
    name: 'מופע מנטליזם מרכזי',
    providerName: 'נטע ברסלר - אמן המחשבות',
    description: 'מופע מרתק של קריאת מחשבות ומנטליזם לכל סוגי האירועים. כולל אינטראקציה עם הקהל.',
    price: 2500,
    rating: 4.9,
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    category: 'מופעים ובמה',
    subcategory: 'אמני חושים',
    location: 'תל אביב והמרכז',
    duration: '45 דקות',
    maxParticipants: 500,
    phone: '050-1234567',
    email: 'neta@example.com',
    features: ['מיקרופון', 'במה מוגבהת', 'אינטראקטיבי']
  },
  {
    id: '2',
    name: 'הופעת סטנדאפ מקצועית',
    providerName: 'יוסי כהן - קומיקאי',
    description: 'הופעת סטנדאפ מותאמת לאירועי חברה עם חומר נקי ומקצועי.',
    price: 3200,
    rating: 4.7,
    reviewCount: 67,
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400',
    category: 'מופעים ובמה',
    subcategory: 'סטנדאפיסטים',
    location: 'כל הארץ',
    duration: '60 דקות',
    maxParticipants: 300,
    phone: '054-9876543',
    email: 'yossi@example.com',
    features: ['מיקרופון', 'תאורה', 'חומר מותאם']
  },
  {
    id: '3',
    name: 'מופע קסמים אינטראקטיבי',
    providerName: 'דני הקוסם',
    description: 'מופע קסמים מרהיב עם השתתפות הקהל ופעלולים מדהימים.',
    price: 2800,
    rating: 4.8,
    reviewCount: 124,
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400',
    category: 'מופעים ובמה',
    subcategory: 'קוסמים',
    location: 'מרכז וירושלים',
    duration: '50 דקות',
    maxParticipants: 200,
    phone: '052-1357924',
    email: 'danny@example.com',
    features: ['ציוד מקצועי', 'השתתפות קהל', 'מתאים לכל הגילאים']
  },
  {
    id: '4',
    name: 'הרצאת העשרה מוטיבציונית',
    providerName: 'ד"ר שרה לוי',
    description: 'הרצאה מעוררת השראה על מנהיגות וצמיחה אישית בעולם העסקים.',
    price: 4500,
    rating: 4.6,
    reviewCount: 45,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    category: 'הרצאות והכשרות',
    subcategory: 'העשרה',
    location: 'כל הארץ',
    duration: '90 דקות',
    maxParticipants: 500,
    phone: '03-9876543',
    email: 'sara@example.com',
    features: ['מצגת מקצועית', 'חומרי לימוד', 'Q&A']
  },
  {
    id: '5',
    name: 'קייטרינג איטלקי מקצועי',
    providerName: 'מאמא מיה קייטרינג',
    description: 'תפריט איטלקי מגוון עם פסטות טריות, פיצות ארטיזנליות וקינוחים מהממים.',
    price: 120,
    rating: 4.5,
    reviewCount: 203,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400',
    category: 'מזון ומשקאות',
    subcategory: 'קייטרינג',
    location: 'מרכז הארץ',
    duration: 'זמין כל היום',
    maxParticipants: 300,
    phone: '09-8765432',
    email: 'info@mamamia.co.il',
    features: ['כשר למהדרין', 'אפשרויות טבעוניות', 'הגשה מקצועית']
  }
];

export const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with search criteria
    const concept = searchParams.get('concept');
    const category = searchParams.get('category');
    const participants = searchParams.get('participants');
    const budget = searchParams.get('budget');
    
    setTimeout(() => {
      // Filter results based on search criteria
      let filteredResults = demoResults;
      
      if (category) {
        const categoryMap: Record<string, string> = {
          'performances-stage': 'מופעים ובמה',
          'lectures-training': 'הרצאות והכשרות',
          'food-drinks': 'מזון ומשקאות'
        };
        const categoryName = categoryMap[category];
        if (categoryName) {
          filteredResults = filteredResults.filter(r => r.category === categoryName);
        }
      }
      
      if (budget) {
        const [min, max] = budget.split('-').map(Number);
        if (max) {
          filteredResults = filteredResults.filter(r => r.price >= min && r.price <= max);
        } else {
          filteredResults = filteredResults.filter(r => r.price >= min);
        }
      }
      
      setResults(filteredResults.slice(0, 5));
      setLoading(false);
    }, 1000);
  }, [searchParams]);

  const getCriteriaDisplay = () => {
    const criteria = [];
    const date = searchParams.get('date');
    const location = searchParams.get('location');
    const concept = searchParams.get('concept');
    const participants = searchParams.get('participants');
    const budget = searchParams.get('budget');
    
    if (date) criteria.push(`תאריך: ${new Date(date).toLocaleDateString('he-IL')}`);
    if (location) criteria.push(`מיקום: ${location}`);
    if (concept) criteria.push(`קונספט: ${concept}`);
    if (participants) criteria.push(`משתתפים: ${participants}`);
    if (budget) criteria.push(`תקציב: ₪${budget}`);
    
    return criteria;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">מחפש את הפתרונות הטובים ביותר עבורכם...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Search criteria summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl text-center">הפתרונות המומלצים שלנו</CardTitle>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {getCriteriaDisplay().map((criterion, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {criterion}
                </Badge>
              ))}
            </div>
          </CardHeader>
        </Card>

        {/* Results */}
        <div className="space-y-6">
          {results.map((result, index) => (
            <Card key={result.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-80 h-64 md:h-auto">
                  <img
                    src={result.image}
                    alt={result.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium mr-3">
                          #{index + 1}
                        </span>
                        <h3 className="text-xl font-bold">{result.name}</h3>
                      </div>
                      <p className="text-gray-600 font-medium">{result.providerName}</p>
                    </div>
                    
                    <div className="text-left">
                      <div className="text-2xl font-bold text-green-600">₪{result.price.toLocaleString()}</div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="mr-1 font-medium">{result.rating}</span>
                        <span className="text-gray-500 text-sm">({result.reviewCount})</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{result.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                      <span>{result.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-gray-400 mr-2" />
                      <span>{result.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 text-gray-400 mr-2" />
                      <span>עד {result.maxParticipants}</span>
                    </div>
                    <div className="flex items-center">
                      <Badge variant="outline">{result.subcategory}</Badge>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {result.features.map((feature, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                      הזמן עכשיו
                    </Button>
                    <Button variant="outline" className="flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      {result.phone}
                    </Button>
                    <Button variant="outline" className="flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      פרטים נוספים
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {results.length === 0 && (
          <Card className="text-center p-8">
            <h3 className="text-xl font-semibold mb-4">לא נמצאו תוצאות מתאימות</h3>
            <p className="text-gray-600 mb-4">נסו לשנות את הקריטריונים או צרו קשר לייעוץ אישי</p>
            <Button>צור קשר לייעוץ</Button>
          </Card>
        )}
      </div>
    </div>
  );
};
