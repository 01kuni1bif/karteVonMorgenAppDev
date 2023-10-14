// types.ts
interface AvgRatings {
  total: number;
  diversity: number;
  fairness: number;
  humanity: number;
  renewable: number;
  solidarity: number;
  transparency: number;
}

interface SearchEntry {
  id: string;
  status: 'created' | 'confirmed' | 'rejected' | 'archived';
  lat: number;
  lng: number;
  title: string;
  description: string;
  categories: string[];
  tags: string[];
  ratings: AvgRatings;
}

export interface SearchData {
  visible: SearchEntry[];
  invisible: SearchEntry[];
}

interface CustomLink {
  url: string;
  title?: string;
  description?: string;
}

export interface EntryData {
  title: string;
  description: string;
  lat: number;
  lng: number;
  street?: string;
  zip?: string;
  city?: string;
  country?: string;
  state?: string;
  contact_name?: string;
  email?: string;
  telephone?: string;
  homepage?: string;
  opening_hours?: string;
  founded_on?: string;
  categories?: string[];
  tags?: string[];
  image_url?: string;
  image_link_url?: string;
  links?: CustomLink[];
  license?: string;
  id: string;
  version?: number;
  created: number;
  ratings?: string[];
}

export interface EventData {
  id: string;
  title: string;
  description: string;
  start: number;
  end: number;
  created_at: number;
  created_by?: string;
  lat: number;
  lng: number;
  street?: string;
  zip?: string;
  city?: string;
  country?: string;
  state?: string;
  email?: string;
  telephone?: string;
  tags?: string[];
  homepage?: string;
  registration?: 'email' | 'telephone' | 'homepage';
  organizer?: string;
  image_url?: string;
  image_link_url?: string;
}
