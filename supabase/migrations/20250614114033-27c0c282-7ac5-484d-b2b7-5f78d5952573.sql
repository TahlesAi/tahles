
-- יצירת טבלה חדשה לסינונים של תתי-קונספטים
CREATE TABLE public.sub_concept_filters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sub_concept_id UUID NOT NULL REFERENCES public.sub_concepts(id) ON DELETE CASCADE,

  -- קהל יעד: מערך של מזהי קהל יעד (target_audiences)
  target_audience_ids UUID[],

  -- גילאים min/max
  min_age INTEGER,
  max_age INTEGER,

  -- אזורים: מערך של מזהי אזורים (geographic_areas)
  region_ids UUID[],

  -- תקציב: מינימום ומקסימום מתוך הטווח או חופשי
  min_budget NUMERIC,
  max_budget NUMERIC,
  budget_range_id UUID REFERENCES public.budget_ranges(id),

  -- סגנון האירוע (טקסט)
  event_style TEXT,

  -- ביטול חינם
  free_cancellation BOOLEAN,

  -- שפת השירות: מערך ערכים (למשל: ['עברית', 'אנגלית'])
  service_languages TEXT[],

  -- משך הפעילות בדקות
  duration_minutes INTEGER,

  -- סוג מיקום (טקסט חופשי או מערך)
  location_type TEXT,

  -- זמינות מיידית
  is_instant_booking BOOLEAN,

  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- שאילתת SQL לשליפת כל נתוני הסינון עבור כל תת-קונספט, כולל שמות ולא מזהים בלבד:
-- (דוגמה שחלק מהמידע הוא מערכים - השאילתה מציגה מספרי מזהה + שמות עבור קהל יעד ואזורים, שם טווח תקציב, וכו')

SELECT
  sc.id AS sub_concept_id,
  sc.name AS sub_concept_name,
  f.target_audience_ids,
  ta.name AS target_audience_names,
  f.min_age,
  f.max_age,
  f.region_ids,
  ga.name AS region_names,
  f.min_budget,
  f.max_budget,
  f.budget_range_id,
  br.name AS budget_range_name,
  f.event_style,
  f.free_cancellation,
  f.service_languages,
  f.duration_minutes,
  f.location_type,
  f.is_instant_booking
FROM public.sub_concepts sc
LEFT JOIN public.sub_concept_filters f ON sc.id = f.sub_concept_id
LEFT JOIN LATERAL (
  SELECT string_agg(name, ', ') AS name
  FROM public.target_audiences
  WHERE id = ANY(f.target_audience_ids)
) ta ON TRUE
LEFT JOIN LATERAL (
  SELECT string_agg(name, ', ') AS name
  FROM public.geographic_areas
  WHERE id = ANY(f.region_ids)
) ga ON TRUE
LEFT JOIN public.budget_ranges br ON f.budget_range_id = br.id
ORDER BY sc.order_index;

