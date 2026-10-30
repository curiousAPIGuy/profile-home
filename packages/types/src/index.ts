export interface Badge {
  id: string;
  type: string;
  label: string;
  value?: string;
  icon?: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  displayUrl: string;
}

export interface Profile {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  verified: boolean;
  bio: string;
  bookings: number;
  badges: Badge[];
  socialLinks: SocialLink[];
  about: string;
}

export interface OfferingItem {
  id: string;
  title: string;
  quantity: number;
}

export interface Offering {
  id: string;
  type: 'digital_product' | 'package';
  category: string;
  title: string;
  description: string | null;
  price: number;
  originalPrice: number;
  currency: string;
  rating: number | null;
  badge: string | null;
  badgeColor: string | null;
  items?: OfferingItem[];
}

export interface Review {
  id: string;
  rating: number;
  text: string;
  author: string;
  date: string;
}

export interface Ratings {
  average: number;
  totalRatings: number;
  totalTestimonials: number;
  reviews: Review[];
}

export interface ProfileData {
  profile: Profile;
  offerings: Offering[];
  ratings: Ratings;
  categories: string[];
}
