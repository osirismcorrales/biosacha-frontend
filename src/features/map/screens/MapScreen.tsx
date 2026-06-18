import { APP_COLORS } from '@shared/constants/theme';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { MapView } from '@shared/components/map';
import { useMapLogic } from '../hooks/useMapLogic';

export default function MapScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const {
    searchQuery, setSearchQuery,
    activeFilter, setActiveFilter,
    filters,
    filteredSightings,
    selectedSighting, setSelectedSightingId
  } = useMapLogic();

  const mapMarkers = filteredSightings.map(s => ({
    id: s.id,
    lat: s.lat,
    lng: s.lng,
    label: s.speciesName,
  }));

  return (
    <View className="flex-1 bg-base">
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        <MapView
          latitude={-23}
          longitude={-60}
          zoom={5}
          height={'100%' as any}
          markers={mapMarkers}
          onMarkerPress={(id) => setSelectedSightingId(Number(id))}
        />
      </View>

      <SafeAreaView edges={['top']} style={{ flex: 1 }} pointerEvents="box-none">
        <View className="px-4 pt-2" pointerEvents="box-none">
          <View className="flex-row items-center gap-3 mb-3">
            <View className="flex-1 flex-row items-center bg-surface rounded-2xl px-4 py-3 border border-border shadow-sm">
              <Ionicons name="search" size={20} color={APP_COLORS.secondary} />
              <TextInput
                placeholder="Buscar especie..."
                placeholderTextColor={APP_COLORS.disabled}
                className="flex-1 ml-2 text-primary font-medium"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            <TouchableOpacity className="w-12 h-12 bg-surface rounded-2xl items-center justify-center border border-border shadow-sm">
              <Ionicons name="folder-outline" size={22} color={APP_COLORS.secondary} />
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="max-h-10" pointerEvents="box-none">
            <View className="flex-row gap-2">
              {filters.map(f => (
                <TouchableOpacity
                  key={f}
                  onPress={() => setActiveFilter(f)}
                  className={`px-4 py-2 rounded-full border ${activeFilter === f ? 'bg-teal border-teal' : 'bg-surface border-border'}`}
                >
                  <View className="flex-row items-center gap-1">
                    {f === 'Mamíferos' && <Text className="text-[10px]">🦊</Text>}
                    {f === 'Reptiles' && <Text className="text-[10px]">🦎</Text>}
                    <Text className={`text-xs font-bold ${activeFilter === f ? 'text-base' : 'text-muted'}`}>
                      {f}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={{ flex: 1 }} pointerEvents="none" />

        {!selectedSighting && (
          <View className="absolute right-4 bottom-6" style={{ marginBottom: insets.bottom }} pointerEvents="box-none">
            <TouchableOpacity 
              className="w-14 h-14 bg-teal rounded-full items-center justify-center shadow-lg"
              onPress={() => router.push('/sighting/new' as any)}
            >
              <Ionicons name="camera" size={26} color={APP_COLORS.base} />
            </TouchableOpacity>
          </View>
        )}

        {selectedSighting && (
          <View className="absolute bottom-0 left-0 right-0 bg-surface rounded-t-3xl border-t border-border p-5" style={{ paddingBottom: Math.max(insets.bottom, 20) }} pointerEvents="box-none">
            <View className="w-12 h-1 bg-border rounded-full self-center mb-4" />
            
            <View className="flex-row justify-between items-start mb-4">
              <View className="flex-1 flex-row">
                <View className="w-14 h-14 bg-elevated rounded-2xl items-center justify-center border border-teal">
                  <Text className="text-2xl">🦊</Text>
                </View>
                <View className="ml-3 flex-1">
                  <View className="flex-row items-center gap-2">
                    <Text className="text-lg font-extrabold text-primary">{selectedSighting.speciesName}</Text>
                    {selectedSighting.isEpic && (
                      <View className="bg-purple-500/20 px-2 py-0.5 rounded-full border border-purple-500">
                        <Text className="text-[10px] font-bold text-purple-400">ÉPICO</Text>
                      </View>
                    )}
                  </View>
                  <Text className="text-xs text-muted italic mb-1">{selectedSighting.scientificName}</Text>
                  <View className="flex-row items-center">
                    <Ionicons name="location" size={12} color={APP_COLORS.danger} />
                    <Text className="text-xs text-muted ml-1 flex-shrink-1" numberOfLines={1}>{selectedSighting.date} · Por {selectedSighting.author}</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity onPress={() => setSelectedSightingId(null)} className="p-1">
                <Ionicons name="close" size={20} color={APP_COLORS.disabled} />
              </TouchableOpacity>
            </View>

            <View className="h-32 bg-elevated rounded-xl items-center justify-center border border-border mb-4">
              <Ionicons name="camera-outline" size={24} color={APP_COLORS.disabled} className="mb-2" />
              <Text className="text-xs text-muted">Foto verificada por admin</Text>
            </View>

            <View className="flex-row gap-2 mb-4">
              {selectedSighting.verified && (
                <View className="flex-row items-center bg-teal/20 px-2 py-1 rounded border border-teal">
                  <Ionicons name="checkmark" size={12} color={APP_COLORS.green.DEFAULT} />
                  <Text className="text-[10px] font-bold text-teal ml-1">Verificado</Text>
                </View>
              )}
              <View className="bg-red-500/20 px-2 py-1 rounded border border-red-500">
                <Text className="text-[10px] font-bold text-red-500">{selectedSighting.conservation}</Text>
              </View>
            </View>

            <View className="flex-row gap-3">
              <TouchableOpacity className="flex-1 bg-teal py-3.5 rounded-xl items-center justify-center flex-row gap-2">
                <Text className="text-sm font-bold text-base">Ver ficha completa</Text>
                <Ionicons name="arrow-forward" size={16} color={APP_COLORS.base} />
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 bg-surface border border-teal py-3.5 rounded-xl items-center justify-center flex-row gap-2">
                <Ionicons name="navigate" size={16} color={APP_COLORS.green.DEFAULT} />
                <Text className="text-sm font-bold text-teal">Cómo llegar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}
