import './Hero.css'
import heroImage from '../assets/images/field-walking-women.jpg'

function Hero() {
  return (
    <section className="hero">
      <img
        src={heroImage}
        alt="Retreat guests walking through the fields around The Makers Barn"
        className="hero-bg-image"
        loading="lazy"
      />

      <div className="hero-content">
        <h1 className="hero-heading-top">
          Welcome to <span className="hero-heading-emphasis">the Makers Barn</span>
        </h1>
        <h2 className="hero-heading-bottom">Your retreat deserves more than just a venue.</h2>
      </div>
    </section>
  )
}

export default Hero
