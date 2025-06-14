
-- מחיקת מבנה קודם כולל תלות
DROP TABLE IF EXISTS public.main_concepts CASCADE;
DROP TABLE IF EXISTS public.sub_concepts CASCADE;
DROP TABLE IF EXISTS public.target_audiences CASCADE;
DROP TABLE IF EXISTS public.geographic_areas CASCADE;
DROP TABLE IF EXISTS public.budget_ranges CASCADE;

-- יצירת טבלת קונספטים ראשיים
CREATE TABLE public.main_concepts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- יצירת טבלת תתי קונספטים
CREATE TABLE public.sub_concepts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    main_concept_id UUID REFERENCES public.main_concepts(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- יצירת טבלת קהלי יעד
CREATE TABLE public.target_audiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    age_range TEXT,
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- יצירת טבלת אזורים גיאוגרפיים
CREATE TABLE public.geographic_areas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    cities TEXT[] DEFAULT '{}',
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- יצירת טבלת טווחי תקציב
CREATE TABLE public.budget_ranges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    min_amount NUMERIC,
    max_amount NUMERIC,
    description TEXT,
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- הוספת עמודות נדרשות לטבלת services
ALTER TABLE public.services 
ADD COLUMN IF NOT EXISTS main_concept_ids UUID[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS sub_concept_ids UUID[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS target_audience_ids UUID[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS geographic_area_ids UUID[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS budget_range_id UUID REFERENCES public.budget_ranges(id),
ADD COLUMN IF NOT EXISTS location_types TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS service_types TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS duration_category TEXT,
ADD COLUMN IF NOT EXISTS auto_assigned_concepts TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS requires_admin_approval BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS wishlist_enabled BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS rating_enabled BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS remote_signing_enabled BOOLEAN DEFAULT false;

-- הכנסת נתוני דוגמה לקונספטים ראשיים
INSERT INTO public.main_concepts (name, description, icon, order_index) VALUES
('אירועים משפחתיים', 'חתונות, בר מצווה, ימי הולדת ואירועי משפחה', 'Heart', 1),
('אירועים עסקיים', 'כנסים, גיבושים, אירועי חברה', 'Building', 2),
('פנאי ובילוי', 'מסיבות, בילויים וחוויות פנאי', 'Music', 3),
('הרצאות וסדנאות', 'הרצאות, הכשרות וסדנאות מקצועיות', 'GraduationCap', 4);

-- הכנסת תתי קונספטים לדוגמה
INSERT INTO public.sub_concepts (main_concept_id, name, description, order_index)
SELECT mc.id, sc.name, sc.description, sc.order_index
FROM public.main_concepts mc
CROSS JOIN (VALUES
    ('חתונה', 'אירוע חתונה מלא', 1),
    ('בר מצווה', 'חגיגת בר מצווה', 2),
    ('בת מצווה', 'חגיגת בת מצווה', 3),
    ('יום הולדת', 'חגיגת יום הולדת', 4),
    ('אירוע זוגי', 'אירוע רומנטי לזוגות', 5)
) AS sc(name, description, order_index)
WHERE mc.name = 'אירועים משפחתיים'

UNION ALL

SELECT mc.id, sc.name, sc.description, sc.order_index
FROM public.main_concepts mc
CROSS JOIN (VALUES
    ('כנס עסקי', 'כנס מקצועי או עסקי', 1),
    ('גיבוש צוות', 'יום גיבוש לעובדים', 2),
    ('השקת מוצר', 'אירוע השקת מוצר חדש', 3),
    ('אירוע לקוחות', 'אירוע מיוחד ללקוחות', 4),
    ('הרמת כוסית', 'אירוע חגיגי בחברה', 5)
) AS sc(name, description, order_index)
WHERE mc.name = 'אירועים עסקיים';

-- הכנסת קהלי יעד לדוגמה
INSERT INTO public.target_audiences (name, description, age_range, order_index) VALUES
('ילדים', 'גילאי 3-12', '3-12', 1),
('נוער', 'גילאי 13-18', '13-18', 2),
('צעירים', 'גילאי 19-35', '19-35', 3),
('מבוגרים', 'גילאי 36-65', '36-65', 4),
('קשישים', 'גילאי 65+', '65+', 5),
('משפחות', 'אירועי משפחה', 'כל הגילאים', 6);

-- הכנסת אזורים גיאוגרפיים לדוגמה
INSERT INTO public.geographic_areas (name, description, cities, order_index) VALUES
('מרכז', 'אזור המרכז', ARRAY['תל אביב', 'רמת גן', 'גבעתיים', 'הרצליה'], 1),
('ירושלים', 'ירושלים והסביבה', ARRAY['ירושלים', 'בית שמש', 'מעלה אדומים'], 2),
('צפון', 'אזור הצפון', ARRAY['חיפה', 'עכו', 'נהריה', 'קריות'], 3),
('דרום', 'אזור הדרום', ARRAY['באר שבע', 'אשדוד', 'אשקלון', 'אילת'], 4);

-- הכנסת טווחי תקציב לדוגמה
INSERT INTO public.budget_ranges (name, min_amount, max_amount, description, order_index) VALUES
('תקציב נמוך', 0, 5000, 'עד 5,000 ש"ח', 1),
('תקציב בינוני', 5000, 15000, '5,000-15,000 ש"ח', 2),
('תקציב גבוה', 15000, 50000, '15,000-50,000 ש"ח', 3),
('תקציב פרימיום', 50000, NULL, '50,000+ ש"ח', 4);
