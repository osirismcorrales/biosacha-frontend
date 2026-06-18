import React from 'react';
import { View, Text } from 'react-native';
import { rarityConfig } from '@shared/constants/colors';
import { Rarity } from '@shared/types';

interface Props {
  rarity: Rarity;
}

export function RarityBadge({ rarity }: Props) {
  const cfg = rarityConfig[rarity];
  
  const colors = {
    COMMON: { bg: '#2E8B4E', text: '#FFFFFF' },
    UNCOMMON: { bg: '#6B9E50', text: '#F5F9F5' },
    RARE: { bg: '#E8A020', text: '#FFFFFF' },
    EPIC: { bg: '#8B5CF6', text: '#FFFFFF' },
    LEGENDARY: { bg: '#F5A623', text: '#F5F9F5' }
  };
  const theme = colors[rarity] || colors.COMMON;

  return (
    <View 
      className="px-2 py-0.5 rounded-md" 
      style={{ backgroundColor: theme.bg }}
    >
      <Text className="text-[10px] font-extrabold uppercase tracking-wider" style={{ color: theme.text }}>
        {cfg.label}
      </Text>
    </View>
  );
}