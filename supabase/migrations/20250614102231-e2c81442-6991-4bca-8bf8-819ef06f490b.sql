
-- שלב מנקה: מוחק את הפונקציה הישנה אם קיימת
DROP FUNCTION IF EXISTS public.get_current_user_role();

-- יצירת הפונקציה מחדש עם הרשאות מתאימות
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
