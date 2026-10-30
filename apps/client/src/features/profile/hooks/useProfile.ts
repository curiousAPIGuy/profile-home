import { useState, useEffect } from 'react';
import { getProfile, getOfferings, getRatings, getCategories } from '../api/profileApi';
import { Profile, Offering, Ratings } from '../types';

export function useProfile(username = 'ashutosh') {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [offerings, setOfferings] = useState<Offering[]>([]);
  const [ratings, setRatings] = useState<Ratings | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [profileData, offeringsData, ratingsData, categoriesData] =
          await Promise.all([
            getProfile(username),
            getOfferings(username),
            getRatings(username),
            getCategories(username),
          ]);

        if (!cancelled) {
          setProfile(profileData);
          setOfferings(offeringsData);
          setRatings(ratingsData);
          setCategories(categoriesData);
        }
      } catch (err: any) {
        if (!cancelled) {
          setError(err.message || 'Failed to load profile');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [username]);

  return { profile, offerings, ratings, categories, loading, error };
}
