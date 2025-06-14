
-- פתרון לבעיית ה-infinite recursion ב-user_roles
-- ביטול כל ה-policies הקיימים על user_roles
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can manage their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;

-- יצירת פונקציה security definer לבדיקת תפקידים (מונעת recursion)
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
BEGIN
  RETURN (
    SELECT role 
    FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND is_active = true 
    LIMIT 1
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- יצירת פונקציה לבדיקה אם משתמש הוא מנהל
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    SELECT EXISTS(
      SELECT 1 
      FROM public.user_roles 
      WHERE user_id = auth.uid() 
      AND role IN ('מנהל-על', 'מנהל') 
      AND is_active = true
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- פוליסיות חדשות ללא recursion
CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can view all roles" ON public.user_roles
  FOR SELECT USING (public.is_admin());

CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL USING (public.is_admin());

-- עדכון המבנה החדש - 6 קטגוריות ראשיות
-- ביטול הקטגוריות הקיימות ויצירת המבנה החדש
DELETE FROM public.subcategories;
DELETE FROM public.categories;

-- הוספת 6 הקטגוריות החדשות
INSERT INTO public.categories (name, description, icon, order_index) VALUES
('לוקיישנים', 'אולמות, גנים, חופים ומקומות לאירועים', 'MapPin', 1),
('מזון ומשקאות', 'קייטרינג, שף פרטי, בר ושירותי מזון', 'UtensilsCrossed', 2),
('מופעים ובמה', 'אמנים, זמרים, קוסמים ומופעים', 'Music', 3),
('שירותי הפקה', 'הגברה, צילום, אבטחה ושירותי הפקה', 'Settings', 4),
('הרצאות והכשרות', 'העשרה, גיבוש צוות והכשרות', 'GraduationCap', 5),
('אטרקציות', 'כרטיסים, מתנות, טיולים ואטרקציות', 'Gift', 6);

-- הוספת תת-קטגוריות - לוקיישנים
INSERT INTO public.subcategories (category_id, name, description, order_index)
SELECT c.id, 'אולמות אירועים', 'אולמות מפוארים לאירועים גדולים', 1
FROM public.categories c WHERE c.name = 'לוקיישנים';

INSERT INTO public.subcategories (category_id, name, description, order_index)
SELECT c.id, 'גנים וחופים', 'מקומות טבעיים לאירועים בחוץ', 2
FROM public.categories c WHERE c.name = 'לוקיישנים';

-- מזון ומשקאות
INSERT INTO public.subcategories (category_id, name, description, order_index)
SELECT c.id, 'קייטרינג', 'שירותי קייטרינג מקצועיים', 1
FROM public.categories c WHERE c.name = 'מזון ומשקאות';

INSERT INTO public.subcategories (category_id, name, description, order_index)
SELECT c.id, 'שף פרטי ובר', 'שירותי שף פרטי ובר לאירועים', 2
FROM public.categories c WHERE c.name = 'מזון ומשקאות';

-- מופעים ובמה
INSERT INTO public.subcategories (category_id, name, description, order_index)
SELECT c.id, 'זמרים ונגנים', 'אמני מוזיקה מקצועיים', 1
FROM public.categories c WHERE c.name = 'מופעים ובמה';

INSERT INTO public.subcategories (category_id, name, description, order_index)
SELECT c.id, 'קוסמים ושחקנים', 'מופעי קסמים ותיאטרון', 2
FROM public.categories c WHERE c.name = 'מופעים ובמה';

-- שירותי הפקה
INSERT INTO public.subcategories (category_id, name, description, order_index)
SELECT c.id, 'צילום וקולנוע', 'שירותי צילום ווידאו מקצועיים', 1
FROM public.categories c WHERE c.name = 'שירותי הפקה';

INSERT INTO public.subcategories (category_id, name, description, order_index)
SELECT c.id, 'הגברה ואבטחה', 'שירותי הגברה ואבטחה לאירועים', 2
FROM public.categories c WHERE c.name = 'שירותי הפקה';

-- הרצאות והכשרות
INSERT INTO public.subcategories (category_id, name, description, order_index)
SELECT c.id, 'הרצאות העשרה', 'הרצאות וסדנאות העשרה', 1
FROM public.categories c WHERE c.name = 'הרצאות והכשרות';

INSERT INTO public.subcategories (category_id, name, description, order_index)
SELECT c.id, 'גיבוש צוות', 'פעילויות גיבוש ופיתוח צוות', 2
FROM public.categories c WHERE c.name = 'הרצאות והכשרות';

-- אטרקציות
INSERT INTO public.subcategories (category_id, name, description, order_index)
SELECT c.id, 'כרטיסים והופעות', 'כרטיסים להופעות ואירועים', 1
FROM public.categories c WHERE c.name = 'אטרקציות';

INSERT INTO public.subcategories (category_id, name, description, order_index)
SELECT c.id, 'מתנות וטיולים', 'מתנות לאירועים וטיולים מאורגנים', 2
FROM public.categories c WHERE c.name = 'אטרקציות';
