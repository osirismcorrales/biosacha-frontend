import { APP_COLORS } from '@shared/constants/theme';
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { MapView } from '@shared/components/map';

// ── Extended mock sightings for the current user ──────────────────────────────

const MY_SIGHTINGS = [
  {
    id: 1,
    icon: 'paw',
    name: 'Aguará Guazú',
    scientificName: 'Chrysocyon brachyurus',
    location: 'Ruta 34 km 120',
    dateLabel: '16 abr',
    verified: true,
    pointsEarned: 40,
    conservation: 'VU',
    conservationColor: APP_COLORS.warning,
    lat: -23.5,
    lng: -62.0,
  },
  {
    id: 2,
    icon: 'leaf',
    name: 'Tatú Carreta',
    scientificName: 'Priodontes maximus',
    location: 'Campo La Esperanza',
    dateLabel: '10 abr',
    verified: true,
    pointsEarned: 40,
    conservation: 'EN',
    conservationColor: APP_COLORS.danger,
    lat: -20.0,
    lng: -58.5,
  },
  {
    id: 3,
    icon: 'water',
    name: 'Yacaré Overo',
    scientificName: 'Caiman latirostris',
    location: 'Bañado La Estrella',
    dateLabel: '20 abr',
    verified: false,
    pointsEarned: 0,
    conservation: 'LC',
    conservationColor: APP_COLORS.green.DEFAULT,
    lat: -25.5,
    lng: -60.0,
  },
];

type Tab = 'Todos' | 'Verificados' | 'Pendientes';
const TABS: Tab[] = ['Todos', 'Verificados', 'Pendientes'];

// ── Sub-components ────────────────────────────────────────────────────────────

function StatCard({
  value,
  label,
  color,
}: {
  value: string | number;
  label: string;
  color?: string;
}) {
  return (
    <View
      className="flex-1 items-center py-3 rounded-xl border border-border bg-sunken"
    >
      <Text
        className="text-xl font-extrabold"
        style={{ color: color ?? '#e8f4ef' }}
      >
        {value}
      </Text>
      <Text className="text-[10px] text-muted mt-0.5">{label}</Text>
    </View>
  );
}

function SightingCard({ sighting }: { sighting: (typeof MY_SIGHTINGS)[0] }) {
  return (
    <View className="flex-row items-center bg-surface rounded-xl border border-border px-3 py-3 mb-2.5">
      {/* Avatar */}
      <View
        className="w-12 h-12 rounded-xl items-center justify-center mr-3 border border-border"
        style={{ backgroundColor: '#C8E0C830' }}
      >
        <Ionicons name={sighting.icon as any} size={24} color={APP_COLORS.secondary} />
      </View>

      {/* Info */}
      <View className="flex-1">
        <Text className="text-sm font-bold text-primary">{sighting.name}</Text>
        <Text className="text-[11px] text-muted italic">{sighting.scientificName}</Text>
        <View className="flex-row items-center mt-1 gap-1">
          <Ionicons name="location-outline" size={11} color={APP_COLORS.disabled} />
          <Text className="text-[11px] text-muted">
            {sighting.location} · {sighting.dateLabel}
          </Text>
        </View>

        {/* Status line */}
        {sighting.verified ? (
          <View className="flex-row items-center gap-1 mt-1.5">
            <Ionicons name="checkmark-circle" size={12} color={APP_COLORS.green.DEFAULT} />
            <Text className="text-[11px] text-secondary font-semibold">
              Verificado · +{sighting.pointsEarned} pts
            </Text>
            <Ionicons name="star" size={11} color={APP_COLORS.gold} style={{ marginLeft: 4 }} />
          </View>
        ) : (
          <View className="flex-row items-center gap-1 mt-1.5">
            <Ionicons name="time-outline" size={12} color={APP_COLORS.warning} />
            <Text
              className="text-[11px] font-semibold"
              style={{ color: APP_COLORS.warning }}
            >
              Esperando verificación del admin
            </Text>
          </View>
        )}
      </View>

      {/* Conservation badge */}
      <View
        className="px-2 py-0.5 rounded ml-2"
        style={{
          backgroundColor: sighting.conservationColor + '25',
          borderWidth: 1,
          borderColor: sighting.conservationColor,
        }}
      >
        <Text
          className="text-[10px] font-bold"
          style={{ color: sighting.conservationColor }}
        >
          {sighting.conservation}
        </Text>
      </View>
    </View>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────

export default function SightingsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('Todos');

  const verified = MY_SIGHTINGS.filter((s) => s.verified);
  const pending = MY_SIGHTINGS.filter((s) => !s.verified);
  const pointsEarned = verified.reduce((acc, s) => acc + s.pointsEarned, 0);

  const displayed =
    activeTab === 'Verificados'
      ? verified
      : activeTab === 'Pendientes'
      ? pending
      : MY_SIGHTINGS;

  return (
    <SafeAreaView className="flex-1 bg-base" edges={['top']}>
      {/* ── Header ── */}
      <View className="px-4 pt-2 pb-3">
        <Text className="text-xs font-bold text-muted uppercase tracking-widest mb-0.5">
          MIS CONTRIBUCIONES
        </Text>
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-extrabold text-primary">Avistamientos</Text>
          <TouchableOpacity className="w-9 h-9 bg-surface border border-border rounded-xl items-center justify-center">
            <Ionicons name="share-outline" size={18} color={APP_COLORS.secondary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Stats row ── */}
      <View className="flex-row px-4 gap-2.5 mb-4">
        <StatCard value={verified.length} label="Verificados" color={APP_COLORS.green.DEFAULT} />
        <StatCard value={pending.length} label="Pendiente" color={APP_COLORS.warning} />
        <StatCard value={`+${pointsEarned}`} label="Pts ganados" color={APP_COLORS.gold} />
      </View>

      {/* ── Map ── */}
    <View className="px-4 mb-4">
      <MapView
        latitude={-23}
        longitude={-60}
        zoom={5}
        height={180}
        markers={MY_SIGHTINGS.map((s) => ({
          lat: s.lat,
          lng: s.lng,
          label: s.name,
        }))}
      />
    </View>

    {/* ── Tabs ── */}
      <View className="flex-row px-4 gap-2 mb-4">
        {TABS.map((tab) => {
          const active = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className="px-3 py-1.5 rounded-full border"
              style={{
                backgroundColor: active ? APP_COLORS.green.DEFAULT : APP_COLORS.elevated,
                borderColor: active ? APP_COLORS.green.DEFAULT : APP_COLORS.border,
              }}
            >
              <View className="flex-row items-center gap-1">
                {tab === 'Verificados' && (
                  <Ionicons name="checkmark" size={11} color={active ? APP_COLORS.base : APP_COLORS.disabled} />
                )}
                {tab === 'Pendientes' && (
                  <Ionicons name="time-outline" size={11} color={active ? APP_COLORS.base : APP_COLORS.disabled} />
                )}
                <Text
                  className="text-xs font-semibold"
                  style={{ color: active ? APP_COLORS.base : APP_COLORS.secondary }}
                >
                  {tab}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* ── Sighting list ── */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
      >
        {/* Section: Verified */}
        {(activeTab === 'Todos' || activeTab === 'Verificados') && verified.length > 0 && (
          <>
            <Text className="text-[11px] font-bold text-muted uppercase tracking-widest mb-2">
              Verificados
            </Text>
            {verified.map((s) => (
              <SightingCard key={s.id} sighting={s} />
            ))}
          </>
        )}

        {/* Section: Pending */}
        {(activeTab === 'Todos' || activeTab === 'Pendientes') && pending.length > 0 && (
          <>
            <Text className="text-[11px] font-bold text-muted uppercase tracking-widest mt-2 mb-2">
              Pendientes
            </Text>
            {pending.map((s) => (
              <SightingCard key={s.id} sighting={s} />
            ))}
          </>
        )}

        {displayed.length === 0 && (
          <View className="items-center mt-12">
            <Ionicons name="camera-outline" size={48} color={APP_COLORS.border} />
            <Text className="text-muted text-sm mt-3">
              No hay avistamientos en esta categoría
            </Text>
          </View>
        )}
      </ScrollView>

      {/* ── FAB ── */}
      <TouchableOpacity
        className="absolute bottom-8 right-5 w-14 h-14 rounded-full bg-teal items-center justify-center"
        style={{
          shadowColor: APP_COLORS.green.DEFAULT,
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.4,
          shadowRadius: 12,
          elevation: 8,
        }}
        activeOpacity={0.85}
        onPress={() => router.push('/sighting/new' as any)}
      >
        <Ionicons name="add" size={28} color={APP_COLORS.base} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}