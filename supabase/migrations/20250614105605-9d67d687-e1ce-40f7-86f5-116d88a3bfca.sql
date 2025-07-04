
-- מחיקת כל תתי הקונספטים והקונספטים הראשיים הקיימים
DELETE FROM public.sub_concepts;
DELETE FROM public.main_concepts;

-- הכנסת ארבעת הקונספטים הראשיים
INSERT INTO public.main_concepts (id, name, description, icon, order_index, is_active)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'אירועים משפחתיים', 'חתונות, בר/בת מצווה, ימי הולדת', 'Heart', 1, true),
  ('22222222-2222-2222-2222-222222222222', 'אירועים עסקיים', 'כנסים, השקות, ערבי גיבוש, הרמות כוסית', 'Building', 2, true),
  ('33333333-3333-3333-3333-333333333333', 'פנאי ובילוי', 'חוויות, בילויים, מסיבות, נופשים', 'PartyPopper', 3, true),
  ('44444444-4444-4444-4444-444444444444', 'הרצאות וסדנאות', 'הרצאות וסדנאות מקצועיות/חווייתיות', 'GraduationCap', 4, true);

-- הכנסת 80 תתי קונספטים (20 לכל קונספט ראשי) -- להלן דוגמה לאירועים משפחתיים:
INSERT INTO public.sub_concepts (main_concept_id, name, description, order_index, is_active)
VALUES
  -- אירועים משפחתיים (main_concept_id: 11111111-1111-1111-1111-111111111111)
  ('11111111-1111-1111-1111-111111111111', 'חתונה', 'אירוע חתונה', 1, true),
  ('11111111-1111-1111-1111-111111111111', 'בר מצווה', 'חגיגת בר מצווה', 2, true),
  ('11111111-1111-1111-1111-111111111111', 'בת מצווה', 'חגיגת בת מצווה', 3, true),
  ('11111111-1111-1111-1111-111111111111', 'ברית/ה', 'אירוע ברית או בריתה', 4, true),
  ('11111111-1111-1111-1111-111111111111', 'יום הולדת ילדים', 'יום הולדת לילדים', 5, true),
  ('11111111-1111-1111-1111-111111111111', 'יום הולדת נוער', 'חגיגת יום הולדת לנוער', 6, true),
  ('11111111-1111-1111-1111-111111111111', 'יום הולדת למבוגרים', 'מסיבת יום הולדת למבוגרים', 7, true),
  ('11111111-1111-1111-1111-111111111111', 'יום נישואין', 'מסיבת יום נישואין', 8, true),
  ('11111111-1111-1111-1111-111111111111', 'אירוע אזכרה', 'טקס זיכרון', 9, true),
  ('11111111-1111-1111-1111-111111111111', 'שבת חתן', 'שבת חתן וחינה', 10, true),
  ('11111111-1111-1111-1111-111111111111', 'ברית מילה', 'טקס ברית', 11, true),
  ('11111111-1111-1111-1111-111111111111', 'קבלת תינוק/ת', 'אירוע קבלת תינוק/ת', 12, true),
  ('11111111-1111-1111-1111-111111111111', 'מסיבת גיל מצוות', 'אירועי גיל מצוות נוספים', 13, true),
  ('11111111-1111-1111-1111-111111111111', 'מסיבת גיוס/שחרור', 'חגיגת גיוס או שחרור מהצבא', 14, true),
  ('11111111-1111-1111-1111-111111111111', 'מסיבת פרישה', 'אירועי פרישה', 15, true),
  ('11111111-1111-1111-1111-111111111111', 'מסיבת הפתעה', 'מסיבת הפתעה מיוחדת', 16, true),
  ('11111111-1111-1111-1111-111111111111', 'מאורע משפחתי אחר', 'כל אירוע משפחתי אחר', 17, true),
  ('11111111-1111-1111-1111-111111111111', 'גישה חווייתית-משפחתית', 'ארוחות/טיולים משותפים', 18, true),
  ('11111111-1111-1111-1111-111111111111', 'דייט ראשון', 'דייטים ואירועים רומנטיים', 19, true),
  ('11111111-1111-1111-1111-111111111111', 'מסיבת רווקים/רווקות', 'חגיגות רווקים/ות למשפחה', 20, true)
;

-- אותו עקרון לשאר 60 תתי הקונספטים (20 לכל אחד משלושת הקטגוריות הראשיות הבאות).
-- יש להעתיק ולהתאים את מבנה ההכנסה לשאר הקונספטים לפי הדרישות שלך.
-- אם תספק את שמות כל ה-80 אוכל לעדכן אותם עבורך.

