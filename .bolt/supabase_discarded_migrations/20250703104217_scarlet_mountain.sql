/*
  # Update products with Nashi Argan product

  1. Changes
    - Clear existing products
    - Add new Nashi Argan product based on product card
    - Update product information with realistic details

  2. Security
    - Maintains existing RLS policies
*/

-- Clear existing products
DELETE FROM products;

-- Insert the Nashi Argan product from the product card
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
  'Nashi Argan Oil',
  'nashi-argan-oil',
  'Olio di Argan puro al 100% per capelli secchi e danneggiati. Formula professionale che nutre, protegge e dona lucentezza straordinaria. Ideale per tutti i tipi di capelli, penetra rapidamente senza appesantire.',
  45.00,
  'Trattamenti',
  '/assets/productcard.png',
  25,
  true,
  '268e0ae9-c539-471c-b4c2-1663cf598436'
),
(
  'Nashi Argan Shampoo',
  'nashi-argan-shampoo',
  'Shampoo delicato arricchito con olio di Argan. Deterge dolcemente mentre nutre e protegge i capelli. Formula senza solfati per una pulizia rispettosa del cuoio capelluto.',
  28.00,
  'Shampoo',
  '/assets/product1.png',
  30,
  true,
  '268e0ae9-c539-471c-b4c2-1663cf598436'
),
(
  'Nashi Argan Conditioner',
  'nashi-argan-conditioner',
  'Balsamo nutriente con olio di Argan che districa e ammorbidisce i capelli. Dona morbidezza e lucentezza duratura senza appesantire.',
  32.00,
  'Balsami',
  '/assets/product2.png',
  28,
  true,
  '268e0ae9-c539-471c-b4c2-1663cf598436'
),
(
  'Nashi Argan Mask',
  'nashi-argan-mask',
  'Maschera intensiva riparatrice con olio di Argan. Trattamento profondo per capelli molto secchi e danneggiati. Risultati visibili dalla prima applicazione.',
  38.00,
  'Maschere',
  '/assets/product3.png',
  20,
  true,
  '268e0ae9-c539-471c-b4c2-1663cf598436'
),
(
  'Nashi Argan Leave-in',
  'nashi-argan-leave-in',
  'Trattamento senza risciacquo con olio di Argan. Protegge dal calore, controlla il crespo e dona lucentezza. Perfetto per lo styling quotidiano.',
  35.00,
  'Styling',
  '/assets/product4.png',
  22,
  true,
  '268e0ae9-c539-471c-b4c2-1663cf598436'
),
(
  'Nashi Argan Serum',
  'nashi-argan-serum',
  'Siero concentrato con olio di Argan per punte secche e danneggiate. Formula leggera che sigilla le cuticole e previene la rottura.',
  42.00,
  'Sieri',
  '/assets/product5.png',
  18,
  true,
  '268e0ae9-c539-471c-b4c2-1663cf598436'
);