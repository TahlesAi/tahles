# 🧱 תרשים ישויות בסיסי (ERD Textual)

## User
- id
- name
- email
- phone
- verified
- wishlist[]
- bookings[]

## Supplier
- id
- name
- description
- region
- profile_media
- products[]
- calendar[]
- documents[]

## Product
- id
- name
- description
- price
- duration
- available_slots[]
- target_audience
- variants
- tags[]
- category_id
- supplier_id

## Booking
- id
- user_id
- product_ids[]
- status
- datetime
- total_price

## Concept
- id
- name
- parent_concept_id
- related_product_ids[]