
import React, { useEffect } from 'react';

const AccessibilityEnhancer: React.FC = () => {
  useEffect(() => {
    // הוספת ARIA labels לכפתורים ללא תיאור
    const buttons = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])');
    buttons.forEach((button, index) => {
      const buttonElement = button as HTMLButtonElement;
      if (!buttonElement.textContent?.trim()) {
        buttonElement.setAttribute('aria-label', `כפתור פעולה ${index + 1}`);
      } else {
        buttonElement.setAttribute('aria-label', buttonElement.textContent.trim());
      }
    });

    // הוספת alt text לתמונות ללא תיאור
    const images = document.querySelectorAll('img:not([alt])');
    images.forEach((img, index) => {
      const imgElement = img as HTMLImageElement;
      imgElement.setAttribute('alt', `תמונה ${index + 1}`);
    });

    // הוספת ARIA roles לאלמנטים ללא הגדרה
    const interactiveElements = document.querySelectorAll('div[onclick], span[onclick]');
    interactiveElements.forEach((element) => {
      if (!element.getAttribute('role')) {
        element.setAttribute('role', 'button');
        element.setAttribute('tabindex', '0');
      }
    });

    // הוספת aria-labelledby לקישורים
    const links = document.querySelectorAll('a:not([aria-label]):not([aria-labelledby])');
    links.forEach((link, index) => {
      const linkElement = link as HTMLAnchorElement;
      if (linkElement.textContent?.trim()) {
        linkElement.setAttribute('aria-label', linkElement.textContent.trim());
      } else {
        linkElement.setAttribute('aria-label', `קישור ${index + 1}`);
      }
    });

    // הוספת role לטפסים
    const forms = document.querySelectorAll('form:not([role])');
    forms.forEach((form) => {
      form.setAttribute('role', 'form');
    });

    // הוספת aria-live לאזורי עדכון דינמי
    const dynamicContent = document.querySelectorAll('[data-dynamic], .toast, .alert, .notification');
    dynamicContent.forEach((element) => {
      if (!element.getAttribute('aria-live')) {
        element.setAttribute('aria-live', 'polite');
      }
    });

    // הוספת focus indicators משופרים
    const style = document.createElement('style');
    style.textContent = `
      *:focus {
        outline: 3px solid #2563eb !important;
        outline-offset: 2px !important;
        box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2) !important;
      }
      
      .sr-only {
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        padding: 0 !important;
        margin: -1px !important;
        overflow: hidden !important;
        clip: rect(0, 0, 0, 0) !important;
        white-space: nowrap !important;
        border: 0 !important;
      }
      
      [aria-hidden="true"] {
        display: none !important;
      }
      
      button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
      
      [aria-expanded="true"] + * {
        display: block;
      }
      
      [aria-expanded="false"] + * {
        display: none;
      }
    `;
    document.head.appendChild(style);

    // הוספת keyboard navigation משופר
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
      
      // ESC key לסגירת דיאלוגים
      if (event.key === 'Escape') {
        const openDialogs = document.querySelectorAll('[role="dialog"][aria-hidden="false"]');
        openDialogs.forEach((dialog) => {
          const closeButton = dialog.querySelector('[data-dismiss], .close, [aria-label*="סגור"]');
          if (closeButton) {
            (closeButton as HTMLElement).click();
          }
        });
      }
    };

    const handleMouseDown = () => {
      document.body.classList.remove('keyboard-navigation');
    };

    // הוספת skip links
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'דלג לתוכן הראשי';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-blue-600 focus:text-white focus:p-2 focus:rounded';
    skipLink.setAttribute('aria-label', 'דלג לתוכן הראשי של הדף');
    document.body.insertBefore(skipLink, document.body.firstChild);

    // הוספת landmarks אוטומטיים
    const main = document.querySelector('main');
    if (main && !main.getAttribute('role')) {
      main.setAttribute('role', 'main');
      main.setAttribute('id', 'main-content');
    }

    const nav = document.querySelector('nav, header nav');
    if (nav && !nav.getAttribute('role')) {
      nav.setAttribute('role', 'navigation');
      nav.setAttribute('aria-label', 'ניווט ראשי');
    }

    const footer = document.querySelector('footer');
    if (footer && !footer.getAttribute('role')) {
      footer.setAttribute('role', 'contentinfo');
    }

    // Event listeners
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    // עדכון aria-live בזמן אמת
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              
              // הוספת aria-label לכפתורים חדשים
              const newButtons = element.querySelectorAll?.('button:not([aria-label])') || [];
              newButtons.forEach((btn) => {
                const buttonText = btn.textContent?.trim();
                if (buttonText) {
                  btn.setAttribute('aria-label', buttonText);
                }
              });
              
              // הוספת alt לתמונות חדשות
              const newImages = element.querySelectorAll?.('img:not([alt])') || [];
              newImages.forEach((img, index) => {
                img.setAttribute('alt', `תמונה חדשה ${index + 1}`);
              });
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Screen reader announcements */}
      <div 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
        id="accessibility-announcements"
      >
        מערכת נגישות מופעלת
      </div>
      
      {/* Skip navigation */}
      <nav aria-label="ניווט נגישות" className="sr-only focus-within:not-sr-only">
        <a href="#main-content" className="skip-link">
          דלג לתוכן הראשי
        </a>
      </nav>
    </>
  );
};

export default AccessibilityEnhancer;
