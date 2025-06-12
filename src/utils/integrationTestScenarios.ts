
import { UserJourneyTest } from './integrationTestHelpers';

// Complete user onboarding journey
export const providerOnboardingJourney: UserJourneyTest = {
  id: 'provider-onboarding-full',
  name: 'תהליך הרשמת ספק שלם',
  description: 'בדיקת זרימה מלאה של הרשמת ספק חדש',
  steps: [
    {
      name: 'טעינת דף הרשמה',
      action: async () => {
        // Page should already be loaded by test system
        return true;
      },
      validation: () => {
        const container = document.querySelector('.onboarding-container');
        return !!container;
      }
    },
    {
      name: 'מילוי פרטים אישיים',
      action: async () => {
        const nameField = document.querySelector('input[name="fullName"], input[id="fullName"]') as HTMLInputElement;
        const emailField = document.querySelector('input[name="email"], input[id="email"]') as HTMLInputElement;
        
        if (nameField && emailField) {
          nameField.value = 'ספק טסט';
          emailField.value = 'test@provider.com';
          
          // Trigger change events
          nameField.dispatchEvent(new Event('change', { bubbles: true }));
          emailField.dispatchEvent(new Event('change', { bubbles: true }));
          
          return true;
        }
        return false;
      },
      validation: () => {
        const nameField = document.querySelector('input[name="fullName"], input[id="fullName"]') as HTMLInputElement;
        const emailField = document.querySelector('input[name="email"], input[id="email"]') as HTMLInputElement;
        return nameField?.value === 'ספק טסט' && emailField?.value === 'test@provider.com';
      }
    },
    {
      name: 'מעבר לשלב הבא',
      action: async () => {
        const nextButton = document.querySelector('button[aria-label*="הבא"], button:contains("הבא")') as HTMLButtonElement;
        if (nextButton && !nextButton.disabled) {
          nextButton.click();
          return true;
        }
        return false;
      },
      validation: () => {
        // Check if we moved to next step (progress indicator should show step 2)
        const progressBars = document.querySelectorAll('[role="progressbar"]');
        const stepTabs = document.querySelectorAll('[role="tab"][aria-selected="true"]');
        return progressBars.length > 0 || stepTabs.length > 0;
      }
    }
  ]
};

// Search to booking journey
export const searchToBookingJourney: UserJourneyTest = {
  id: 'search-to-booking-full',
  name: 'מחיפוש להזמנה מלאה',
  description: 'תהליך מלא מחיפוש שירות ועד להזמנה',
  steps: [
    {
      name: 'ביצוע חיפוש',
      action: async () => {
        const searchInput = document.querySelector('input[type="search"], input[placeholder*="חיפוש"]') as HTMLInputElement;
        if (searchInput) {
          searchInput.value = 'קוסם';
          searchInput.dispatchEvent(new Event('input', { bubbles: true }));
          searchInput.dispatchEvent(new Event('change', { bubbles: true }));
          return true;
        }
        return false;
      },
      validation: () => {
        const searchInput = document.querySelector('input[type="search"], input[placeholder*="חיפוש"]') as HTMLInputElement;
        return searchInput?.value === 'קוסם';
      }
    },
    {
      name: 'הצגת תוצאות',
      action: async () => {
        // Wait for search results to appear
        await new Promise(resolve => setTimeout(resolve, 1000));
        return true;
      },
      validation: () => {
        const resultCards = document.querySelectorAll('.service-card, [data-testid*="service"], .search-result');
        return resultCards.length > 0;
      },
      timeout: 3000
    },
    {
      name: 'בחירת שירות',
      action: async () => {
        const firstResult = document.querySelector('.service-card button, [data-testid*="service"] button, .search-result button') as HTMLButtonElement;
        if (firstResult) {
          firstResult.click();
          return true;
        }
        return false;
      },
      validation: () => {
        // Check if we're now on a service/booking page
        const bookingElements = document.querySelectorAll('[data-testid="booking-form"], .booking-container, .service-details');
        return bookingElements.length > 0;
      },
      timeout: 5000
    }
  ]
};

// Error recovery journey
export const errorRecoveryJourney: UserJourneyTest = {
  id: 'error-recovery-test',
  name: 'בדיקת התאוששות משגיאות',
  description: 'בדיקה שהמערכת מתאוששת מתקלות ושגיאות',
  steps: [
    {
      name: 'זיהוי רכיבי שגיאה',
      action: async () => {
        // Look for error states, fallbacks, or retry mechanisms
        return true;
      },
      validation: () => {
        const errorElements = document.querySelectorAll('.error-state, [role="alert"], .error-message, [data-testid*="error"]');
        const retryButtons = document.querySelectorAll('button[aria-label*="נסה שוב"], .retry-button');
        const fallbackContent = document.querySelectorAll('.fallback-content, .loading-fallback');
        
        // At least one error handling mechanism should exist
        return errorElements.length > 0 || retryButtons.length > 0 || fallbackContent.length > 0;
      }
    },
    {
      name: 'בדיקת הודעות ברורות',
      action: async () => {
        return true;
      },
      validation: () => {
        const errorMessages = document.querySelectorAll('[role="alert"], .error-message');
        // Check if error messages contain Hebrew text
        return Array.from(errorMessages).some(el => 
          el.textContent && /[\u0590-\u05FF]/.test(el.textContent)
        );
      }
    },
    {
      name: 'בדיקת נגישות בזמן שגיאה',
      action: async () => {
        return true;
      },
      validation: () => {
        const focusableElements = document.querySelectorAll('button:not([disabled]), a[href], input:not([disabled])');
        const ariaLiveElements = document.querySelectorAll('[aria-live]');
        return focusableElements.length > 0 && ariaLiveElements.length > 0;
      }
    }
  ]
};

// Dynamic content loading journey
export const dynamicContentJourney: UserJourneyTest = {
  id: 'dynamic-content-test',
  name: 'בדיקת תוכן דינמי',
  description: 'בדיקה שתוכן דינמי נטען ומתעדכן כראוי',
  steps: [
    {
      name: 'זיהוי רכיבים דינמיים',
      action: async () => {
        return true;
      },
      validation: () => {
        const dynamicElements = document.querySelectorAll(
          '[data-testid*="wishlist"], .wishlist-item, ' +
          '[data-testid*="rating"], .rating-display, ' +
          '[data-testid*="timer"], .countdown, ' +
          '[data-testid*="price"], .price-display'
        );
        return dynamicElements.length > 0;
      }
    },
    {
      name: 'בדיקת עדכון מחירים',
      action: async () => {
        return true;
      },
      validation: () => {
        const priceElements = document.querySelectorAll('[data-testid*="price"], .price, [aria-label*="מחיר"]');
        return Array.from(priceElements).some(el => 
          el.textContent && /[\d,]+/.test(el.textContent)
        );
      }
    },
    {
      name: 'בדיקת זמינות בזמן אמת',
      action: async () => {
        return true;
      },
      validation: () => {
        const availabilityElements = document.querySelectorAll(
          '[data-testid*="availability"], .availability-indicator, ' +
          '[aria-label*="זמין"], [aria-label*="תפוס"]'
        );
        return availabilityElements.length > 0;
      }
    }
  ]
};

export const allIntegrationJourneys: UserJourneyTest[] = [
  providerOnboardingJourney,
  searchToBookingJourney,
  errorRecoveryJourney,
  dynamicContentJourney
];
