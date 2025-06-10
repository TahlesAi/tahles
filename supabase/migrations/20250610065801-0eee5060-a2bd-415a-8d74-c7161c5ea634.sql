
-- 1. מחיקת כפילויות של תת קטגוריה "אמני חושים" (נשמור רק את f72b5a67-4564-4f7e-b9ca-ff1052407955)
DELETE FROM subcategories 
WHERE name = 'אמני חושים' 
AND id != 'f72b5a67-4564-4f7e-b9ca-ff1052407955';

-- 2. מציאת ID של נטע ברסלר
-- (נבדוק שהוא קיים במערכת)
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
        -- 3. עדכון כל השירותים של נטע לתת הקטגוריה הנכונה
        UPDATE services 
        SET subcategory_id = 'f72b5a67-4564-4f7e-b9ca-ff1052407955'
        WHERE provider_id = neta_provider_id;
        
        -- 4. הוספת קישור בטבלת provider_subcategories (אם לא קיים)
        INSERT INTO provider_subcategories (provider_id, subcategory_id)
        VALUES (neta_provider_id, 'f72b5a67-4564-4f7e-b9ca-ff1052407955')
        ON CONFLICT (provider_id, subcategory_id) DO NOTHING;
        
        RAISE NOTICE 'עודכן ספק נטע ברסלר (ID: %) והשירותים שלו', neta_provider_id;
    ELSE
        RAISE NOTICE 'לא נמצא ספק נטע ברסלר במערכת';
    END IF;
END $$;

-- 5. עדכון כל השירותים שמקושרים לתתי קטגוריות שנמחקו
UPDATE services 
SET subcategory_id = 'f72b5a67-4564-4f7e-b9ca-ff1052407955'
WHERE subcategory_id NOT IN (SELECT id FROM subcategories)
AND (name ILIKE '%מנטליזם%' OR name ILIKE '%אמן חושים%' OR name ILIKE '%מחשבות%');

-- 6. ניקוי קישורים שבורים בטבלת provider_subcategories
DELETE FROM provider_subcategories 
WHERE subcategory_id NOT IN (SELECT id FROM subcategories);
