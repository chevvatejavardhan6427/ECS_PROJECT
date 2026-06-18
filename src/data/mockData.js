export const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const defaultCenter = {
  lat: 12.9716,
  lng: 77.5946,
};

export const currentUser = {
  id: 'demo-user-01',
  name: 'Ananya Rao',
  email: 'ananya@lifelink.app',
  role: 'donor',
  age: 29,
  bloodGroup: 'O+',
  isAvailable: true,
  lastDonationDate: '2025-12-05T00:00:00.000Z',
  eligibilityStatus: 'Eligible in 12 days',
  location: { ...defaultCenter, label: 'Central Bengaluru radius' },
};

export const overviewStats = [
  { label: 'Total donors', value: '18.4K+', detail: 'Verified across cities' },
  { label: 'Lives saved', value: '42K+', detail: 'Tracked via fulfilled requests' },
  { label: 'Active camps', value: '126', detail: 'Verified and upcoming' },
];

export const quotes = [
  'Donate blood, save lives',
  'Be the reason someone smiles today',
  'A small act of kindness can keep a heartbeat going',
];

export const donors = [
  {
    id: 'donor-1',
    name: 'Riya Menon',
    age: 26,
    bloodGroup: 'O+',
    isAvailable: true,
    matchScore: 96,
    distanceKm: 2.1,
    city: 'Indiranagar',
    approximateLocation: 'Within 3 km of Indiranagar',
    lastDonationDate: '2025-10-12T00:00:00.000Z',
    eligibilityStatus: 'Eligible now',
    location: { lat: 12.9784, lng: 77.6408 },
  },
  {
    id: 'donor-2',
    name: 'Arjun Shah',
    age: 32,
    bloodGroup: 'A+',
    isAvailable: true,
    matchScore: 88,
    distanceKm: 4.6,
    city: 'Koramangala',
    approximateLocation: 'Within 5 km of Koramangala',
    lastDonationDate: '2025-09-21T00:00:00.000Z',
    eligibilityStatus: 'Eligible now',
    location: { lat: 12.9352, lng: 77.6245 },
  },
  {
    id: 'donor-3',
    name: 'Fatima Khan',
    age: 30,
    bloodGroup: 'B+',
    isAvailable: false,
    matchScore: 74,
    distanceKm: 6.2,
    city: 'Malleshwaram',
    approximateLocation: 'Within 7 km of Malleshwaram',
    lastDonationDate: '2026-02-05T00:00:00.000Z',
    eligibilityStatus: 'Eligible on May 6, 2026',
    location: { lat: 13.0034, lng: 77.5696 },
  },
  {
    id: 'donor-4',
    name: 'Vikram Patel',
    age: 35,
    bloodGroup: 'AB+',
    isAvailable: true,
    matchScore: 83,
    distanceKm: 8.3,
    city: 'Jayanagar',
    approximateLocation: 'Within 9 km of Jayanagar',
    lastDonationDate: '2025-11-11T00:00:00.000Z',
    eligibilityStatus: 'Eligible now',
    location: { lat: 12.9279, lng: 77.5938 },
  },
  {
    id: 'donor-5',
    name: 'Mehul Desai',
    age: 28,
    bloodGroup: 'O-',
    isAvailable: true,
    matchScore: 92,
    distanceKm: 9.7,
    city: 'Whitefield',
    approximateLocation: 'Within 10 km of Whitefield',
    lastDonationDate: '2025-08-15T00:00:00.000Z',
    eligibilityStatus: 'Eligible now',
    location: { lat: 12.9698, lng: 77.7499 },
  },
];

export const hospitals = [
  {
    id: 'hospital-1',
    name: 'CityCare Hospital',
    type: 'Hospital',
    location: { lat: 12.9675, lng: 77.6033 },
  },
  {
    id: 'hospital-2',
    name: 'Starlight Medical Center',
    type: 'Hospital',
    location: { lat: 12.9916, lng: 77.5712 },
  },
];

export const bloodBanks = [
  {
    id: 'bank-1',
    name: 'Metro Blood Bank',
    type: 'Blood Bank',
    location: { lat: 12.9588, lng: 77.5965 },
  },
  {
    id: 'bank-2',
    name: 'Hope Plasma Center',
    type: 'Blood Bank',
    location: { lat: 12.9484, lng: 77.6312 },
  },
];

export const camps = [
  {
    id: 'camp-1',
    title: 'Saturday Lifesaver Camp',
    organizer: 'LifeLink Foundation',
    description: 'Community blood donation drive with on-site hemoglobin screening and hydration lounge.',
    startsAt: '2026-03-28T08:30:00.000Z',
    endsAt: '2026-03-28T16:30:00.000Z',
    registeredCount: 142,
    capacity: 220,
    isVerified: true,
    location: {
      label: 'Cubbon Park Community Hall',
      lat: 12.9758,
      lng: 77.5928,
    },
  },
  {
    id: 'camp-2',
    title: 'Campus Organ Awareness & Donation Drive',
    organizer: 'Bengaluru Medical Trust',
    description: 'Student-led session covering blood donation, stem cell awareness, and organ pledge enrollment.',
    startsAt: '2026-04-02T10:00:00.000Z',
    endsAt: '2026-04-02T17:00:00.000Z',
    registeredCount: 88,
    capacity: 160,
    isVerified: true,
    location: {
      label: 'Indiranagar Youth Center',
      lat: 12.9719,
      lng: 77.6412,
    },
  },
  {
    id: 'camp-3',
    title: 'Women Donors Wellness Camp',
    organizer: 'Red Thread Collective',
    description: 'Focused counseling, nutritional advice, and verified blood donation camp for recurring donors.',
    startsAt: '2026-04-10T09:00:00.000Z',
    endsAt: '2026-04-10T15:00:00.000Z',
    registeredCount: 41,
    capacity: 120,
    isVerified: false,
    location: {
      label: 'Jayanagar Civic Center',
      lat: 12.9282,
      lng: 77.5821,
    },
  },
];

export const notifications = [
  {
    id: 'notification-1',
    type: 'request',
    title: 'Critical O+ request nearby',
    message: 'A verified hospital 3.8 km away needs O+ donors within 90 minutes.',
    createdAt: '2026-03-25T13:15:00.000Z',
    isRead: false,
  },
  {
    id: 'notification-2',
    type: 'camp',
    title: 'Camp reminder',
    message: 'Your registered camp starts on March 28, 2026 at 8:30 AM.',
    createdAt: '2026-03-25T09:30:00.000Z',
    isRead: true,
  },
  {
    id: 'notification-3',
    type: 'eligibility',
    title: 'Eligibility update',
    message: 'You will be eligible to donate blood again in 12 days.',
    createdAt: '2026-03-24T16:00:00.000Z',
    isRead: false,
  },
];

export const emergencyRequests = [
  {
    id: 'request-1',
    requesterName: 'NIMHANS Trauma Wing',
    bloodGroup: 'O+',
    units: 2,
    priority: 'Critical',
    hospitalName: 'NIMHANS',
    distanceKm: 3.8,
    createdAt: '2026-03-25T12:50:00.000Z',
    reason: 'Road accident emergency',
    status: 'Open',
    isFlagged: false,
    location: { lat: 12.9430, lng: 77.5969 },
  },
  {
    id: 'request-2',
    requesterName: 'Apollo Emergency Desk',
    bloodGroup: 'A-',
    units: 1,
    priority: 'Normal',
    hospitalName: 'Apollo Hospital',
    distanceKm: 7.2,
    createdAt: '2026-03-25T10:10:00.000Z',
    reason: 'Planned surgery support',
    status: 'Matched',
    isFlagged: false,
    location: { lat: 12.8972, lng: 77.5994 },
  },
  {
    id: 'request-3',
    requesterName: 'Unverified Walk-in',
    bloodGroup: 'AB-',
    units: 6,
    priority: 'Critical',
    hospitalName: 'Unknown',
    distanceKm: 11.1,
    createdAt: '2026-03-25T08:40:00.000Z',
    reason: 'No clinical details provided',
    status: 'Under review',
    isFlagged: true,
    location: { lat: 12.9150, lng: 77.6328 },
  },
];

export const awarenessContent = {
  hero: {
    title: 'Organ donation awareness that turns intent into action',
    subtitle: 'Clear information, myth-busting guidance, and a simple pledge flow help more families say yes with confidence.',
  },
  mythsVsFacts: [
    {
      myth: 'Doctors will not try as hard to save organ donors.',
      fact: 'Medical teams treating a patient are separate from transplant coordination teams. Saving the patient always comes first.',
    },
    {
      myth: 'Most people are too old or not healthy enough to pledge.',
      fact: 'Medical suitability is evaluated at the time of donation. Age alone rarely disqualifies someone.',
    },
    {
      myth: 'Organ donation delays funeral arrangements for days.',
      fact: 'Transplant teams work on precise schedules. Families can still proceed with funeral plans respectfully and quickly.',
    },
  ],
  steps: [
    'Discuss your decision with your family and emergency contact.',
    'Keep your health profile up to date so eligibility checks are faster.',
    'Use the pledge form to record your intent and organ donation preferences.',
  ],
};

export const adminAnalytics = {
  donors: 18428,
  requestsFulfilled: 6912,
  activeCamps: 126,
  flaggedRequests: 7,
  fakeAccountsRemoved: 41,
};

export const adminUsers = [
  {
    id: 'user-1',
    name: 'Priya Shetty',
    email: 'priya@example.com',
    role: 'donor',
    bloodGroup: 'B+',
    status: 'Verified',
  },
  {
    id: 'user-2',
    name: 'Rahul Nair',
    email: 'rahul@example.com',
    role: 'recipient',
    bloodGroup: 'A-',
    status: 'Watchlist',
  },
  {
    id: 'user-3',
    name: 'Admin Kavya',
    email: 'kavya@example.com',
    role: 'admin',
    bloodGroup: 'O+',
    status: 'Verified',
  },
];
