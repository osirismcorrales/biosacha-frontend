import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ClassroomDTO } from '@features/profile/types';

interface Props {
  classroom: ClassroomDTO;
  onPress?: () => void;
}

export function ClassroomCard({ classroom, onPress }: Props) {
  return (
    <TouchableOpacity className="flex-row justify-between items-center bg-surface p-4 rounded-xl mb-2.5 border border-border" onPress={onPress} activeOpacity={0.8}>
      <View className="flex-row items-center flex-1 gap-3">
        <View className="w-10 h-10 rounded-lg bg-accent/10 items-center justify-center">
          <Ionicons name="school" size={22} color="#8B5CF6" />
        </View>
        <View className="flex-1">
          <Text className="text-sm font-bold text-primary" numberOfLines={1}>{classroom.name}</Text>
          <Text className="text-xs text-muted mt-0.5">{classroom.teacherName}</Text>
        </View>
      </View>
      <View className="items-end">
        <View className="bg-teal-subtle px-2.5 py-1 rounded-sm mb-1">
          <Text className="text-xs font-extrabold text-teal tracking-widest">{classroom.accessCode}</Text>
        </View>
        <Text className="text-[11px] text-disabled">{classroom.studentCount} estudiantes</Text>
      </View>
    </TouchableOpacity>
  );
}
