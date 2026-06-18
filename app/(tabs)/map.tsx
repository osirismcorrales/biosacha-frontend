import { APP_COLORS } from '@shared/constants/theme';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { mockReserves, ReserveMock } from '@features/reserve/data/mock';

export default function MapScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<ReserveMock | null>(null);

  return (
    <View className="flex-1 bg-[#E2EFE2]">
      {/* Fake Map Background */}
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=1200&fit=crop' }}
        style={{ width: '100%', height: '100%', opacity: 0.7, position: 'absolute' }}
        contentFit="cover"
      />
      <View className="absolute inset-0 bg-[#D0EED8]/60" />

      <SafeAreaView className="flex-1" edges={['top']}>

        {/* ── Search Bar ── */}
        <View className="px-5 mt-2">
          <View className="bg-surface rounded-2xl flex-row items-center px-4 py-3 shadow-md border border-border">
            <Ionicons name="search" size={20} color={APP_COLORS.secondary} />
            <Text className="flex-1 ml-3 text-muted">Buscar reservas o especies...</Text>
            <TouchableOpacity className="bg-teal/10 p-2 rounded-lg">
              <Ionicons name="options" size={18} color={APP_COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Map Pins ── */}
        <View className="flex-1 relative">

          {/* Horco Molle pin */}
          <TouchableOpacity
            className="absolute z-20 items-center"
            style={{ top: '35%', left: '25%' }}
            onPress={() => setSelected(mockReserves[0])}
          >
            <View
              className="w-16 h-16 rounded-full items-center justify-center border-4 border-white shadow-lg"
              style={{ backgroundColor: APP_COLORS.green.DEFAULT }}
            >
              <Ionicons name="leaf" size={32} color="white" />
            </View>
            <View className="bg-surface px-3 py-1 rounded-full mt-2 shadow-sm border border-border">
              <Text className="text-xs font-bold text-primary">Horco Molle</Text>
            </View>
          </TouchableOpacity>

          {/* Parque Copo pin */}
          <TouchableOpacity
            className="absolute z-10 items-center opacity-80"
            style={{ top: '15%', right: '20%' }}
            onPress={() => setSelected(mockReserves[1])}
          >
            <View className="w-12 h-12 bg-green-700 rounded-full items-center justify-center border-[3px] border-white shadow-md">
              <Ionicons name="leaf" size={24} color="white" />
            </View>
            <View className="bg-surface px-2 py-0.5 rounded-full mt-1 border border-border">
              <Text className="text-[10px] font-bold text-muted">Parque Copo</Text>
            </View>
          </TouchableOpacity>

          {/* Small animal pins */}
          <View className="absolute top-[50%] left-[60%] w-8 h-8 bg-surface rounded-full items-center justify-center border border-border shadow-sm">
            <Text className="text-xs">🦜</Text>
          </View>
          <View className="absolute top-[25%] left-[40%] w-8 h-8 bg-surface rounded-full items-center justify-center border border-border shadow-sm">
            <Text className="text-xs">🦊</Text>
          </View>
        </View>

        {/* ── Reserve Bottom Sheet ── */}
        {selected && (
          <View className="absolute bottom-6 left-4 right-4 bg-surface rounded-3xl shadow-xl border border-border overflow-hidden">

            {/* Close */}
            <TouchableOpacity
              className="absolute top-3 right-3 z-10"
              onPress={() => setSelected(null)}
            >
              <Ionicons name="close-circle" size={26} color={APP_COLORS.disabled} />
            </TouchableOpacity>

            {/* Reserve header */}
            <View className="flex-row p-4 pb-3">
              <View className="w-20 h-20 rounded-2xl overflow-hidden mr-4">
                <Image
                  source={{ uri: selected.imageUrl }}
                  style={{ width: '100%', height: '100%' }}
                  contentFit="cover"
                />
              </View>
              <View className="flex-1 justify-center">
                {/* Status tag */}
                <View
                  className="self-start px-2 py-0.5 rounded-full mb-1.5 flex-row items-center gap-1"
                  style={{
                    backgroundColor:
                      selected.status === 'open'
                        ? APP_COLORS.green.DEFAULT + '20'
                        : APP_COLORS.danger + '20',
                  }}
                >
                  <View
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      backgroundColor:
                        selected.status === 'open'
                          ? APP_COLORS.green.DEFAULT
                          : APP_COLORS.danger,
                    }}
                  />
                  <Text
                    className="text-[10px] font-bold uppercase"
                    style={{
                      color:
                        selected.status === 'open'
                          ? APP_COLORS.green.DEFAULT
                          : APP_COLORS.danger,
                    }}
                  >
                    {selected.status === 'open' ? 'Abierta' : 'Cerrada'}
                  </Text>
                </View>

                <Text className="text-lg font-extrabold text-primary leading-tight">
                  {selected.name}
                </Text>
                <Text className="text-xs text-muted">{selected.province}</Text>

                {/* Mini stats */}
                <View className="flex-row gap-3 mt-1.5">
                  <Text className="text-[11px] text-muted">
                    🌿 {selected.hectares} ha
                  </Text>
                  <Text className="text-[11px] text-muted">
                    🦜 {selected.speciesCount}+ especies
                  </Text>
                </View>
              </View>
            </View>

            {/* Tags row */}
            <View className="flex-row gap-2 px-4 pb-3">
              {['Visita guiada', 'Fauna autóctona', 'Apto todo público'].map(tag => (
                <View
                  key={tag}
                  className="px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: APP_COLORS.green.DEFAULT + '15' }}
                >
                  <Text className="text-[10px] font-bold text-teal">{tag}</Text>
                </View>
              ))}
            </View>

            {/* Divider */}
            <View className="h-px bg-border mx-4" />

            {/* Action buttons */}
            <View className="flex-row gap-3 p-4">
              <TouchableOpacity
                className="flex-1 flex-row items-center justify-center gap-1.5 py-3 rounded-xl border border-border bg-surface"
                onPress={() => router.push(`/reserve/${selected.id}` as any)}
              >
                <Ionicons name="document-text-outline" size={16} color={APP_COLORS.primary} />
                <Text className="text-sm font-semibold text-primary">Ver reserva</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 flex-row items-center justify-center gap-1.5 py-3 rounded-xl"
                style={{ backgroundColor: APP_COLORS.green.DEFAULT }}
                onPress={() => router.push(`/reserve/${selected.id}/join` as any)}
              >
                <Ionicons name="qr-code-outline" size={16} color="white" />
                <Text className="text-sm font-bold text-white">Unirse</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

      </SafeAreaView>
    </View>
  );
}