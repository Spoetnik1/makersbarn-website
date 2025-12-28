import { Link } from 'react-router-dom'
import './Hero.css'
import detailsImage from '../assets/images/sauna.jpg'

function HeroDetails() {
  return (
    <section className="hero-details">
      <div className="hero-details-inner">
        <div className="hero-details-text">
          <h2 className="hero-details-title">
            A grounded, intimate location for retreats and gatherings
          </h2>

          <p className="hero-details-subtitle">In the Dutch countryside, surrounded by nature.</p>

          <p className="hero-subtitle hero-details-body">
            An intimate retreat space surrounded by fields, woodland and big open skies –
            designed to hold deep, transformative work with ease, warmth and beauty.
          </p>

          <div className="hero-actions">
            <Link to="/accommodation" className="hero-button hero-button-primary">
              Explore the spaces
            </Link>
            <Link to="/contact" className="hero-button hero-button-secondary">
              Plan your retreat
            </Link>
          </div>

          <div className="hero-meta">
            <span>Space for intimate groups</span>
            <span className="hero-meta-separator">&bull;</span>
            <span>Sauna &amp; nature on your doorstep</span>
            <span className="hero-meta-separator">&bull;</span>
            <span>Located in the Dutch countryside</span>
          </div>
        </div>

        <div className="hero-details-image-wrap" aria-hidden="true">
          <div className="hero-details-image-arch">
            <img src={detailsImage} alt="" className="hero-details-image" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroDetails
