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

// Array
export interface SearchData {
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

interface CustomLink {
  url: string;
  title?: string;
  description?: string;
}

// Array
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

// Array or Object with /events/id
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
