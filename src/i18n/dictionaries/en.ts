import type { Dictionary } from '../types'

export const en: Dictionary = {
  nav: {
    home: 'Home',
    about: 'About',
    facilities: 'Facilities',
    experiences: 'Join a Retreat',
    contact: 'Contact',
  },

  hero: {
    eyebrow: 'Welcome to',
    emphasis: 'the Makers Barn',
    subtitle: 'A home for your retreat',
    subtitleBreak: '',
  },

  heroDetails: {
    title: 'A grounded, intimate location for retreats and gatherings',
    subtitle: 'In the Dutch countryside, surrounded by nature.',
    body: 'A retreat space that feels like home, surrounded by fields and big open skies. Designed to hold deep, transformative work with ease, warmth and beauty. Whether you\'re hosting a yoga retreat, a wellness workshop, or a creative gathering, our space adapts to your vision.',
    primaryCtaLabel: 'Explore the spaces',
    secondaryCtaLabel: 'Plan your retreat',
    metaItems: [
      'Space for intimate groups up to 20 people',
      'Sauna & nature on your doorstep',
      'Located in the Dutch countryside',
    ],
  },

  contact: {
    pageTitle: 'Plan Your Retreat',
    metaTitle: 'Contact',
    metaDescription:
      "Get in touch with MakersBarn. We'd love to hear from you about planning your retreat, workshop, or creative gathering.",
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
      message: 'How can we help you?',
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
    copyright: "Maker's Barn.",
  },

  about: {
    title: 'About Us',
    intro: `The MakersBarn started as a hub for Makers of different kinds, wood workers, corporate professionals, artists, and dreamers. Somewhere along the way, we realized that what people needed most wasn't just a workshop. It was a place to slow down. So that's what we became.`,
    secondary: `We believe everyone has a Maker in us. Humans are Makers in the heart. Whether that's crafting something with our hands, making peace, or making memories. A gathering, transformative work, sharing and connecting are all core aspects of Makers.`,
    tertiary: `The three of us came together with a vision and a way to escape the hustle and bustle of city life. A stunning 1920s farm, our love for the land, and a dedication to crafting unique lodges have created a place where plants, animals, and people all find happiness.`,
    fourth: `If you're looking to host your next retreat, join one, or simply enjoy a peaceful stay, MakersBarn is ready for you.`,
    teamTitle: 'Meet the Team',
    metaTitle: 'About Us',
    metaDescription:
      'Meet the team behind MakersBarn. Learn about our mission to create a sanctuary where makers, artists, and dreamers can connect and find inspiration.',
  },

  facilities: {
    title: 'Facilities',
    intro: `Rent the spaces you need for your retreat, masterclass, or creative adventures. We offer a private garden, converted hay barn, 14 beds, plus space for tents and campervans, and all the tranquility you need. We also help arranging catering based on your requirements and needs.`,
    metaTitle: 'Facilities',
    metaDescription:
      'Rent the spaces you need at MakersBarn. Private garden, converted hay barn, 14 beds, space for tents and campervans, plus catering arrangements available.',
    stats: [
      { number: '1200+', description: 'Trees planted on the area' },
      { number: '13.000+ m²', description: 'Of private land, a natural swimming pond, sauna, and fire circle.' },
      { number: '∞', description: 'Infinite possibilities' },
    ],
    categories: {
      groupAccommodation: 'Group Accommodation',
      workshopSpace: 'Workshop Space',
      outdoors: 'Outdoors',
    },
    ctaTitle: 'Ready to Plan Your Retreat?',
    ctaSubtitle: 'Let us help you create an unforgettable experience for your group.',
    ctaButton: 'Book a Retreat Now',
    carousel: {
      previousImage: 'Previous image',
      nextImage: 'Next image',
      viewFullscreen: 'View image in fullscreen',
      goToImage: 'Go to image',
      imageNavigation: 'image navigation',
    },
    items: {
      hayHouse: {
        title: 'Hay House Practice Space',
        description:
          'An enchanting hay house with space for yoga, breathing sessions, and much more! Even more beautiful when the sun is out creating mesmerizing colorful reflections.',
        features: ['65+ m² space', 'Heated floor', 'Yoga mats and accessories', 'Sound system'],
      },
      cosmos: {
        title: 'The Cosmos',
        description:
          'A wooden cabin with wood stove. Cosy as no other while creating a luxury vibe. Private terrace with one of the best views the Netherlands has to offer.',
        features: ['60 m²', 'Double bed or two singles', 'Sleeper sofa', 'Shower', 'Kitchen'],
      },
      horizon: {
        title: 'Horizon',
        description:
          'Old barn turned into luxury sleeping arrangement. Chill area, rooms with private and shared showers. Kitchen present on the second floor',
        features: [
          '3 bed room with shared shower',
          '2 bed room with ensuit shower',
          'Private room with shared shower',
          'Large attic (2-4 beds, shower)',
          'Attic space for indoor practic sessions',
        ],
      },
      sauna: {
        title: 'Sauna, Hot Tub & Fire Circle',
        description:
          'Unwind and rejuvenate in our private sauna, hot tub, and fire circle area. The perfect way to decompress after a day of creative work or workshops.',
      },
      pond: {
        title: 'Swimming Pond',
        description:
          'A natural swimming pond surrounded by lush greenery and local wildlife. Perfect for a refreshing swim or enjoying the peaceful sounds of nature.',
      },
      inBetween: {
        title: 'Everything in Between',
        description:
          'The offered Facilities are essential for a retreat, but it\'s the little things in between that make a place truly special',
        features: ['Beautiful paths', '1000+ trees', 'Tea house', 'Bird area', 'Wide views'],
      },
    },
  },

  experiences: {
    metaTitle: 'Experiences',
    metaDescription: 'Discover your perfect retreat experience at MakersBarn. Book a solo yoga retreat, rent our accommodation, or join a group weekend retreat.',
    title: 'Experiences',
    intro: 'Whether you seek solitude, want to create your own getaway, or join a curated retreat with others, we have the perfect experience waiting for you.',
    createExperience: {
      title: 'Create Your Own Experience',
      subtitle: 'Design your perfect escape with our flexible options',
    },
    soloRetreat: {
      title: 'Solo Yoga Retreat',
      description: 'A personalized retreat experience in the Cosmos cabin. Tailored yoga sessions, sauna, hot tub, and complete tranquility for your personal journey.',
      features: [
        '2-3 night packages',
        'Personalized yoga sessions',
        'Sauna & hot tub access',
        'Fresh breakfast included',
      ],
      ctaLabel: 'Explore Solo Retreat',
    },
    accommodation: {
      title: 'Book Our Accommodation',
      description: 'Rent our beautiful spaces for your own private getaway. Perfect for couples, families, or small groups looking for a peaceful escape.',
      features: [
        'Yoga sessions available',
        'Hot tub rental',
        'Sauna access',
        'Catering on request',
      ],
      platforms: {
        airbnb: 'Book on Airbnb',
        natuurhuisje: 'Book on Natuurhuisje',
      },
    },
    togetherRetreat: {
      title: 'Friends Retreat',
      description: 'An all-inclusive escape with friends. Yoga, creative workshops, delicious meals, and meaningful connections in a beautiful setting.',
      features: [
        'All-inclusive experience',
        'Yoga & creative workshops',
        'Ayurvedic-inspired meals',
        'Exclusive group access',
      ],
      ctaLabel: 'Explore Group Retreats',
    },
    featuredRetreats: {
      title: 'Featured Retreats',
      subtitle: 'Join one of our upcoming curated retreat experiences',
      bookNow: 'Book Now',
      spotsLeft: 'spots left',
      fullyBooked: 'Fully Booked',
    },
    ctaTitle: 'Not sure which experience is right for you?',
    ctaSubtitle: 'Get in touch and we\'ll help you find the perfect fit for your needs.',
    ctaButton: 'Contact Us',
  },

  impressionCarousel: {
    kicker: 'A little impression',
    title: 'Slow down, look around.',
    subtitle:
      'Discover the beauty of slow living. Each moment here invites you to pause, breathe, and reconnect with what truly matters.',
    facilitiesButton: 'Explore our facilities',
    previousImage: 'Previous image',
    nextImage: 'Next image',
    carouselNavigation: 'Carousel navigation',
    viewFullscreen: 'View impression in fullscreen',
    goToSlide: 'Go to slide',
  },

  impressionPolaroids: {
    kicker: 'A little impression',
    title: 'A place to create lasting memories',
    subtitle:
      "Spaces to focus, wander, nap, write, reflect, and be together. Here's a glimpse of what your retreat might feel like.",
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
          "Nana is the mastermind and the heart behind The Makers Barn. The place grew out of her own life journey and healing process, which shaped the atmosphere we try to create here. She's the person you'll be in touch with from the start and the one who helps make sure your retreat feels exactly the way you imagine it. Nana brings a calm, grounded presence, influenced by her love for nature, yoga, mindful living, and small creative moments. She understands what retreat facilitators need and supports them in a clear, caring, and practical way.",
      },
      {
        name: 'Benny',
        description:
          "A true maker at heart, Benny loves creating magic both on screen and in the kitchen. With the monkey as his spirit animal, he brings playful curiosity and joy to everything he does. Balances the virtual and physical world with mindfulness, and is always ready to help, share some kindness, and chat about whatever's on your mind.",
      },
      {
        name: 'Noud',
        description:
          'Noud is the truest Maker of us: CMO, Chief Maker Officer. It are his screws, nails, trees and love which keep the place in prime condition. When there is time to spare he likes to spend his time in the workshop, building cool furniture.',
      },
    ],
  },

  common: {
    logoAlt: "Maker's Barn",
    selectLanguage: 'Select language',
    toggleMenu: 'Toggle menu',
    previousImage: 'Previous image',
    nextImage: 'Next image',
    closeGallery: 'Close gallery',
    imageNavigation: 'Image navigation',
    imageThumbnails: 'Image thumbnails',
    imageGallery: 'Image gallery',
    lightbox: {
      closeGallery: 'Close gallery',
      previousImage: 'Previous image',
      nextImage: 'Next image',
      imageOf: 'of',
      viewImage: 'View image',
      current: 'current',
      imageNavigation: 'Image navigation',
      imageThumbnails: 'Image thumbnails',
      keyboardInstructions:
        'Use left and right arrow keys to navigate between images. Press Escape to close the gallery.',
    },
  },

  metadata: {
    siteName: "The Maker's Barn",
    siteTitle: "The Maker's Barn - Dutch Countryside Retreat",
    defaultDescription:
      'Give your retreat the place it deserves. 60m²+ practice hall, 14 beds, 1.3ha+ private land in the Dutch countryside.',
    keywords: ['retreat', 'Netherlands', 'countryside', 'wellness', 'workshop venue', 'creative retreat'],
  },
} as const
