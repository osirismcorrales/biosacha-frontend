import { APP_COLORS } from '@shared/constants/theme';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { UserHeader } from '@features/home/components/UserHeader';
import { StatsCard } from '@features/home/components/StatsCard';
import { RecentSpeciesCard } from '@features/home/components/RecentSpeciesCard';
import { QuickActionButton } from '@features/home/components/QuickActionButton';
import { ActivityItem } from '@features/home/components/ActivityItem';
import { SectionHeader } from '@shared/components/ui/SectionHeader';
import { mockUser } from '@features/profile/data/mock';
import { mockSpecies } from '@features/species/data/mock';
import { mockDexPage } from '@features/dex/data/mock';
import { mockSightings } from '@features/sighting/data/mock';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-base" edges={['top']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <UserHeader user={mockUser} />
        <StatsCard points={mockUser.totalPoints} discovered={mockDexPage.totalEntries} completion={mockDexPage.completionPercentage} />

        {/* Recent Discoveries */}
        <View className="mt-6 px-4">
          <SectionHeader title="Descubrimientos Recientes" actionLabel="Ver todo" onAction={() => router.push('/(tabs)/species' as any)} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
            {mockSpecies.slice(0, 5).map(sp => (
              <RecentSpeciesCard key={sp.id} species={sp} onPress={() => router.push(`/species/${sp.id}` as any)} />
            ))}
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View className="mt-6 px-4">
          <SectionHeader title="Acciones Rápidas" />
          <View className="flex-row gap-3">
            <QuickActionButton icon="camera" label="Registrar Avistamiento" color={APP_COLORS.green.DEFAULT} onPress={() => router.push('/sighting/new' as any)} />
            <QuickActionButton icon="help-circle" label="Quiz" color="#8B5CF6" onPress={() => router.push('/(tabs)/profile' as any)} />
          </View>
          <View className="flex-row gap-3 mt-3">
            <QuickActionButton icon="map" label="Reservas" color={APP_COLORS.secondary} onPress={() => router.push('/reserve' as any)} />
            <QuickActionButton icon="leaf" label="Catálogo" color={APP_COLORS.warning} onPress={() => router.push('/(tabs)/species' as any)} />
          </View>
        </View>

        {/* Activity */}
        <View className="mt-6 px-4 mb-8">
          <SectionHeader title="Actividad Reciente" />
          {mockSightings.slice(0, 3).map(s => (
            <ActivityItem key={s.id} imageUrl={s.speciesImageUrl} speciesName={s.speciesName} userName={s.userName} verified={s.verified} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
