import { APP_COLORS } from '@shared/constants/theme';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import { ScreenHeader } from '@shared/components/ui/ScreenHeader';
import { SpeciesCard } from '@features/species/components/SpeciesCard';
import { useSpeciesCatalogLogic } from '../hooks/useSpeciesCatalogLogic';

export default function SpeciesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const {
    search, setSearch,
    activeFilter, setActiveFilter,
    filters,
    filteredSpecies,
    viewMode, setViewMode,
  } = useSpeciesCatalogLogic();

  const renderHeader = () => (
    <View className="mb-4">
      <ScreenHeader title="Catálogo de Especies" subtitle={`${filteredSpecies.length} especies encontradas`} />

      {/* Search & Filter row */}
      <View className="flex-row items-center px-4 mt-2 mb-3">
        <View className="flex-1 flex-row items-center bg-surface rounded-xl px-3 border border-border shadow-sm">
          <Ionicons name="search" size={18} color={APP_COLORS.secondary} />
          <TextInput
            className="flex-1 text-primary text-sm px-2 py-3"
            placeholder="Buscar especie..."
            placeholderTextColor={APP_COLORS.disabled}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={18} color={APP_COLORS.disabled} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity 
          className="ml-2 w-12 h-12 rounded-xl bg-surface items-center justify-center border border-border shadow-sm"
          onPress={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
        >
          <Ionicons name={viewMode === 'grid' ? 'list' : 'grid'} size={20} color={APP_COLORS.secondary} />
        </TouchableOpacity>
      </View>

      {/* Filter Chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="max-h-10 px-4">
        <View className="flex-row gap-2 pb-1 pr-8">
          {filters.map(f => (
            <TouchableOpacity
              key={f}
              onPress={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-full border ${activeFilter === f ? 'bg-teal border-teal' : 'bg-surface border-border'}`}
            >
              <Text className={`text-xs font-bold ${activeFilter === f ? 'text-base' : 'text-muted'}`}>
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-base" edges={['top']}>
      <View className="flex-1 w-full">
        <FlashList
          data={filteredSpecies}
          keyExtractor={item => item.id.toString()}
          // @ts-ignore
          estimatedItemSize={200}
          numColumns={viewMode === 'grid' ? 2 : 1}
          key={viewMode}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={{ paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View style={{ 
              paddingHorizontal: viewMode === 'list' ? 16 : 0, 
              paddingLeft: viewMode === 'grid' && index % 2 === 0 ? 16 : 6,
              paddingRight: viewMode === 'grid' && index % 2 === 1 ? 16 : 6,
              paddingBottom: viewMode === 'list' ? 12 : 0,
            }}>
              <SpeciesCard 
                species={item} 
                onPress={() => router.push(`/species/${item.id}` as any)} 
                isList={viewMode === 'list'}
              />
            </View>
          )}
          ListEmptyComponent={
            <View className="items-center pt-16 gap-3">
              <Ionicons name="leaf-outline" size={48} color={APP_COLORS.disabled} />
              <Text className="text-base text-muted font-medium">No se encontraron especies</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}