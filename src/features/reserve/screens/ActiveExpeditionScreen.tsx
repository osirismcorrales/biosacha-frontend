import { APP_COLORS } from '@shared/constants/theme';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { getReserveById } from '@features/reserve/data/mock';

type QuickActionProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  sublabel: string;
  color: string;
  onPress: () => void;
};

function QuickAction({ icon, label, sublabel, color, onPress }: QuickActionProps) {
  return (
    <TouchableOpacity
      className="flex-1 rounded-2xl p-4 min-h-[90px] justify-between"
      style={{ backgroundColor: color + '18', borderWidth: 1, borderColor: color + '30' }}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <Ionicons name={icon} size={24} color={color} />
      <View>
        <Text className="text-sm font-bold text-primary">{label}</Text>
        <Text className="text-[11px] text-muted">{sublabel}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function ActiveExpeditionScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const reserve = getReserveById(id ?? 'horco_molle');

  const [sightingsCount] = useState(2);
  const [points] = useState(80);
  const [minutesIn] = useState(14);

  const guideMessage =
    'Estamos frente al tapir. ¡Sacá una foto para ganar la carta épica!';

  return (
    <SafeAreaView className="flex-1 bg-base" edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 + insets.bottom }}
      >
        {/* ── Header ── */}
        <View
          className="px-5 pt-4 pb-5"
          style={{ backgroundColor: APP_COLORS.green.DEFAULT }}
        >
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-white/80 text-[11px] font-bold uppercase tracking-widest">
              EXPEDICIÓN ACTIVA
            </Text>
            <View className="flex-row items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full">
              <View className="w-2 h-2 rounded-full bg-white" />
              <Text className="text-white text-[11px] font-bold">EN VIVO</Text>
            </View>
          </View>
          <Text className="text-white text-2xl font-extrabold">{reserve?.name}</Text>

          {/* Live stats */}
          <View className="flex-row gap-3 mt-4">
            {[
              { value: String(sightingsCount), label: 'cartas' },
              { value: String(points), label: 'puntos' },
              { value: String(minutesIn), label: 'minutos' },
            ].map(s => (
              <View key={s.label} className="flex-1 items-center bg-white/15 rounded-xl py-2.5">
                <Text className="text-white text-xl font-extrabold">{s.value}</Text>
                <Text className="text-white/70 text-[11px]">{s.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className="px-5 pt-5">
          {/* ── Quick Actions Grid ── */}
          <View className="gap-3 mb-5">
            <View className="flex-row gap-3">
              <QuickAction
                icon="map-outline"
                label="Mapa interno"
                sublabel="Ver senderos"
                color={APP_COLORS.green.DEFAULT}
                onPress={() => {}}
              />
              <QuickAction
                icon="camera-outline"
                label="Avistamiento"
                sublabel="Subir foto"
                color={APP_COLORS.sky.DEFAULT}
                onPress={() => router.push('/sighting/new' as any)}
              />
            </View>
            <View className="flex-row gap-3">
              <QuickAction
                icon="paw-outline"
                label="Especies"
                sublabel="De esta reserva"
                color={APP_COLORS.warning}
                onPress={() => router.push('/(tabs)/species' as any)}
              />
              <QuickAction
                icon="albums-outline"
                label="Colección"
                sublabel={`${sightingsCount} / 12 cartas`}
                color={APP_COLORS.gold}
                onPress={() => router.push(`/(tabs)/dex/${id}` as any)}
              />
            </View>
          </View>

          {/* ── Guide Message ── */}
          <View
            className="rounded-2xl p-4 mb-4"
            style={{ backgroundColor: APP_COLORS.green.DEFAULT + '12', borderWidth: 1, borderColor: APP_COLORS.green.DEFAULT + '30' }}
          >
            <View className="flex-row items-center gap-2 mb-2">
              <Ionicons name="person-circle" size={20} color={APP_COLORS.green.DEFAULT} />
              <Text
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: APP_COLORS.green.DEFAULT }}
              >
                EL GUÍA DICE
              </Text>
            </View>
            <Text className="text-sm text-primary leading-5 mb-3">{guideMessage}</Text>
            <TouchableOpacity
              className="py-3 rounded-xl items-center"
              style={{ backgroundColor: APP_COLORS.gold }}
              onPress={() => router.push('/sighting/new' as any)}
            >
              <Text className="font-bold text-sm" style={{ color: APP_COLORS.base }}>
                📸 Fotografiá ahora
              </Text>
            </TouchableOpacity>
          </View>

          {/* ── Earned Today ── */}
          <View className="mb-4">
            <Text className="text-xs font-bold tracking-widest text-muted uppercase mb-3">
              GANASTE HOY
            </Text>
            {sightingsCount > 0 ? (
              <View className="bg-surface rounded-2xl border border-border p-4 flex-row items-center gap-3">
                <View
                  className="w-12 h-12 rounded-xl items-center justify-center"
                  style={{ backgroundColor: APP_COLORS.gold + '20' }}
                >
                  <Text style={{ fontSize: 24 }}>🦜</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-bold text-primary">Carta — Guacamayo</Text>
                  <Text className="text-xs text-muted">Rara · +30 puntos</Text>
                </View>
                <View
                  className="px-2 py-1 rounded-lg"
                  style={{ backgroundColor: APP_COLORS.gold + '20' }}
                >
                  <Text className="text-[10px] font-bold" style={{ color: APP_COLORS.gold }}>
                    NUEVA
                  </Text>
                </View>
              </View>
            ) : (
              <View className="bg-surface rounded-2xl border border-border p-4 items-center">
                <Text className="text-muted text-sm">Aún no ganaste cartas hoy</Text>
                <Text className="text-muted text-xs mt-1">
                  Avistá fauna para ganar cartas exclusivas
                </Text>
              </View>
            )}
          </View>

          {/* ── End Expedition ── */}
          <TouchableOpacity
            className="w-full py-3.5 rounded-2xl items-center border border-border"
            onPress={() => router.replace('/(tabs)/map' as any)}
          >
            <Text className="text-muted text-sm font-medium">Terminar expedición</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
