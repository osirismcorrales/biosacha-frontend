import { APP_COLORS } from '@shared/constants/theme';
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { mockQuiz } from '@features/quiz/data/mock';
import { mockSpecies } from '@features/species/data/mock';
import { ZoomableImage } from '@shared/components/ui/ZoomableImage';
import { Image } from 'expo-image';

type Answer = {
  questionId: number;
  selected: string;
  correct: boolean;
};

export default function QuizPlayScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const quiz = mockQuiz;
  const species = mockSpecies.find(s => s.id === Number(id));
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [finished, setFinished] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Timer: starts/restarts whenever the quiz is (re)started
  // Depends on `finished` so it auto-restarts when the user retries
  useEffect(() => {
    if (finished) return; // don't tick while showing results
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [finished]);

  const currentQuestion = quiz.questions[currentIndex];
  const totalQuestions = quiz.questions.length;
  const isLast = currentIndex === totalQuestions - 1;
  const progress = ((currentIndex + 1) / totalQuestions) * 100;
  const speciesName = species?.commonName || 'Aguará Guazú';

  const handleSelect = (option: string) => {
    if (showFeedback) return;
    setSelectedOption(option);
  };

  const handleConfirm = () => {
    if (!selectedOption || showFeedback) return;
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    setAnswers(prev => [...prev, {
      questionId: currentQuestion.id,
      selected: selectedOption,
      correct: isCorrect,
    }]);
    setShowFeedback(true);
  };

  const handleNext = () => {
  if (isLast) {
    if (timerRef.current) clearInterval(timerRef.current); // ← limpiar antes
    setFinished(true);
  } else {
    setCurrentIndex(prev => prev + 1);
    setSelectedOption(null);
    setShowFeedback(false);
  }
}

  /* ═══════════════════════════════════
     RESULT SCREEN
     ═══════════════════════════════════ */
  if (finished) {
    const finalCorrect = answers.filter(a => a.correct).length;
    const percentage = Math.round((finalCorrect / totalQuestions) * 100);
    const finalPoints = answers.reduce((sum, a) => {
      const q = quiz.questions.find(q => q.id === a.questionId);
      return sum + (a.correct ? (q?.points || 0) : 0);
    }, 0);

    const formatTime = (secs: number) => {
      const m = Math.floor(secs / 60);
      const s = secs % 60;
      return `${m}:${s.toString().padStart(2, '0')}`;
    };

    // Motivational mascots & phrases — one picked randomly each time
    const MASCOTS = [
      {
        emoji: '🦜',
        name: 'Guacamayo',
        phrase: '¡Cada intento te hace más sabio! La selva tiene muchos secretos esperándote.',
      },
      {
        emoji: '🦊',
        name: 'Aguará Guazú',
        phrase: 'El conocimiento es como el camino: se construye paso a paso. ¡Volvé a intentarlo!',
      },
      {
        emoji: '🐸',
        name: 'Rana Dorada',
        phrase: 'No importa cuántas veces caigas, lo que importa es volver a saltar. ¡Dale de nuevo!',
      },
    ];
    const mascot = MASCOTS[Math.floor(Math.random() * MASCOTS.length)];
    const starsEarned = percentage >= 80 ? 3 : percentage >= 60 ? 2 : percentage >= 30 ? 1 : 0;

    return (
      <SafeAreaView className="flex-1 bg-base" edges={['top']}>
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 + insets.bottom }}>

          {/* ── Mascot card ── */}
          <View className="items-center pt-10 pb-4 px-8">
            {/* Big animal emoji bubble */}
            <View
              className="w-28 h-28 rounded-full items-center justify-center mb-4"
              style={{ backgroundColor: APP_COLORS.green.DEFAULT + '18', borderWidth: 2, borderColor: APP_COLORS.green.DEFAULT + '30' }}
            >
              <Text style={{ fontSize: 60 }}>{mascot.emoji}</Text>
            </View>

            {/* Speech bubble */}
            <View
              className="bg-surface rounded-2xl rounded-tl-none px-5 py-4 border border-border"
              style={{ maxWidth: 300 }}
            >
              {/* Triangle pointer */}
              <View
                style={{
                  position: 'absolute', top: -10, left: 12,
                  width: 0, height: 0,
                  borderLeftWidth: 10, borderRightWidth: 10, borderBottomWidth: 10,
                  borderLeftColor: 'transparent', borderRightColor: 'transparent',
                  borderBottomColor: APP_COLORS.border,
                }}
              />
              <Text className="text-[10px] font-bold text-teal uppercase tracking-widest mb-1">
                {mascot.name} dice:
              </Text>
              <Text className="text-sm text-primary leading-5 font-medium">
                {mascot.phrase}
              </Text>
            </View>
          </View>

          {/* ── Score summary ── */}
          <View className="mx-6 mt-4 bg-surface rounded-2xl border border-border p-5 mb-4">
            <Text className="text-xs font-bold tracking-widest text-muted mb-4 text-center">TU RESULTADO</Text>
            <View className="flex-row items-center justify-center gap-3 mb-4">
              {[1, 2, 3].map(i => (
                <Ionicons
                  key={i}
                  name={i <= starsEarned ? 'star' : 'star-outline'}
                  size={32}
                  color={i <= starsEarned ? APP_COLORS.gold : APP_COLORS.disabled}
                />
              ))}
            </View>
            <View className="flex-row gap-3">
              {[
                { label: 'Correctas', value: `${finalCorrect}/${totalQuestions}` },
                { label: 'Puntos',    value: `${finalPoints}` },
                { label: 'Tiempo',    value: formatTime(elapsedTime) },
              ].map(stat => (
                <View key={stat.label} className="flex-1 items-center">
                  <Text className="text-xl font-extrabold text-primary">{stat.value}</Text>
                  <Text className="text-[10px] text-muted mt-0.5">{stat.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* ── Answer summary (collapsed, no judgment) ── */}
          <View className="mx-6">
            <Text className="text-xs font-bold tracking-widest text-muted mb-3">REVISÁ TUS RESPUESTAS</Text>
            <View className="bg-surface rounded-2xl border border-border overflow-hidden">
              {answers.map((answer, index) => {
                const q = quiz.questions.find(qu => qu.id === answer.questionId);
                const isLastItem = index === answers.length - 1;
                return (
                  <View
                    key={index}
                    className={`flex-row items-center px-4 py-3 ${!isLastItem ? 'border-b border-border' : ''}`}
                  >
                    <Text className="text-sm text-primary flex-1" numberOfLines={1}>
                      {q?.statement ?? ''}
                    </Text>
                    <Ionicons
                      name={answer.correct ? 'checkmark-circle' : 'ellipse-outline'}
                      size={20}
                      color={answer.correct ? APP_COLORS.green.DEFAULT : APP_COLORS.disabled}
                    />
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>

        {/* ── Bottom actions ── */}
        <View className="absolute bottom-0 left-0 right-0 p-4 gap-3 bg-base" style={{ paddingBottom: Math.max(insets.bottom, 16) }}>
          <TouchableOpacity
            className="w-full bg-teal p-4 rounded-2xl items-center flex-row justify-center gap-2"
            onPress={() => {
              setCurrentIndex(0);
              setSelectedOption(null);
              setShowFeedback(false);
              setAnswers([]);
              setFinished(false);
              setElapsedTime(0);
            }}
          >
            <Ionicons name="refresh" size={20} color={APP_COLORS.base} />
            <Text className="text-base font-bold" style={{ color: APP_COLORS.base }}>Volver a intentar</Text>
          </TouchableOpacity>
          <View className="flex-row gap-3">
            <TouchableOpacity
              className="flex-1 bg-surface p-3.5 rounded-2xl items-center border border-border"
              onPress={() => router.replace('/quizzes')}
            >
              <Text className="text-sm font-semibold text-primary">Más quizzes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 bg-surface p-3.5 rounded-2xl items-center border border-border"
              onPress={() => router.push(`/species/${id}`)}
            >
              <Text className="text-sm font-semibold text-teal">Ver especie</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  /* ═══════════════════════════════════
     PLAY SCREEN
     ═══════════════════════════════════ */
  const options = [
    { key: 'A', text: currentQuestion.optionA },
    { key: 'B', text: currentQuestion.optionB },
    { key: 'C', text: currentQuestion.optionC },
    { key: 'D', text: currentQuestion.optionD },
  ];

  const correctAnswerText =
    currentQuestion.correctAnswer === 'A' ? currentQuestion.optionA :
    currentQuestion.correctAnswer === 'B' ? currentQuestion.optionB :
    currentQuestion.correctAnswer === 'C' ? currentQuestion.optionC :
    currentQuestion.optionD;

  return (
    <SafeAreaView className="flex-1 bg-base" edges={['top']}>
      {/* Header */}
      <View className="px-5 py-3 mb-2">
        <View className="flex-row items-center">
          <TouchableOpacity
            className="w-11 h-11 rounded-full bg-surface items-center justify-center border border-border shadow-sm"
            onPress={() => router.back()}
          >
            <Ionicons name="close" size={24} color={APP_COLORS.primary} />
          </TouchableOpacity>
          <View className="flex-1 px-4">
            <Text className="text-center text-sm font-bold text-primary" numberOfLines={1}>{speciesName}</Text>
          </View>
          <View className="bg-surface px-3 py-1.5 rounded-full border border-border shadow-sm">
            <Text className="text-xs font-black text-teal">
              {currentIndex + 1} / {totalQuestions}
            </Text>
          </View>
        </View>

        {/* Progress */}
        <View className="h-2 mt-4 bg-surface rounded-full overflow-hidden border border-border">
          <View className="h-full bg-teal rounded-full" style={{ width: `${progress}%` }} />
        </View>
      </View>

      {/* Content */}
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
      >
        {/* Species image scrolls with content */}
        {species?.mainImageUrl && (
          <View className="w-full h-48 rounded-3xl overflow-hidden border border-border shadow-sm mb-6 mt-2">
            <Image 
              source={{ uri: species.mainImageUrl }} 
              style={{ width: '100%', height: '100%' }} 
              contentFit="cover" 
              transition={200}
            />
          </View>
        )}

        <Text className="text-2xl font-extrabold text-primary leading-8 mb-6">
          {currentQuestion.statement}
        </Text>

        {options.map(opt => {
          const isSelected = selectedOption === opt.key;
          const isCorrect = opt.key === currentQuestion.correctAnswer;

          // Compute styles imperatively to avoid dynamic className strings
          // that trigger react-native-css-interop's printUpgradeWarning crash
          let containerBg = APP_COLORS.surface;
          let containerBorder = APP_COLORS.border;
          let circleBg = APP_COLORS.elevated;
          let circleText = APP_COLORS.muted;

          if (showFeedback) {
            if (isCorrect) {
              containerBg = APP_COLORS.green.DEFAULT + '26'; // ~15% opacity
              containerBorder = APP_COLORS.green.DEFAULT;
              circleBg = APP_COLORS.green.DEFAULT;
              circleText = '#FFFFFF';
            } else if (isSelected) {
              containerBg = '#E8545426'; // danger ~15% opacity
              containerBorder = APP_COLORS.danger;
              circleBg = APP_COLORS.danger;
              circleText = '#FFFFFF';
            }
          } else if (isSelected) {
            containerBg = APP_COLORS.green.DEFAULT + '26';
            containerBorder = APP_COLORS.green.DEFAULT;
            circleBg = APP_COLORS.green.DEFAULT;
            circleText = '#FFFFFF';
          }

          return (
            <TouchableOpacity
              key={opt.key}
              className="flex-row items-center rounded-xl p-4 mb-3 border-2 gap-3"
              style={{ backgroundColor: containerBg, borderColor: containerBorder }}
              onPress={() => handleSelect(opt.key)}
              disabled={showFeedback}
              activeOpacity={0.7}
            >
              <View
                className="w-10 h-10 rounded-full items-center justify-center"
                style={{ backgroundColor: circleBg }}
              >
                <Text className="text-base font-bold" style={{ color: circleText }}>{opt.key}</Text>
              </View>
              <Text className="flex-1 text-base" style={{ color: APP_COLORS.primary }}>{opt.text}</Text>
              {showFeedback && isCorrect && (
                <Ionicons name="checkmark" size={20} color={APP_COLORS.green.DEFAULT} />
              )}
            </TouchableOpacity>
          );
        })}

        {/* Feedback explanation box */}
        {showFeedback && (
          <View
            className="rounded-xl p-4 mt-2 mb-3 border"
            style={{
              borderColor: selectedOption === currentQuestion.correctAnswer ? APP_COLORS.green.DEFAULT : APP_COLORS.danger,
              backgroundColor: selectedOption === currentQuestion.correctAnswer ? '#2E8B4E10' : '#E8545410',
            }}
          >
            <View className="flex-row items-start gap-2">
              <Ionicons
                name={selectedOption === currentQuestion.correctAnswer ? 'checkmark-circle' : 'close-circle'}
                size={18}
                color={selectedOption === currentQuestion.correctAnswer ? APP_COLORS.green.DEFAULT : APP_COLORS.danger}
                style={{ marginTop: 2 }}
              />
              <Text className="text-sm text-primary flex-1">
                {selectedOption === currentQuestion.correctAnswer
                  ? '¡Correcto!'
                  : `La respuesta correcta es ${currentQuestion.correctAnswer} — ${correctAnswerText}`}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Floating Bottom Button */}
      <View 
        className="px-5 pt-4 bg-base/95 border-t border-border/50" 
        style={{ paddingBottom: Math.max(insets.bottom, 20) }}
      >
        {!showFeedback ? (
          <TouchableOpacity
            className="flex-row items-center justify-center py-4 rounded-2xl gap-2"
            style={{
              backgroundColor: selectedOption ? APP_COLORS.green.DEFAULT : APP_COLORS.surface,
              borderWidth: selectedOption ? 0 : 1,
              borderColor: APP_COLORS.border,
            }}
            onPress={handleConfirm}
            disabled={!selectedOption}
          >
            <Text
              className="text-base font-extrabold"
              style={{ color: selectedOption ? '#FFFFFF' : APP_COLORS.muted }}
            >
              Confirmar Respuesta
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className="flex-row items-center justify-center py-4 rounded-2xl gap-2"
            style={{ backgroundColor: APP_COLORS.green.DEFAULT }}
            onPress={handleNext}
          >
            <Text className="text-base font-black" style={{ color: '#FFFFFF' }}>
              {isLast ? 'Ver Resultados' : 'Siguiente Pregunta'}
            </Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}