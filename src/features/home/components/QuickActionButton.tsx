import React from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  color: string;
  onPress: () => void;
}

export function QuickActionButton({ icon, label, color, onPress }: Props) {
  const { width } = useWindowDimensions();
  const isSmall = width < 375;
  
  return (
    <TouchableOpacity className="flex-1 bg-surface rounded-xl items-center justify-center border border-border" onPress={onPress} activeOpacity={0.8} style={{ padding: isSmall ? 12 : 16 }}>
      <View className={`rounded-full items-center justify-center mb-2`} style={{ backgroundColor: color + '18', width: isSmall ? 40 : 48, height: isSmall ? 40 : 48 }}>
        <Ionicons name={icon} size={isSmall ? 20 : 24} color={color} />
      </View>
      <Text className={`font-semibold text-secondary text-center ${isSmall ? 'text-[10px]' : 'text-xs'}`} numberOfLines={2}>{label}</Text>
    </TouchableOpacity>
  );
}
