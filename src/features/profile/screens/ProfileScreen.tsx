import React from 'react';
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
import { APP_COLORS } from '@shared/constants/theme';

// ── Mock data ────────────────────────────────────────────────────────────────

const USER = {
  name: 'Valentina S.',
  location: 'Santiago del Estero',
  memberSince: 'abr 2025',
  role: 'Estudiante',
  level: 4,
  levelLabel: 'Naturalista',
  currentXP: 340,
  nextLevelXP: 500,
  stars: 17,
  points: 340,
  quizzes: 8,
  photos: 3,
  reserve: 'Reserva Experimental Horco Molle',
  sightingsTotal: 3,
  sightingsVerified: 2,
  collectionOwned: 17,
  collectionTotal: 144,
  quizzesCompleted: 8,
  avatarIcon: 'person',
};

const RANKING = [
  { id: 1, name: 'Matías R.', points: 580, stars: 28, isFirst: true },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function StatPill({
  value,
  label,
}: {
  value: string | number;
  label: string;
}) {
  return (
    <View className="flex-1 items-center">
      <Text className="text-xl font-extrabold text-primary">{value}</Text>
      <Text className="text-[11px] text-muted mt-0.5">{label}</Text>
    </View>
  );
}

function MenuRow({
  icon,
  label,
  sub,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  sub?: string;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center px-4 py-3.5 active:opacity-70"
    >
      <View className="w-9 h-9 rounded-xl bg-elevated items-center justify-center mr-3">
        {icon}
      </View>
      <View className="flex-1">
        <Text className="text-sm font-semibold text-primary">{label}</Text>
        {sub && <Text className="text-[11px] text-muted mt-0.5">{sub}</Text>}
      </View>
      <Ionicons name="chevron-forward" size={16} color={APP_COLORS.disabled} />
    </Pressable>
  );
}

function Divider() {
  return <View className="h-px bg-border mx-4" />;
}

// ── Main screen ───────────────────────────────────────────────────────────────

export default function ProfileScreen() {
  const router = useRouter();
  const xpPercent = (USER.currentXP / USER.nextLevelXP) * 100;

  return (
    <SafeAreaView className="flex-1 bg-base" edges={['top']}>
      {/* Top bar */}
      <View className="flex-row items-center justify-between px-4 pt-2 pb-1">
        <Text className="text-base font-bold text-primary">Mi Perfil</Text>
        <TouchableOpacity className="w-8 h-8 items-center justify-center">
          <Ionicons name="ellipsis-horizontal" size={20} color={APP_COLORS.secondary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ── Avatar card ── */}
        <View className="mx-4 mt-2 bg-surface rounded-2xl p-5 border border-border">
          <View className="flex-row items-center">
            {/* Avatar */}
            <View className="relative mr-4">
              <View
                className="w-[64px] h-[64px] rounded-full items-center justify-center border-2 border-teal"
                style={{ backgroundColor: APP_COLORS.green.subtle }}
              >
                <Ionicons name={USER.avatarIcon as any} size={30} color={APP_COLORS.secondary} />
              </View>
              {/* Level badge */}
              <View
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-teal items-center justify-center border-2"
                style={{ borderColor: APP_COLORS.base }}
              >
                <Text className="text-[9px] font-extrabold" style={{ color: APP_COLORS.base }}>
                  N{USER.level}
                </Text>
              </View>
            </View>

            {/* Info */}
            <View className="flex-1">
              <Text className="text-lg font-extrabold text-primary leading-tight">
                {USER.name}
              </Text>
              <Text className="text-xs text-muted mt-0.5">
                {USER.location} · desde {USER.memberSince}
              </Text>
              {/* Role badge */}
              <View className="flex-row mt-2">
                <View className="bg-teal/20 px-2.5 py-0.5 rounded-full">
                  <Text className="text-[11px] font-semibold text-secondary">
                    {USER.role}
                  </Text>
                </View>
              </View>
            </View>

            {/* Settings icon */}
            <TouchableOpacity className="w-8 h-8 items-center justify-center">
              <Ionicons name="settings-outline" size={18} color={APP_COLORS.disabled} />
            </TouchableOpacity>
          </View>

          {/* ── Stats row ── */}
          <View
            className="flex-row mt-5 py-3 rounded-xl border border-border bg-sunken"
          >
            <StatPill value={USER.stars} label="Estrellas" />
            <View className="w-px bg-border" />
            <StatPill value={USER.points} label="Puntos" />
            <View className="w-px bg-border" />
            <StatPill value={USER.quizzes} label="Quizzes" />
            <View className="w-px bg-border" />
            <StatPill value={USER.photos} label="Fotos" />
          </View>
        </View>

        {/* ── XP Progress bar ── */}
        <View className="mx-4 mt-3 px-4 py-3 bg-surface rounded-xl border border-border">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-[11px] font-bold text-secondary">
              Nivel {USER.level} — {USER.levelLabel}
            </Text>
            <Text className="text-[11px] text-muted">
              {USER.currentXP} / {USER.nextLevelXP} pts → Nivel {USER.level + 1}
            </Text>
          </View>
          <View className="h-2 rounded-full bg-elevated overflow-hidden">
            <View
              className="h-full rounded-full bg-teal"
              style={{ width: `${xpPercent}%` }}
            />
          </View>
        </View>

        {/* ── Menu section ── */}
        <View className="mx-4 mt-3 bg-surface rounded-2xl border border-border overflow-hidden">
          <MenuRow
            icon={<Ionicons name="map-outline" size={18} color={APP_COLORS.secondary} />}
            label="Mis Reservas"
            sub={USER.reserve}
            onPress={() => router.push('/reserve' as any)}
          />
          <Divider />
          <MenuRow
            icon={<Ionicons name="camera-outline" size={18} color={APP_COLORS.secondary} />}
            label="Mis avistamientos"
            sub={`${USER.sightingsTotal} fotos subidas · ${USER.sightingsVerified} verificadas`}
            onPress={() => router.push('/(tabs)/sightings' as any)}
          />
          <Divider />
          <MenuRow
            icon={<Ionicons name="star-outline" size={18} color={APP_COLORS.gold} />}
            label="Mi colección"
            sub={`${USER.collectionOwned} / ${USER.collectionTotal} estrellas`}
            onPress={() => router.push('/(tabs)/dex' as any)}
          />
          <Divider />
          <MenuRow
            icon={<Ionicons name="document-text-outline" size={18} color={APP_COLORS.green.DEFAULT} />}
            label="Historial de quizzes"
            sub={`${USER.quizzesCompleted} completados`}
            onPress={() => router.push('/(tabs)/quizzes' as any)}
          />
        </View>

        {/* ── Ranking section ── */}
        <View className="mx-4 mt-4 mb-8">
          <Text className="text-xs font-bold text-muted uppercase tracking-widest mb-2 px-1">
            Ranking
          </Text>
          <View className="bg-surface rounded-2xl border border-border overflow-hidden">
            {RANKING.map((r, i) => (
              <View key={r.id} className="flex-row items-center px-4 py-3.5">
                {/* Medal */}
                <View className="w-7 h-7 rounded-full bg-yellow-500/20 items-center justify-center mr-3">
                  <Ionicons name="trophy" size={14} color={APP_COLORS.gold} />
                </View>
                {/* Avatar placeholder */}
                <View
                  className="w-9 h-9 rounded-full bg-elevated border border-teal items-center justify-center mr-3"
                >
                  <Ionicons name="person" size={18} color={APP_COLORS.secondary} />
                </View>
                <Text className="flex-1 text-sm font-semibold text-primary">
                  {r.name}
                </Text>
                <View className="items-end">
                  <Text className="text-sm font-extrabold text-secondary">
                    {r.points}
                  </Text>
                  <View className="flex-row items-center gap-0.5 mt-0.5">
                    <Ionicons name="star" size={11} color={APP_COLORS.gold} />
                    <Text className="text-[11px] text-muted">{r.stars}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}