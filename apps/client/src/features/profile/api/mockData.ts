import { Profile, Offering, Ratings } from '../types';

export const mockProfile: Profile = {
  id: 'aakash_dabi14',
  name: 'Akash Dabi',
  username: 'aakash_dabi14',
  avatarUrl: '/avatar.png',
  verified: true,
  bio: "I'm a Java Developer and tech content creator helping developers prepare for real-world backend interviews. I share practical Java, Spring Boot, and system design insights through structured resources and interview-focused content.",
  bookings: 1475,
  badges: [
    { id: 'bookings', type: 'stat', label: 'Bookings', value: '1475' },
    { id: 'peoples-choice', type: 'achievement', label: "People's Choice", icon: '💗' },
    { id: 'curator', type: 'achievement', label: 'Curator', icon: '🎨' },
    { id: 'top-1', type: 'achievement', label: 'Top 1%', icon: '🌸' },
    { id: 'more', type: 'more', label: '+3' },
  ],
  socialLinks: [
    {
      id: 'linkedin',
      platform: 'LinkedIn',
      url: 'https://www.linkedin.com/in/aakash-dabi/',
      displayUrl: 'https://www.linkedin.com/in/aakash-dabi/',
    },
  ],
  about: "I'm a Java backend developer working at an MNC, with hands-on experience in Spring Boot, JVM internals, multithreading, and backend systems. Alongside my role, I share interview-focused Java and backend content to help developers prepare for real-world interviews — not just theory, but what actually gets asked.",
};

export const mockOfferings: Offering[] = [
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
  },
  {
    id: 'spring-qa',
    type: 'digital_product',
    category: 'Digital Product',
    title: 'Spring Boot Interview Q&A (Real Scenarios)',
    description: 'Covers Spring Boot fundamentals, REST APIs, JPA, security basics, and real interview-style questions with practical answers.',
    price: 399,
    originalPrice: 499,
    currency: '₹',
    rating: 4.5,
    badge: 'Best Seller',
    badgeColor: 'green',
  },
];

export const mockRatings: Ratings = {
  average: 4.8,
  totalRatings: 10,
  totalTestimonials: 11,
  reviews: [
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
    },
    {
      id: 'r3',
      rating: 5,
      text: 'Akash explains complex Java concepts in a simple way. Highly recommend for backend developers.',
      author: 'Rahul Sharma',
      date: '2nd Jan, 2025',
    },
    {
      id: 'r4',
      rating: 4,
      text: 'Good collection of interview questions. Would love more system design content.',
      author: 'Priya Nair',
      date: '28th Dec, 2024',
    },
    {
      id: 'r5',
      rating: 5,
      text: 'The package deal is worth every rupee. Both PDFs are comprehensive and well-structured.',
      author: 'Anonymous',
      date: '20th Dec, 2024',
    },
    {
      id: 'r6',
      rating: 5,
      text: 'Exactly what I needed before my Java backend interview. Landed the offer!',
      author: 'Vikram Patel',
      date: '12th Dec, 2024',
    },
  ],
};

export const mockCategories: string[] = ['All', 'Digital Product', 'Package'];
