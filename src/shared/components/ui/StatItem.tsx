import React from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  icon: keyof typeof Ionicons.glyphMap;
  value: string;
  label: string;
  color: string;
}

export function StatItem({ icon, value, label, color }: Props) {
  const { width } = useWindowDimensions();
  const isSmall = width < 375;
  
  return (
    <View className={`items-center ${isSmall ? 'flex-0 w-24' : 'flex-1'}`}>
      <View className={`rounded-full items-center justify-center mb-1.5 ${isSmall ? 'w-8 h-8' : 'w-9 h-9'}`} style={{ backgroundColor: color + '20' }}>
        <Ionicons name={icon} size={isSmall ? 16 : 18} color={color} />
      </View>
      <Text className={`font-bold text-primary ${isSmall ? 'text-base' : 'text-lg'}`}>{value}</Text>
      <Text className={`text-muted mt-0.5 ${isSmall ? 'text-[10px]' : 'text-xs'}`}>{label}</Text>
    </View>
  );
}