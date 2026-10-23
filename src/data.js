export const products = [
  {
    id: 'graphic-longsleeve',
    name: 'MASTER GRAPHIC LONG SLEEVE',
    railName: 'Graphic Long Sleeve — White',
    price: 4200,
    description: 'Oversized heavyweight cotton with printed sleeve artwork and a relaxed, dropped shoulder.',
    variants: [
      { id: 'white', name: 'White', hex: '#e9e8e1', front: '/products/white-longsleeve.webp' },
    ],
  },
  {
    id: 'never-ordinary-tee',
    name: 'NEVER ORDINARY TEE',
    railName: 'Never Ordinary Tee — Black',
    price: 3600,
    description: 'A heavyweight oversized tee with distressed collegiate artwork and a soft washed finish.',
    variants: [
      { id: 'black', name: 'Black', hex: '#181918', front: '/products/black-tee.webp', back: '/products/black-tee-back.webp' },
    ],
  },
  {
    id: 'painted-tank',
    name: 'DISTRESSED PAINTED LOGO TANK TOP',
    railName: 'Distressed Logo Tank — Black',
    price: 3200,
    description: 'Vintage-washed cotton, hand-finished distressing and paint speckles. Every piece is slightly different.',
    variants: [
      { id: 'black', name: 'Black', hex: '#20201f', front: '/products/tank-black-front.webp', back: '/products/tank-black-back.webp' },
      { id: 'bone', name: 'Bone', hex: '#b8a084', front: '/products/tank-bone-front.webp', back: '/products/tank-bone-back.webp' },
    ],
  },
  {
    id: 'club-varsity',
    name: 'MASTER CLUB VARSITY JACKET',
    railName: 'Club Varsity — Cream / Black',
    price: 9800,
    description: 'A premium wool-body varsity jacket with contrast sleeves, striped ribbing and embroidered patches.',
    variants: [
      { id: 'cream', name: 'Cream', hex: '#ddd4bc', front: '/products/varsity.webp' },
    ],
  },
  {
    id: 'work-shirt',
    name: 'MASTER COTTON WORK SHIRT',
    railName: 'Cotton Work Shirt — Powder Blue',
    price: 5200,
    description: 'A boxy short-sleeve work shirt cut from crisp cotton twill with subtle chest embroidery.',
    variants: [
      { id: 'blue', name: 'Blue', hex: '#8dbbd5', front: '/products/blue-shirt.webp' },
    ],
  },
  {
    id: 'motion-jacket',
    name: 'MASTER MOTION TRACK JACKET',
    railName: 'Motion Track Jacket — Yellow',
    price: 7400,
    description: 'Lightweight technical nylon with contrast side panels, a high collar and clean master branding.',
    variants: [
      { id: 'yellow', name: 'Yellow', hex: '#f0d61e', front: '/products/yellow-jacket.webp' },
    ],
  },
  {
    id: 'studio-hoodie',
    name: 'MASTER STUDIO HOODIE',
    railName: 'Studio Hoodie — Ivory',
    price: 6200,
    description: 'An oversized fleece hoodie with a generous hood, dropped shoulders and tonal green embroidery.',
    variants: [
      { id: 'ivory', name: 'Ivory', hex: '#e9e6dc', front: '/products/white-hoodie.webp' },
    ],
  },
];

export const sizes = ['XS', 'S', 'M', 'L', 'XL'];

export const formatPrice = (price) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
