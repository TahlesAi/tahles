
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Minus, Plus, Info } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface OnboardingStep3Props {
  data: any;
  onUpdate: (data: any) => void;
  onSubmit: () => void;
  onBack: () => void;
}

const OnboardingStep3 = ({ data, onUpdate, onSubmit, onBack }: OnboardingStep3Props) => {
  const [productData, setProductData] = useState({
    title: data.title || "",
    duration: data.duration || 60,
    audience: data.audience || 350,
    ageRange: data.ageRange || "20-40",
    price: data.price || 120,
    termsAccepted: false
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };
  
  const handleNumberChange = (name: string, value: number) => {
    setProductData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (checked: boolean) => {
    setProductData(prev => ({ ...prev, termsAccepted: checked }));
    if (!checked && errors.termsAccepted) {
      setErrors(prev => ({ ...prev, termsAccepted: "" }));
    }
  };
  
  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!productData.title.trim()) {
      newErrors.title = "נא להזין שם למוצר";
    }
    
    if (!productData.termsAccepted) {
      newErrors.termsAccepted = "יש לאשר את התנאים כדי להמשיך";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = () => {
    if (validate()) {
      onUpdate(productData);
      onSubmit();
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold mb-2">פתיחת עמוד מוצר</h2>
        <p className="text-gray-600">כמה פרטים בסיסים על המוצר בשביל מאגר יותר טוב להוסיף עוד פרטים</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <Label htmlFor="mainImage" className="mb-2 block">תמונת נושא</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center mb-2">
                  <div className="flex flex-col items-center">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 mb-1">העלו תמונה ראשית</p>
                    <Button variant="outline" size="sm">
                      בחרו קובץ
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-gray-500">קובץ סטטי שהמוקלט נכנעה למערכת</p>
              </div>
              
              <div className="mb-8">
                <div className="flex items-start gap-2 mb-1">
                  <Label htmlFor="title">שם המוצר / שירות</Label>
                  <Info className="h-4 w-4 text-gray-400" />
                </div>
                <Input 
                  id="title"
                  name="title"
                  value={productData.title}
                  onChange={handleChange}
                  placeholder="שם המוצר"
                  className={errors.title ? "border-destructive" : ""}
                />
                {errors.title && (
                  <p className="text-destructive text-sm mt-1">{errors.title}</p>
                )}
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label>זמן מופע</Label>
                  <div className="flex items-center">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleNumberChange('duration', Math.max(15, productData.duration - 15))}
                      className="h-8 w-8 rounded-full"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-16 text-center">{productData.duration}</span>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleNumberChange('duration', productData.duration + 15)}
                      className="h-8 w-8 rounded-full"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <span className="mr-2">דקות</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>כמות קהל להופעות</Label>
                  <div className="flex items-center">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleNumberChange('audience', Math.max(50, productData.audience - 50))}
                      className="h-8 w-8 rounded-full"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-16 text-center">{productData.audience}</span>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleNumberChange('audience', productData.audience + 50)}
                      className="h-8 w-8 rounded-full"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>גילאי קהל</Label>
                  <div className="flex items-center">
                    <Input 
                      value={productData.ageRange}
                      onChange={(e) => setProductData(prev => ({ ...prev, ageRange: e.target.value }))}
                      className="w-24 text-center"
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>מחיר כרטיסים</Label>
                  <div className="flex items-center">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleNumberChange('price', Math.max(50, productData.price - 10))}
                      className="h-8 w-8 rounded-full"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-16 text-center">{productData.price}</span>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleNumberChange('price', productData.price + 10)}
                      className="h-8 w-8 rounded-full"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-1">
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">תצוגת דוגמה</h3>
                <span className="text-xs text-gray-500">איך הלקוחות יראו את המוצר שלך</span>
              </div>
              
              <div className="bg-gray-100 rounded-lg p-4 aspect-video flex items-center justify-center">
                <p className="text-gray-500 text-sm text-center">תצוגה מקדימה של המוצר תופיע כאן</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="font-semibold">למה כדאי לפרסם את השירות שלכם בת'כל'ס?</h3>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">1</div>
                  <div>
                    <p className="font-medium">חשיפה לקהל רחב</p>
                    <p className="text-sm text-gray-600">מאות לקוחות מחפשים שירותים כמו שלכם מדי יום</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">2</div>
                  <div>
                    <p className="font-medium">ניהול הזמנות קל</p>
                    <p className="text-sm text-gray-600">מערכת ניהול פשוטה לכל ההזמנות והלקוחות שלכם</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">3</div>
                  <div>
                    <p className="font-medium">תשלומים מאובטחים</p>
                    <p className="text-sm text-gray-600">קבלו תשלומים בצורה בטוחה ונוחה</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mt-8 border-t pt-6">
        <div className="flex items-start space-x-3 space-x-reverse mb-6">
          <Checkbox 
            id="terms" 
            checked={productData.termsAccepted}
            onCheckedChange={handleCheckboxChange}
          />
          <div>
            <Label htmlFor="terms" className="mr-2 font-medium">
              אני מסכים/ה לתנאי השימוש של ת'כל'ס
            </Label>
            <p className="text-sm text-gray-500 mr-2 mt-1">
              בלחיצה על כפתור "פרסום" אתם מאשרים שקראתם והסכמתם לתנאי השימוש והפרטיות של האתר
            </p>
            {errors.termsAccepted && (
              <p className="text-destructive text-sm mt-1">{errors.termsAccepted}</p>
            )}
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack}>
            חזרה
          </Button>
          <Button onClick={handleSubmit}>
            פרסום ויצירת עמוד מוצר
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingStep3;
