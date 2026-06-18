import React from 'react';
import { View, Text } from 'react-native';

interface Props {
  title: string;
  subtitle?: string;
}

export function ScreenHeader({ title, subtitle }: Props) {
  return (
    <View className="px-4 pt-2 pb-1">
      <Text className="text-2xl font-bold text-primary">{title}</Text>
      {subtitle && <Text className="text-sm text-muted mt-0.5">{subtitle}</Text>}
    </View>
  );
}
