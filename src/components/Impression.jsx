import './Impression.css'

import atticBeds from '../assets/images/attic-beds.jpg'
import atticChill from '../assets/images/attic-chill.jpg'
import bennySmile from '../assets/images/benny-smile.jpg'
import cosmosCouch from '../assets/images/cosmos-luxury-couch.jpg'
import cosmosView from '../assets/images/cosmos-view-living-room.jpg'
import doubleEnsuite from '../assets/images/double-ensuite.jpg'
import ducks from '../assets/images/ducks.jpg'
import hayHouseSun from '../assets/images/hay-house-against-sun.jpg'
import hayHouseBench from '../assets/images/hay-house-bench-sunset.jpg'
import mainHouse from '../assets/images/main-house.jpg'
import outsideWalk from '../assets/images/outside-walk.jpg'
import sauna from '../assets/images/sauna.jpg'
import teahouse from '../assets/images/teahous-with-chair.jpg'
import quoteImage from '../assets/images/you-are-where-you-need-to-be.jpg'

const images = [
  { src: mainHouse, alt: 'The Makers Barn main house in the landscape' },
  { src: hayHouseSun, alt: 'Hay House glowing in the evening sun' },
  { src: atticBeds, alt: 'Attic bedroom with comfy beds' },
  { src: cosmosView, alt: 'View from the Cosmos living room' },
  { src: cosmosCouch, alt: 'Cosy couch in the Cosmos space' },
  { src: atticChill, alt: 'Chill corner in the attic' },
  { src: doubleEnsuite, alt: 'Double ensuite bedroom' },
  { src: sauna, alt: 'Outdoor sauna at The Makers Barn' },
  { src: teahouse, alt: 'Teahouse with a chair and window' },
  { src: outsideWalk, alt: 'Walking path around the fields' },
  { src: ducks, alt: 'Ducks by the water near the barn' },
  { src: bennySmile, alt: 'Smiling Benny at The Makers Barn' },
  { src: quoteImage, alt: 'You are where you need to be artwork' },
]

function Impression() {
  return (
    <section className="impression">
      <div className="impression-header">
        <p className="impression-kicker">A little impression</p>
        <h2 className="impression-title">Slow down, look around.</h2>
        <p className="impression-subtitle">
          Spaces to focus, wander, nap, write, reflect, and be together. Here’s a glimpse of what
          your retreat might feel like.
        </p>
      </div>

      <div className="impression-grid" aria-label="Photo impressions from The Makers Barn">
        {images.map((image, index) => (
          <figure
            className={`impression-tile impression-tile-${(index % 8) + 1}`}
            key={image.src + index}
          >
            <img src={image.src} alt={image.alt} loading="lazy" />
          </figure>
        ))}
      </div>
    </section>
  )
}

export default Impression


