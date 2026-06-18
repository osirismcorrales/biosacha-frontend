import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Modal, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  uri: string;
  className?: string;
  children?: React.ReactNode;
}

export function ZoomableImage({ uri, className = '', children }: Props) {
  const [showFull, setShowFull] = useState(false);
  const { width: screenWidth } = useWindowDimensions();

  return (
    <>
      <TouchableOpacity
        className={`rounded-2xl overflow-hidden border border-border ${className}`}
        onPress={() => setShowFull(true)}
        activeOpacity={0.9}
      >
        <Image
          source={{ uri }}
          className="bg-elevated w-full h-full"
          resizeMode="cover"
        />
        {children}
      </TouchableOpacity>

      <Modal visible={showFull} animationType="fade" transparent>
        <View className="flex-1 bg-base items-center justify-center">
          <TouchableOpacity
            className="absolute top-16 right-4 z-10 w-12 h-12 rounded-full bg-surface items-center justify-center"
            onPress={() => setShowFull(false)}
          >
            <Ionicons name="close" size={24} color="#1A3A0F" />
          </TouchableOpacity>
          <Image
            source={{ uri }}
            className="w-full"
            style={{ height: screenWidth, resizeMode: 'contain' }}
          />
        </View>
      </Modal>
    </>
  );
}
