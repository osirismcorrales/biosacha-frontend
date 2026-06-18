export interface SightingDTO {
  id: number;
  userId: number;
  userName: string;
  speciesId: number;
  speciesName: string;
  speciesImageUrl: string;
  latitude: number;
  longitude: number;
  verified: boolean;
  images: string[];
  createdAt: string;
  conservationStatus?: string;
}
