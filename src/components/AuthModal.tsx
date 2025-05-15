
import { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "signin" | "signup";
  setMode: (mode: "signin" | "signup") => void;
  userType: "client" | "provider";
  setUserType: (type: "client" | "provider") => void;
}

const AuthModal = ({ 
  isOpen, 
  onClose, 
  mode, 
  setMode,
  userType,
  setUserType
}: AuthModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { signIn, signUp, user } = useAuth();

  // אפס את השדות והשגיאות בעת פתיחת המודל
  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setName("");
      setError(null);
    }
  }, [isOpen, mode]);

  // סגור את המודל אם המשתמש התחבר
  useEffect(() => {
    if (user && isOpen) {
      onClose();
    }
  }, [user, isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === "signin") {
        // התחברות
        const { error } = await signIn(email, password);
        
        if (error) {
          // טיפול משופר בשגיאות התחברות
          let errorMessage = "אירעה שגיאה בעת ההתחברות, אנא נסה שוב";
          
          if (error.message.includes("Invalid login credentials")) {
            errorMessage = "פרטי התחברות שגויים, אנא בדוק שוב את האימייל והסיסמה";
          } else if (error.message.includes("Email not confirmed")) {
            errorMessage = "האימייל שלך לא אומת. אנא בדוק את תיבת הדואר שלך";
          }
          
          setError(errorMessage);
          toast({
            title: "שגיאת התחברות",
            description: errorMessage,
            variant: "destructive",
          });
        } else {
          toast({
            title: "התחברת בהצלחה!",
            description: "ברוכים הבאים לת'כל'ס",
          });
          onClose();
        }
      } else {
        // הרשמה
        if (!name.trim()) {
          setError("נא להזין שם מלא");
          toast({
            title: "שגיאת הרשמה",
            description: "נא להזין שם מלא",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        if (password.length < 6) {
          setError("הסיסמה חייבת להכיל לפחות 6 תווים");
          toast({
            title: "שגיאת הרשמה",
            description: "הסיסמה חייבת להכיל לפחות 6 תווים",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        const { error } = await signUp(
          email, 
          password, 
          name, 
          userType === "provider"
        );
        
        if (error) {
          // טיפול משופר בשגיאות הרשמה
          let errorMessage = error.message || "אירעה שגיאה בעת ההרשמה, אנא נסה שוב";
          
          if (error.message.includes("User already registered")) {
            errorMessage = "משתמש עם אימייל זה כבר קיים במערכת";
          } else if (error.message.includes("Password should be at least")) {
            errorMessage = "הסיסמה חייבת להיות באורך של לפחות 6 תווים";
          } else if (error.message.includes("Email format")) {
            errorMessage = "פורמט האימייל אינו תקין";
          }
          
          setError(errorMessage);
          toast({
            title: "שגיאת הרשמה",
            description: errorMessage,
            variant: "destructive",
          });
        } else {
          // אין צורך בהודעת toast כאן כי היא מופיעה בפונקציית signUp
          onClose();
        }
      }
    } catch (error) {
      toast({
        title: "אירעה שגיאה",
        description: "אנא נסה שוב מאוחר יותר",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            {mode === "signin" ? "ברוכים השבים" : "הצטרפות לת'כל'ס"}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue={mode} value={mode} onValueChange={(value) => setMode(value as "signin" | "signup")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">התחברות</TabsTrigger>
            <TabsTrigger value="signup">הרשמה</TabsTrigger>
          </TabsList>
          
          {/* הודעת שגיאה כללית */}
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mt-4">
              {error}
            </div>
          )}
          
          <TabsContent value="signin" className="mt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signin-email">אימייל</Label>
                <Input 
                  id="signin-email"
                  type="email" 
                  placeholder="your@email.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="signin-password">סיסמה</Label>
                  <a href="#" className="text-sm text-brand-600 hover:underline">
                    שכחתי סיסמה
                  </a>
                </div>
                <Input 
                  id="signin-password"
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    מתחבר...
                  </>
                ) : "התחברות"}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="signup" className="mt-4">
            <div className="mb-4">
              <p className="text-center text-sm mb-3">אני רוצה להצטרף בתור:</p>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  type="button" 
                  variant={userType === "client" ? "default" : "outline"} 
                  onClick={() => setUserType("client")}
                >
                  לקוח
                </Button>
                <Button 
                  type="button" 
                  variant={userType === "provider" ? "default" : "outline"} 
                  onClick={() => setUserType("provider")}
                >
                  נותן שירות
                </Button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">שם מלא</Label>
                <Input 
                  id="signup-name"
                  type="text" 
                  placeholder="ישראל ישראלי" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-email">אימייל</Label>
                <Input 
                  id="signup-email"
                  type="email" 
                  placeholder="your@email.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-password">סיסמה</Label>
                <Input 
                  id="signup-password"
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
                <p className="text-xs text-gray-500">
                  הסיסמה חייבת להיות באורך של לפחות 6 תווים.
                </p>
              </div>
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    יוצר חשבון...
                  </>
                ) : "יצירת חשבון"}
              </Button>
              
              <p className="text-xs text-center text-gray-500">
                ביצירת חשבון אתה מסכים ל{" "}
                <a href="#" className="text-brand-600 hover:underline">תנאי השירות</a> ול{" "}
                <a href="#" className="text-brand-600 hover:underline">מדיניות הפרטיות</a> שלנו.
              </p>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
