import { TeamMember } from '@/types'
import { IMAGES } from './images'

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Nana',
    description: 'The true mastermind behind the MakersBarn. She takes up most communications so she will be your first person to meet.',
    image: IMAGES.team.nana,
  },
  {
    name: 'Benny',
    description: 'Benny still has the passion for IT and can often be found behind his computer working on different businesses. Loves manual work as a break so is very content living at the MakersBarn.',
    image: IMAGES.team.benny,
  },
  {
    name: 'Noud',
    description: 'Noud is the true Maker of us: CMO, Chief Maker Officer. Learned that a saw and drill is more of a passion than a keyboard and computer screen. Keeps the place well maintained, is often around, and when time is left builds furniture.',
    image: IMAGES.team.noud,
  },
]
