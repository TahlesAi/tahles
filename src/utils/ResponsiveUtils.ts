
// כלי עזר לרספונסיביות אחידה במערכת
export const breakpoints = {
  sm: '640px',
  md: '768px', 
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
} as const;

export const spacing = {
  xs: '0.25rem',  // 4px
  sm: '0.5rem',   // 8px
  md: '1rem',     // 16px
  lg: '1.5rem',   // 24px
  xl: '2rem',     // 32px
  '2xl': '3rem',  // 48px
  '3xl': '4rem'   // 64px
} as const;

export const minWidths = {
  button: '120px',
  input: '200px',
  card: '300px',
  modal: '400px',
  sidebar: '250px'
} as const;

// פונקציות עזר לגדלי מסך
export const isMobile = () => window.innerWidth < 768;
export const isTablet = () => window.innerWidth >= 768 && window.innerWidth < 1024;
export const isDesktop = () => window.innerWidth >= 1024;

// קלאסים לרספונסיביות
export const responsiveClasses = {
  // גריד רספונסיבי
  grid: {
    cards: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6',
    form: 'grid grid-cols-1 md:grid-cols-2 gap-4',
    layout: 'grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8'
  },
  
  // ריווחים רספונסיביים
  padding: {
    container: 'px-4 sm:px-6 lg:px-8',
    section: 'py-8 sm:py-12 lg:py-16',
    card: 'p-4 sm:p-6'
  },
  
  // טקסט רספונסיבי
  text: {
    heading: 'text-2xl sm:text-3xl lg:text-4xl font-bold',
    subheading: 'text-lg sm:text-xl lg:text-2xl font-semibold',
    body: 'text-sm sm:text-base',
    caption: 'text-xs sm:text-sm'
  },
  
  // כפתורים רספונסיביים
  button: {
    primary: 'px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base min-w-[120px]',
    secondary: 'px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm min-w-[100px]',
    full: 'w-full sm:w-auto sm:min-w-[200px]'
  },
  
  // קלאסים להסתרה/הצגה
  visibility: {
    mobileOnly: 'block sm:hidden',
    tabletUp: 'hidden sm:block',
    desktopOnly: 'hidden lg:block',
    mobileHidden: 'hidden sm:block'
  }
};

// פונקציית בדיקת רספונסיביות לטפסים
export const validateFormResponsiveness = (element: HTMLElement): string[] => {
  const issues: string[] = [];
  const rect = element.getBoundingClientRect();
  
  // בדיקת רוחב מינימלי
  if (rect.width < 200) {
    issues.push('רוחב השדה קטן מידי למובייל');
  }
  
  // בדיקת גלישה
  if (rect.right > window.innerWidth) {
    issues.push('השדה גולש מחוץ למסך');
  }
  
  // בדיקת מרווחים
  const computedStyle = window.getComputedStyle(element);
  const margin = parseInt(computedStyle.marginLeft) + parseInt(computedStyle.marginRight);
  if (margin < 8) {
    issues.push('מרווחי צדדים קטנים מידי');
  }
  
  return issues;
};

// תיקון אוטומטי של בעיות רספונסיביות
export const autoFixResponsiveness = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect();
  
  // תיקון רוחב מינימלי
  if (rect.width < 200) {
    element.style.minWidth = minWidths.input;
  }
  
  // תיקון גלישה
  if (rect.right > window.innerWidth) {
    element.style.maxWidth = '100%';
    element.style.boxSizing = 'border-box';
  }
  
  // הוספת מרווחים
  const computedStyle = window.getComputedStyle(element);
  const margin = parseInt(computedStyle.marginLeft) + parseInt(computedStyle.marginRight);
  if (margin < 8) {
    element.style.margin = '0 8px';
  }
};

// הוק לבדיקת גודל מסך
export const useResponsive = () => {
  const [screenSize, setScreenSize] = React.useState({
    isMobile: isMobile(),
    isTablet: isTablet(), 
    isDesktop: isDesktop(),
    width: window.innerWidth
  });

  React.useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        isMobile: isMobile(),
        isTablet: isTablet(),
        isDesktop: isDesktop(),
        width: window.innerWidth
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
};

// קלאס עזר לניהול רספונסיביות
export class ResponsiveManager {
  private observers: ResizeObserver[] = [];
  
  // מעקב אחרי אלמנט ותיקון אוטומטי
  observeElement(element: HTMLElement, autoFix = true) {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const issues = validateFormResponsiveness(entry.target as HTMLElement);
        
        if (issues.length > 0) {
          console.warn('Responsive issues found:', issues);
          
          if (autoFix) {
            autoFixResponsiveness(entry.target as HTMLElement);
          }
        }
      }
    });
    
    observer.observe(element);
    this.observers.push(observer);
    
    return () => {
      observer.disconnect();
      this.observers = this.observers.filter(obs => obs !== observer);
    };
  }
  
  // ניקוי כל המעקבים
  cleanup() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

export const responsiveManager = new ResponsiveManager();
