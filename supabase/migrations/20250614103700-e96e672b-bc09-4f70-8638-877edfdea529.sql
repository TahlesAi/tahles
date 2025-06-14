
-- מחיקת תתי קטגוריות קיימות
DELETE FROM public.subcategories;

-- הכנסת 30 תתי קטגוריות - 5 לכל קטגוריה

-- קטגוריה: לוקיישנים
INSERT INTO public.subcategories (category_id, name, description, order_index)
SELECT c.id, t.name, t.description, t.order_index 
FROM (VALUES
    ('אולמות אירועים', 'אולמות לכל כמות קהל', 1),
    ('גני אירועים', 'גני אירועים לאירועי חוץ', 2),
    ('חוף פרטי', 'חופים וחיק טבע', 3),
    ('בתים פרטיים', 'וילות ודירות לאירועים קטנים', 4),
    ('מסעדות ובתי קפה', 'מתחמים ייחודיים עם תפריט קיים', 5)
) AS t(name, description, order_index)
JOIN public.categories c ON c.name = 'לוקיישנים';

-- קטגוריה: מזון ומשקאות
INSERT INTO public.subcategories (category_id, name, description, order_index)
SELECT c.id, t.name, t.description, t.order_index 
FROM (VALUES
    ('קייטרינג מלא', 'שירותי קייטרינג מקצועיים', 1),
    ('שף פרטי', 'שף אישי לאירוע', 2),
    ('בר ומשקאות', 'שירותי בר מקצועיים', 3),
    ('קונדיטוריה ועוגות', 'עוגות מעוצבות ומתוקים', 4),
    ('אוכל רחוב', 'דוכני אוכל ייחודיים', 5)
) AS t(name, description, order_index)
JOIN public.categories c ON c.name = 'מזון ומשקאות';

-- קטגוריה: מופעים ובמה
INSERT INTO public.subcategories (category_id, name, description, order_index)
SELECT c.id, t.name, t.description, t.order_index 
FROM (VALUES
    ('זמרים ונגנים', 'אמני מוזיקה מקצועיים', 1),
    ('קוסמים ואמני במה', 'מופעי קסמים ותיאטרון', 2),
    ('רקדנים וכוריאוגרפיה', 'מופעי ריקוד מקצועיים', 3),
    ('סטנד-אפ וקומדיה', 'בדרנים וקומיקאים', 4),
    ('תזמורות ולהקות', 'להקות ותזמורות לאירועים', 5)
) AS t(name, description, order_index)
JOIN public.categories c ON c.name = 'מופעים ובמה';

-- קטגוריה: שירותי הפקה
INSERT INTO public.subcategories (category_id, name, description, order_index)
SELECT c.id, t.name, t.description, t.order_index 
FROM (VALUES
    ('צילום וקולנוע', 'שירותי צילום ווידאו מקצועיים', 1),
    ('הגברה ותאורה', 'מערכות הגברה ותאורה מקצועיות', 2),
    ('עיצוב ותפאורה', 'עיצוב אירועים ותפאורה', 3),
    ('הפקה ותיאום', 'מפיקי אירועים מקצועיים', 4),
    ('אבטחה ולוגיסטיקה', 'שירותי אבטחה ולוגיסטיקה', 5)
) AS t(name, description, order_index)
JOIN public.categories c ON c.name = 'שירותי הפקה';

-- קטגוריה: הרצאות והכשרות
INSERT INTO public.subcategories (category_id, name, description, order_index)
SELECT c.id, t.name, t.description, t.order_index 
FROM (VALUES
    ('הרצאות העשרה', 'הרצאות וסדנאות העשרה', 1),
    ('גיבוש צוות', 'פעילויות גיבוש ופיתוח צוות', 2),
    ('הכשרות מקצועיות', 'קורסים והכשרות עסקיות', 3),
    ('מוטיבציה והשראה', 'הרצאות מוטיבציה אישית', 4),
    ('סדנאות יצירה', 'סדנאות אמנות ויצירה', 5)
) AS t(name, description, order_index)
JOIN public.categories c ON c.name = 'הרצאות והכשרות';

-- קטגוריה: אטרקציות
INSERT INTO public.subcategories (category_id, name, description, order_index)
SELECT c.id, t.name, t.description, t.order_index 
FROM (VALUES
    ('כרטיסים להופעות', 'כרטיסים להופעות ואירועים', 1),
    ('מתנות ומזכרות', 'מתנות לאירועים ומזכרות', 2),
    ('טיולים מאורגנים', 'טיולים וחוויות מאורגנות', 3),
    ('פעילויות ספורט', 'אטרקציות ספורט וחוץ', 4),
    ('גיימינג ובידור', 'משחקים ובידור דיגיטלי', 5)
) AS t(name, description, order_index)
JOIN public.categories c ON c.name = 'אטרקציות';
