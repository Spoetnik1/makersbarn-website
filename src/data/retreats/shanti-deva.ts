import {
  RetreatData,
  RetreatId,
  RetreatDateId,
  ScheduleDayType,
} from '@/types'

export const SHANTI_DEVA_RETREAT: RetreatData = {
  id: RetreatId.SHANTI_DEVA,
  slug: 'shanti-deva-retreat',
  heroImage: '/images/buddhist-retreat.png',

  teachers: [
    {
      id: 'geshe-pema-dorjee',
      name: 'Gen La Geshe Pema Dorjee',
      title: 'gesheTitle',
      imageUrl: '/images/retreats/geshe-pema-dorjee.jpg',
    },
    {
      id: 'monk-lobsang',
      name: 'Monk Lobsang',
      title: 'monkTitle',
      imageUrl: '/images/retreats/monk-lobsang.jpg',
    },
  ],

  dates: [
    {
      id: RetreatDateId.JUNE_2026,
      startDate: '2026-06-19',
      endDate: '2026-06-24',
    },
    {
      id: RetreatDateId.AUGUST_2026,
      startDate: '2026-08-04',
      endDate: '2026-08-09',
    },
  ],

  duration: '5nights6days',
  dailyTime: '7amTo8pm',

  location: {
    nameKey: 'countrysideFarm',
    address: 'Duisterendijk 2, Wijhe, Netherlands',
    accessibilityKeys: [
      'carFromZwolle',
      'freePickup',
      'sharedTransport',
    ],
  },

  schedule: [
    {
      dayType: ScheduleDayType.ARRIVAL,
      items: [
        { time: '14:00-17:00', activityKey: 'arrivalCheckin' },
        { time: '17:00-18:00', activityKey: 'farmTour' },
        { time: '18:00-19:00', activityKey: 'dinner' },
        { time: '19:00-20:00', activityKey: 'introProgram' },
      ],
    },
    {
      dayType: ScheduleDayType.STUDY,
      items: [
        { time: '07:00-08:00', activityKey: 'guidedMeditation' },
        { time: '08:00-09:00', activityKey: 'breakfast' },
        { time: '09:00-12:00', activityKey: 'morningTeaching' },
        { time: '12:00-13:00', activityKey: 'lunch' },
        { time: '14:00-17:00', activityKey: 'afternoonTeaching' },
        { time: '18:00-19:00', activityKey: 'dinner' },
        { time: '19:00-20:00', activityKey: 'qaSession' },
      ],
    },
    {
      dayType: ScheduleDayType.FINAL,
      items: [
        { time: '07:30-08:30', activityKey: 'breakfast' },
        { time: '08:30-10:00', activityKey: 'closingSession' },
        { time: '10:00-12:00', activityKey: 'freeTime' },
        { time: '12:00', activityKey: 'checkout' },
      ],
    },
  ],

  specialActivityKeys: ['momoWorkshop'],

  includedServiceKeys: [
    'beddingTowels',
    'vegetarianMeals',
    'farmFacilities',
  ],

  accommodationOptionKeys: [
    'doubleRooms',
    'sharedRooms',
    'singleRoom',
    'tentCaravan',
  ],

  priceBreakdown: [
    { labelKey: 'accommodation', amount: '€40/night' },
    { labelKey: 'meals', amount: '€35/day' },
    { labelKey: 'venueRental', amount: '€18/day' },
    { labelKey: 'teacherSupport', amount: '€35/day' },
  ],

  totalPrice: '€640',

  paymentTermKeys: [
    'depositPayment',
    'secondPayment',
  ],

  cancellationPolicyKeys: [
    'fourMonthsRefund',
    'afterFullPayment',
    'replacementRefund',
  ],

  participantRange: {
    min: 10,
    max: 15,
  },

  contact: {
    whatsapp: '+31-6-14941874',
    email: 'tete17@gmail.com',
  },

  bookingUrl: 'https://forms.gle/4HuFKtxAfhhuBupFA',
}
