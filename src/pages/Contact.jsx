import { useState } from 'react'
import { motion } from 'framer-motion'
import './Contact.css'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    // You can add your form submission logic here
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({ name: '', email: '', phone: '', message: '' })
  }

  return (
    <div className="contact">
      <section className="contact-intro-section">
        <div className="contact-intro-content">
          <h1 className="contact-intro-title">Get in Touch</h1>
          <p className="contact-intro-text">
            We'd love to hear from you! Whether you're planning a retreat, workshop, or just want to learn more about Maker's Barn, we're here to help. Choose the way that works best for you:
          </p>
          <div className="contact-intro-options">
            <div className="contact-intro-option">
              <div className="contact-intro-option-header">
                <strong>💬 WhatsApp</strong>
                <p className="contact-intro-option-desc">Send us a quick message for instant communication</p>
              </div>
              <a 
                href="https://wa.me/31612345678" 
                target="_blank" 
                rel="noopener noreferrer"
                className="contact-intro-button contact-intro-whatsapp"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Get in touch on WhatsApp
              </a>
            </div>
            <div className="contact-intro-option">
              <div className="contact-intro-option-header">
                <strong>📞 Schedule a Call</strong>
                <p className="contact-intro-option-desc">Let's have a conversation and discuss your needs</p>
              </div>
              <a 
                href="tel:+31612345678" 
                className="contact-intro-button contact-intro-call"
              >
                Plan a Call
              </a>
            </div>
            <div className="contact-intro-option">
              <div className="contact-intro-option-header">
                <strong>✉️ Contact Form</strong>
                <p className="contact-intro-option-desc">Fill out the form below and we'll get back to you</p>
              </div>
              <a 
                href="#contact-form"
                className="contact-intro-button contact-intro-form"
              >
                Go to Contact Form
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="contact-form" className="contact-form-section">
        <div className="contact-form-wrapper">
          <div className="contact-form-container">
            <ContactForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
            <ContactImage />
          </div>
        </div>
      </section>

      <section className="contact-map">
        <div className="contact-map-container">
          <iframe
            src="https://www.google.com/maps?q=Duisterendijk+2+8131+RA+Wijhe&output=embed"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Maker's Barn Location"
          ></iframe>
        </div>
      </section>
    </div>
  )
}

const ContactForm = ({ formData, handleChange, handleSubmit }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="contact-form-new"
    >
      <h3 className="contact-form-new-title">Contact us</h3>

      {/* Name input */}
      <div className="contact-form-new-group">
        <p className="contact-form-new-label">Hi 👋! My name is...</p>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name..."
          className="contact-form-new-input"
          required
        />
      </div>

      {/* Email input */}
      <div className="contact-form-new-group">
        <p className="contact-form-new-label">and you can reach me at...</p>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your email..."
          className="contact-form-new-input"
          required
        />
      </div>

      {/* Phone input */}
      <div className="contact-form-new-group">
        <p className="contact-form-new-label">or call me at...</p>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Your phone number..."
          className="contact-form-new-input"
        />
      </div>

      {/* Message */}
      <div className="contact-form-new-group">
        <p className="contact-form-new-label">I'd love to ask about...</p>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Whatever your heart desires :)"
          className="contact-form-new-textarea"
          required
        />
      </div>

      {/* Submit */}
      <motion.button
        whileHover={{
          scale: 1.01,
        }}
        whileTap={{
          scale: 0.99,
        }}
        type="submit"
        className="contact-form-new-button"
      >
        Submit
      </motion.button>
    </form>
  )
}

const ContactImage = () => {
  return (
    <div className="contact-form-image">
      <img 
        src="/src/assets/images/hay-house-bench-sunset.jpg" 
        alt="Maker's Barn" 
      />
    </div>
  )
}

export default Contact
