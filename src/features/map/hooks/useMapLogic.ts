import { useState, useMemo } from 'react';

export type SightingMarker = {
  id: number;
  lat: number;
  lng: number;
  speciesName: string;
  scientificName: string;
  category: string;
  verified: boolean;
  conservation: string;
  date: string;
  author: string;
  imageUrl?: string;
  isEpic?: boolean;
};

const MOCK_SIGHTINGS: SightingMarker[] = [
  { id: 1, lat: -23.5, lng: -62.0, speciesName: 'Aguará Guazú', scientificName: 'Chrysocyon brachyurus', category: 'Mamíferos', verified: true, conservation: 'VU', date: 'hace 2 días', author: 'Matias R.', isEpic: true },
  { id: 2, lat: -20.0, lng: -58.5, speciesName: 'Tatú Carreta', scientificName: 'Priodontes maximus', category: 'Mamíferos', verified: true, conservation: 'VU', date: '10 abr', author: 'Valentina S.' },
  { id: 3, lat: -25.5, lng: -60.0, speciesName: 'Yacaré Overo', scientificName: 'Caiman latirostris', category: 'Reptiles', verified: false, conservation: 'LC', date: '20 abr', author: 'Matias R.' },
];

export function useMapLogic() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [selectedSightingId, setSelectedSightingId] = useState<number | null>(null);

  const filters = ['Todos', 'Mamíferos', 'Reptiles', 'Aves', 'Anfibios'];

  const filteredSightings = useMemo(() => {
    return MOCK_SIGHTINGS.filter(s => {
      const matchSearch = s.speciesName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchFilter = activeFilter === 'Todos' || s.category === activeFilter;
      return matchSearch && matchFilter;
    });
  }, [searchQuery, activeFilter]);

  const selectedSighting = useMemo(() => {
    if (!selectedSightingId) return null;
    return MOCK_SIGHTINGS.find(s => s.id === selectedSightingId) || null;
  }, [selectedSightingId]);

  return {
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    filters,
    filteredSightings,
    selectedSightingId,
    setSelectedSightingId,
    selectedSighting,
  };
}
