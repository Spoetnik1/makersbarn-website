import {
  ExperienceType,
  BookingPlatform,
  ExperienceOffer,
  FeaturedRetreat,
} from '@/types'
import { IMAGES } from './images'

export const EXPERIENCE_OFFERS: ExperienceOffer[] = [
  {
    id: 'solo-retreat',
    type: ExperienceType.SOLO_RETREAT,
    image: IMAGES.accommodation.cosmosView,
    externalUrl: 'https://thanksforthetrip.com/cosmos-solo-yoga-retreat/',
  },
  {
    id: 'accommodation',
    type: ExperienceType.ACCOMMODATION,
    image: IMAGES.accommodation.cosmosOutside,
    bookingLinks: [
      {
        platform: BookingPlatform.AIRBNB,
        url: 'https://www.airbnb.nl/rooms/1577611712640094818',
      },
      {
        platform: BookingPlatform.NATUURHUISJE,
        url: 'https://www.natuurhuisje.nl/vakantiehuisje/86113',
      },
    ],
  },
  {
    id: 'together-retreat',
    type: ExperienceType.TOGETHER_RETREAT,
    image: IMAGES.accommodation.outsideGuitarCircle,
    externalUrl: 'https://soulrevivetogetherretreat.umso.co/',
  },
]

export const FEATURED_RETREATS: FeaturedRetreat[] = [
  {
    id: 'shanti-deva-august-2026',
    title: 'Shanti Deva Buddhist Tibetan Retreat',
    image: '/images/buddhist-retreat.png',
    dateRange: 'August 4-9, 2026',
    externalUrl: 'https://forms.gle/4HuFKtxAfhhuBupFA',
  },
]
