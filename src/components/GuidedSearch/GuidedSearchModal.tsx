
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface GuidedSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GuidedSearchModal: React.FC<GuidedSearchModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>חיפוש מונחה לאירוע מושלם</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <p>מערכת החיפוש המונחה בפיתוח...</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GuidedSearchModal;
