
-- בדיקה של תת-קטגוריות קיימות
SELECT id, name, category_id FROM subcategories WHERE name ILIKE '%מנטל%' OR name ILIKE '%הרצא%' OR name ILIKE '%חוש%';

-- אם לא קיימות תת-קטגוריות מתאימות, ניצור אותן
INSERT INTO subcategories (name, description, category_id)
SELECT 'אמני חושים', 'מנטליסטים, קוסמים ואמני חושים', c.id
FROM categories c 
WHERE c.name ILIKE '%מופע%' OR c.name ILIKE '%בידור%'
ON CONFLICT DO NOTHING;

INSERT INTO subcategories (name, description, category_id)
SELECT 'הרצאות מקצועיות', 'הרצאות והכשרות מקצועיות', c.id
FROM categories c 
WHERE c.name ILIKE '%הרצא%' OR c.name ILIKE '%לימוד%'
ON CONFLICT DO NOTHING;
