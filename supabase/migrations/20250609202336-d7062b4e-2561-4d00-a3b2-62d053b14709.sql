
-- יצירת קטגוריית אטרקציות עם UUID תקין (ללא ON CONFLICT)
INSERT INTO categories (name, description, icon, order_index, is_active) 
SELECT 'אטרקציות', 'כרטיסים, מתנות, טיולים ואטרקציות', 'TentTree', 6, true
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'אטרקציות');

-- יצירת תתי קטגוריות לקטגוריית האטרקציות
DO $$
DECLARE
    attractions_cat_id UUID;
BEGIN
    SELECT id INTO attractions_cat_id FROM categories WHERE name = 'אטרקציות';
    
    IF attractions_cat_id IS NOT NULL THEN
        -- יצירת תתי קטגוריות רק אם הקטגוריה קיימת
        INSERT INTO subcategories (category_id, name, description, order_index, is_active) 
        SELECT attractions_cat_id, subcategory_name, subcategory_desc, subcategory_order, true
        FROM (VALUES
            ('כרטיסים לאירועים', 'כרטיסים לאירועים ופעילויות', 1),
            ('כרטיסים להצגות', 'כרטיסים להצגות תיאטרון', 2),
            ('כרטיסים להופעות', 'כרטיסים להופעות מוזיקה', 3),
            ('מתנות מעוצבות', 'מתנות מעוצבות ומיוחדות', 4),
            ('מתנות פרישה', 'מתנות לפרישה ולסיום תפקיד', 5),
            ('מתנות לידה', 'מתנות ללידה ולתינוקות', 6),
            ('תווי קנייה', 'תווי קנייה וגיפט קארד', 7),
            ('טיולים', 'טיולים מאורגנים', 8),
            ('מקומות לינה', 'בתי מלון וצימרים', 9),
            ('אטרקציות', 'אטרקציות ופארקי שעשועים', 10),
            ('הסעות', 'שירותי הסעה ותחבורה', 11),
            ('מדריכי טיולים', 'מדריכי טיולים מוסמכים', 12),
            ('אבטחה', 'שירותי אבטחה לאירועים', 13),
            ('בלונים פורחים', 'טיסות בבלון פורח', 14),
            ('ספורט ימי', 'פעילויות ספורט ימי', 15),
            ('רכבל', 'טיסות רכבל ונוף', 16),
            ('טרקטורונים', 'רכיבה על טרקטורונים', 17)
        ) AS v(subcategory_name, subcategory_desc, subcategory_order)
        WHERE NOT EXISTS (
            SELECT 1 FROM subcategories 
            WHERE category_id = attractions_cat_id AND name = v.subcategory_name
        );
    END IF;
END $$;

-- הסרת קשר לחטיבות מקטגוריות אם עדיין קיים
ALTER TABLE categories DROP COLUMN IF EXISTS division_id;

-- מחיקת טבלת החטיבות
DROP TABLE IF EXISTS divisions CASCADE;

-- וידוא שכל השירותים מחוברים לתתי קטגוריות תקינות
UPDATE services 
SET subcategory_id = (
  SELECT id FROM subcategories 
  LIMIT 1
) 
WHERE subcategory_id IS NULL OR subcategory_id NOT IN (SELECT id FROM subcategories);

-- עדכון חיבור יומן לשירותים
UPDATE services SET has_calendar_integration = true WHERE calendar_required = true;
