import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface Props {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function SectionHeader({ title, actionLabel, onAction }: Props) {
  return (
    <View className="flex-row justify-between items-center mb-3">
      <Text className="text-lg font-bold text-primary">{title}</Text>
      {actionLabel && onAction && (
        <TouchableOpacity onPress={onAction}>
          <Text className="text-sm font-semibold text-teal">{actionLabel} →</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
