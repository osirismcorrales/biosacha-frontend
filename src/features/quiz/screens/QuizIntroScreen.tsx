import { APP_COLORS } from '@shared/constants/theme';
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { mockQuiz } from '@features/quiz/data/mock';
import { mockSpecies } from '@features/species/data/mock';
import { Image } from 'expo-image';

export default function QuizIntroScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  
  const species = mockSpecies.find((s: any) => s.id === Number(id));
  const quiz = mockQuiz;
  
  const totalQuestions = quiz.questions.length;
  const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0);
  const estimatedMinutes = Math.ceil((totalQuestions * 30) / 60);
  const speciesName = species?.commonName || 'Aguará Guazú';

  const handleStart = () => {
    router.push(`/quiz/${id}/play` as any);
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace(`/(tabs)/quizzes` as any); 
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-base" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center px-4 py-2 mb-2">
        <TouchableOpacity 
          className="w-11 h-11 rounded-full bg-surface items-center justify-center border border-border/50 shadow-sm" 
          onPress={handleBack}
        >
          <Ionicons name="arrow-back" size={24} color={APP_COLORS.primary} />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-lg font-bold text-primary mr-11">Desafío</Text>
      </View>

      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: Math.max(insets.bottom + 100, 120) }}
      >
        {/* Banner */}
        <View className="px-5 mb-6">
          {species?.mainImageUrl ? (
            <View className="w-full h-64 rounded-3xl overflow-hidden border border-border shadow-sm">
              <Image 
                source={{ uri: species.mainImageUrl }} 
                style={{ width: '100%', height: '100%' }}
                contentFit="cover" 
                transition={300}
              />
              <View className="absolute bottom-0 left-0 right-0 h-full bg-black/40 justify-end p-5">
                <View className="bg-teal/90 self-start px-3 py-1 rounded-full mb-2">
                  <Text className="text-[10px] font-black uppercase tracking-widest text-base">Recompensa: +{totalPoints} EXP</Text>
                </View>
                <Text className="text-3xl font-extrabold text-white">{speciesName}</Text>
                <Text className="text-base font-medium text-white/90 mt-1">¿Qué tanto sabes sobre esta especie?</Text>
              </View>
            </View>
          ) : (
            <View className="w-full h-56 rounded-3xl bg-surface items-center justify-center border border-border">
              <Ionicons name="help-circle" size={64} color={APP_COLORS.green.DEFAULT} />
              <Text className="text-2xl font-extrabold text-primary mt-4">{speciesName}</Text>
            </View>
          )}
        </View>

        {/* Stats row */}
        <View className="flex-row px-5 gap-3 mb-6">
          <View className="flex-1 bg-surface rounded-2xl p-4 items-center justify-center border border-border shadow-sm">
            <View className="w-12 h-12 rounded-full bg-teal/10 items-center justify-center mb-2">
              <Ionicons name="list" size={22} color={APP_COLORS.green.DEFAULT} />
            </View>
            <Text className="text-2xl font-black text-primary">{totalQuestions}</Text>
            <Text className="text-[10px] text-muted font-bold uppercase tracking-wider mt-1">Preguntas</Text>
          </View>
          
          <View className="flex-1 bg-surface rounded-2xl p-4 items-center justify-center border border-border shadow-sm">
            <View className="w-12 h-12 rounded-full bg-yellow-500/10 items-center justify-center mb-2">
              <Ionicons name="time" size={22} color={APP_COLORS.gold} />
            </View>
            <Text className="text-2xl font-black text-primary">~{estimatedMinutes}m</Text>
            <Text className="text-[10px] text-muted font-bold uppercase tracking-wider mt-1">Duración</Text>
          </View>
          
          <View className="flex-1 bg-surface rounded-2xl p-4 items-center justify-center border border-border shadow-sm">
            <View className="w-12 h-12 rounded-full bg-purple-500/10 items-center justify-center mb-2">
              <Ionicons name="star" size={22} color="#8B5CF6" />
            </View>
            <Text className="text-2xl font-black text-primary">60%</Text>
            <Text className="text-[10px] text-muted font-bold uppercase tracking-wider mt-1">Para ganar</Text>
          </View>
        </View>

        {/* Requirements */}
        <View className="px-5 mb-6">
          <View className="bg-surface rounded-3xl p-6 border border-border shadow-sm">
            <Text className="text-sm font-black tracking-widest text-primary uppercase mb-5">Reglas del Desafío</Text>
            
            <View className="flex-row items-center gap-4 mb-5">
              <View className="w-10 h-10 rounded-full bg-base items-center justify-center border border-border">
                <Ionicons name="checkmark-circle" size={20} color={APP_COLORS.green.DEFAULT} />
              </View>
              <Text className="text-base text-secondary flex-1">Tendrás <Text className="font-bold text-primary">4 posibles respuestas</Text> por cada pregunta de la trivia.</Text>
            </View>
            
            <View className="flex-row items-center gap-4 mb-5">
              <View className="w-10 h-10 rounded-full bg-base items-center justify-center border border-border">
                <Ionicons name="bulb" size={20} color={APP_COLORS.gold} />
              </View>
              <Text className="text-base text-secondary flex-1">Aprenderás interactuando: podrás ver la respuesta correcta al instante.</Text>
            </View>
            
            <View className="flex-row items-center gap-4">
              <View className="w-10 h-10 rounded-full bg-red-500/10 items-center justify-center border border-red-500/20">
                <Ionicons name="warning" size={18} color="#ef4444" />
              </View>
              <Text className="text-base text-secondary flex-1">Esta prueba es única. Solo puedes completarla <Text className="font-bold text-primary">una vez</Text>.</Text>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* Floating Bottom Bar */}
      <View 
        className="absolute bottom-0 left-0 right-0 px-5 pt-4 bg-base/95 border-t border-border/50"
        style={{ paddingBottom: Math.max(insets.bottom, 20) }}
      >
        <View className="flex-row gap-3">
          <TouchableOpacity
            className="flex-1 bg-surface py-4 px-2 rounded-2xl border border-border items-center justify-center"
            onPress={handleBack}
          >
            <Text className="text-sm font-bold text-primary">Más tarde</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-[2] flex-row items-center justify-center bg-teal py-4 px-2 rounded-2xl gap-2 shadow-sm"
            onPress={handleStart}
          >
            <Text className="text-base font-black text-base">Comenzar Quiz</Text>
            <Ionicons name="rocket" size={20} color={APP_COLORS.base} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}