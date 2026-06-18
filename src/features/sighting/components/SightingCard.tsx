import { APP_COLORS } from '@shared/constants/theme';
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SightingDTO } from '@features/sighting/types';

interface Props {
  sighting: SightingDTO;
  onPress?: () => void;
}

export function SightingCard({ sighting, onPress }: Props) {
  const date = new Date(sighting.createdAt);
  const fmt = date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
  const time = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

  return (
    <TouchableOpacity className="bg-surface rounded-xl overflow-hidden mb-4 border border-border" onPress={onPress} activeOpacity={0.85}>
      <Image source={{ uri: sighting.images[0] || sighting.speciesImageUrl }} className="w-full bg-elevated" style={{ height: 180 }} />
      {/* Badge */}
      <View className="absolute top-3 right-3">
        {sighting.verified ? (
          <View className="flex-row items-center bg-teal-dark px-2.5 py-1 rounded-full gap-1">
            <Ionicons name="checkmark-circle" size={14} color={APP_COLORS.secondary} />
            <Text className="text-xs font-bold text-secondary">Verificado</Text>
          </View>
        ) : (
          <View className="flex-row items-center bg-rare-bg px-2.5 py-1 rounded-full gap-1 border border-rare-border">
            <Ionicons name="time" size={14} color={APP_COLORS.warning} />
            <Text className="text-xs font-bold text-rare">Pendiente</Text>
          </View>
        )}
      </View>
      {/* Content */}
      <View className="p-4">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-base font-bold text-primary">{sighting.speciesName}</Text>
          <Text className="text-xs text-muted">{sighting.userName}</Text>
        </View>
        <View className="flex-row justify-between">
          <View className="flex-row items-center gap-1">
            <Ionicons name="location-outline" size={14} color={APP_COLORS.muted} />
            <Text className="text-xs text-muted">{sighting.latitude.toFixed(2)}°, {sighting.longitude.toFixed(2)}°</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Ionicons name="calendar-outline" size={14} color={APP_COLORS.muted} />
            <Text className="text-xs text-muted">{fmt} · {time}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
