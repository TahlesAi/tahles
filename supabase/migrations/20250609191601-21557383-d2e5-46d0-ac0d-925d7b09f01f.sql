
-- יצירת ספקים לדוגמה
INSERT INTO providers (name, description, email, phone, city, is_verified, rating, review_count) VALUES
('נטע ברסלר - אמן המחשבות', 'מנטליסט מקצועי עם ניסיון של 15 שנה. מתמחה במופעים אינטראקטיביים המשלבים קריאת מחשבות וניחושים מרהיבים.', 'neta@example.com', '050-1234567', 'תל אביב', true, 4.8, 156),
('שף דני כהן', 'שף פרטי מקצועי המתמחה בקייטרינג חלבי ובשרי. ניסיון של 12 שנה באירועים פרטיים.', 'danny@example.com', '052-9876543', 'הרצליה', true, 4.7, 89),
('להקת הרמוניה', 'להקה מוזיקלית רב-ז׳אנרית. מתאימה לכל סוגי האירועים - מקלאסי ועד מודרני.', 'harmony@example.com', '054-5555555', 'רמת גן', true, 4.9, 234),
('אולם הזהב', 'אולם אירועים יוקרתי הכולל עד 200 איש. כולל מטבח כשר וחניה פרטית.', 'golden@example.com', '03-1234567', 'פתח תקווה', true, 4.6, 67),
('בית קפה נייד קפה בדרך', 'בית קפה נייד מקצועי לאירועים. הכנת קפה איטלקי ושירות ברמה גבוהה.', 'coffee@example.com', '050-7777777', 'כפר סבא', true, 4.5, 123);

-- יצירת מוצרים לדוגמה
INSERT INTO services (
  name, description, provider_id, subcategory_id, base_price, price_unit, 
  duration_minutes, min_participants, max_participants, 
  is_visible, calendar_required, image_url
)
SELECT 
  'מופע מנטליזם מרכזי', 
  'מופע מרתק של קריאת מחשבות ומנטליזם לכל סוגי האירועים. כולל אינטראקציה עם הקהל וניחושים מדויקים.',
  p.id,
  s.id,
  2500,
  'לאירוע',
  45,
  20,
  200,
  true,
  true,
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
FROM providers p, subcategories s 
WHERE p.name = 'נטע ברסלר - אמן המחשבות' AND s.name = 'מנטליסטים'
LIMIT 1;

INSERT INTO services (
  name, description, provider_id, subcategory_id, base_price, price_unit, 
  duration_minutes, min_participants, max_participants, 
  is_visible, calendar_required, image_url
)
SELECT 
  'קייטרינג חלבי יוקרתי',
  'מגוון מנות חלביות עשירות ומעוצבות. כולל סלטים, דגים, פסטות ומאפים.',
  p.id,
  s.id,
  180,
  'לאדם',
  NULL,
  10,
  150,
  true,
  true,
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400'
FROM providers p, subcategories s 
WHERE p.name = 'שף דני כהן' AND s.name = 'קייטרינג חלבי'
LIMIT 1;

INSERT INTO services (
  name, description, provider_id, subcategory_id, base_price, price_unit, 
  duration_minutes, min_participants, max_participants, 
  is_visible, calendar_required, image_url
)
SELECT 
  'הופעה מוזיקלית - להקה',
  'הופעה מוזיקלית מגוונת הכוללת רפרטואר רחב. מתאימה לכל סוגי האירועים.',
  p.id,
  s.id,
  3500,
  'לאירוע',
  90,
  30,
  300,
  true,
  true,
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400'
FROM providers p, subcategories s 
WHERE p.name = 'להקת הרמוניה' AND s.name = 'להקות'
LIMIT 1;

INSERT INTO services (
  name, description, provider_id, subcategory_id, base_price, price_unit, 
  duration_minutes, min_participants, max_participants, 
  is_visible, calendar_required, image_url
)
SELECT 
  'השכרת אולם אירועים',
  'אולם מפואר הכולל במה, מערכת הגברה, תאורה מקצועית ומטבח כשר.',
  p.id,
  s.id,
  5000,
  'לאירוע',
  300,
  50,
  200,
  true,
  true,
  'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400'
FROM providers p, subcategories s 
WHERE p.name = 'אולם הזהב' AND s.name = 'אולמות אירועים'
LIMIT 1;

INSERT INTO services (
  name, description, provider_id, subcategory_id, base_price, price_unit, 
  duration_minutes, min_participants, max_participants, 
  is_visible, calendar_required, image_url
)
SELECT 
  'בית קפה נייד לאירועים',
  'שירות קפה איטלקי מקצועי באירועים. כולל בריסטה מנוסה וציוד מקצועי.',
  p.id,
  s.id,
  80,
  'לאדם',
  NULL,
  20,
  100,
  true,
  false,
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400'
FROM providers p, subcategories s 
WHERE p.name = 'בית קפה נייד קפה בדרך' AND s.name = 'בתי קפה ניידים'
LIMIT 1;
