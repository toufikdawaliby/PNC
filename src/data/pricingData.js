// ─── Paddle Pricing ──────────────────────────────────────────────────────────
export const paddlePlans = [
  {
    id: 'paddle-1h',
    duration: '1 Hour',
    price: 20,
    per: 'session',
    popular: false,
    features: ['Professional court', 'Paddle equipment included', 'Refreshment discount 10%', 'Locker access'],
  },
  {
    id: 'paddle-2h',
    duration: '2 Hours',
    price: 35,
    per: 'session',
    popular: true,
    features: ['Professional court', 'Paddle equipment included', 'Refreshment discount 15%', 'Locker access', 'Ball machine (30 min)'],
  },
  {
    id: 'paddle-member',
    duration: 'Member Package',
    price: 120,
    per: 'month',
    popular: false,
    features: ['Unlimited bookings*', '15% off all food & drinks', 'Priority reservations', 'Guest passes (2/month)', 'Dedicated locker'],
    note: '*Subject to availability, max 2h/day',
  },
]

export const paddleInfo = {
  totalCourts: 2,
  availableCourts: 1,
  operatingHours: '8:00 AM – 11:00 PM',
  location: 'Ground Floor',
  memberDiscount: 15,
  features: [
    'Glass-walled professional courts',
    'LED sports lighting',
    'Equipment rental available',
    'Coaching sessions on request',
    'Locker rooms & showers',
  ],
}

// ─── Network / Gaming Pricing ─────────────────────────────────────────────────
export const networkPlans = [
  {
    id: 'net-1h',
    duration: '1 Hour',
    price: 3,
    per: 'hour',
    popular: false,
    color: 'coffee',
    features: ['High-speed fiber internet', 'Gaming peripherals', 'Comfortable chair'],
  },
  {
    id: 'net-3h',
    duration: '3 Hours',
    price: 8,
    per: 'session',
    popular: false,
    color: 'coffee',
    features: ['High-speed fiber internet', 'Gaming peripherals', 'Comfortable chair', '1 free drink'],
  },
  {
    id: 'net-5h',
    duration: '5 Hours',
    price: 12,
    per: 'session',
    popular: true,
    color: 'accent',
    features: ['High-speed fiber internet', 'Gaming peripherals', 'Ergonomic gaming chair', '2 free drinks', 'Priority seat selection'],
  },
  {
    id: 'net-night',
    duration: 'Night Package',
    price: 15,
    per: 'package',
    popular: false,
    color: 'coffee',
    note: '10 PM – 8 AM',
    features: ['High-speed fiber internet', 'Gaming peripherals', 'Ergonomic gaming chair', '3 free drinks', 'Snack combo included'],
  },
]

export const networkInfo = {
  totalPCs: 20,
  internetSpeed: '500 Mbps',
  specs: 'Intel i9 / RTX 4080 / 165Hz Monitors',
  operatingHours: '8:00 AM – 12:00 AM (2:00 AM on weekends)',
  features: [
    '20 high-end gaming PCs',
    '500 Mbps fiber internet',
    'RTX 4080 gaming rigs',
    '165Hz displays',
    'Noise-cancelling headsets',
    'Ergonomic gaming chairs',
    'Personal charging station',
  ],
}
