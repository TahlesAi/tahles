
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  mode,
  setMode,
  userType,
  setUserType,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  const handleToggleMode = () => {
    if (mode === "signin") {
      setMode("signup");
    } else {
      setMode("signin");
    }
  };

  const handleUserTypeChange = (type: "client" | "provider") => {
    setUserType(type);
  };

  const handleSignup = async () => {
    setLoading(true);
    const { error } = await signUp(email, password, name, userType === "provider");
    setLoading(false);

    if (error) {
      toast({
        variant: "destructive",
        title: "שגיאת הרשמה",
        description: error.message || "אירעה שגיאה בתהליך ההרשמה",
      });
      return;
    }

    onClose();
  };

  const handleLogin = async () => {
    setLoading(true);
    const { error, redirectTo } = await signIn(email, password);
    setLoading(false);
    
    if (error) {
      toast({
        variant: "destructive",
        title: "שגיאת התחברות",
        description: error.message || "אירעה שגיאה בתהליך ההתחברות",
      });
      return;
    }
    
    onClose();
    
    // Use redirectTo if available
    if (redirectTo) {
      window.location.href = redirectTo;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{mode === "signin" ? "התחברות" : "הרשמה"}</DialogTitle>
          <DialogDescription>
            {mode === "signin"
              ? "התחבר לחשבון שלך כדי להמשיך"
              : "צור חשבון חדש כדי להתחיל"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          {mode === "signup" && (
            <div className="grid gap-2">
              <Label htmlFor="name">שם מלא</Label>
              <Input
                id="name"
                placeholder="הכנס את שמך המלא"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="email">כתובת אימייל</Label>
            <Input
              id="email"
              placeholder="example@mail.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">סיסמה</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {mode === "signup" && (
            <div className="flex items-center space-x-2">
              <Label>סוג משתמש:</Label>
              <Button
                variant={userType === "client" ? "default" : "outline"}
                onClick={() => handleUserTypeChange("client")}
                size="sm"
              >
                לקוח
              </Button>
              <Button
                variant={userType === "provider" ? "default" : "outline"}
                onClick={() => handleUserTypeChange("provider")}
                size="sm"
              >
                נותן שירות
              </Button>
            </div>
          )}
        </div>
        <div className="flex justify-between mt-4">
          <Button type="button" variant="link" onClick={handleToggleMode}>
            {mode === "signin"
              ? "אין לך חשבון? צור אחד"
              : "יש לך כבר חשבון? התחבר"}
          </Button>
          <Button type="submit" onClick={mode === "signin" ? handleLogin : handleSignup} disabled={loading}>
            {loading ? "טוען..." : mode === "signin" ? "התחבר" : "הרשם"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
