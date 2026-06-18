import { Rarity, ConservationStatus } from '@shared/types';

export const rarityConfig: Record<Rarity, { label: string; container: string; text: string; dot: string }> = {
  COMMON:    { label: 'Común',      container: 'bg-common-bg border border-common-border', text: 'text-common',    dot: '#2E8B4E' },
  UNCOMMON:  { label: 'Poco Común', container: 'bg-common-bg border border-common-border', text: 'text-common',    dot: '#2E8B4E' },
  RARE:      { label: 'Raro',       container: 'bg-rare-bg border border-rare-border',     text: 'text-rare',      dot: '#E8A020' },
  EPIC:      { label: 'Épico',      container: 'bg-epic-bg border border-epic-border',     text: 'text-epic',      dot: '#8B5CF6' },
  LEGENDARY: { label: 'Legendario', container: 'bg-legendary-bg border border-legendary-border', text: 'text-legendary', dot: '#F5A623' },
};

export const conservationConfig: Record<ConservationStatus, { label: string; color: string }> = {
  LC: { label: 'Preocupación Menor',      color: '#2E8B4E' },
  NT: { label: 'Casi Amenazada',           color: '#E8A020' },
  VU: { label: 'Vulnerable',              color: '#E8A020' },
  EN: { label: 'En Peligro',              color: '#E85454' },
  CR: { label: 'En Peligro Crítico',      color: '#E85454' },
  EW: { label: 'Extinta en Estado Silvestre', color: '#534AB7' },
  EX: { label: 'Extinta',                 color: '#A8C896' },
};

export const unlockMethodConfig: Record<string, { label: string; icon: string; color: string }> = {
  QUIZ:      { label: 'Quiz',          icon: 'help-circle',  color: '#8B5CF6' },
  SIGHTING:  { label: 'Avistamiento',  icon: 'eye',          color: '#2E8B4E' },
  READING:   { label: 'Lectura',       icon: 'book',         color: '#E8A020' },
  CLASSROOM: { label: 'Aula',          icon: 'school',       color: '#3D6B28' },
};
