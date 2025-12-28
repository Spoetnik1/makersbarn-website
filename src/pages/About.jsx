import './About.css'

const TEAM_MEMBERS = [
  {
    name: 'Nana',
    description: 'The true mastermind behind the MakersBarn. She takes up most communications so she will be your first person to meet.',
    image: '/src/assets/images/nana-stairs.jpg',
  },
  {
    name: 'Benny',
    description: 'Benny still has the passion for IT and can often be found behind his computer working on different businesses. Loves manual work as a break so is very content living at the MakersBarn.',
    image: '/src/assets/images/benny-smile.jpg',
  },
  {
    name: 'Noud',
    description: 'Noud is the true Maker of us: CMO, Chief Maker Officer. Learned that a saw and drill is more of a passion than a keyboard and computer screen. Keeps the place well maintained, is often around, and when time is left builds furniture.',
    image: '/src/assets/images/noud-banjo.jpg',
  },
]

function About() {
  return (
    <div className="about">
      <section className="about-hero">
        <header className="about-header">
          <h1 className="about-title">About Us</h1>
          <p className="about-intro">
            Welcome to MakersBarn, a place where creativity, craftsmanship, and community come together. 
            Nestled in the heart of the countryside, we've transformed a historic hay barn into a vibrant 
            space for retreats, workshops, and creative gatherings. Our mission is to provide a sanctuary 
            where makers, artists, and dreamers can connect, create, and find inspiration.
          </p>
          <p className="about-intro secondary">
            We believe in the power of hands-on creation, the beauty of natural materials, and the 
            importance of spaces that nurture both individual growth and collective experiences. 
            Whether you're planning a retreat, hosting a workshop, or simply seeking a peaceful 
            place to work on your next project, MakersBarn offers the perfect environment to bring 
            your vision to life.
          </p>
        </header>
      </section>

      <section className="about-team">
        <div className="about-team-container">
          <h2 className="about-team-title">Meet the Team</h2>
          <div className="about-team-grid">
            {TEAM_MEMBERS.map((member, index) => (
              <div key={member.name} className="about-team-member">
                <div className="about-team-member-image-wrapper">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="about-team-member-image"
                    onError={(e) => {
                      // Fallback to a placeholder if image doesn't exist
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                  <div className="about-team-member-placeholder" style={{ display: 'none' }}>
                    <span>{member.name.charAt(0)}</span>
                  </div>
                </div>
                <div className="about-team-member-content">
                  <h3 className="about-team-member-name">{member.name}</h3>
                  <p className="about-team-member-description">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About

