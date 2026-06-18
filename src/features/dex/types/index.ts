import { Rarity, UnlockMethod } from '@shared/types';

export interface DexEntryDTO {
  id: number;
  speciesId: number;
  speciesName: string;
  scientificName: string;
  imageUrl: string;
  rarity: Rarity;
  unlockMethod: UnlockMethod;
  unlockedAt: string;
  stars: number;
}

export interface DexEntryPageDTO {
  entries: DexEntryDTO[];
  totalEntries: number;
  totalSpecies: number;
  completionPercentage: number;
}
