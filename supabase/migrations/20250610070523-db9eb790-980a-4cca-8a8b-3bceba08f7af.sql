
-- עדכון פרטי נטע ברסלר עם התמונות החדשות
DO $$
DECLARE
    neta_provider_id uuid;
BEGIN
    -- מציאת נטע ברסלר
    SELECT id INTO neta_provider_id 
    FROM providers 
    WHERE name ILIKE '%נטע ברסלר%' OR name ILIKE '%אמן המחשבות%'
    LIMIT 1;
    
    IF neta_provider_id IS NOT NULL THEN
        -- עדכון פרטי הספק עם התמונות החדשות
        UPDATE providers 
        SET 
            logo_url = '/lovable-uploads/dec3a07c-5760-46de-8667-f64d47df6447.png',
            description = 'נטע ברסלר - אמן המחשבות, מנטליסט ישראלי מוביל המתמחה במופעי מנטליזם מרתקים ומותאמים אישית לכל סוג של אירוע. עם ניסיון עשיר במופעים עסקיים ופרטיים, נטע מביא חוויה בלתי נשכחת המשלבת אומנות, פסיכולוגיה וקסם.',
            is_verified = true,
            rating = 4.9,
            review_count = 127
        WHERE id = neta_provider_id;
        
        -- מחיקת השירותים הקיימים של נטע
        DELETE FROM services WHERE provider_id = neta_provider_id;
        
        -- הוספת 5 השירותים החדשים של נטע
        INSERT INTO services (
            id, provider_id, name, description, base_price, price_unit, duration_minutes,
            min_participants, max_participants, subcategory_id, image_url, 
            target_age_groups, event_types, service_language, is_visible, has_calendar_integration
        ) VALUES 
        -- 1. מופע נודד
        (
            gen_random_uuid(), neta_provider_id, 'מופע נודד',
            'מופע מנטליזם אינטימי ומותאם אישית שמתאים לכל מקום - בית, משרד, או כל סביבה קטנה. המופע כולל אינטראקציה ישירה עם הקהל וחוויה אישית בלתי נשכחת.',
            2500, 'למופע', 45, 5, 25, 'f72b5a67-4564-4f7e-b9ca-ff1052407955',
            '/lovable-uploads/33049452-08d3-4f00-b0b1-98fe7d42c906.png',
            ARRAY['מבוגרים', 'בוגרים'], ARRAY['אירועי חברה', 'ערב גיבוש', 'מסיבות פרטיות'],
            ARRAY['עברית'], true, true
        ),
        -- 2. מופע במה
        (
            gen_random_uuid(), neta_provider_id, 'מופע במה',
            'מופע מנטליזם מרכזי ומרשים המתאים לאירועים גדולים. כולל הפעלת קהל רחבה, טריקים מרהיבים וחוויה קולקטיבית מותחת.',
            4500, 'למופע', 60, 30, 300, 'f72b5a67-4564-4f7e-b9ca-ff1052407955',
            '/lovable-uploads/33049452-08d3-4f00-b0b1-98fe7d42c906.png',
            ARRAY['מבוגרים', 'בוגרים'], ARRAY['אירועי חברה', 'כנסים', 'ערבי גאלה'],
            ARRAY['עברית'], true, true
        ),
        -- 3. מופע משולב
        (
            gen_random_uuid(), neta_provider_id, 'מופע משולב',
            'שילוב מושלם של מופע קבלת פנים ומופע מרכזי. מתחיל עם מנטליזם אינטימי בין האורחים ומסתיים במופע מרכזי מרהיב.',
            6000, 'למופע', 90, 25, 200, 'f72b5a67-4564-4f7e-b9ca-ff1052407955',
            '/lovable-uploads/33049452-08d3-4f00-b0b1-98fe7d42c906.png',
            ARRAY['מבוגרים', 'בוגרים'], ARRAY['אירועי חברה', 'ערב גיבוש', 'חתונות'],
            ARRAY['עברית'], true, true
        ),
        -- 4. הרצאה במחשבה שניה
        (
            gen_random_uuid(), neta_provider_id, 'הרצאה במחשבה שניה',
            'הרצאה מרתקת המשלבת מנטליזם עם תובנות על כוח המחשבה, קריאת אנשים ופסיכולוגיה. מתאימה לכנסים עסקיים ואירועי העשרה.',
            3500, 'להרצאה', 50, 20, 150, 'f72b5a67-4564-4f7e-b9ca-ff1052407955',
            '/lovable-uploads/33049452-08d3-4f00-b0b1-98fe7d42c906.png',
            ARRAY['מבוגרים', 'בוגרים'], ARRAY['הרצאות', 'כנסים', 'אירועי חברה'],
            ARRAY['עברית'], true, true
        ),
        -- 5. מופע ERROR - לחברות היטק
        (
            gen_random_uuid(), neta_provider_id, 'מופע ERROR - לחברות היטק',
            'מופע מנטליזם ייחודי המותאם במיוחד לעולם ההיטק והטכנולוגיה. כולל התייחסויות לעולם הדיגיטלי, בינה מלאכותית וחשיבה אלגוריתמית.',
            5500, 'למופע', 55, 15, 100, 'f72b5a67-4564-4f7e-b9ca-ff1052407955',
            '/lovable-uploads/33049452-08d3-4f00-b0b1-98fe7d42c906.png',
            ARRAY['מבוגרים', 'בוגרים'], ARRAY['אירועי חברה', 'ערב גיבוש', 'כנסים'],
            ARRAY['עברית'], true, true
        );
        
        RAISE NOTICE 'עודכן נטע ברסלר עם 5 מוצרים חדשים';
    ELSE
        RAISE NOTICE 'לא נמצא ספק נטע ברסלר במערכת';
    END IF;
END $$;
