
SELECT c.name AS category, COUNT(sc.id) AS subcategory_count
FROM public.categories c
LEFT JOIN public.subcategories sc ON sc.category_id = c.id
GROUP BY c.name
ORDER BY c.name;
