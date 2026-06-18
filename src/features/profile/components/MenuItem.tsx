import { APP_COLORS } from '@shared/constants/theme';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value?: string;
  onPress?: () => void;
}

export function MenuItem({ icon, label, value, onPress }: Props) {
  return (
    <TouchableOpacity className="flex-row items-center p-4 border-b border-border" onPress={onPress} activeOpacity={0.7}>
      <Ionicons name={icon} size={22} color={APP_COLORS.green.DEFAULT} />
      <Text className="flex-1 text-sm font-medium text-primary ml-3.5">{label}</Text>
      {value && <Text className="text-sm text-disabled mr-1">{value}</Text>}
      <Ionicons name="chevron-forward" size={18} color={APP_COLORS.disabled} />
    </TouchableOpacity>
  );
}
