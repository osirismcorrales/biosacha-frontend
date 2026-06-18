import { APP_COLORS } from '@shared/constants/theme';
import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import { Image } from 'expo-image';
import { mockQuizCards, mockQuizHistory } from '@features/quiz/data/mock';
import { mockSpecies } from '@features/species/data/mock';

/* ── Filter chips ── */
const FILTERS = ['Todos', 'Por especie', 'Generales', 'Mi progreso'] as const;

/* ── Rarity helpers ── */
const rarityColors: Record<string, { bg: string; text: string }> = {
  COMMON:    { bg: '#2E8B4E20', text: APP_COLORS.green.DEFAULT },
  UNCOMMON:  { bg: '#3BA3D920', text: '#3BA3D9' },
  RARE:      { bg: '#8B5CF620', text: '#8B5CF6' },
  EPIC:      { bg: '#C850C020', text: '#C850C0' },
  LEGENDARY: { bg: '#F5A62320', text: APP_COLORS.gold },
};

const statusColors: Record<string, string> = {
  LC: APP_COLORS.green.DEFAULT,
  NT: '#8BC34A',
  VU: APP_COLORS.gold,
  EN: '#FF9800',
  CR: APP_COLORS.danger,
};

/* ── Main quiz card ── */
function QuizCard({ quiz, onPress }: { quiz: typeof mockQuizCards[0]; onPress: () => void }) {
  const species = mockSpecies.find(s => s.id === quiz.speciesId);
  const rarity = rarityColors[quiz.rarity || 'COMMON'] || rarityColors.COMMON;

  return (
    <TouchableOpacity
      className="bg-surface rounded-2xl p-4 mb-3 border border-border shadow-sm mx-4"
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View className="flex-row items-center">
        {/* Species image */}
        <View className="w-16 h-16 rounded-xl bg-base overflow-hidden border border-border/50">
          {species?.mainImageUrl ? (
            <Image 
              source={{ uri: species.mainImageUrl }} 
              style={{ width: '100%', height: '100%' }} 
              contentFit="cover" 
              transition={200}
            />
          ) : (
            <View style={{ width: '100%', height: '100%' }} className="items-center justify-center bg-teal/10">
              <Ionicons name="paw" size={24} color={APP_COLORS.green.DEFAULT} />
            </View>
          )}
        </View>

        {/* Info */}
        <View className="flex-1 ml-4">
          <View className="flex-row items-center gap-2 mb-1">
            {quiz.rarity && (
              <View className="px-2 py-0.5 rounded" style={{ backgroundColor: rarity.bg }}>
                <Text style={{ color: rarity.text, fontSize: 10, fontWeight: '800' }}>
                  {quiz.rarity === 'EPIC' ? 'ÉPICO' : quiz.rarity}
                </Text>
              </View>
            )}
            <Text className="text-xs text-muted font-medium">
              {quiz.questionCount} pregs · <Text className="font-bold text-teal">+{quiz.totalPoints} pts</Text>
            </Text>
          </View>
          
          <Text className="text-base font-extrabold text-primary" numberOfLines={1}>{quiz.title}</Text>
          
          <View className="flex-row items-center gap-2 mt-1.5">
            {quiz.quizType === 'species' && (
              <View className="px-2 py-0.5 rounded bg-teal/15">
                <Text className="text-[10px] font-bold text-teal uppercase tracking-widest">Por especie</Text>
              </View>
            )}
            {quiz.conservationStatus && (
              <View className="px-2 py-0.5 rounded" style={{ backgroundColor: (statusColors[quiz.conservationStatus] || '#888') + '20' }}>
                <Text style={{ color: statusColors[quiz.conservationStatus] || '#888', fontSize: 10, fontWeight: '800' }}>
                  {quiz.conservationStatus}
                </Text>
              </View>
            )}
            {quiz.started && (
              <Text className="text-[10px] font-bold text-yellow-500 uppercase ml-auto">En curso</Text>
            )}
          </View>
        </View>

        {/* Progress / Action */}
        <View className="items-center justify-center ml-2">
          {quiz.started && quiz.progress !== undefined ? (
            <View className="w-10 h-10 rounded-full bg-teal/15 items-center justify-center border border-teal/30">
              <Text className="text-xs font-bold text-teal">{quiz.progress}/{quiz.questionCount}</Text>
            </View>
          ) : (
            <View className="w-10 h-10 rounded-full bg-base items-center justify-center border border-border">
              <Ionicons name="play" size={16} color={APP_COLORS.green.DEFAULT} style={{ marginLeft: 2 }} />
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

/* ── History item ── */
function HistoryItem({ item }: { item: typeof mockQuizHistory[0] }) {
  const passed = item.percentage >= 60;
  return (
    <View className="flex-row items-center bg-surface p-4 rounded-2xl mb-3 mx-4 border border-border shadow-sm">
      <View className={`w-12 h-12 rounded-full items-center justify-center border ${passed ? 'bg-teal/10 border-teal/30' : 'bg-red-500/10 border-red-500/30'}`}>
        <Ionicons name={passed ? 'trophy' : 'refresh'} size={20} color={passed ? APP_COLORS.green.DEFAULT : APP_COLORS.danger} />
      </View>
      
      <View className="flex-1 ml-4">
        <Text className="text-base font-bold text-primary">{item.speciesName}</Text>
        <Text className="text-xs text-muted font-medium mt-0.5">
          {item.completedAt} · {item.correctCount}/{item.totalCount} correctas
        </Text>
      </View>
      
      <View className="items-end ml-2">
        <Text className={`text-lg font-black ${passed ? 'text-teal' : 'text-red-500'}`}>
          {item.percentage}%
        </Text>
        {passed && (
          <View className="flex-row mt-0.5">
            {[...Array(item.stars)].map((_, i) => (
              <Ionicons key={i} name="star" size={12} color={APP_COLORS.gold} />
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

/* ── Screen ── */
export default function QuizzesScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('Todos');

  // Prepare grouped data for FlashList
  const listData = useMemo(() => {
    const available = mockQuizCards.filter(q => !mockQuizHistory.find(h => h.id === q.id));
    const history = mockQuizHistory;
    
    // Filtering logic can be added here based on activeFilter
    const filteredAvailable = available; // Simplified for now
    
    return [
      { type: 'header', title: 'Disponibles', data: null },
      ...filteredAvailable.map(item => ({ type: 'quiz', data: item })),
      ...(history.length > 0 ? [{ type: 'header', title: 'Completados', data: null }] : []),
      ...history.map(item => ({ type: 'history', data: item })),
    ];
  }, [activeFilter]);

  const renderItem = ({ item }: { item: any }) => {
    if (item.type === 'header') {
      return (
        <Text className="text-xs font-black tracking-widest text-muted uppercase mb-3 mt-4 mx-4">
          {item.title}
        </Text>
      );
    }
    if (item.type === 'quiz') {
      return <QuizCard quiz={item.data} onPress={() => router.push(`/quiz/${item.data.speciesId || item.data.id}` as any)} />;
    }
    if (item.type === 'history') {
      return <HistoryItem item={item.data} />;
    }
    return null;
  };

  return (
    <SafeAreaView className="flex-1 bg-base" edges={['top']}>
      {/* Header */}
      <View className="px-4 pt-4 pb-2">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-xs font-bold tracking-widest text-muted uppercase">Aprendé jugando</Text>
            <Text className="text-3xl font-extrabold text-primary mt-1">Quizzes</Text>
          </View>
          <TouchableOpacity className="w-11 h-11 rounded-full bg-surface items-center justify-center border border-border shadow-sm">
            <Ionicons name="flag" size={20} color={APP_COLORS.green.DEFAULT} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter chips */}
      <View className="mt-4 mb-2">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, gap: 10 }}>
          {FILTERS.map(f => {
            const active = f === activeFilter;
            return (
              <TouchableOpacity
                key={f}
                onPress={() => setActiveFilter(f)}
                className={`px-5 py-2.5 rounded-full border ${active ? 'bg-teal border-teal' : 'bg-surface border-border'}`}
                activeOpacity={0.8}
              >
                <Text className={`text-sm font-bold ${active ? 'text-base' : 'text-muted'}`} style={active ? { color: APP_COLORS.base } : undefined}>
                  {f}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* FlashList implementation */}
      <View className="flex-1 mt-2">
        <FlashList
          data={listData}
          renderItem={renderItem}
          // @ts-ignore
          estimatedItemSize={100}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </View>
    </SafeAreaView>
  );
}