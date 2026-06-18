import { APP_COLORS } from '@shared/constants/theme';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function DexScreen() {
  const router = useRouter();

  const Divider = ({ title }: { title: string }) => (
    <View className="flex-row items-center px-6 mt-6 mb-4">
      <View className="flex-1 h-px bg-border/50" />
      <Text className="text-[10px] font-black text-muted mx-3 uppercase tracking-widest">{title}</Text>
      <View className="flex-1 h-px bg-border/50" />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-base" edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* Header */}
        <View className="flex-row justify-between items-center px-5 pt-3 pb-2">
          <View>
            <Text className="text-[10px] font-bold text-muted uppercase tracking-widest mb-0.5">MI PROGRESO</Text>
            <Text className="text-3xl font-extrabold text-primary">Colección</Text>
          </View>
          <TouchableOpacity className="w-10 h-10 bg-teal/10 rounded-xl items-center justify-center border border-border/50">
            <Ionicons name="trophy" size={20} color={APP_COLORS.gold} />
          </TouchableOpacity>
        </View>

        {/* ── COLECCIÓN GENERAL ── */}
        <View className="mx-5 mt-3 rounded-3xl p-5 overflow-hidden" style={{ backgroundColor: APP_COLORS.primary }}>
          <Text className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-1">COLECCIÓN GENERAL</Text>
          <Text className="text-2xl font-black text-white">Fauna Argentina</Text>
          <Text className="text-sm font-medium text-white/80 mb-6">Todas las especies del país</Text>

          <View className="flex-row justify-between items-end mb-2">
            <Text className="text-xs font-bold text-white/80">Estrellas</Text>
            <Text className="text-sm font-black text-white">17 / 144</Text>
          </View>
          
          {/* Progress bar */}
          <View className="h-2 rounded-full bg-white/20 mb-6 overflow-hidden">
            <View className="h-full rounded-full bg-gold" style={{ width: '12%' }} />
          </View>

          {/* Icons Preview */}
          <View className="flex-row gap-3 mb-6">
            <View className="w-16 h-16 bg-white rounded-2xl items-center justify-center relative">
              <Text className="text-3xl">🦊</Text>
              <View className="absolute -bottom-2 flex-row bg-white px-1.5 rounded-full shadow-sm">
                <Ionicons name="star" size={8} color={APP_COLORS.gold} />
                <Ionicons name="star" size={8} color={APP_COLORS.gold} />
                <Ionicons name="star" size={8} color={APP_COLORS.gold} />
              </View>
            </View>
            <View className="w-16 h-16 bg-white rounded-2xl items-center justify-center relative">
              <Text className="text-3xl">🐊</Text>
              <View className="absolute -bottom-2 flex-row bg-white px-1.5 rounded-full shadow-sm">
                <Ionicons name="star" size={8} color={APP_COLORS.gold} />
                <Ionicons name="star-outline" size={8} color={APP_COLORS.disabled} />
                <Ionicons name="star-outline" size={8} color={APP_COLORS.disabled} />
              </View>
            </View>
            <View className="w-16 h-16 bg-white rounded-2xl items-center justify-center relative">
              <Text className="text-3xl">🦔</Text>
              <View className="absolute -bottom-2 flex-row bg-white px-1.5 rounded-full shadow-sm">
                <Ionicons name="star" size={8} color={APP_COLORS.gold} />
                <Ionicons name="star" size={8} color={APP_COLORS.gold} />
                <Ionicons name="star-outline" size={8} color={APP_COLORS.disabled} />
              </View>
            </View>
            <View className="w-16 h-16 bg-white/10 border border-white/20 rounded-2xl items-center justify-center">
              <Ionicons name="lock-closed" size={20} color="rgba(255,255,255,0.4)" />
            </View>
          </View>

          <TouchableOpacity 
            className="bg-teal py-3.5 rounded-xl items-center shadow-sm"
            onPress={() => router.push('/(tabs)/dex/general' as any)}
          >
            <Text className="text-white font-bold text-sm">Ver colección completa →</Text>
          </TouchableOpacity>
        </View>

        <Divider title="EXPEDICIONES VISITADAS" />

        {/* ── EXPEDICION: HORCO MOLLE ── */}
        <View className="mx-5 bg-surface rounded-3xl p-5 border border-border shadow-sm">
          <View className="flex-row items-center justify-between mb-5">
            <View className="flex-row items-center flex-1">
              <View className="w-12 h-12 bg-primary rounded-xl items-center justify-center mr-3">
                <Ionicons name="leaf" size={24} color={APP_COLORS.base} />
              </View>
              <View>
                <Text className="text-lg font-extrabold text-primary">Horco Molle</Text>
                <Text className="text-[11px] font-medium text-muted">Tucumán · visitada 26 abr</Text>
              </View>
            </View>
            <View className="items-end">
              <Text className="text-xl font-black text-primary">5</Text>
              <Text className="text-[10px] font-bold text-muted">/ 12 cartas</Text>
            </View>
          </View>

          <View className="flex-row gap-2 mb-4">
            <View className="flex-1 bg-purple-500/10 h-16 rounded-xl border border-purple-500/20 items-center justify-center relative">
              <View className="absolute -top-2 bg-purple-500 px-1.5 py-0.5 rounded-sm">
                <Text className="text-[7px] font-black text-white">ÉPICO</Text>
              </View>
              <Text className="text-2xl mt-1">🦛</Text>
            </View>
            <View className="flex-1 bg-yellow-500/10 h-16 rounded-xl border border-yellow-500/20 items-center justify-center relative">
              <View className="absolute -top-2 bg-yellow-500 px-1.5 py-0.5 rounded-sm">
                <Text className="text-[7px] font-black text-white">RARO</Text>
              </View>
              <Text className="text-2xl mt-1">🦜</Text>
            </View>
            <View className="flex-1 bg-teal/10 h-16 rounded-xl border border-teal/20 items-center justify-center relative">
              <View className="absolute -top-2 bg-teal px-1.5 py-0.5 rounded-sm">
                <Text className="text-[7px] font-black text-white">COMÚN</Text>
              </View>
              <Text className="text-2xl mt-1">🐊</Text>
            </View>
            <View className="flex-1 bg-teal/10 h-16 rounded-xl border border-teal/20 items-center justify-center relative">
              <View className="absolute -top-2 bg-teal px-1.5 py-0.5 rounded-sm">
                <Text className="text-[7px] font-black text-white">COMÚN</Text>
              </View>
              <Text className="text-2xl mt-1">🐒</Text>
            </View>
          </View>

          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-xs font-bold text-secondary">Cartas desbloqueadas</Text>
            <Text className="text-xs font-black text-primary">5 / 12</Text>
          </View>

          <View className="h-1.5 rounded-full bg-elevated mb-5 overflow-hidden">
            <View className="h-full rounded-full bg-teal" style={{ width: '41%' }} />
          </View>

          <View className="flex-row gap-3">
            <TouchableOpacity 
              className="flex-1 bg-teal py-3.5 rounded-xl items-center shadow-sm"
              onPress={() => router.push('/(tabs)/dex/horco_molle' as any)}
            >
              <Text className="text-white font-bold text-sm">Ver colección →</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Divider title="PRÓXIMAS EXPEDICIONES" />

        {/* ── PRÓXIMAS EXPEDICIONES (BLOCKED) ── */}
        <View className="flex-row px-5 gap-3">
          <View className="flex-1 bg-yellow-500/10 border border-yellow-500/20 border-dashed rounded-3xl p-5 items-center justify-center" style={{ minHeight: 140 }}>
            <Ionicons name="lock-closed" size={28} color={APP_COLORS.gold} className="opacity-50" />
            <Text className="text-xs font-bold text-yellow-700/60 mt-3 text-center">Volvé a visitar</Text>
            <Text className="text-xl font-black text-yellow-700/30 mt-1">???</Text>
          </View>
          <View className="flex-1 bg-teal/5 border border-teal/10 border-dashed rounded-3xl p-5 items-center justify-center" style={{ minHeight: 140 }}>
            <Ionicons name="lock-closed" size={28} color={APP_COLORS.disabled} className="opacity-50" />
            <Text className="text-xs font-bold text-muted/60 mt-3 text-center">Sin descubrir</Text>
            <Text className="text-xl font-black text-muted/30 mt-1">???</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}