import { Rarity, ConservationStatus } from '@shared/types';

export interface SpeciesCardDTO {
  id: number;
  commonName: string;
  scientificName: string;
  family: string;
  rarity: Rarity;
  conservationStatus: ConservationStatus;
  mainImageUrl: string;
  stars: number;
  audioUrl?: string;
}

export interface SpeciesDetailDTO extends SpeciesCardDTO {
  description: string;
  imageDescription: string;
  pronunciationUrl: string;
}
