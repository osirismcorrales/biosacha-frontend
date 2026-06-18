import { APP_COLORS } from '@shared/constants/theme';
import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { StatItem } from '@shared/components/ui/StatItem';

interface Props {
  points: number;
  discovered: number;
  completion: number;
}

export function StatsCard({ points, discovered, completion }: Props) {
  const { width } = useWindowDimensions();
  const isSmall = width < 375;

  if (isSmall) {
    return (
      <View className="bg-surface mx-4 rounded-xl p-4 border border-border">
        <View className="flex-row justify-between mb-3">
          <StatItem icon="star" value={points.toLocaleString()} label="Puntos" color={APP_COLORS.gold} />
          <StatItem icon="book" value={`${discovered}`} label="Descub." color={APP_COLORS.green.DEFAULT} />
          <StatItem icon="analytics" value={`${completion}%`} label="Compl." color="#8B5CF6" />
        </View>
      </View>
    );
  }

  return (
    <View className="flex-row bg-surface mx-4 rounded-xl p-5 border border-border">
      <StatItem icon="star" value={points.toLocaleString()} label="Puntos" color={APP_COLORS.gold} />
      <View className="w-px bg-border" />
      <StatItem icon="book" value={`${discovered}`} label="Descubiertos" color={APP_COLORS.green.DEFAULT} />
      <View className="w-px bg-border" />
      <StatItem icon="analytics" value={`${completion}%`} label="Completado" color="#8B5CF6" />
    </View>
  );
}
