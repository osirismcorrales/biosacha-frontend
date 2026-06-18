import { APP_COLORS } from '@shared/constants/theme';
import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLevelConfig } from '@shared/hooks/useLevelConfig';
import { User } from '@features/profile/types';

interface Props {
  user: User;
}

export function UserHeader({ user }: Props) {
  const level = useLevelConfig(user.level);
  const initials = user.name.split(' ').map(n => n[0]).join('');

  return (
    <View className="flex-row justify-between items-center px-5 pt-2 pb-4">
      <View className="flex-1">
        <Text className="text-base text-muted">¡Hola,</Text>
        <Text className="text-2xl font-bold text-primary">
          {user.name.split(' ')[0]}!
        </Text>
        <View className="flex-row items-center bg-teal-subtle self-start px-3 py-1.5 rounded-full mt-2 gap-1.5">
          <Ionicons name={level.icon as any} size={14} color={APP_COLORS.secondary} />
          <Text className="text-secondary text-xs font-semibold">Nivel {level.label}</Text>
        </View>
      </View>
      <View className="w-14 h-14 rounded-full bg-elevated border-2 border-border items-center justify-center">
        <Text className="text-lg font-bold text-primary">{initials}</Text>
      </View>
    </View>
  );
}
