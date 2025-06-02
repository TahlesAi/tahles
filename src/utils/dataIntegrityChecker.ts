
import { 
  ExtendedProviderProfile, 
  ExtendedServiceProfile,
  DataIntegrityStatus,
  DataIntegrityError,
  DataIntegrityWarning
} from '@/types/extendedSchema';

export class DataIntegrityChecker {
  private providers: ExtendedProviderProfile[];
  private services: ExtendedServiceProfile[];
  
  constructor(providers: ExtendedProviderProfile[], services: ExtendedServiceProfile[]) {
    this.providers = providers;
    this.services = services;
  }

  public runFullCheck(): DataIntegrityStatus {
    const errors: DataIntegrityError[] = [];
    const warnings: DataIntegrityWarning[] = [];

    // בדיקת שדות חובה
    errors.push(...this.checkRequiredFields());
    
    // בדיקת הפניות
    errors.push(...this.checkReferences());
    
    // בדיקת כפילויות
    errors.push(...this.checkDuplicates());
    
    // בדיקת קונפליקטים
    errors.push(...this.checkConflicts());
    
    // אזהרות על נתונים חסרים או לא מעודכנים
    warnings.push(...this.checkDataCompleteness());
    warnings.push(...this.checkDataFreshness());

    const score = this.calculateIntegrityScore(errors, warnings);

    return {
      lastCheck: new Date().toISOString(),
      hasErrors: errors.length > 0,
      errors,
      warnings,
      score
    };
  }

  private checkRequiredFields(): DataIntegrityError[] {
    const errors: DataIntegrityError[] = [];

    // בדיקת ספקים
    this.providers.forEach(provider => {
      if (!provider.name?.trim()) {
        errors.push({
          type: 'missing_field',
          field: `providers.${provider.id}.name`,
          message: 'שם ספק חסר',
          severity: 'critical'
        });
      }
      
      if (!provider.email?.includes('@')) {
        errors.push({
          type: 'missing_field',
          field: `providers.${provider.id}.email`,
          message: 'כתובת אימייל לא תקינה',
          severity: 'high'
        });
      }

      if (!provider.primaryCategoryId) {
        errors.push({
          type: 'missing_field',
          field: `providers.${provider.id}.primaryCategoryId`,
          message: 'קטגוריה ראשית חסרה',
          severity: 'high'
        });
      }
    });

    // בדיקת שירותים
    this.services.forEach(service => {
      if (!service.name?.trim()) {
        errors.push({
          type: 'missing_field',
          field: `services.${service.id}.name`,
          message: 'שם שירות חסר',
          severity: 'critical'
        });
      }

      if (!service.price || service.price <= 0) {
        errors.push({
          type: 'missing_field',
          field: `services.${service.id}.price`,
          message: 'מחיר שירות חסר או לא תקין',
          severity: 'medium'
        });
      }
    });

    return errors;
  }

  private checkReferences(): DataIntegrityError[] {
    const errors: DataIntegrityError[] = [];
    const providerIds = new Set(this.providers.map(p => p.id));

    // בדיקת הפניות שירותים לספקים
    this.services.forEach(service => {
      if (!providerIds.has(service.providerId)) {
        errors.push({
          type: 'invalid_reference',
          field: `services.${service.id}.providerId`,
          message: `הפניה לספק לא קיים: ${service.providerId}`,
          severity: 'critical'
        });
      }
    });

    return errors;
  }

  private checkDuplicates(): DataIntegrityError[] {
    const errors: DataIntegrityError[] = [];

    // בדיקת כפילויות אימייל בספקים
    const emailMap = new Map<string, string[]>();
    this.providers.forEach(provider => {
      if (provider.email) {
        const existing = emailMap.get(provider.email) || [];
        existing.push(provider.id);
        emailMap.set(provider.email, existing);
      }
    });

    emailMap.forEach((providerIds, email) => {
      if (providerIds.length > 1) {
        errors.push({
          type: 'duplicate',
          field: `providers.email.${email}`,
          message: `כתובת אימייל כפולה: ${email} (ספקים: ${providerIds.join(', ')})`,
          severity: 'high'
        });
      }
    });

    // בדיקת כפילויות שמות שירותים באותו ספק
    const servicesByProvider = new Map<string, ExtendedServiceProfile[]>();
    this.services.forEach(service => {
      const existing = servicesByProvider.get(service.providerId) || [];
      existing.push(service);
      servicesByProvider.set(service.providerId, existing);
    });

    servicesByProvider.forEach((services, providerId) => {
      const nameMap = new Map<string, ExtendedServiceProfile[]>();
      services.forEach(service => {
        const existing = nameMap.get(service.name) || [];
        existing.push(service);
        nameMap.set(service.name, existing);
      });

      nameMap.forEach((duplicateServices, name) => {
        if (duplicateServices.length > 1) {
          errors.push({
            type: 'duplicate',
            field: `services.name.${name}`,
            message: `שם שירות כפול אצל ספק ${providerId}: ${name}`,
            severity: 'medium'
          });
        }
      });
    });

    return errors;
  }

  private checkConflicts(): DataIntegrityError[] {
    const errors: DataIntegrityError[] = [];

    // בדיקת קונפליקטים בזמינות
    this.providers.forEach(provider => {
      provider.services?.forEach(service => {
        service.availabilitySlots?.forEach(slot => {
          if (slot.currentBookings > slot.maxBookings) {
            errors.push({
              type: 'conflict',
              field: `services.${service.id}.availabilitySlots`,
              message: `מספר הזמנות עולה על המקסימום בתאריך ${slot.date}`,
              severity: 'high'
            });
          }
        });
      });
    });

    return errors;
  }

  private checkDataCompleteness(): DataIntegrityWarning[] {
    const warnings: DataIntegrityWarning[] = [];

    this.providers.forEach(provider => {
      if (!provider.description?.trim()) {
        warnings.push({
          type: 'incomplete_data',
          field: `providers.${provider.id}.description`,
          message: 'תיאור ספק חסר',
          suggestion: 'הוסף תיאור מפורט לשיפור הנראות בחיפושים'
        });
      }

      if (!provider.gallery || provider.gallery.length === 0) {
        warnings.push({
          type: 'incomplete_data',
          field: `providers.${provider.id}.gallery`,
          message: 'גלריית תמונות חסרה',
          suggestion: 'הוסף תמונות לשיפור האטרקטיביות'
        });
      }

      if (provider.services && provider.services.length === 0) {
        warnings.push({
          type: 'incomplete_data',
          field: `providers.${provider.id}.services`,
          message: 'אין שירותים מוגדרים לספק',
          suggestion: 'הוסף לפחות שירות אחד'
        });
      }
    });

    return warnings;
  }

  private checkDataFreshness(): DataIntegrityWarning[] {
    const warnings: DataIntegrityWarning[] = [];
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    this.providers.forEach(provider => {
      const lastUpdate = new Date(provider.updated_at);
      if (lastUpdate < sixMonthsAgo) {
        warnings.push({
          type: 'outdated',
          field: `providers.${provider.id}.updated_at`,
          message: 'פרופיל ספק לא עודכן במשך 6 חודשים',
          suggestion: 'עדכן את פרטי הספק'
        });
      }
    });

    return warnings;
  }

  private calculateIntegrityScore(errors: DataIntegrityError[], warnings: DataIntegrityWarning[]): number {
    let score = 100;

    errors.forEach(error => {
      switch (error.severity) {
        case 'critical':
          score -= 25;
          break;
        case 'high':
          score -= 15;
          break;
        case 'medium':
          score -= 8;
          break;
        case 'low':
          score -= 3;
          break;
      }
    });

    warnings.forEach(() => {
      score -= 1;
    });

    return Math.max(0, score);
  }

  // דוח מפורט
  public generateReport(): string {
    const status = this.runFullCheck();
    
    let report = `דוח בדיקת שלמות נתונים\n`;
    report += `תאריך: ${new Date().toLocaleDateString('he-IL')}\n`;
    report += `ציון שלמות: ${status.score}/100\n\n`;

    if (status.errors.length > 0) {
      report += `שגיאות (${status.errors.length}):\n`;
      status.errors.forEach(error => {
        report += `- [${error.severity.toUpperCase()}] ${error.message} (${error.field})\n`;
      });
      report += '\n';
    }

    if (status.warnings.length > 0) {
      report += `אזהרות (${status.warnings.length}):\n`;
      status.warnings.forEach(warning => {
        report += `- ${warning.message} (${warning.field})\n`;
        if (warning.suggestion) {
          report += `  הצעה: ${warning.suggestion}\n`;
        }
      });
    }

    return report;
  }
}

export const runDataIntegrityCheck = (
  providers: ExtendedProviderProfile[], 
  services: ExtendedServiceProfile[]
): DataIntegrityStatus => {
  const checker = new DataIntegrityChecker(providers, services);
  return checker.runFullCheck();
};
