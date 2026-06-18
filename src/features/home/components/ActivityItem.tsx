import { APP_COLORS } from '@shared/constants/theme';
import React from 'react';
import { View, Text, Image, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  imageUrl: string;
  speciesName: string;
  userName: string;
  verified: boolean;
}

export function ActivityItem({ imageUrl, speciesName, userName, verified }: Props) {
  const { width } = useWindowDimensions();
  const isSmall = width < 375;
  
  return (
    <View className="flex-row items-center bg-surface p-3 rounded-lg mb-2 border border-border">
      <Image source={{ uri: imageUrl }} className="bg-elevated" style={{ width: isSmall ? 36 : 44, height: isSmall ? 36 : 44, borderRadius: 8 }} />
      <View className="flex-1 ml-3">
        <Text className={`font-semibold text-primary ${isSmall ? 'text-xs' : 'text-sm'}`} numberOfLines={1}>{speciesName}</Text>
        <Text className={`text-muted mt-0.5 ${isSmall ? 'text-[10px]' : 'text-xs'}`} numberOfLines={1}>{userName}</Text>
      </View>
      <Ionicons
        name={verified ? 'checkmark-circle' : 'time-outline'}
        size={18}
        color={verified ? APP_COLORS.green.DEFAULT : APP_COLORS.warning}
      />
    </View>
  );
}
