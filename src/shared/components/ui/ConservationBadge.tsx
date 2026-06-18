import React from 'react';
import { View, Text } from 'react-native';
import { conservationConfig } from '@shared/constants/colors';
import { ConservationStatus } from '@shared/types';

interface Props {
  status: ConservationStatus;
  showLabel?: boolean;
}

export function ConservationBadge({ status, showLabel = false }: Props) {
  const cfg = conservationConfig[status];
  
  const isDanger = status === 'EN' || status === 'CR' || status === 'EW' || status === 'EX';
  const isWarning = status === 'VU' || status === 'NT';
  
  let bg = '#2E8B4E';
  let text = '#FFFFFF';

  if (isDanger) {
    bg = '#E85454';
    text = '#FFFFFF';
  } else if (isWarning) {
    bg = '#E8A020';
    text = '#FFFFFF';
  }

  return (
    <View 
      className="px-2 py-0.5 rounded-md" 
      style={{ backgroundColor: bg }}
    >
      <Text className="text-[10px] font-extrabold uppercase tracking-wider" style={{ color: text }}>
        {showLabel ? cfg.label : status}
      </Text>
    </View>
  );
}