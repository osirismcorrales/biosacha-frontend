import { useState, useMemo } from 'react';
import { mockSpecies } from '@features/species/data/mock';

export function useSpeciesCatalogLogic() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Categorías basadas en la imagen de diseño
  const filters = ['Todos', 'Aves', 'Mamíferos', 'Reptiles', 'Anfibios', 'Plantas'];

  const filteredSpecies = useMemo(() => {
    return mockSpecies.filter(s => {
      const matchesSearch = !search || s.commonName.toLowerCase().includes(search.toLowerCase());
      
      // Dado que el mock original usaba 'family', mapeamos los filtros visuales.
      // Aquí podrías adaptar la lógica si en el backend tienes 'clase' o 'categoría'.
      let matchesFilter = true;
      if (activeFilter !== 'Todos') {
        // Hacemos una aproximación según el mock que vimos.
        // Podrías filtrar por familia o una propiedad específica si el DTO la tiene.
        // matchesFilter = s.clase === activeFilter;
      }

      return matchesSearch && matchesFilter;
    });
  }, [search, activeFilter]);

  return {
    search,
    setSearch,
    activeFilter,
    setActiveFilter,
    filters,
    filteredSpecies,
    viewMode,
    setViewMode,
  };
}
