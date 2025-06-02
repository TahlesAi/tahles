
import { useState, useEffect, useCallback } from 'react';
import { SoftHold } from '@/types/extendedSchema';

interface SoftHoldState {
  holds: SoftHold[];
  activeHolds: SoftHold[];
  isServiceHeld: (serviceId: string) => boolean;
  createHold: (serviceId: string, providerId: string, reason: SoftHold['reason']) => Promise<string>;
  releaseHold: (holdId: string) => Promise<void>;
  extendHold: (holdId: string, additionalMinutes: number) => Promise<void>;
  getHoldForService: (serviceId: string) => SoftHold | null;
}

const SOFT_HOLD_DURATION_MINUTES = 15;

export const useSoftHold = (): SoftHoldState => {
  const [holds, setHolds] = useState<SoftHold[]>([]);

  // טיפול בתפוגת holds אוטומטית
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setHolds(currentHolds => 
        currentHolds.filter(hold => {
          const isExpired = new Date(hold.expiresAt) <= now;
          if (isExpired && hold.isActive) {
            console.log(`Soft hold expired for service ${hold.serviceId}`);
          }
          return !isExpired;
        })
      );
    }, 30000); // בדיקה כל 30 שניות

    return () => clearInterval(interval);
  }, []);

  const activeHolds = holds.filter(hold => hold.isActive);

  const isServiceHeld = useCallback((serviceId: string): boolean => {
    return activeHolds.some(hold => 
      hold.serviceId === serviceId && 
      new Date(hold.expiresAt) > new Date()
    );
  }, [activeHolds]);

  const createHold = useCallback(async (
    serviceId: string, 
    providerId: string, 
    reason: SoftHold['reason']
  ): Promise<string> => {
    // בדיקה אם השירות כבר מוחזק
    if (isServiceHeld(serviceId)) {
      throw new Error('השירות כבר מוחזק על ידי משתמש אחר');
    }

    const holdId = `hold-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const now = new Date();
    const expiresAt = new Date(now.getTime() + SOFT_HOLD_DURATION_MINUTES * 60000);

    const newHold: SoftHold = {
      id: holdId,
      serviceId,
      providerId,
      holderId: 'current-user', // יוחלף במזהה משתמש אמיתי
      startTime: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      reason,
      isActive: true
    };

    setHolds(currentHolds => [...currentHolds, newHold]);
    
    // אוטומטית יחרור hold כאשר הוא פג תוקף
    setTimeout(() => {
      setHolds(currentHolds => 
        currentHolds.map(hold => 
          hold.id === holdId ? { ...hold, isActive: false } : hold
        )
      );
    }, SOFT_HOLD_DURATION_MINUTES * 60000);

    console.log(`Created soft hold for service ${serviceId}, expires at ${expiresAt.toLocaleString()}`);
    return holdId;
  }, [isServiceHeld]);

  const releaseHold = useCallback(async (holdId: string): Promise<void> => {
    setHolds(currentHolds => 
      currentHolds.map(hold => 
        hold.id === holdId ? { ...hold, isActive: false } : hold
      )
    );
    console.log(`Released soft hold ${holdId}`);
  }, []);

  const extendHold = useCallback(async (holdId: string, additionalMinutes: number): Promise<void> => {
    setHolds(currentHolds => 
      currentHolds.map(hold => {
        if (hold.id === holdId && hold.isActive) {
          const newExpiresAt = new Date(new Date(hold.expiresAt).getTime() + additionalMinutes * 60000);
          console.log(`Extended hold ${holdId} until ${newExpiresAt.toLocaleString()}`);
          return { ...hold, expiresAt: newExpiresAt.toISOString() };
        }
        return hold;
      })
    );
  }, []);

  const getHoldForService = useCallback((serviceId: string): SoftHold | null => {
    return activeHolds.find(hold => 
      hold.serviceId === serviceId && 
      new Date(hold.expiresAt) > new Date()
    ) || null;
  }, [activeHolds]);

  return {
    holds,
    activeHolds,
    isServiceHeld,
    createHold,
    releaseHold,
    extendHold,
    getHoldForService
  };
};
