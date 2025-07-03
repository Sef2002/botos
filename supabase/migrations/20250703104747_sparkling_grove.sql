/*
  # Update products with OXILOK

  1. New Tables
    - Updates `products` table with OXILOK as the main product
  2. Changes
    - Replaces existing products with OXILOK product line
    - Sets OXILOK as the first/featured product
    - Updates product information based on productcard.png
*/

-- Clear existing products
DELETE FROM products;

-- Insert OXILOK as the main featured product
INSERT INTO products (
  name,
  slug,
  description,
  price,
  category,
  image_url,
  stock,
  active,
  business_id
) VALUES (
  'OXILOK',
  'oxilok',
  'Trattamento professionale innovativo per capelli. Formula avanzata per risultati eccezionali in salone e a casa.',
  65.00,
  'Trattamenti',
  '/assets/productcard.png',
  30,
  true,
  '268e0ae9-c539-471c-b4c2-1663cf598436'
),
(
  'Shampoo Professionale 250ml',
  'shampoo-professionale-250ml',
  'Shampoo delicato per uso quotidiano. Formula professionale che deterge dolcemente rispettando l''equilibrio naturale del capello.',
  28.00,
  'Shampoo',
  '/assets/product1.png',
  18,
  true,
  '268e0ae9-c539-471c-b4c2-1663cf598436'
),
(
  'Conditioner Nutriente 250ml',
  'conditioner-nutriente-250ml',
  'Balsamo nutriente che districa e ammorbidisce i capelli. Dona morbidezza e lucentezza senza appesantire.',
  32.00,
  'Balsami',
  '/assets/product2.png',
  22,
  true,
  '268e0ae9-c539-471c-b4c2-1663cf598436'
),
(
  'Maschera Riparatrice 200ml',
  'maschera-riparatrice-200ml',
  'Maschera intensiva riparatrice per capelli danneggiati. Trattamento professionale per nutrire e riparare in profondità.',
  38.00,
  'Trattamenti',
  '/assets/product3.png',
  15,
  true,
  '268e0ae9-c539-471c-b4c2-1663cf598436'
),
(
  'Leave-in Protettivo 150ml',
  'leave-in-protettivo-150ml',
  'Trattamento senza risciacquo con protezione termica. Protegge dai danni del calore durante l''asciugatura e lo styling.',
  35.00,
  'Styling',
  '/assets/product4.png',
  20,
  true,
  '268e0ae9-c539-471c-b4c2-1663cf598436'
),
(
  'Serum Riparatore 100ml',
  'serum-riparatore-100ml',
  'Siero concentrato per punte secche e danneggiate. Formula intensiva che sigilla le cuticole e previene la rottura.',
  42.00,
  'Trattamenti',
  '/assets/product5.png',
  12,
  true,
  '268e0ae9-c539-471c-b4c2-1663cf598436'
);