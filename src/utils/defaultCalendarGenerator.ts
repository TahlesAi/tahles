
import { 
  DefaultCalendarSettings, 
  WorkingHoursConfig, 
  DaySchedule,
  HolidaySettings,
  ShabbatSettings,
  CustomHoliday,
  AvailabilitySlot
} from '@/types/extendedSchema';

// יומן דיפולט לספק חדש
export const generateDefaultCalendar = (providerId: string): DefaultCalendarSettings => {
  return {
    workingDays: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday'],
    startTime: '09:00',
    endTime: '22:00',
    breakTimes: [
      {
        startTime: '13:00',
        endTime: '14:00',
        reason: 'הפסקת צהריים'
      }
    ],
    holidaySettings: {
      observeJewishHolidays: true,
      observeNationalHolidays: true,
      customHolidays: []
    },
    shabbatSettings: {
      observeShabbat: true,
      startTime: '16:00', // זמן דיפולט לכניסת שבת
      endTime: '21:00', // זמן דיפולט ליציאת שבת
      bufferMinutes: 30
    }
  };
};

export const generateDefaultWorkingHours = (): WorkingHoursConfig => {
  const defaultWorkingDay: DaySchedule = {
    isWorking: true,
    startTime: '09:00',
    endTime: '22:00',
    breaks: [
      {
        startTime: '13:00',
        endTime: '14:00',
        reason: 'הפסקת צהריים'
      }
    ]
  };

  const fridaySchedule: DaySchedule = {
    isWorking: true,
    startTime: '09:00',
    endTime: '15:00', // סיום מוקדם לכבוד שבת
    breaks: []
  };

  const shabbatSchedule: DaySchedule = {
    isWorking: false,
    breaks: []
  };

  return {
    sunday: defaultWorkingDay,
    monday: defaultWorkingDay,
    tuesday: defaultWorkingDay,
    wednesday: defaultWorkingDay,
    thursday: defaultWorkingDay,
    friday: fridaySchedule,
    saturday: shabbatSchedule
  };
};

// יצירת slots זמינות לחודש קדימה
export const generateAvailabilitySlots = (
  calendar: DefaultCalendarSettings,
  workingHours: WorkingHoursConfig,
  startDate?: Date
): AvailabilitySlot[] => {
  const slots: AvailabilitySlot[] = [];
  const start = startDate || new Date();
  
  // יצירת slots ל-30 יום קדימה
  for (let i = 0; i < 30; i++) {
    const date = new Date(start);
    date.setDate(date.getDate() + i);
    
    const dayName = getDayName(date.getDay());
    const daySchedule = workingHours[dayName];
    
    if (!daySchedule.isWorking) continue;
    
    // בדיקת חגים ושבתות
    if (isHoliday(date, calendar.holidaySettings) || 
        isShabbat(date, calendar.shabbatSettings)) {
      continue;
    }
    
    // יצירת slots בהתאם לשעות עבודה
    const startTime = daySchedule.startTime!;
    const endTime = daySchedule.endTime!;
    
    slots.push({
      date: date.toISOString().split('T')[0],
      startTime,
      endTime,
      isAvailable: true,
      maxBookings: 1, // ברירת מחדל - הזמנה אחת בכל פעם
      currentBookings: 0,
      softHolds: 0
    });
  }
  
  return slots;
};

const getDayName = (dayIndex: number): keyof WorkingHoursConfig => {
  const days: (keyof WorkingHoursConfig)[] = [
    'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'
  ];
  return days[dayIndex];
};

const isHoliday = (date: Date, holidaySettings: HolidaySettings): boolean => {
  // בדיקה פשוטה - ניתן להרחיב עם ספריית חגים
  if (holidaySettings.observeJewishHolidays) {
    // כאן ניתן להוסיף לוגיקה לחישוב חגים יהודיים
    // לבינתיים נחזיר false
  }
  
  if (holidaySettings.observeNationalHolidays) {
    // כאן ניתן להוסיף לוגיקה לחגים לאומיים
  }
  
  // בדיקת חגים מותאמים אישית
  const dateString = date.toISOString().split('T')[0];
  return holidaySettings.customHolidays.some(holiday => 
    holiday.date === dateString || 
    (holiday.isRecurring && isRecurringHoliday(date, holiday))
  );
};

const isRecurringHoliday = (date: Date, holiday: CustomHoliday): boolean => {
  // לוגיקה פשוטה לחג חוזר - רק יום וחודש
  const holidayDate = new Date(holiday.date);
  return date.getMonth() === holidayDate.getMonth() && 
         date.getDate() === holidayDate.getDate();
};

const isShabbat = (date: Date, shabbatSettings: ShabbatSettings): boolean => {
  if (!shabbatSettings.observeShabbat) return false;
  
  // שבת = יום 6 (Saturday)
  return date.getDay() === 6;
};

// עדכון יומן קיים עם הגדרות חדשות
export const updateCalendarSettings = (
  currentSlots: AvailabilitySlot[],
  newSettings: DefaultCalendarSettings
): AvailabilitySlot[] => {
  // כאן ניתן להוסיף לוגיקה לעדכון slots קיימים
  // בהתאם להגדרות החדשות
  return currentSlots;
};
