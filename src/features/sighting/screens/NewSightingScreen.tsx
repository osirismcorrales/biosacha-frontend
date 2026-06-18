import { APP_COLORS } from '@shared/constants/theme';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import { mockSpecies } from '@features/species/data/mock';
import { MapView } from '@shared/components/map';

export default function NewSightingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [speciesId, setSpeciesId] = useState<number | null>(null);
  const [notes, setNotes] = useState('');
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState('');

  const handleGetLocation = async () => {
    setIsGettingLocation(true);
    setLocationError('');
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationError('Permiso de ubicación denegado');
        setIsGettingLocation(false);
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation({
        lat: loc.coords.latitude,
        lng: loc.coords.longitude
      });
    } catch (err) {
      setLocationError('Error al obtener la ubicación');
    } finally {
      setIsGettingLocation(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-base" edges={['top']}>
      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity className="w-10 h-10 rounded-full bg-surface items-center justify-center" onPress={() => router.back()}>
          <Ionicons name="close" size={24} color={APP_COLORS.primary} />
        </TouchableOpacity>
        <Text className="flex-1 text-lg font-bold text-primary text-center">Nuevo Avistamiento</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>
        {/* Photo */}
        <TouchableOpacity className="bg-surface rounded-2xl p-8 items-center mb-6 border-2 border-dashed border-border" activeOpacity={0.7}>
          <View className="w-16 h-16 rounded-full bg-teal-subtle items-center justify-center mb-3">
            <Ionicons name="camera" size={32} color={APP_COLORS.green.DEFAULT} />
          </View>
          <Text className="text-base font-bold text-primary mb-1">Agregar Foto</Text>
          <Text className="text-xs text-muted">Toma o selecciona una foto de la especie</Text>
        </TouchableOpacity>

        {/* Species */}
        <Text className="text-sm font-bold text-primary mb-2.5">Especie</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-5" contentContainerStyle={{ gap: 8 }}>
          {mockSpecies.slice(0, 6).map(sp => (
            <TouchableOpacity
              key={sp.id}
              className={`px-4 py-2.5 rounded-xl border ${speciesId === sp.id ? 'bg-teal border-teal' : 'bg-surface border-border'}`}
              onPress={() => setSpeciesId(sp.id)}
            >
              <Text className={`text-xs font-semibold ${speciesId === sp.id ? 'text-base' : 'text-muted'}`}>{sp.commonName}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Location */}
        <Text className="text-sm font-bold text-primary mb-2.5">Ubicación</Text>
        {!location ? (
          <TouchableOpacity 
            className="flex-row items-center bg-surface p-4 rounded-xl mb-5 border border-border" 
            activeOpacity={0.7}
            onPress={handleGetLocation}
            disabled={isGettingLocation}
          >
            {isGettingLocation ? (
              <ActivityIndicator size="small" color={APP_COLORS.green.DEFAULT} />
            ) : (
              <Ionicons name="location" size={24} color={APP_COLORS.green.DEFAULT} />
            )}
            <View className="flex-1 ml-3">
              <Text className="text-sm font-semibold text-primary">
                {isGettingLocation ? 'Obteniendo ubicación...' : 'Usar ubicación actual'}
              </Text>
              {locationError ? (
                <Text className="text-xs text-red-500 mt-0.5">{locationError}</Text>
              ) : (
                <Text className="text-xs text-muted mt-0.5">Toca para obtener coordenadas GPS</Text>
              )}
            </View>
            <Ionicons name="navigate-outline" size={20} color={APP_COLORS.disabled} />
          </TouchableOpacity>
        ) : (
          <View className="mb-5 bg-surface rounded-xl overflow-hidden border border-border">
            <View className="flex-row items-center justify-between p-4 border-b border-border">
              <View className="flex-row items-center">
                <Ionicons name="checkmark-circle" size={20} color={APP_COLORS.green.DEFAULT} />
                <Text className="text-sm font-semibold text-primary ml-2">Ubicación capturada</Text>
              </View>
              <TouchableOpacity onPress={() => setLocation(null)}>
                <Text className="text-xs text-teal font-bold">Cambiar</Text>
              </TouchableOpacity>
            </View>
            <View className="p-2">
              <MapView 
                latitude={location.lat} 
                longitude={location.lng} 
                height={200}
                zoom={14}
                markers={[{ lat: location.lat, lng: location.lng, label: 'Mi ubicación' }]}
              />
            </View>
          </View>
        )}

        {/* Notes */}
        <Text className="text-sm font-bold text-primary mb-2.5">Notas (opcional)</Text>
        <TextInput
          className="bg-surface rounded-xl p-4 text-sm text-primary border border-border"
          placeholder="Describe lo que observaste..."
          placeholderTextColor={APP_COLORS.disabled}
          multiline numberOfLines={4}
          value={notes} onChangeText={setNotes}
          textAlignVertical="top"
          style={{ minHeight: 120 }}
        />
      </ScrollView>

      <View className="p-4" style={{ paddingBottom: Math.max(insets.bottom, 16) }}>
        <TouchableOpacity
          className={`flex-row items-center justify-center p-4 rounded-xl gap-2.5 ${speciesId ? 'bg-teal' : 'bg-disabled'}`}
          disabled={!speciesId} activeOpacity={0.85}
        >
          <Ionicons name="send" size={20} color={speciesId ? APP_COLORS.base : APP_COLORS.sunken} />
          <Text className="text-base font-bold" style={{ color: speciesId ? APP_COLORS.base : APP_COLORS.sunken }}>Registrar Avistamiento</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
