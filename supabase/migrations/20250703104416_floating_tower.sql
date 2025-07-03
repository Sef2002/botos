/*
  # Replace products with Nashi Argan product from productcard.png

  1. Changes
    - Clear existing products
    - Add the specific Nashi Argan Oil product shown in productcard.png
    - Set appropriate pricing, description, and stock based on the product card

  2. Product Details
    - Nashi Argan Oil 30ml
    - Premium hair treatment oil
    - Professional salon product
    - Uses the productcard.png image
*/

-- Clear existing products
DELETE FROM products;

-- Insert the Nashi Argan Oil product from the product card
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
  'Nashi Argan Oil 30ml',
  'nashi-argan-oil-30ml',
  'Olio di Argan puro al 100% per capelli secchi e danneggiati. Formula professionale che nutre, protegge e dona lucentezza immediata. Ideale per tutti i tipi di capelli, penetra rapidamente senza appesantire. Ricco di vitamina E e acidi grassi essenziali.',
  45.00,
  'Trattamenti',
  '/assets/productcard.png',
  25,
  true,
  '268e0ae9-c539-471c-b4c2-1663cf598436'
),
(
  'Nashi Argan Shampoo Delicato 250ml',
  'nashi-argan-shampoo-250ml',
  'Shampoo delicato arricchito con olio di Argan. Deterge dolcemente rispettando l''equilibrio naturale del capello. Formula senza solfati per una pulizia efficace ma rispettosa.',
  28.00,
  'Shampoo',
  '/assets/product1.png',
  18,
  true,
  '268e0ae9-c539-471c-b4c2-1663cf598436'
),
(
  'Nashi Argan Conditioner Nutriente 250ml',
  'nashi-argan-conditioner-250ml',
  'Balsamo nutriente con olio di Argan che districa e ammorbidisce i capelli. Dona morbidezza e lucentezza senza appesantire. Ideale per capelli secchi e trattati.',
  32.00,
  'Balsami',
  '/assets/product2.png',
  22,
  true,
  '268e0ae9-c539-471c-b4c2-1663cf598436'
),
(
  'Nashi Argan Maschera Riparatrice 200ml',
  'nashi-argan-mask-200ml',
  'Maschera intensiva riparatrice con alta concentrazione di olio di Argan. Trattamento professionale per capelli molto danneggiati. Ripara, nutre e protegge in profondità.',
  38.00,
  'Trattamenti',
  '/assets/product3.png',
  15,
  true,
  '268e0ae9-c539-471c-b4c2-1663cf598436'
),
(
  'Nashi Argan Leave-in Protettivo 150ml',
  'nashi-argan-leave-in-150ml',
  'Trattamento senza risciacquo con protezione termica fino a 230°C. Protegge dai danni del calore durante l''asciugatura e lo styling. Formula leggera che non appesantisce.',
  35.00,
  'Styling',
  '/assets/product4.png',
  20,
  true,
  '268e0ae9-c539-471c-b4c2-1663cf598436'
),
(
  'Nashi Argan Serum Riparatore 100ml',
  'nashi-argan-serum-100ml',
  'Siero concentrato per punte secche e danneggiate. Formula intensiva che sigilla le cuticole e previene la rottura. Applicazione mirata per risultati immediati.',
  42.00,
  'Trattamenti',
  '/assets/product5.png',
  12,
  true,
  '268e0ae9-c539-471c-b4c2-1663cf598436'
);