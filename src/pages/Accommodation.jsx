import { useState } from 'react'
import './Accommodation.css'

const OPTIONS = [
  {
    id: 'hay-house',
    label: 'Group Accommodation',
    title: 'Enchanting Hay House',
    image: '/src/assets/images/hay-house-against-sun.jpg',
    color: '#b8894a',
    images: [
      '/src/assets/images/hay-house-against-sun.jpg',
      '/src/assets/images/hay-house-bench-sunset.jpg',
      '/src/assets/images/main-house.jpg',
      '/src/assets/images/attic-beds.jpg',
    ],
    description: 'A beautifully converted hay barn that serves as our main group accommodation. This spacious and rustic space offers 23 comfortable beds across two former stables, perfect for retreats, workshops, and creative gatherings. The warm, inviting atmosphere combines traditional charm with modern comfort, creating an inspiring environment where groups can connect, create, and unwind together.',
    features: [
      'Kitchen',
      'Bathroom',
      '23 beds across two former stables',
      'Large common area',
    ],
  },
  {
    id: 'cosmos',
    label: 'Workshop Space',
    title: 'The Cosmos',
    image: '/src/assets/images/cosmos-view-living-room.jpg',
    color: '#7d6fa6',
    images: [
      '/src/assets/images/cosmos-view-living-room.jpg',
      '/src/assets/images/cosmos-luxury-couch.jpg',
      '/src/assets/images/teahous-with-chair.jpg',
      '/src/assets/images/you-are-where-you-need-to-be.jpg',
    ],
    description: 'An intimate and inspiring workshop space designed for smaller sessions, masterclasses, and one-on-one creative work. The Cosmos offers a serene environment with thoughtful design elements that encourage focus and creativity. Perfect for intimate gatherings, private sessions, or specialized workshops where connection and inspiration flow naturally.',
    features: [
      'Workshop space',
      'Comfortable seating',
      'Natural light',
    ],
  },
  {
    id: 'horizon',
    label: 'Outdoors',
    title: 'Horizon',
    image: '/src/assets/images/field-walking-women.jpg',
    color: '#5b8b5b',
    images: [
      '/src/assets/images/field-walking-women.jpg',
      '/src/assets/images/outside-walk.jpg',
      '/src/assets/images/hay-house-against-sun.jpg',
    ],
    description: 'Our expansive outdoor spaces invite you to connect with nature and find inspiration in the open air. Whether you\'re seeking a peaceful moment of reflection, planning an outdoor workshop, or simply want to breathe in the fresh countryside air, Horizon offers the perfect backdrop for your creative journey.',
  },
  {
    id: 'sauna',
    label: 'Outdoors',
    title: 'Sauna & Hot Tub',
    image: '/src/assets/images/sauna.jpg',
    color: '#c06b3e',
    images: [
      '/src/assets/images/sauna.jpg',
      '/src/assets/images/you-are-where-you-need-to-be.jpg',
      '/src/assets/images/outside-walk.jpg',
    ],
    description: 'Unwind and rejuvenate in our private sauna and hot tub area. After a day of creative work or workshops, there\'s nothing quite like the restorative power of heat and relaxation. This outdoor wellness space offers the perfect way to decompress, connect with fellow guests, or simply enjoy a moment of peaceful solitude under the stars.',
  },
  {
    id: 'pond',
    label: 'Outdoors',
    title: 'Swimming Pond',
    image: '/src/assets/images/ducks.jpg',
    color: '#3f7d85',
    images: [
      '/src/assets/images/ducks.jpg',
      '/src/assets/images/you-are-where-you-need-to-be.jpg',
      '/src/assets/images/field-walking-women.jpg',
    ],
    description: 'Dive into nature at our natural swimming pond. Surrounded by lush greenery and teeming with local wildlife, this eco-friendly swimming area offers a refreshing escape and a unique way to connect with the natural world. Perfect for a morning swim, an afternoon cool-down, or simply enjoying the peaceful sounds of nature.',
  },
  {
    id: 'in-between',
    label: 'Workshop Space',
    title: 'Everything in Between',
    image: '/src/assets/images/main-house.jpg',
    color: '#94775a',
    images: [
      '/src/assets/images/main-house.jpg',
      '/src/assets/images/attic-chill.jpg',
      '/src/assets/images/double-ensuite.jpg',
      '/src/assets/images/attic-beds.jpg',
    ],
    description: 'Discover the many versatile spaces throughout our property that make every stay unique. From cozy attic rooms to comfortable ensuite accommodations, our main house and surrounding buildings offer flexible spaces that adapt to your needs. Whether you\'re looking for a quiet corner to work, a comfortable place to rest, or a space that sparks inspiration, you\'ll find it here.',
    features: [
      'Kitchen',
      'Bathroom',
      'Two single or one double bed',
      'Ensuite options available',
    ],
  },
]

function scrollToOption(id) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function AccommodationDetailSection({ option, index, onImageClick }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const images = option.images && option.images.length > 0 ? option.images : [option.image]
  const isReversed = index % 2 === 1

  const goPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleImageClick = () => {
    onImageClick(images[currentIndex])
  }

  const content = (
    <div className="accommodation-detail-content">
      <span className="accommodation-detail-bar" aria-hidden="true" />
      <h2 className="accommodation-detail-title">{option.title}</h2>
      <p className="accommodation-detail-body">
        {option.description || `Discover ${option.title}, a unique space designed to inspire and accommodate your creative journey. This space offers the perfect setting for retreats, workshops, and intimate gatherings, combining comfort with an inspiring atmosphere that invites you to create, connect, and unwind.`}
      </p>
      {option.features && option.features.length > 0 && (
        <ul className="accommodation-detail-features">
          {option.features.map((feature, idx) => (
            <li key={idx}>{feature}</li>
          ))}
        </ul>
      )}
    </div>
  )

  const media = (
    <div className="accommodation-detail-media">
      <div className="accommodation-carousel">
        {images.length > 1 && (
          <button
            type="button"
            className="accommodation-carousel-nav accommodation-carousel-nav-prev"
            onClick={goPrev}
            aria-label="Previous photo"
          >
            ‹
          </button>
        )}
        <button
          type="button"
          className="accommodation-carousel-frame"
          onClick={handleImageClick}
            aria-label="Enlarge photo"
        >
          <img src={images[currentIndex]} alt={option.title} />
        </button>
        {images.length > 1 && (
          <button
            type="button"
            className="accommodation-carousel-nav accommodation-carousel-nav-next"
            onClick={goNext}
            aria-label="Next photo"
          >
            ›
          </button>
        )}
      </div>
      {images.length > 1 && (
        <div className="accommodation-carousel-dots" aria-hidden="true">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`accommodation-carousel-dot ${i === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(i)}
            />
          ))}
        </div>
      )}
    </div>
  )

  return (
    <section
      id={option.id}
      className="accommodation-detail-band"
    >
      <article className="accommodation-detail" style={{ backgroundColor: option.color }}>
        {isReversed ? (
          <>
            {media}
            {content}
          </>
        ) : (
          <>
            {content}
            {media}
          </>
        )}
      </article>
    </section>
  )
}

function Accommodation() {
  const [lightboxImage, setLightboxImage] = useState(null)

  return (
    <div className="accommodation">
      <section className="accommodation-hero">
        <header className="accommodation-header">
          <h1 className="accommodation-title">Accommodation</h1>
          <p className="accommodation-intro">
            Rent the entire location for your own retreat, masterclass, or other creative adventures and let yourself be
            inspired to create the most beautiful things. We offer you and your participants a beautiful private garden with
            a large stretch tent, a converted hay barn for more intimate sessions, two former stables with 23 beds,
            a mini-camping area, a well-equipped kitchen, and all the space and tranquility you need.
          </p>
          <p className="accommodation-intro secondary">
            Need extra spaces during your retreat or want to book a separate space for a one-on-one session or
            other intimate gathering? We have these gems that we lovingly offer as your home away from home.
          </p>
        </header>

        <div className="accommodation-grid">
          {OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              className="accommodation-card"
              onClick={() => scrollToOption(option.id)}
            >
              <span className="accommodation-card-bar" style={{ backgroundColor: option.color }} aria-hidden="true" />
              <div className="accommodation-card-image-wrapper">
                <img src={option.image} alt={option.title} className="accommodation-card-image" />
              </div>
              <div className="accommodation-card-text">
                <p className="accommodation-card-title">{option.title}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="accommodation-details">
        {OPTIONS.map((option, index) => (
          <AccommodationDetailSection
            key={option.id}
            option={option}
            index={index}
            onImageClick={setLightboxImage}
          />
        ))}
      </section>

      {lightboxImage && (
        <div
          className="accommodation-lightbox"
          onClick={() => setLightboxImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="accommodation-lightbox-inner"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="accommodation-lightbox-close"
              onClick={() => setLightboxImage(null)}
              aria-label="Close enlarged photo"
            >
              ×
            </button>
            <img src={lightboxImage} alt="" className="accommodation-lightbox-image" />
          </div>
        </div>
      )}
    </div>
  )
}

export default Accommodation
