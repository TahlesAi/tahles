
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface UnifiedVariant {
  id: string;
  parameter: string;
  parameter_type: 'location' | 'group_size' | 'time' | 'add_ons' | 'custom';
  options: VariantOption[];
  is_active: boolean;
}

export interface VariantOption {
  id: string;
  name: string;
  price_modifier: number;
  price_type: 'fixed' | 'percentage';
  conditions?: Record<string, any>;
  description?: string;
}

export const useUnifiedDataManager = () => {
  const [variants, setVariants] = useState<UnifiedVariant[]>([]);
  const [loading, setLoading] = useState(false);

  // פונקציה לשמירת וריאנטים מאוחדת
  const saveVariants = async (serviceId: string, newVariants: UnifiedVariant[]) => {
    setLoading(true);
    try {
      // מחיקת וריאנטים קיימים
      await supabase
        .from('service_variants')
        .delete()
        .eq('service_id', serviceId);

      // הוספת וריאנטים חדשים
      const variantsToInsert = newVariants.map(variant => ({
        service_id: serviceId,
        parameter: variant.parameter,
        parameter_type: variant.parameter_type,
        options: variant.options,
        is_active: variant.is_active
      }));

      const { error } = await supabase
        .from('service_variants')
        .insert(variantsToInsert);

      if (error) throw error;

      setVariants(newVariants);
      return true;
    } catch (error) {
      console.error('Error saving variants:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // פונקציה לחישוב מחיר דינמי
  const calculateDynamicPrice = (
    basePrice: number, 
    variants: UnifiedVariant[], 
    selectedOptions: Record<string, string>
  ): number => {
    let finalPrice = basePrice;

    variants.forEach(variant => {
      if (!variant.is_active) return;

      const selectedOptionId = selectedOptions[variant.parameter];
      if (!selectedOptionId) return;

      const option = variant.options.find(opt => opt.id === selectedOptionId);
      if (!option) return;

      if (option.price_type === 'fixed') {
        finalPrice += option.price_modifier;
      } else if (option.price_type === 'percentage') {
        finalPrice += (basePrice * option.price_modifier) / 100;
      }
    });

    return Math.max(0, finalPrice);
  };

  // פונקציה לאחזור וריאנטים
  const fetchVariants = async (serviceId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('service_variants')
        .select('*')
        .eq('service_id', serviceId)
        .eq('is_active', true);

      if (error) throw error;
      
      setVariants(data || []);
      return data || [];
    } catch (error) {
      console.error('Error fetching variants:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    variants,
    loading,
    saveVariants,
    calculateDynamicPrice,
    fetchVariants
  };
};
