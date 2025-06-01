
// עקרונות עיצוב אחידים לכל האתר
export const designSystem = {
  // גדלים בסיסיים - מוקטנים ב-30%
  sizes: {
    input: {
      height: 'h-8', // קטן יותר
      padding: 'px-2.5 py-1.5',
      text: 'text-sm'
    },
    button: {
      small: 'h-7 px-2.5 text-xs',
      medium: 'h-8 px-3 text-sm', 
      large: 'h-9 px-4 text-sm'
    },
    select: {
      height: 'h-8',
      padding: 'px-2.5 py-1.5',
      text: 'text-sm'
    },
    card: {
      padding: 'p-2.5', // קטן יותר
      spacing: 'gap-2'
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

  // מרווחים - מוקטנים
  spacing: {
    compact: 'gap-1.5',
    normal: 'gap-2.5',
    loose: 'gap-4'
  },

  // טיפוגרפיה - מוקטנת
  typography: {
    title: 'text-xl font-bold', // במקום text-2xl
    subtitle: 'text-lg font-semibold', // במקום text-xl
    body: 'text-sm', // במקום text-base
    caption: 'text-xs text-gray-500'
  },

  // עקרונות עיצוב כלליים
  principles: {
    // עד שמוצאים תוצאות - הכל קליל וקומפקטי מאוד
    searchMode: {
      elements: 'קטנים וצפופים במיוחד',
      spacing: 'מרווחים מינימליים',
      focus: 'על החיפוש, לא על הכלים',
      cardPadding: 'p-2',
      iconSize: 'h-4 w-4',
      textSize: 'text-xs'
    },
    
    // אחרי שמצאנו תוצאות - יותר נפח ופרטים
    resultsMode: {
      elements: 'גדולים יותר עם פרטים',
      spacing: 'מרווחים נוחים לקריאה',
      focus: 'על התוכן והבחירה',
      cardPadding: 'p-4',
      iconSize: 'h-6 w-6',
      textSize: 'text-sm'
    },

    // כללים לעמודי ניווט וקטגוריות
    navigationMode: {
      elements: 'קומפקטיים מאוד',
      density: 'צפיפות גבוהה',
      showMore: 'הצג הרבה במבט אחד',
      cardPadding: 'p-2',
      iconSize: 'h-4 w-4',
      titleSize: 'text-sm font-medium'
    }
  }
};
