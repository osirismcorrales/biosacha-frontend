import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  icon: keyof typeof Ionicons.glyphMap;
  size?: number;
  color: string;
  bgClassName?: string;
}

export function IconCircle({ icon, size = 20, color, bgClassName = 'bg-teal-subtle' }: Props) {
  return (
    <View className={`w-10 h-10 rounded-full items-center justify-center ${bgClassName}`}>
      <Ionicons name={icon} size={size} color={color} />
    </View>
  );
}
