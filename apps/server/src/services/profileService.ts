import { Profile, Offering, Ratings } from '@creator-profile/types';
import { profilesDb } from '../data/profilesDb';

export function getProfileByUsername(username: string): Profile | null {
  const user = profilesDb[username];
  return user ? user.profile : null;
}

export function getOfferingsByUsername(username: string): Offering[] | null {
  const user = profilesDb[username];
  return user ? user.offerings : null;
}

export function getRatingsByUsername(username: string): Ratings | null {
  const user = profilesDb[username];
  return user ? user.ratings : null;
}

export function getCategoriesByUsername(username: string): string[] | null {
  const user = profilesDb[username];
  return user ? user.categories : null;
}
