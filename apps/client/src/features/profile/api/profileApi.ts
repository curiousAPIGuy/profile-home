import { Profile, Offering, Ratings } from '../types';
import {
  mockProfile,
  mockOfferings,
  mockRatings,
  mockCategories,
} from './mockData';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_API !== 'false';
const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchJson<T>(path: string): Promise<T> {
  const url = `${API_BASE}${path}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  const contentType = response.headers.get('content-type');
  if (contentType && !contentType.includes('application/json')) {
    throw new Error(
      `Received non-JSON response from ${url}. Ensure the API server is running.`
    );
  }
  return response.json();
}

export async function getProfile(username: string): Promise<Profile> {
  if (USE_MOCK) {
    await delay();
    return { ...mockProfile, username: username || mockProfile.username };
  }
  return fetchJson<Profile>(`/profiles/${username}`);
}

export async function getOfferings(username: string): Promise<Offering[]> {
  if (USE_MOCK) {
    await delay(300);
    return mockOfferings;
  }
  return fetchJson<Offering[]>(`/profiles/${username}/offerings`);
}

export async function getRatings(username: string): Promise<Ratings> {
  if (USE_MOCK) {
    await delay(500);
    return mockRatings;
  }
  return fetchJson<Ratings>(`/profiles/${username}/ratings`);
}

export async function getCategories(username: string): Promise<string[]> {
  if (USE_MOCK) {
    await delay(200);
    return mockCategories;
  }
  return fetchJson<string[]>(`/profiles/${username}/categories`);
}
