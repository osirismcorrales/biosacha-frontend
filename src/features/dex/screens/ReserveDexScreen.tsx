import { APP_COLORS } from '@shared/constants/theme';
import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import { ScreenHeader } from '@shared/components/ui/ScreenHeader';
import { SpeciesCard } from '@features/species/components/SpeciesCard';
import { mockDexPage } from '@features/dex/data/mock';
import { mockSpecies } from '@features/species/data/mock';
import { Rarity } from '@shared/types';

type SortOption = 'stars' | 'AZ' | 'ZA' | 'rarity';
type ViewMode = 'grid' | 'list';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'AZ', label: 'A-Z' },
  { value: 'ZA', label: 'Z-A' },
  { value: 'stars', label: 'Estrellas' },
  { value: 'rarity', label: 'Rareza' },
];

function MethodStat({ icon, label, count, color, isSmall }: { icon: string; label: string; count: number; color: string; isSmall?: boolean }) {
  return (
    <View className="flex-1 items-center">
      <View className={`rounded-full items-center justify-center mb-1 ${isSmall ? 'w-6 h-6' : 'w-8 h-8'}`} style={{ backgroundColor: color + '18' }}>
        <Ionicons name={icon as any} size={isSmall ? 12 : 16} color={color} />
      </View>
      <Text className={`font-bold text-primary ${isSmall ? 'text-sm' : 'text-base'}`}>{count}</Text>
      <Text className={`text-muted mt-0.5 ${isSmall ? 'text-[8px]' : 'text-[10px]'}`}>{label}</Text>
    </View>
  );
}

export default function ReserveDexScreen() {
  const router = useRouter();
  const { reserveId } = useLocalSearchParams<{ reserveId?: string }>();
  const isReserve = Boolean(reserveId) && reserveId !== 'general';

  const { totalEntries, totalSpecies, completionPercentage } = mockDexPage;
  const [sortBy, setSortBy] = useState<SortOption>('AZ');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const speciesWithStars = useMemo(() => {
    const RARITY_ORDER: Record<Rarity, number> = {
      LEGENDARY: 5,
      EPIC: 4,
      RARE: 3,
      UNCOMMON: 2,
      COMMON: 1,
    };

    const result = mockDexPage.entries.map(entry => {
      const species = mockSpecies.find(s => s.id === entry.speciesId);
      return {
        ...species!,
        id: entry.speciesId,
        stars: entry.stars,
      };
    });

    let sorted = result;
    switch (sortBy) {
      case 'stars':
        sorted = result.sort((a, b) => b.stars - a.stars); break;
      case 'AZ':
        sorted = result.sort((a, b) => (a?.commonName || '').localeCompare(b?.commonName || '')); break;
      case 'ZA':
        sorted = result.sort((a, b) => (b?.commonName || '').localeCompare(a?.commonName || '')); break;
      case 'rarity':
        sorted = result.sort((a, b) => RARITY_ORDER[b?.rarity || 'COMMON'] - RARITY_ORDER[a?.rarity || 'COMMON']); break;
    }

    // Filtrado simulado para la reserva
    if (isReserve) {
      return sorted.slice(0, 5); // Simulamos que Horco Molle tiene 5 descubiertas
    }
    return sorted;
  }, [sortBy, isReserve]);

  const renderHeader = () => {
    const title = isReserve ? 'Horco Molle' : 'Mi BioDex';
    const subtitle = isReserve ? 'Especies descubiertas en la reserva' : 'Tu colección de especies descubiertas';
    const progress = isReserve ? 41 : completionPercentage;
    const current = isReserve ? 5 : totalEntries;
    const total = isReserve ? 12 : totalSpecies;

    return (
      <View>
        <ScreenHeader title={title} subtitle={subtitle} />
        <View className="bg-surface mx-4 mt-4 rounded-xl border border-border p-5">
          <View className="flex-row items-center mb-4">
            <View className="w-[72px] h-[72px] rounded-full bg-teal-subtle items-center justify-center mr-5" style={{ borderWidth: 3, borderColor: APP_COLORS.green.DEFAULT }}>
              <Text className="text-xl font-extrabold text-teal">{progress}%</Text>
            </View>
            <View className="flex-1">
              <Text className="font-bold text-primary mb-1">Progreso {isReserve ? `en ${title}` : 'del Dex'}</Text>
              <Text className="text-xs text-muted mb-2.5">
                <Text className="text-base font-extrabold text-teal">{current}</Text> de {total} especies
              </Text>
              <View className="h-2 rounded-full bg-elevated overflow-hidden">
                <View className="h-full rounded-full bg-teal" style={{ width: `${progress}%` }} />
              </View>
            </View>
          </View>
          <View className="flex-row border-t border-border pt-4">
            <MethodStat icon="help-circle" label="Quiz" count={isReserve ? 1 : 2} color="#8B5CF6" />
            <MethodStat icon="eye" label="Avistamiento" count={isReserve ? 1 : 2} color={APP_COLORS.green.DEFAULT} />
            <MethodStat icon="book" label="Lectura" count={isReserve ? 0 : 2} color={APP_COLORS.warning} />
            <MethodStat icon="school" label="Aula" count={isReserve ? 3 : 1} color={APP_COLORS.secondary} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-base" edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {renderHeader()}

        {/* Sort & View Mode */}
        <View className="flex-row items-center justify-between px-4 mt-4">
          <View className="flex-row items-center gap-2">
            <Text className="text-sm text-muted">Orden:</Text>
            <View className="flex-row items-center bg-surface rounded-lg p-1 border border-border">
              {SORT_OPTIONS.map(opt => (
                <TouchableOpacity
                  key={opt.value}
                  className={`px-3 py-1.5 rounded-md ${sortBy === opt.value ? 'bg-teal' : ''}`}
                  onPress={() => setSortBy(opt.value)}
                >
                  <Text className={`text-xs font-medium ${sortBy === opt.value ? 'text-base' : 'text-muted'}`}>
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View className="flex-row items-center bg-surface rounded-lg p-1 border border-border">
            <TouchableOpacity 
              className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-teal' : ''}`}
              onPress={() => setViewMode('grid')}
            >
              <Ionicons name="grid" size={20} color={viewMode === 'grid' ? '#fff' : APP_COLORS.disabled} />
            </TouchableOpacity>
            <TouchableOpacity 
              className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-teal' : ''}`}
              onPress={() => setViewMode('list')}
            >
              <Ionicons name="list" size={20} color={viewMode === 'list' ? '#fff' : APP_COLORS.disabled} />
            </TouchableOpacity>
          </View>
        </View>

        {/* List */}
        {viewMode === 'grid' ? (
          <FlatList
            data={speciesWithStars}
            keyExtractor={i => i.id.toString()}
            numColumns={2}
            key={`grid-${speciesWithStars.length}`}
            columnWrapperStyle={{ justifyContent: 'flex-start', paddingHorizontal: 12, gap: 12 }}
            contentContainerStyle={{ paddingTop: 16, paddingBottom: 32 }}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View className="flex-1">
                <SpeciesCard species={item as any} onPress={() => router.push(`/species/${item.id}` as any)} />
              </View>
            )}
            ListEmptyComponent={
              <View className="items-center pt-16 gap-3">
                <Ionicons name="albums-outline" size={48} color={APP_COLORS.disabled} />
                <Text className="text-base text-muted font-medium">Aún no tienes especies descubiertas</Text>
              </View>
            }
          />
        ) : (
          <FlatList
            data={speciesWithStars}
            keyExtractor={i => i.id.toString()}
            contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 32 }}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <SpeciesCard species={item as any} onPress={() => router.push(`/species/${item.id}` as any)} isList />
            )}
            ListEmptyComponent={
              <View className="items-center pt-16 gap-3">
                <Ionicons name="albums-outline" size={48} color={APP_COLORS.disabled} />
                <Text className="text-base text-muted font-medium">Aún no tienes especies descubiertas</Text>
              </View>
            }
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
