
// מערכת לניהול זמינות שירותים בזמן אמת
export interface ServiceAvailability {
  serviceId: string;
  providerId: string;
  isAvailable: boolean;
  hasCalendar: boolean;
  lockUntil?: string; // timestamp של הקפאה זמנית
  lockedBy?: string; // מזהה המשתמש שהקפיא
  maxConcurrentBookings: number;
  currentBookings: number;
}

export interface SoftHold {
  id: string;
  serviceId: string;
  providerId: string;
  holderId: string;
  expiresAt: string;
  createdAt: string;
  isActive: boolean;
}

export class AvailabilityManager {
  private availabilityMap: Map<string, ServiceAvailability> = new Map();
  private softHolds: Map<string, SoftHold> = new Map();
  private readonly HOLD_DURATION = 15 * 60 * 1000; // 15 דקות במילישניות

  constructor() {
    // ניקוי אוטומטי של holds שפגו
    setInterval(() => this.cleanupExpiredHolds(), 60000); // כל דקה
  }

  // בדיקת זמינות שירות
  isServiceAvailable(serviceId: string, providerId: string): boolean {
    const availability = this.availabilityMap.get(serviceId);
    
    if (!availability) {
      console.warn(`No availability data for service ${serviceId}`);
      return false;
    }

    // בדיקה שיש יומן
    if (!availability.hasCalendar) {
      console.log(`Service ${serviceId} has no calendar`);
      return false;
    }

    // בדיקת הקפאה זמנית
    if (availability.lockUntil && new Date(availability.lockUntil) > new Date()) {
      console.log(`Service ${serviceId} is temporarily locked`);
      return false;
    }

    // בדיקת מקסימום הזמנות מקבילות
    if (availability.currentBookings >= availability.maxConcurrentBookings) {
      console.log(`Service ${serviceId} reached max concurrent bookings`);
      return false;
    }

    return availability.isAvailable;
  }

  // יצירת hold רך על שירות
  createSoftHold(serviceId: string, providerId: string, holderId: string): string | null {
    if (!this.isServiceAvailable(serviceId, providerId)) {
      return null;
    }

    const holdId = `hold_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const expiresAt = new Date(Date.now() + this.HOLD_DURATION).toISOString();

    const softHold: SoftHold = {
      id: holdId,
      serviceId,
      providerId,
      holderId,
      expiresAt,
      createdAt: new Date().toISOString(),
      isActive: true
    };

    this.softHolds.set(holdId, softHold);

    // עדכון זמינות השירות
    const availability = this.availabilityMap.get(serviceId);
    if (availability) {
      availability.currentBookings += 1;
      this.availabilityMap.set(serviceId, availability);
    }

    console.log(`Created soft hold ${holdId} for service ${serviceId}`);
    return holdId;
  }

  // ביטול hold רך
  releaseSoftHold(holdId: string): boolean {
    const hold = this.softHolds.get(holdId);
    if (!hold || !hold.isActive) {
      return false;
    }

    // עדכון זמינות השירות
    const availability = this.availabilityMap.get(hold.serviceId);
    if (availability && availability.currentBookings > 0) {
      availability.currentBookings -= 1;
      this.availabilityMap.set(hold.serviceId, availability);
    }

    // מחיקת ה-hold
    hold.isActive = false;
    this.softHolds.set(holdId, hold);

    console.log(`Released soft hold ${holdId} for service ${hold.serviceId}`);
    return true;
  }

  // הקפאת כל שירותי הספק
  lockProviderServices(providerId: string, lockedBy: string, durationMinutes = 15): void {
    const lockUntil = new Date(Date.now() + durationMinutes * 60 * 1000).toISOString();

    for (const [serviceId, availability] of this.availabilityMap.entries()) {
      if (availability.providerId === providerId) {
        availability.lockUntil = lockUntil;
        availability.lockedBy = lockedBy;
        this.availabilityMap.set(serviceId, availability);
      }
    }

    console.log(`Locked all services for provider ${providerId} until ${lockUntil}`);
  }

  // שחרור הקפאת ספק
  unlockProviderServices(providerId: string): void {
    for (const [serviceId, availability] of this.availabilityMap.entries()) {
      if (availability.providerId === providerId && availability.lockUntil) {
        delete availability.lockUntil;
        delete availability.lockedBy;
        this.availabilityMap.set(serviceId, availability);
      }
    }

    console.log(`Unlocked all services for provider ${providerId}`);
  }

  // ניקוי holds שפגו
  private cleanupExpiredHolds(): void {
    const now = new Date();
    let cleanedCount = 0;

    for (const [holdId, hold] of this.softHolds.entries()) {
      if (hold.isActive && new Date(hold.expiresAt) <= now) {
        this.releaseSoftHold(holdId);
        cleanedCount++;
      }
    }

    if (cleanedCount > 0) {
      console.log(`Cleaned up ${cleanedCount} expired holds`);
    }

    // ניקוי locks שפגו
    for (const [serviceId, availability] of this.availabilityMap.entries()) {
      if (availability.lockUntil && new Date(availability.lockUntil) <= now) {
        delete availability.lockUntil;
        delete availability.lockedBy;
        this.availabilityMap.set(serviceId, availability);
      }
    }
  }

  // רישום שירות במערכת הזמינות
  registerService(serviceId: string, providerId: string, config: Partial<ServiceAvailability>): void {
    const defaultConfig: ServiceAvailability = {
      serviceId,
      providerId,
      isAvailable: true,
      hasCalendar: false,
      maxConcurrentBookings: 1,
      currentBookings: 0,
      ...config
    };

    this.availabilityMap.set(serviceId, defaultConfig);
    console.log(`Registered service ${serviceId} in availability manager`);
  }

  // יצירת יומן ברירת מחדל
  createDefaultCalendar(providerId: string): void {
    console.log(`Creating default calendar for provider ${providerId}`);
    
    // עדכון כל השירותים של הספק
    for (const [serviceId, availability] of this.availabilityMap.entries()) {
      if (availability.providerId === providerId) {
        availability.hasCalendar = true;
        this.availabilityMap.set(serviceId, availability);
      }
    }
  }

  // סטטיסטיקות זמינות
  getAvailabilityStats(): {
    totalServices: number;
    availableServices: number;
    servicesWithCalendar: number;
    activeHolds: number;
    lockedServices: number;
  } {
    const now = new Date();
    let availableServices = 0;
    let servicesWithCalendar = 0;
    let lockedServices = 0;

    for (const availability of this.availabilityMap.values()) {
      if (availability.isAvailable) availableServices++;
      if (availability.hasCalendar) servicesWithCalendar++;
      if (availability.lockUntil && new Date(availability.lockUntil) > now) {
        lockedServices++;
      }
    }

    const activeHolds = Array.from(this.softHolds.values())
      .filter(hold => hold.isActive && new Date(hold.expiresAt) > now).length;

    return {
      totalServices: this.availabilityMap.size,
      availableServices,
      servicesWithCalendar,
      activeHolds,
      lockedServices
    };
  }

  // פונקציה לסינון שירותים זמינים בלבד
  filterAvailableServices<T extends { id: string; providerId: string }>(services: T[]): T[] {
    return services.filter(service => 
      this.isServiceAvailable(service.id, service.providerId)
    );
  }
}

export const availabilityManager = new AvailabilityManager();
