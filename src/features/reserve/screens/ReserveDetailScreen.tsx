import { APP_COLORS } from '@shared/constants/theme';
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { getReserveById } from '@features/reserve/data/mock';

type StatItemProps = { icon: string; value: string; label: string };

function StatItem({ icon, value, label }: StatItemProps) {
  return (
    <View className="flex-1 items-center bg-surface rounded-2xl py-3 px-1 border border-border">
      <Text className="text-lg">{icon}</Text>
      <Text className="text-sm font-extrabold text-primary mt-1">{value}</Text>
      <Text className="text-[10px] text-muted">{label}</Text>
    </View>
  );
}

type InfoRowProps = { icon: keyof typeof Ionicons.glyphMap; text: string; label: string };

function InfoRow({ icon, text, label }: InfoRowProps) {
  return (
    <View className="flex-row items-start py-4 border-b border-border">
      <View
        className="w-9 h-9 rounded-xl items-center justify-center mr-3 mt-0.5"
        style={{ backgroundColor: APP_COLORS.green.DEFAULT + '18' }}
      >
        <Ionicons name={icon} size={18} color={APP_COLORS.green.DEFAULT} />
      </View>
      <View className="flex-1">
        <Text className="text-[10px] font-bold text-muted uppercase tracking-wider mb-0.5">{label}</Text>
        <Text className="text-sm text-primary leading-5">{text}</Text>
      </View>
    </View>
  );
}

export default function ReserveDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const reserve = getReserveById(id ?? 'horco_molle');

  if (!reserve) {
    return (
      <SafeAreaView className="flex-1 bg-base items-center justify-center" edges={['top']}>
        <Text className="text-muted">Reserva no encontrada</Text>
      </SafeAreaView>
    );
  }

  const isOpen = reserve.status === 'open';

  return (
    <SafeAreaView className="flex-1 bg-base" edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 + insets.bottom }}
      >
        {/* ── Hero Image ── */}
        <View style={{ height: 240 }}>
          <Image
            source={{ uri: reserve.imageUrl }}
            style={StyleSheet.absoluteFillObject}
            contentFit="cover"
          />
          {/* Dark gradient overlay */}
          <View
            style={StyleSheet.absoluteFillObject}
            className="bg-gradient-to-b from-transparent to-black/60"
          />
          {/* Back button */}
          <TouchableOpacity
            className="absolute top-4 left-4 w-10 h-10 bg-black/30 rounded-full items-center justify-center"
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>
          {/* Status badge */}
          <View
            className="absolute top-4 right-4 flex-row items-center px-3 py-1.5 rounded-full"
            style={{ backgroundColor: isOpen ? APP_COLORS.green.DEFAULT : APP_COLORS.danger }}
          >
            <View className="w-2 h-2 rounded-full bg-white mr-1.5" />
            <Text className="text-white text-[11px] font-bold">
              {isOpen ? `Abierta · cierra en ${reserve.closesIn}` : 'Cerrada'}
            </Text>
          </View>
          {/* Name on hero */}
          <View className="absolute bottom-5 left-5">
            <Text className="text-white text-2xl font-extrabold">{reserve.name}</Text>
            <Text className="text-white/80 text-sm">{reserve.subtitle}</Text>
          </View>
        </View>

        {/* ── Content ── */}
        <View className="px-5 pt-5">

          {/* Stats row */}
          <View className="flex-row gap-2 mb-6">
            <StatItem icon="🌿" value={`${reserve.hectares} ha`} label="Superficie" />
            <StatItem icon="🦜" value={`${reserve.speciesCount}+`} label="Especies" />
            <StatItem icon="🥾" value={`${reserve.trailKm} km`} label="Recorrido" />
            <StatItem icon="⏱️" value={`${reserve.durationHours} h`} label="Duración" />
          </View>

          {/* Info rows */}
          <View className="bg-surface rounded-3xl border border-border px-4 mb-6">
            <InfoRow
              icon="location-outline"
              label="Ubicación"
              text={reserve.location}
            />
            <InfoRow
              icon="time-outline"
              label="Horario de visitas"
              text={reserve.visitHours}
            />
            <InfoRow
              icon="person-outline"
              label="Guía"
              text={reserve.guide}
            />
            <View className="flex-row items-start py-4">
              <View
                className="w-9 h-9 rounded-xl items-center justify-center mr-3 mt-0.5"
                style={{ backgroundColor: APP_COLORS.sky.DEFAULT + '30' }}
              >
                <Ionicons name="information-circle-outline" size={18} color={APP_COLORS.sky.DEFAULT} />
              </View>
              <View className="flex-1">
                <Text className="text-[10px] font-bold text-muted uppercase tracking-wider mb-0.5">Sobre la reserva</Text>
                <Text className="text-sm text-primary leading-6">{reserve.about}</Text>
              </View>
            </View>
          </View>

        </View>
      </ScrollView>

      {/* ── Bottom Buttons ── */}
      <View
        className="absolute bottom-0 left-0 right-0 bg-base px-5 pt-3 gap-2"
        style={{ paddingBottom: Math.max(insets.bottom, 16) }}
      >
        <TouchableOpacity
          className="w-full bg-teal py-4 rounded-2xl items-center flex-row justify-center gap-2"
          onPress={() => router.push(`/reserve/${reserve.id}/join` as any)}
        >
          <Ionicons name="qr-code-outline" size={20} color="white" />
          <Text className="text-white font-bold text-base">Unirse a la expedición</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-full bg-surface py-3.5 rounded-2xl items-center border border-border"
          onPress={() => router.push(`/(tabs)/dex/${reserve.id}` as any)}
        >
          <Text className="text-primary font-semibold text-sm">Ver colección de la reserva</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
