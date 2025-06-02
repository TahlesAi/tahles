
import React, { useState } from 'react';
import { FileDown, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import usePDFExport from '@/hooks/usePDFExport';
import useIsMobile from '@/hooks/use-mobile';

interface PDFExportButtonProps {
  productId: string;
  productName: string;
  description: string;
  price: number;
  priceUnit?: string;
  provider: string;
  availability?: string;
  imageUrl?: string;
  features?: string[];
  className?: string;
}

const PDFExportButton: React.FC<PDFExportButtonProps> = ({
  productId,
  productName,
  description,
  price,
  priceUnit,
  provider,
  availability,
  imageUrl,
  features,
  className
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const { exportToPDF } = usePDFExport();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // הצגה רק בדסקטופ בשלב ראשון
  if (isMobile) return null;

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      const success = exportToPDF({
        productId,
        productName,
        description,
        price,
        priceUnit,
        provider,
        availability,
        imageUrl,
        features
      });
      
      if (success) {
        toast({
          title: "הקובץ יוצא בהצלחה",
          description: "הקובץ PDF נשמר במחשב שלך",
        });
      } else {
        throw new Error('Export failed');
      }
    } catch (error) {
      toast({
        title: "שגיאה בייצוא",
        description: "אירעה שגיאה בייצוא הקובץ. נסה שוב.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      onClick={handleExport}
      disabled={isExporting}
      variant="outline"
      className={className}
    >
      {isExporting ? (
        <Download className="h-4 w-4 ml-1 animate-bounce" />
      ) : (
        <FileDown className="h-4 w-4 ml-1" />
      )}
      {isExporting ? 'מייצא...' : 'ייצוא PDF'}
    </Button>
  );
};

export default PDFExportButton;
