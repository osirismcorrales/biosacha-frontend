import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { rarityConfig } from '@shared/constants/colors';
import { SpeciesCardDTO } from '@features/species/types';

interface Props {
  species: SpeciesCardDTO;
  onPress?: () => void;
}

export function RecentSpeciesCard({ species, onPress }: Props) {
  return (
    <TouchableOpacity className="w-40 h-52 rounded-xl overflow-hidden" onPress={onPress} activeOpacity={0.85}>
      <Image source={{ uri: species.mainImageUrl }} className="w-full h-full" style={{ position: 'absolute' }} />
      <LinearGradient colors={['transparent', 'rgba(0,0,0,0.75)']} className="absolute bottom-0 left-0 right-0 h-1/2" />
      <View className="absolute bottom-3 left-3 right-3">
        <View className="w-2 h-2 rounded-full mb-1.5" style={{ backgroundColor: rarityConfig[species.rarity].dot }} />
        <Text className="text-primary font-bold text-sm" numberOfLines={1}>{species.commonName}</Text>
        <Text className="text-xs italic text-disabled" numberOfLines={1}>{species.scientificName}</Text>
      </View>
    </TouchableOpacity>
  );
}
