import React from 'react';
import { View, Text, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RarityBadge } from '@shared/components/ui/RarityBadge';
import { unlockMethodConfig } from '@shared/constants/colors';
import { DexEntryDTO } from '@features/dex/types';

interface Props {
  entry: DexEntryDTO;
  onPress?: () => void;
}

export function DexEntryCard({ entry, onPress }: Props) {
  const { width } = useWindowDimensions();
  const isSmall = width < 375;
  const method = unlockMethodConfig[entry.unlockMethod];
  const date = new Date(entry.unlockedAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });

  return (
    <TouchableOpacity className="flex-row bg-surface rounded-xl overflow-hidden mb-3 border border-border" onPress={onPress} activeOpacity={0.85}>
      <Image source={{ uri: entry.imageUrl }} className="bg-elevated" style={{ width: isSmall ? 64 : 80, height: isSmall ? 64 : 80 }} />
      <View className={`flex-1 justify-center ${isSmall ? 'p-2' : 'p-3'}`}>
        <View className="flex-row justify-between items-center mb-0.5">
          <Text className={`font-bold text-primary flex-1 mr-2 ${isSmall ? 'text-xs' : 'text-sm'}`} numberOfLines={1}>{entry.speciesName}</Text>
          <RarityBadge rarity={entry.rarity} />
        </View>
        <Text className={`italic text-muted mb-1.5 ${isSmall ? 'text-[10px]' : 'text-xs'}`} numberOfLines={1}>{entry.scientificName}</Text>
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center bg-teal-subtle px-2 py-0.5 rounded-sm gap-1">
            <Ionicons name={method.icon as any} size={12} color={method.color} />
            <Text className="text-xs font-semibold text-secondary">{method.label}</Text>
          </View>
          <Text className={`text-disabled ${isSmall ? 'text-[10px]' : 'text-xs'}`}>{date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
