
import { useCallback } from 'react';
import jsPDF from 'jspdf';
import useUserJourneyLogger from './useUserJourneyLogger';

interface PDFExportData {
  productId: string;
  productName: string;
  description: string;
  price: number;
  priceUnit?: string;
  provider: string;
  availability?: string;
  imageUrl?: string;
  features?: string[];
}

const usePDFExport = () => {
  const { logEvent } = useUserJourneyLogger();

  const exportToPDF = useCallback((data: PDFExportData) => {
    try {
      const doc = new jsPDF();
      
      // הגדרת כיוון טקסט RTL (מוגבל ב-jsPDF)
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      
      // כותרת ראשית
      doc.setFontSize(20);
      doc.text('Eventify - הצעת מחיר', pageWidth - 20, 30, { align: 'right' });
      
      // קו הפרדה
      doc.setLineWidth(0.5);
      doc.line(20, 40, pageWidth - 20, 40);
      
      let yPosition = 60;
      
      // שם המוצר
      doc.setFontSize(16);
      doc.text(`Product: ${data.productName}`, pageWidth - 20, yPosition, { align: 'right' });
      yPosition += 20;
      
      // ספק
      doc.setFontSize(12);
      doc.text(`Provider: ${data.provider}`, pageWidth - 20, yPosition, { align: 'right' });
      yPosition += 15;
      
      // מחיר
      doc.setFontSize(14);
      const priceText = `Price: ₪${data.price.toLocaleString()}${data.priceUnit ? ` ${data.priceUnit}` : ''}`;
      doc.text(priceText, pageWidth - 20, yPosition, { align: 'right' });
      yPosition += 20;
      
      // תיאור
      if (data.description) {
        doc.setFontSize(10);
        doc.text('Description:', pageWidth - 20, yPosition, { align: 'right' });
        yPosition += 10;
        
        // פיצול תיאור לשורות
        const splitDescription = doc.splitTextToSize(data.description, pageWidth - 40);
        splitDescription.forEach((line: string) => {
          if (yPosition > pageHeight - 30) {
            doc.addPage();
            yPosition = 30;
          }
          doc.text(line, pageWidth - 20, yPosition, { align: 'right' });
          yPosition += 5;
        });
        yPosition += 10;
      }
      
      // זמינות
      if (data.availability) {
        doc.setFontSize(10);
        doc.text(`Availability: ${data.availability}`, pageWidth - 20, yPosition, { align: 'right' });
        yPosition += 15;
      }
      
      // תכונות
      if (data.features && data.features.length > 0) {
        doc.text('Features:', pageWidth - 20, yPosition, { align: 'right' });
        yPosition += 10;
        
        data.features.forEach((feature) => {
          if (yPosition > pageHeight - 30) {
            doc.addPage();
            yPosition = 30;
          }
          doc.text(`• ${feature}`, pageWidth - 20, yPosition, { align: 'right' });
          yPosition += 7;
        });
      }
      
      // תאריך יצירה
      yPosition = pageHeight - 30;
      doc.setFontSize(8);
      const currentDate = new Date().toLocaleDateString('he-IL');
      doc.text(`Generated on: ${currentDate}`, pageWidth - 20, yPosition, { align: 'right' });
      
      // שמירת הקובץ
      const fileName = `eventify-offer-${data.productId}.pdf`;
      doc.save(fileName);
      
      // תיעוד האירוע
      logEvent('pdf_export', {
        productId: data.productId,
        productName: data.productName,
        fileName
      });
      
      return true;
    } catch (error) {
      console.error('Error exporting PDF:', error);
      logEvent('pdf_export_error', {
        productId: data.productId,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      return false;
    }
  }, [logEvent]);

  return { exportToPDF };
};

export default usePDFExport;
