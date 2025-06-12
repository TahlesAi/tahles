
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: ''
  });

  return (
    <Card data-testid="booking-form">
      <CardHeader>
        <CardTitle>טופס הזמנה</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="customerName">שם מלא</Label>
          <Input 
            id="customerName"
            value={formData.customerName}
            onChange={(e) => setFormData(prev => ({...prev, customerName: e.target.value}))}
          />
        </div>
        <div>
          <Label htmlFor="customerEmail">דוא"ל</Label>
          <Input 
            id="customerEmail"
            type="email"
            value={formData.customerEmail}
            onChange={(e) => setFormData(prev => ({...prev, customerEmail: e.target.value}))}
          />
        </div>
        <div>
          <Label htmlFor="customerPhone">טלפון</Label>
          <Input 
            id="customerPhone"
            type="tel"
            value={formData.customerPhone}
            onChange={(e) => setFormData(prev => ({...prev, customerPhone: e.target.value}))}
          />
        </div>
        <Button type="submit" className="w-full">
          שלח הזמנה
        </Button>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
