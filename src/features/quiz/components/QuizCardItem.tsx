import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { QuizCardDTO } from '@features/quiz/types';

interface Props {
  quiz: QuizCardDTO;
  onPress?: () => void;
}

export function QuizCardItem({ quiz, onPress }: Props) {
  return (
    <TouchableOpacity className="flex-row items-center bg-surface p-4 rounded-xl mb-2.5 border border-border" onPress={onPress} activeOpacity={0.8}>
      <View className="w-11 h-11 rounded-lg bg-epic-bg items-center justify-center mr-3">
        <Ionicons name="help-circle" size={24} color="#8B5CF6" />
      </View>
      <View className="flex-1">
        <Text className="text-sm font-bold text-primary">{quiz.title}</Text>
        <Text className="text-xs text-muted mt-0.5">{quiz.speciesName}</Text>
      </View>
      <View className="items-end">
        <Text className="text-sm font-extrabold text-gold">{quiz.totalPoints} pts</Text>
        <Text className="text-[11px] text-disabled mt-0.5">{quiz.questionCount} preguntas</Text>
      </View>
    </TouchableOpacity>
  );
}
