
// עקרונות עיצוב אחידים לכל האתר
export const designSystem = {
  // גדלים בסיסיים
  sizes: {
    input: {
      height: 'h-9', // קומפקטי יותר
      padding: 'px-3 py-2',
      text: 'text-sm'
    },
    button: {
      small: 'h-8 px-3 text-xs',
      medium: 'h-9 px-4 text-sm', 
      large: 'h-10 px-6 text-base'
    },
    select: {
      height: 'h-9',
      padding: 'px-3 py-2',
      text: 'text-sm'
    }
  },

  // צבעים ומצבים
  colors: {
    primary: 'bg-blue-600 hover:bg-blue-700',
    secondary: 'bg-gray-100 hover:bg-gray-200',
    border: 'border-gray-200',
    text: {
      primary: 'text-gray-900',
      secondary: 'text-gray-600',
      muted: 'text-gray-500'
    }
  },

  // מרווחים
  spacing: {
    compact: 'gap-2',
    normal: 'gap-4',
    loose: 'gap-6'
  },

  // עקרונות עיצוב כלליים
  principles: {
    // עד שמוצאים תוצאות - הכל קליל וקומפקטי
    searchMode: {
      elements: 'קטנים וקלילים',
      spacing: 'מרווחים צפופים',
      focus: 'על החיפוש, לא על הכלים'
    },
    
    // אחרי שמצאנו תוצאות - יותר נפח ופרטים
    resultsMode: {
      elements: 'גדולים יותר עם פרטים',
      spacing: 'מרווחים נוחים לקריאה',
      focus: 'על התוכן והבחירה'
    },

    // מובייל
    mobile: {
      touch: 'אלמנטים מספיק גדולים למגע',
      stack: 'סידור אנכי במקום אופקי',
      spacing: 'מרווחים מותאמים למסך קטן'
    }
  }
};
