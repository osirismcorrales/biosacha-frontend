import { APP_COLORS } from '@shared/constants/theme';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { mockQuiz } from '@features/quiz/data/mock';

export default function QuizScreen() {
  const router = useRouter();
  const quiz = mockQuiz;
  const [cur, setCur] = useState(0);
  const [sel, setSel] = useState<string | null>(null);
  const [ans, setAns] = useState<Record<number, string>>({});
  const [done, setDone] = useState(false);

  const q = quiz.questions[cur];
  const isLast = cur === quiz.questions.length - 1;

  const handleNext = () => {
    if (!sel) return;
    const next = { ...ans, [cur]: sel };
    setAns(next);
    if (isLast) setDone(true);
    else { setCur(c => c + 1); setSel(null); }
  };

  const correct = Object.entries(ans).filter(([i, a]) => quiz.questions[+i].correctAnswer === a).length;
  const pts = Object.entries(ans).filter(([i, a]) => quiz.questions[+i].correctAnswer === a).reduce((s, [i]) => s + quiz.questions[+i].points, 0);

  if (done) {
    return (
      <SafeAreaView className="flex-1 bg-base items-center justify-center p-6">
        <View className="w-24 h-24 rounded-full bg-teal-subtle items-center justify-center mb-6">
          <Ionicons name={correct === quiz.questions.length ? 'trophy' : 'star'} size={48} color={APP_COLORS.gold} />
        </View>
        <Text className="text-3xl font-extrabold text-primary mb-2">{correct === quiz.questions.length ? '¡Perfecto!' : '¡Muy bien!'}</Text>
        <Text className="text-lg text-muted mb-5">{correct} de {quiz.questions.length} correctas</Text>
        <View className="flex-row items-center bg-legendary-bg px-5 py-2.5 rounded-xl gap-2 mb-8 border border-legendary-border">
          <Ionicons name="star" size={20} color={APP_COLORS.gold} />
          <Text className="text-lg font-extrabold text-gold">+{pts} pts</Text>
        </View>
        <TouchableOpacity className="bg-teal px-12 py-4 rounded-xl" onPress={() => router.back()}>
          <Text className="text-base font-bold">Volver</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const opts = [{ k: 'A', t: q.optionA }, { k: 'B', t: q.optionB }, { k: 'C', t: q.optionC }, { k: 'D', t: q.optionD }];

  return (
    <SafeAreaView className="flex-1 bg-base">
      <View className="flex-row items-center px-4 py-3 gap-3">
        <TouchableOpacity className="w-10 h-10 rounded-full bg-surface items-center justify-center" onPress={() => router.back()}>
          <Ionicons name="close" size={24} color={APP_COLORS.primary} />
        </TouchableOpacity>
        <Text className="flex-1 text-base font-bold text-primary" numberOfLines={1}>{quiz.title}</Text>
        <View className="bg-teal-subtle px-3 py-1.5 rounded-lg">
          <Text className="text-xs font-bold text-teal">{cur + 1}/{quiz.questions.length}</Text>
        </View>
      </View>
      <View className="h-1 bg-elevated mx-4 rounded-full overflow-hidden">
        <View className="h-full bg-teal rounded-full" style={{ width: `${((cur + 1) / quiz.questions.length) * 100}%` }} />
      </View>
      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        <View className="bg-surface rounded-2xl p-6 mb-6 border border-border">
          <View className="flex-row justify-between mb-4">
            <Text className="text-xs font-bold text-accent uppercase tracking-wider">Pregunta {cur + 1}</Text>
            <Text className="text-xs font-bold text-gold">{q.points} pts</Text>
          </View>
          <Text className="text-lg font-semibold text-primary leading-7">{q.statement}</Text>
        </View>
        {opts.map(o => (
          <TouchableOpacity
            key={o.k}
            className={`flex-row items-center rounded-xl p-4 mb-3 border-2 gap-3.5 ${sel === o.k ? 'bg-teal-subtle border-teal' : 'bg-surface border-border'}`}
            onPress={() => setSel(o.k)} activeOpacity={0.7}
          >
            <View className={`w-9 h-9 rounded-full items-center justify-center ${sel === o.k ? 'bg-teal' : 'bg-elevated'}`}>
              <Text className={`text-sm font-bold ${sel === o.k ? 'text-base' : 'text-muted'}`}>{o.k}</Text>
            </View>
            <Text className={`flex-1 text-sm ${sel === o.k ? 'text-secondary font-semibold' : 'text-primary'}`}>{o.t}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View className="p-4">
        <TouchableOpacity
          className={`flex-row items-center justify-center p-4 rounded-xl gap-2 ${sel ? 'bg-teal' : 'bg-disabled'}`}
          onPress={handleNext} disabled={!sel}
        >
          <Text className="text-base font-bold" style={{ color: sel ? APP_COLORS.base : APP_COLORS.sunken }}>{isLast ? 'Finalizar' : 'Siguiente'}</Text>
          <Ionicons name={isLast ? 'checkmark' : 'arrow-forward'} size={20} color={sel ? APP_COLORS.base : APP_COLORS.sunken} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
