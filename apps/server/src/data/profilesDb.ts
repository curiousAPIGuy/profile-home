import { ProfileData } from '@creator-profile/types';

// In-memory data store containing the default profiles
export const profilesDb: Record<string, ProfileData> = {
  ashutosh: {
    profile: {
      id: '_id001',
      name: 'Ashutosh Singh',
      username: 'asingh',
      avatarUrl: '/avatar.png',
      verified: true,
      bio: "I'm a senior backend architect working at the intersection of fintech and cybersecurity. I build software tools, publish deep-dive technical articles, and mentor developers prepping for tough backend interviews. My content focuses on the realities of production engineering — high-concurrency systems, defensive architecture, and JVM internals — so candidates learn how to solve real problems in the room, not just recite interview trivia.",
      bookings: 1475,
      badges: [
        //{ id: 'bookings', type: 'stat', label: 'Bookings', value: '1475' },
        //{ id: 'peoples-choice', type: 'achievement', label: "People's Choice", icon: '💗' },
        //{ id: 'curator', type: 'achievement', label: 'Curator', icon: '🎨' },
        //{ id: 'top-1', type: 'achievement', label: 'Top 1%', icon: '🌸' }
      ],
      socialLinks: [
        {
          id: 'linkedin',
          platform: 'LinkedIn',
          url: 'https://www.linkedin.com/in/ashutoshsingh75/',
          displayUrl: 'https://www.linkedin.com/in/ashutoshsingh75/',
        },
      ],
      about: "",
    },
    offerings: [
      /*
      {
        id: 'java-qa',
        type: 'digital_product',
        category: 'Digital Product',
        title: 'Java Questions & Answers – Real Interview Focused',
        description: 'Covers core Java, OOP, collections, multithreading, JVM basics, and common backend interview questions with clear explanations.',
        price: 399,
        originalPrice: 499,
        currency: '₹',
        rating: 4.5,
        badge: 'Best Seller',
        badgeColor: 'green',
      },
      {
        id: 'spring-boot-package',
        type: 'package',
        category: 'Package',
        title: 'Java and Spring Boot PDFs',
        description: null,
        price: 699,
        originalPrice: 898,
        currency: '₹',
        rating: null,
        badge: 'Best Deal',
        badgeColor: 'purple',
        items: [
          { id: 'java-pdf', title: 'Java and Spring Boot PDFs', quantity: 1 },
          { id: 'spring-qa', title: 'Spring Boot Interview Q&A (Real Scenarios)', quantity: 1 },
        ],
      }*/
    ],
    ratings: {

      average: 4.8,
      totalRatings: 10,
      totalTestimonials: 11,
      reviews: [
        /*
        {
          id: 'r1',
          rating: 5,
          text: 'Very helpful and practical content. The Java Q&A PDF covers exactly what gets asked in interviews.',
          author: 'Lakshmi Soni',
          date: '15th Jan, 2025',
        },
        {
          id: 'r2',
          rating: 5,
          text: 'Great resource for Spring Boot interview prep. Clear explanations with real-world scenarios.',
          author: 'Anonymous',
          date: '8th Jan, 2025',
        }*/
      ],
    },
    categories: ['All', 'Blogs', 'Products & Tools', 'Interview Vault'],
  },
};
