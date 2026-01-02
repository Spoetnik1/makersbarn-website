import type { Dictionary } from '../types'

export const en: Dictionary = {
  nav: {
    home: 'Home',
    about: 'About',
    facilities: 'Facilities',
    contact: 'Contact',
  },

  hero: {
    eyebrow: 'Welcome to',
    emphasis: 'the Makers Barn',
    subtitle: 'Your retreat deserves more than',
    subtitleBreak: 'just a venue.',
  },

  heroDetails: {
    title: 'A grounded, intimate location for retreats and gatherings',
    subtitle: 'In the Dutch countryside, surrounded by nature.',
    body: 'A retreat space that feels like home, surrounded by fields and big open skies. Designed to hold deep, transformative work with ease, warmth and beauty. Accommodates up to 20 people.',
    primaryCtaLabel: 'Explore the spaces',
    secondaryCtaLabel: 'Plan your retreat',
    metaItems: [
      'Space for intimate groups',
      'Sauna & nature on your doorstep',
      'Located in the Dutch countryside',
    ],
  },

  contact: {
    pageTitle: 'Get in Touch',
    introText:
      "We'd love to hear from you! Whether you're planning a retreat, workshop, or just want to learn more about Maker's Barn, we're here to help. Choose the way that works best for you:",
    formTitle: 'Contact us',
    options: {
      whatsapp: {
        title: 'WhatsApp',
        description: 'Send us a quick message for instant communication',
        buttonText: 'Get in touch on WhatsApp',
      },
      email: {
        title: 'Send an Email',
        description: "Drop us a line and we'll get back to you",
        buttonText: 'Send an Email',
      },
      form: {
        title: 'Contact Form',
        description: "Fill out the form below and we'll get back to you",
        buttonText: 'Go to Contact Form',
      },
    },
    labels: {
      name: 'Hi! My name is...',
      email: 'and you can reach me at...',
      phone: 'or call me at...',
      message: "I'd love to ask about...",
    },
    placeholders: {
      name: 'Your name...',
      email: 'Your email...',
      phone: 'Your phone number...',
      message: 'Whatever your heart desires :)',
    },
    buttons: {
      submit: 'Submit',
      submitting: 'Sending...',
    },
    messages: {
      success: 'Thank you for your message! We will get back to you soon.',
      emailFailed: 'There was an issue sending your message. Please try again later.',
      unexpectedError: 'An unexpected error occurred. Please try again later.',
      validationError: 'Please check your input and try again.',
      rateLimited: 'Too many requests. Please wait a moment before trying again.',
      loading: 'Sending...',
    },
  },

  footer: {
    getInTouch: 'Get in Touch',
    followUs: 'Follow Us',
    tagline: 'Where creativity meets tranquility',
    copyright: "Maker's Barn. All rights reserved.",
  },

  about: {
    title: 'About Us',
    intro: `Welcome to MakersBarn, a place where creativity, craftsmanship, and community come together. Nestled in the heart of the countryside, we've transformed a historic hay barn into a vibrant space for retreats, workshops, and creative gatherings. Our mission is to provide a sanctuary where makers, artists, and dreamers can connect, create, and find inspiration.`,
    secondary: `We believe in the power of hands-on creation, the beauty of natural materials, and the importance of spaces that nurture both individual growth and collective experiences. Whether you're planning a retreat, hosting a workshop, or simply seeking a peaceful place to work on your next project, MakersBarn offers the perfect environment to bring your vision to life.`,
    teamTitle: 'Meet the Team',
    metaTitle: 'About Us',
    metaDescription:
      'Meet the team behind MakersBarn. Learn about our mission to create a sanctuary where makers, artists, and dreamers can connect and find inspiration.',
  },

  facilities: {
    title: 'Facilities',
    intro: `Rent the entire location for your retreat, masterclass, or creative adventures. We offer a private garden, converted hay barn, 23 beds, and all the space and tranquility you need.`,
    secondary: `Need extra spaces during your retreat or want to book a separate space for a one-on-one session or other intimate gathering? We have these gems that we lovingly offer as your home away from home.`,
    metaTitle: 'Facilities',
    metaDescription:
      'Explore our unique retreat spaces at MakersBarn. Rent the entire location with private garden, converted hay barn, 23 beds, and all the tranquility you need.',
    stats: [
      { number: '60m²+', description: 'Open space practice hall.' },
      { number: '14', description: 'Beds across 6 cozy rooms' },
      { number: '1.3ha+', description: 'Of private land, a natural swimming pond, sauna, and fire circle.' },
    ],
    categories: {
      groupAccommodation: 'Group Accommodation',
      workshopSpace: 'Workshop Space',
      outdoors: 'Outdoors',
    },
    items: {
      hayHouse: {
        title: 'Enchanting Hay House',
        description:
          'A beautifully converted hay barn offering 23 comfortable beds across two former stables. Perfect for retreats, workshops, and creative gatherings.',
        features: ['Kitchen', 'Bathroom', '23 beds across two former stables', 'Large common area'],
      },
      cosmos: {
        title: 'The Cosmos',
        description:
          'An intimate workshop space designed for smaller sessions, masterclasses, and one-on-one creative work. Perfect for intimate gatherings and specialized workshops.',
        features: ['Workshop space', 'Comfortable seating', 'Natural light'],
      },
      horizon: {
        title: 'Horizon',
        description:
          'Expansive outdoor spaces to connect with nature and find inspiration in the open air. Perfect for reflection, outdoor workshops, and enjoying the countryside.',
      },
      sauna: {
        title: 'Sauna & Hot Tub',
        description:
          'Unwind and rejuvenate in our private sauna and hot tub area. The perfect way to decompress after a day of creative work or workshops.',
      },
      pond: {
        title: 'Swimming Pond',
        description:
          'A natural swimming pond surrounded by lush greenery and local wildlife. Perfect for a refreshing swim or enjoying the peaceful sounds of nature.',
      },
      inBetween: {
        title: 'Everything in Between',
        description:
          'Versatile spaces throughout our property, from cozy attic rooms to comfortable ensuite accommodations. Flexible spaces that adapt to your needs.',
        features: ['Kitchen', 'Bathroom', 'Two single or one double bed', 'Ensuite options available'],
      },
    },
  },

  testimonials: {
    sectionTitle: 'What our guests say',
    items: [
      {
        testimonial:
          'MakersBarn is pure magic. The combination of stunning countryside, thoughtful spaces, and the sauna made our retreat absolutely transformative. We left feeling renewed and deeply connected.',
        author: 'Emma K. - Wellness Retreat Organizer',
      },
      {
        testimonial:
          "This is the most beautiful retreat space I've ever experienced. The attention to detail, the natural surroundings, and the peaceful atmosphere created the perfect environment for our team to reconnect and recharge.",
        author: 'Marcus T. - Leadership Coach',
      },
      {
        testimonial:
          "I've organized retreats all over Europe, and MakersBarn stands out as something truly special. The Dutch countryside setting, the warm hospitality, and the intimate spaces make it perfect for deep, meaningful work.",
        author: 'Sophie L. - Workshop Facilitator',
      },
      {
        testimonial:
          'Our creative team found exactly what we needed at MakersBarn. The inspiring environment, surrounded by fields and nature, helped us break through creative blocks and produce our best work yet.',
        author: 'David R. - Creative Director',
      },
    ],
  },

  team: {
    members: [
      {
        name: 'Nana',
        description:
          'The true mastermind behind the MakersBarn. She takes up most communications so she will be your first person to meet.',
      },
      {
        name: 'Benny',
        description:
          'Benny still has the passion for IT and can often be found behind his computer working on different businesses. Loves manual work as a break so is very content living at the MakersBarn.',
      },
      {
        name: 'Noud',
        description:
          'Noud is the true Maker of us: CMO, Chief Maker Officer. Learned that a saw and drill is more of a passion than a keyboard and computer screen. Keeps the place well maintained, is often around, and when time is left builds furniture.',
      },
    ],
  },

  common: {
    logoAlt: "Maker's Barn",
    selectLanguage: 'Select language',
    toggleMenu: 'Toggle menu',
  },

  metadata: {
    siteName: "The Maker's Barn",
    siteTitle: "The Maker's Barn - Dutch Countryside Retreat",
    defaultDescription:
      'Your retreat deserves more than just a venue. 60m²+ practice hall, 14 beds, 1.3ha+ private land in the Dutch countryside.',
    keywords: ['retreat', 'Netherlands', 'countryside', 'wellness', 'workshop venue', 'creative retreat'],
  },
} as const
