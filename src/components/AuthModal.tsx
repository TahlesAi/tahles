
import { useState } from "react";
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
  const { toast } = useToast();
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "signin") {
        // התחברות
        const { error } = await signIn(email, password);
        
        if (error) {
          toast({
            title: "שגיאת התחברות",
            description: error.message || "אירעה שגיאה בעת ההתחברות, אנא נסה שוב",
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
          toast({
            title: "שגיאת הרשמה",
            description: "נא להזין שם מלא",
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
          toast({
            title: "שגיאת הרשמה",
            description: error.message || "אירעה שגיאה בעת ההרשמה, אנא נסה שוב",
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
                {loading ? "מתחבר..." : "התחברות"}
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
                />
                <p className="text-xs text-gray-500">
                  הסיסמה חייבת להיות באורך של לפחות 8 תווים.
                </p>
              </div>
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "יוצר חשבון..." : "יצירת חשבון"}
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
