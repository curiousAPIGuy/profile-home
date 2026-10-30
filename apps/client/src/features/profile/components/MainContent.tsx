import { useState } from 'react';
import SocialLinkCard from './SocialLinkCard';
import { FilterTabs } from '@/components';
import OfferingsGrid from './OfferingsGrid';
import RatingsSection from './RatingsSection';
//import AboutSection from './AboutSection';
import './MainContent.css';
import { Profile, Offering, Ratings } from '../types';

interface MainContentProps {
  profile: Profile;
  offerings: Offering[];
  ratings: Ratings;
  categories: string[];
}

export default function MainContent({ profile, offerings, ratings, categories }: MainContentProps) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredOfferings =
    activeCategory === 'All'
      ? offerings
      : offerings.filter((o) => o.category === activeCategory);

  return (
    <main className="main-content">
      {profile.socialLinks?.map((link) => (
        <SocialLinkCard key={link.id} link={link} name={profile.name} />
      ))}

      <FilterTabs
        categories={categories}
        active={activeCategory}
        onChange={setActiveCategory}
      />

      <OfferingsGrid offerings={filteredOfferings} />

      <RatingsSection ratings={ratings} />
      {/*
      <AboutSection about={profile.about} />
      */}
    </main>
  );
}
