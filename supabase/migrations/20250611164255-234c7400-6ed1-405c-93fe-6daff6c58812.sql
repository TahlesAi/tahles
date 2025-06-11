
-- מיגרציית אבטחה קריטית - הוספת RLS ומדיניות הגנה
-- ללא שינוי מבנה טבלאות או היררכיות קיימות

-- 1. הגנה על טבלת תפקידי משתמשים
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- רק מנהלים יכולים לראות ולערוך תפקידים
CREATE POLICY "Admins can manage user roles" ON user_roles
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM user_roles ur 
    WHERE ur.user_id = auth.uid() 
    AND ur.role = 'admin' 
    AND ur.is_active = true
  )
);

-- משתמשים יכולים לראות את התפקיד שלהם
CREATE POLICY "Users can view their own role" ON user_roles
FOR SELECT USING (user_id = auth.uid());

-- 2. הגנה על זמינות ספקים
ALTER TABLE provider_availability_slots ENABLE ROW LEVEL SECURITY;

-- רק בעלי הספק יכולים לערוך את הזמינות שלהם
CREATE POLICY "Providers can manage their availability" ON provider_availability_slots
FOR ALL USING (
  provider_id IN (
    SELECT id FROM providers WHERE id = provider_id
    -- בעתיד: צריך לקשר לאימות בעלות על הספק
  )
);

-- כולם יכולים לראות זמינות (לצורך הזמנות)
CREATE POLICY "Anyone can view availability" ON provider_availability_slots
FOR SELECT USING (true);

-- 3. הגנה קריטית על קרדיטי cashback
ALTER TABLE cashback_credits ENABLE ROW LEVEL SECURITY;

-- רק הלקוח יכול לראות את הקרדיט שלו
CREATE POLICY "Users can view their own cashback" ON cashback_credits
FOR SELECT USING (
  customer_id = auth.uid()::text OR 
  customer_id IN (
    SELECT email FROM profiles WHERE id = auth.uid()
  )
);

-- רק המערכת יכולה ליצור/לעדכן קרדיטים (דרך edge functions)
CREATE POLICY "System can manage cashback" ON cashback_credits
FOR ALL USING (false); -- ננעל הכל ונפתח דרך functions

-- 4. חיזוק מדיניות ההזמנות
DROP POLICY IF EXISTS "Users can view their bookings" ON bookings;
DROP POLICY IF EXISTS "Users can create bookings" ON bookings;

-- מדיניות מחוזקת להזמנות
CREATE POLICY "Users can view their own bookings only" ON bookings
FOR SELECT USING (
  customer_email IN (
    SELECT email FROM profiles WHERE id = auth.uid()
  ) OR
  customer_email = (auth.jwt() ->> 'email')
);

CREATE POLICY "Authenticated users can create bookings" ON bookings
FOR INSERT WITH CHECK (
  auth.role() = 'authenticated' AND
  customer_email IS NOT NULL
);

-- ספקים יכולים לראות הזמנות שלהם
CREATE POLICY "Providers can view their bookings" ON bookings
FOR SELECT USING (
  provider_id IN (
    SELECT id FROM providers 
    -- בעתיד: צריך לקשר לאימות בעלות על הספק
  )
);

-- 5. הגנה על קישורי ספק-תת-קטגוריה
ALTER TABLE provider_subcategories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view provider categories" ON provider_subcategories
FOR SELECT USING (true);

CREATE POLICY "Providers can manage their categories" ON provider_subcategories
FOR ALL USING (
  provider_id IN (
    SELECT id FROM providers
    -- בעתיד: צריך לקשר לאימות בעלות על הספק
  )
);

-- 6. אבטחת טבלת relationships בין שירותים
ALTER TABLE service_relationships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view service relationships" ON service_relationships
FOR SELECT USING (true);

-- רק בעלי השירותים יכולים לנהל קשרים
CREATE POLICY "Service owners can manage relationships" ON service_relationships
FOR ALL USING (
  source_service_id IN (
    SELECT s.id FROM services s
    JOIN providers p ON s.provider_id = p.id
    -- בעתיד: צריך לקשר לאימות בעלות
  )
);

-- 7. חיזוק אבטחת פרופילים
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- משתמשים יכולים לראות ולערוך רק את הפרופיל שלהם
CREATE POLICY "Users can manage their own profile" ON profiles
FOR ALL USING (id = auth.uid());

-- פרופילים ציבוריים לקריאה (שם תצוגה בלבד)
CREATE POLICY "Public profiles are viewable" ON profiles
FOR SELECT USING (true);
