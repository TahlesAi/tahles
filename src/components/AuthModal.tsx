
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // This is where we would handle authentication
      // For now, let's simulate a successful authentication
      setTimeout(() => {
        toast({
          title: mode === "signin" ? "Signed in successfully!" : "Account created successfully!",
          description: "Welcome to EventConnect!",
        });
        setLoading(false);
        onClose();
      }, 1500);
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Please try again later.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === "signin" ? "signup" : "signin");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            {mode === "signin" ? "Welcome Back" : "Join EventConnect"}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue={mode} value={mode} onValueChange={(value) => setMode(value as "signin" | "signup")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin" className="mt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signin-email">Email</Label>
                <Input 
                  id="signin-email"
                  type="email" 
                  placeholder="youremail@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="signin-password">Password</Label>
                  <a href="#" className="text-sm text-brand-600 hover:underline">
                    Forgot password?
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
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="signup" className="mt-4">
            <div className="mb-4">
              <p className="text-center text-sm mb-3">I want to join as:</p>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  type="button" 
                  variant={userType === "client" ? "default" : "outline"} 
                  onClick={() => setUserType("client")}
                >
                  Client
                </Button>
                <Button 
                  type="button" 
                  variant={userType === "provider" ? "default" : "outline"} 
                  onClick={() => setUserType("provider")}
                >
                  Provider
                </Button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">Full Name</Label>
                <Input 
                  id="signup-name"
                  type="text" 
                  placeholder="John Doe" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input 
                  id="signup-email"
                  type="email" 
                  placeholder="youremail@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input 
                  id="signup-password"
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <p className="text-xs text-gray-500">
                  Password must be at least 8 characters long.
                </p>
              </div>
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
              
              <p className="text-xs text-center text-gray-500">
                By creating an account, you agree to our{" "}
                <a href="#" className="text-brand-600 hover:underline">Terms of Service</a> and{" "}
                <a href="#" className="text-brand-600 hover:underline">Privacy Policy</a>.
              </p>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
