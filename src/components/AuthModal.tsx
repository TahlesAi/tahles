
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: string;
  setMode?: (mode: string) => void;
  userType?: string;
  setUserType?: (type: string) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>התחברות / הרשמה</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <p>מערכת ההתחברות בפיתוח...</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
