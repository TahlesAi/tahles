
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { he } from "date-fns/locale";
import { CalendarIcon, Utensils, SlidersHorizontal } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";

// אזורים בישראל
const israelRegions = [
  { id: "golan", name: "רמת הגולן" },
  { id: "galil", name: "גליל עליון" },
  { id: "tiberias", name: "טבריה והסביבה" },
  { id: "haifa", name: "חיפה והסביבה" },
  { id: "north-sharon", name: "צפון השרון" },
  { id: "tel-aviv", name: "תל אביב וגוש דן" },
  { id: "jerusalem", name: "ירושלים" },
  { id: "shfela", name: "השפלה" },
  { id: "south", name: "דרום" },
  { id: "eilat", name: "אילת" }
];

// סוגי תפריטים
const menuTypes = [
  { id: "meat", name: "בשרי", description: "תפריטים עם מנות בשר" },
  { id: "dairy", name: "חלבי", description: "תפריטים עם מוצרי חלב ללא בשר" },
  { id: "fish", name: "דגים", description: "תפריטים מבוססי דגים" },
  { id: "mixed", name: "מעורב", description: "תפריטים משולבים" },
  { id: "vegan", name: "טבעוני", description: "תפריטים ללא מוצרים מן החי" }
];

// טווחי תקציב לאורח
const budgetRanges = [
  { id: "economy", name: "עד ₪80 לאורח", value: [0, 80] },
  { id: "standard", name: "₪80-150 לאורח", value: [80, 150] },
  { id: "premium", name: "₪150-250 לאורח", value: [150, 250] },
  { id: "luxury", name: "₪250+ לאורח", value: [250, 500] }
];

// מספר אורחים - קבוצות
const guestCountRanges = [
  { id: "small", name: "עד 30 איש", min: 0, max: 30 },
  { id: "medium", name: "30-100 איש", min: 30, max: 100 },
  { id: "large", name: "100-250 איש", min: 100, max: 250 },
  { id: "xl", name: "250+ איש", min: 250, max: 1000 }
];

// סכמת הטופס
const formSchema = z.object({
  kosher: z.string(),
  menuType: z.string(),
  regions: z.array(z.string()).min(1, { message: "יש לבחור לפחות אזור אחד" }),
  guestCount: z.number().min(1),
  date: z.date().optional(),
  budgetPerGuest: z.array(z.number()).length(2),
  contactInfo: z.object({
    name: z.string().min(2, { message: "יש להזין שם מלא" }),
    email: z.string().email({ message: "יש להזין כתובת אימייל תקינה" }),
    phone: z.string().min(9, { message: "יש להזין מספר טלפון תקין" }),
    allowMarketing: z.boolean().default(true)
  }).optional()
});

type FormValues = z.infer<typeof formSchema>;

type Step = {
  id: string;
  title: string;
  description: string;
};

const steps: Step[] = [
  { id: "kosher", title: "כשרות", description: "האם אתם זקוקים לקייטרינג כשר?" },
  { id: "menuType", title: "סוג תפריט", description: "איזה סוג תפריט אתם מחפשים?" },
  { id: "regions", title: "אזור", description: "באיזה אזור יתקיים האירוע?" },
  { id: "details", title: "פרטי האירוע", description: "מספר אורחים, תאריך ותקציב" }
];

interface CateringFilterFlowProps {
  onResultsFound: (results: any[], formData: FormValues) => void; 
  onNoResults: (formData: FormValues) => void;
}

export default function CateringFilterFlow({ onResultsFound, onNoResults }: CateringFilterFlowProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  
  const currentStep = steps[currentStepIndex];
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      kosher: "",
      menuType: "",
      regions: [],
      guestCount: 50,
      budgetPerGuest: [80, 250],
      contactInfo: {
        allowMarketing: true
      }
    }
  });
  
  const kosherValue = form.watch("kosher");
  const menuTypeValue = form.watch("menuType");
  const regionsValue = form.watch("regions");
  
  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      submitForm();
    }
  };
  
  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };
  
  const canProceed = () => {
    switch (currentStep.id) {
      case "kosher":
        return !!kosherValue;
      case "menuType":
        return !!menuTypeValue;
      case "regions":
        return regionsValue.length > 0;
      default:
        return true;
    }
  };
  
  const submitForm = async () => {
    const values = form.getValues();
    setIsProcessing(true);
    
    try {
      // בהמשך - פנייה לשרת לחיפוש קייטרינג מתאים לפי הפילטרים
      // בינתיים, נדמה חיפוש באמצעות שליטה בתוצאות
      
      // שמירת הפנייה במערכת
      if (values.contactInfo?.email) {
        const { data, error } = await supabase
          .from("catering_leads")
          .insert({
            name: values.contactInfo.name,
            email: values.contactInfo.email,
            phone: values.contactInfo.phone,
            kosher: values.kosher,
            menu_type: values.menuType,
            regions: values.regions,
            guest_count: values.guestCount,
            event_date: values.date,
            budget_range: values.budgetPerGuest,
            allow_marketing: values.contactInfo.allowMarketing
          })
          .select();
          
        if (error) {
          console.error("Error saving lead:", error);
          toast.error("אירעה שגיאה בשמירת הפנייה");
        } else {
          // ליד נשמר בהצלחה
          toast.success("הפנייה נשמרה בהצלחה!");
        }
      }
      
      // בהדמיה, נניח שבינתיים אין לנו תוצאות מתאימות
      // בחיפוש קייטרינג כשר וחלבי
      if (values.kosher === "yes" && values.menuType === "dairy") {
        // לעבור למסך לקיחת פרטים
        onNoResults(values);
      } else {
        // במקרה אחר, נדמה שיש לנו תוצאות
        const mockResults = [
          {
            id: "1",
            name: "קייטרינג השף הטוב",
            description: "קייטרינג בוטיק עם מנות גורמה",
            price: "₪200 לאורח",
            kosher: values.kosher === "yes" ? "כשרות מהדרין" : "ללא כשרות",
            menuType: values.menuType,
            rating: 4.8,
            imageUrl: "https://images.unsplash.com/photo-1555244162-803834f70033"
          },
          {
            id: "2",
            name: "טעמים שף פרטי",
            description: "חוויה קולינרית מותאמת אישית",
            price: "₪180 לאורח",
            kosher: values.kosher === "yes" ? "כשרות רגילה" : "ללא כשרות",
            menuType: values.menuType,
            rating: 4.6,
            imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0"
          },
          {
            id: "3",
            name: "הטעם המושלם",
            description: "קייטרינג לאירועים באווירה משפחתית",
            price: "₪150 לאורח",
            kosher: values.kosher === "yes" ? "כשרות מהדרין" : "ללא כשרות",
            menuType: values.menuType,
            rating: 4.5,
            imageUrl: "https://images.unsplash.com/photo-1572455043027-30c328681f52"
          }
        ];
        
        onResultsFound(mockResults, values);
      }
    } catch (error) {
      console.error("Error processing form:", error);
      toast.error("אירעה שגיאה בעיבוד הטופס");
    } finally {
      setIsProcessing(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep.id) {
      case "kosher":
        return (
          <FormField
            control={form.control}
            name="kosher"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="yes" id="kosher-yes" />
                      <FormLabel htmlFor="kosher-yes" className="font-medium cursor-pointer">כן, נדרשת כשרות</FormLabel>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="no" id="kosher-no" />
                      <FormLabel htmlFor="kosher-no" className="font-medium cursor-pointer">לא, אין צורך בכשרות</FormLabel>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
        
      case "menuType":
        return (
          <FormField
            control={form.control}
            name="menuType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col gap-4"
                  >
                    {menuTypes.map(menuType => (
                      <div key={menuType.id} className="flex items-center space-x-2 space-x-reverse">
                        <RadioGroupItem value={menuType.id} id={`menu-${menuType.id}`} />
                        <FormLabel htmlFor={`menu-${menuType.id}`} className="font-medium cursor-pointer">
                          <div>
                            <div>{menuType.name}</div>
                            <div className="text-sm text-gray-500">{menuType.description}</div>
                          </div>
                        </FormLabel>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
        
      case "regions":
        return (
          <FormField
            control={form.control}
            name="regions"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">בחירת אזורים</FormLabel>
                  <FormDescription>
                    בחרו את האזורים בהם אתם מעוניינים לקבל שירות
                  </FormDescription>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {israelRegions.map(region => (
                    <FormField
                      key={region.id}
                      control={form.control}
                      name="regions"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={region.id}
                            className="flex flex-row items-start space-x-3 space-x-reverse"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(region.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, region.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== region.id
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              {region.name}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        );
        
      case "details":
        return (
          <div className="space-y-6">
            {/* מספר האורחים */}
            <FormField
              control={form.control}
              name="guestCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>מספר אורחים משוער: {field.value}</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        {guestCountRanges.map(range => (
                          <Button 
                            key={range.id}
                            type="button"
                            variant={field.value >= range.min && field.value <= range.max ? "default" : "outline"}
                            onClick={() => field.onChange(Math.floor((range.min + range.max) / 2))}
                            className="h-auto py-2 text-sm"
                          >
                            {range.name}
                          </Button>
                        ))}
                      </div>
                      <Slider
                        min={10}
                        max={500}
                        step={5}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            
            {/* תאריך האירוע */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>תאריך האירוע</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={`w-full pl-3 text-right font-normal ${!field.value && "text-muted-foreground"}`}
                        >
                          {field.value ? (
                            format(field.value, "PPP", { locale: he })
                          ) : (
                            <span>בחרו תאריך</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          return date < today;
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    בחרו את תאריך האירוע שלכם (אופציונלי)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* טווח תקציב */}
            <FormField
              control={form.control}
              name="budgetPerGuest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>תקציב לאורח</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        {budgetRanges.map(range => (
                          <Button 
                            key={range.id}
                            type="button"
                            variant={
                              field.value[0] === range.value[0] && 
                              field.value[1] === range.value[1] ? "default" : "outline"
                            }
                            onClick={() => field.onChange(range.value)}
                            className="h-auto py-2 text-sm"
                          >
                            {range.name}
                          </Button>
                        ))}
                      </div>
                      <div>
                        <Slider
                          min={0}
                          max={500}
                          step={10}
                          value={field.value}
                          onValueChange={field.onChange}
                        />
                        <div className="flex justify-between mt-2">
                          <span>₪{field.value[0]}</span>
                          <span>₪{field.value[1]}</span>
                        </div>
                      </div>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div className="w-full">
            <div className="flex justify-between">
              {steps.map((step, i) => (
                <div 
                  key={step.id} 
                  className={`flex flex-col items-center w-1/4 ${i > 0 ? 'mr-[12.5%]' : ''}`}
                >
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
                      ${i < currentStepIndex ? 'bg-brand-600 border-brand-600 text-white' : 
                        i === currentStepIndex ? 'border-brand-600 text-brand-600' : 
                        'border-gray-300 text-gray-300'}`}
                  >
                    {i < currentStepIndex ? '✓' : i + 1}
                  </div>
                  <div className={`text-xs mt-1 text-center ${
                    i === currentStepIndex ? 'text-brand-600 font-medium' : 
                    i < currentStepIndex ? 'text-brand-600' : 'text-gray-400'}`}
                  >
                    {step.title}
                  </div>
                </div>
              ))}
            </div>
            <div className="relative mt-2">
              <div className="absolute top-0 h-1 bg-gray-200 w-full"></div>
              <div 
                className="absolute top-0 h-1 bg-brand-600 transition-all" 
                style={{width: `${(currentStepIndex / (steps.length - 1)) * 100}%`}}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Utensils className="w-5 h-5 ml-2" />
            {currentStep.title}
          </CardTitle>
          <CardDescription>{currentStep.description}</CardDescription>
        </CardHeader>
        
        <CardContent>
          <Form {...form}>
            <form className="space-y-6">
              {renderStepContent()}
            </form>
          </Form>
        </CardContent>
        
        <CardFooter className="flex justify-between border-t pt-6">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStepIndex === 0 || isProcessing}
          >
            חזרה
          </Button>
          
          <Button
            onClick={nextStep}
            disabled={!canProceed() || isProcessing}
          >
            {isProcessing && (
              <SlidersHorizontal className="ml-2 h-4 w-4 animate-spin" />
            )}
            {currentStepIndex < steps.length - 1 ? "המשך" : "חיפוש קייטרינג מתאים"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
