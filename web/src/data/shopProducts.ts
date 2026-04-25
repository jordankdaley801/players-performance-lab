export type Product = {
  id: string
  name: string
  price: number
  category: 'apparel' | 'equipment' | 'accessories'
  image: string
  badge?: string
}

export const products: Product[] = [
  {
    id: 'tee-fieldhouse',
    name: 'Fieldhouse Performance Tee',
    price: 32,
    category: 'apparel',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
  },
  {
    id: 'hoodie-ppl',
    name: 'PPL + KinetiQ Hoodie',
    price: 68,
    category: 'apparel',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80',
    badge: 'Team favorite',
  },
  {
    id: 'batting-gloves',
    name: 'Pro Batting Gloves',
    price: 45,
    category: 'equipment',
    image: 'https://images.unsplash.com/photo-1566577739112-5180d61bae39?w=600&q=80',
  },
  {
    id: 'weighted-balls',
    name: 'Velocity Weighted Ball Set',
    price: 89,
    category: 'equipment',
    image: 'https://images.unsplash.com/photo-1560272569-cf3a25d5b6db?w=600&q=80',
  },
  {
    id: 'snapback',
    name: 'Players Lab Snapback',
    price: 28,
    category: 'apparel',
    image: 'https://images.unsplash.com/photo-1588850561407-ed74c2bd89b5?w=600&q=80',
  },
  {
    id: 'arm-care-kit',
    name: 'Arm Care Resistance Kit',
    price: 54,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80',
  },
  {
    id: 'bat-maple',
    name: 'Maple Training Bat',
    price: 129,
    category: 'equipment',
    image: 'https://images.unsplash.com/photo-1471295253337-3ceaaedca402?w=600&q=80',
  },
  {
    id: 'socks-compression',
    name: 'Compression Crew Socks (2-pack)',
    price: 22,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1586350977773-bdb07623a7d0?w=600&q=80',
  },
]
