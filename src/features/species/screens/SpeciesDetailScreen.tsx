import { APP_COLORS } from '@shared/constants/theme';
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, useWindowDimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import * as Speech from 'expo-speech';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScreenHeader } from '@shared/components/ui/ScreenHeader';
import { RarityBadge } from '@shared/components/ui/RarityBadge';
import { ConservationBadge } from '@shared/components/ui/ConservationBadge';
import { mockSpecies } from '@features/species/data/mock';
import { Image } from 'expo-image';

const speciesDetails: Record<number, { clase: string; orden: string; habitat: string; dieta: string; description: string }> = {
  1: { clase: 'Mammalia', orden: 'Carnivora', habitat: 'Selva tropical, pantanos', dieta: 'Carnívoro', description: 'El jaguar es el felino más grande de América. Depredador solitario con mordida capaz de perforar caparazones de tortuga. Habita en selvas tropicales, pantanos y pastizales desde el sur de Estados Unidos hasta el norte de Argentina.' },
  2: { clase: 'Aves', orden: 'Psittaciformes', habitat: 'Selva tropical', dieta: 'Frugívoro', description: 'El guacamayo rojo habita en selvas tropicales y forma parejas de por vida. Su dieta consiste principalmente en semillas, frutas y néctar. Es una de las especies de loro más coloridas del mundo.' },
  3: { clase: 'Aves', orden: 'Accipitriformes', habitat: 'Montañas andinas', dieta: 'Carroña', description: 'El cóndor andino tiene una envergadura de hasta 3.3 metros. Es una de las aves voladoras más grandes del mundo. Habita en las altas montañas de los Andes.' },
  4: { clase: 'Mammalia', orden: 'Carnivora', habitat: 'Selva nubosa', dieta: 'Omnívoro', description: 'El oso de anteojos es la única especie de oso en Sudamérica. Debe su nombre a las manchas claras alrededor de sus ojos. Se alimenta principalmente de frutas y hojas.' },
  5: { clase: 'Mammalia', orden: 'Primates', habitat: 'Selva tropical', dieta: 'Folívoro', description: 'El mono aullador emite vocalizaciones audibles a más de 5 km. Vive en grupos familiares y se alimenta de hojas y frutas.' },
  6: { clase: 'Mammalia', orden: 'Artiodactyla', habitat: 'Ríos amazónicos', dieta: 'Piscívoro', description: 'El delfín rosado es el delfín de río más grande del mundo. Puede medir hasta 2.5 metros de longitud. Vive en las aguas dulces de la cuenca del Amazonas.' },
  7: { clase: 'Aves', orden: 'Passeriformes', habitat: 'Rocas andinas', dieta: 'Frugívoro', description: 'El gallito de las rocas es el ave nacional del Perú. Los machos tienen un plumaje naranja brillante mientras que las hembras son de color marrón.' },
  8: { clase: 'Magnoliopsida', orden: 'Nymphaeales', habitat: 'Lagunas amazónicas', dieta: 'Autótrofo', description: 'La Victoria regia tiene hojas flotantes de hasta 3 metros de diámetro. Pueden soportar hasta 40 kg de peso. Es el nenúfar más grande del mundo.' },
  9: { clase: 'Amphibia', orden: 'Dendrobatiformes', habitat: 'Selva tropical', dieta: 'Insectívoro', description: 'La rana dorada produce batracotoxina, una neurotoxina mortal. Su piel brillante sirve como advertencia a depredadores. Los pueblos indígenas han usado su toxina para flechas.' },
  10: { clase: 'Liliopsida', orden: 'Asparagales', habitat: 'Alta montaña', dieta: 'Autótrofo', description: 'La orquídea andina crece entre 2000 y 4000 metros de altitud. Sus flores pueden vivir hasta 2 semanas. Es una de las orquídeas más admiradas del Perú.' },
};

function DetailRow({ icon, label, value, color = APP_COLORS.muted }: { icon: string; label: string; value: string; color?: string }) {
  return (
    <View className="flex-row items-center py-3 border-b border-border/50 last:border-0">
      <View className="w-10 h-10 rounded-full bg-base items-center justify-center mr-3">
        <Ionicons name={icon as any} size={18} color={color} />
      </View>
      <View className="flex-1 flex-row justify-between items-center">
        <Text className="text-sm text-muted">{label}</Text>
        <Text className="text-sm font-semibold text-primary">{value}</Text>
      </View>
    </View>
  );
}

export default function SpeciesDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { height: screenHeight } = useWindowDimensions();
  const species = mockSpecies.find(s => s.id === Number(id));
  const details = speciesDetails[species?.id || 1];

  const scrollY = useRef(new Animated.Value(0)).current;
  const [isSpeaking, setIsSpeaking] = useState(false);

  const soundUrl = species?.audioUrl ?? null;
  const hasAudio = !!soundUrl;

  // expo-audio hook (manages lifecycle automatically)
  const player = useAudioPlayer(null); // start empty, load via effect
  const status = useAudioPlayerStatus(player);

  // 1. Load audio dynamically — isMounted guard prevents race on fast navigation
  useEffect(() => {
    let isMounted = true;
    if (soundUrl && isMounted) {
      player.replace({ uri: soundUrl });
    }
    return () => { isMounted = false; };
  }, [soundUrl, player]);




  // 3. Pause and reset position when finished (play-once)
  useEffect(() => {
    if (status.didJustFinish) {
      player.pause();
      player.seekTo(0);
    }
  }, [status.didJustFinish]);

  // 4. Cleanup on unmount — try/catch because useAudioPlayer may already
  //    have released the native player by the time this runs
  useEffect(() => {
    return () => {
      Speech.stop();
      try { player.pause(); } catch { /* player already released */ }
    };
  }, []);

  const isPlayingSound = status.playing;
  const isLoadingAudio = status.isBuffering;

  // 5. toggleSound: pause/resume without seeking (seekTo only on finish)
  const toggleSound = () => {
    if (isPlayingSound) {
      player.pause();
    } else {
      player.play();
    }
  };

  // 4. stopAudio resets position
  const stopAudio = () => {
    player.pause();
    player.seekTo(0);
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)/species');
    }
  };

  const narrateInfo = async () => {
    if (isPlayingSound) {
      stopAudio();
    }

    if (isSpeaking) {
      await Speech.stop();
      setIsSpeaking(false);
      return;
    }
    const text = species?.commonName + '. ' + species?.scientificName + '. ' + details?.description;
    setIsSpeaking(true);
    Speech.speak(text, {
      language: 'es-ES',
      pitch: 1.0,
      rate: 0.9,
      onDone: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
      onStopped: () => setIsSpeaking(false),
    });
  };

  const IMAGE_HEIGHT = Math.round(screenHeight * 0.4);

  if (!species || !details) {
    return (
      <SafeAreaView className="flex-1 bg-base" edges={['top']}>
        <ScreenHeader title="Especies" />
        <View className="flex-1 items-center justify-center gap-3">
          <Ionicons name="alert-circle-outline" size={48} color={APP_COLORS.disabled} />
          <Text className="text-base text-muted">Especie no encontrada</Text>
          <TouchableOpacity className="bg-teal px-6 py-2.5 rounded-lg mt-2" onPress={handleBack}>
            <Text className="text-base font-semibold text-base">Volver</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const imageTranslateY = scrollY.interpolate({
    inputRange: [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT],
    outputRange: [IMAGE_HEIGHT / 2, 0, -IMAGE_HEIGHT / 3],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView className="flex-1 bg-base" edges={['top']}>
      <View className="flex-row items-center px-4 py-2">
        <TouchableOpacity 
          className="w-11 h-11 rounded-full bg-surface items-center justify-center border border-border/50 shadow-sm" 
          onPress={handleBack}
        >
          <Ionicons name="arrow-back" size={24} color={APP_COLORS.primary} />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-lg font-bold text-primary mr-11">Detalle</Text>
      </View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: Math.max(insets.bottom + 16, 32), paddingTop: 8 }}
      >
        <View className="px-5">
          <View className="w-full h-64 rounded-3xl overflow-hidden mb-6 border border-border shadow-sm">
            <Image 
              source={{ uri: species.mainImageUrl }} 
              style={{ width: '100%', height: '100%' }} 
              contentFit="cover"
              transition={300}
            />
          </View>

          <View className="flex-row justify-between items-start mb-4">
            <View className="flex-1 pr-4">
              <Text className="text-3xl font-extrabold text-primary mb-1">{species.commonName}</Text>
              <Text className="text-base italic text-muted">{species.scientificName}</Text>
            </View>
          </View>
          
          <View className="flex-row flex-wrap gap-2 mb-6">
            <RarityBadge rarity={species.rarity} />
            <ConservationBadge status={species.conservationStatus} />
          </View>

          {/* Action buttons */}
          <View className="flex-row gap-3 mb-8">
            {hasAudio && (
              <TouchableOpacity 
                className={`flex-1 flex-row items-center justify-center py-4 rounded-2xl gap-2 border ${
                  isPlayingSound ? 'bg-teal border-teal' : 'bg-surface border-border'
                } shadow-sm`}
                onPress={toggleSound}
                disabled={isLoadingAudio}
              >
                <Ionicons 
                  name={isLoadingAudio ? 'hourglass' : isPlayingSound ? 'pause' : 'volume-high'} 
                  size={22} 
                  color={isPlayingSound ? APP_COLORS.base : isLoadingAudio ? APP_COLORS.disabled : APP_COLORS.green.DEFAULT} 
                />
                <Text className={`text-sm font-bold ${isPlayingSound ? 'text-base' : isLoadingAudio ? 'text-disabled' : 'text-teal'}`}>
                  {isLoadingAudio ? 'Cargando...' : isPlayingSound ? 'Pausar' : 'Sonido'}
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity 
              className={`flex-1 flex-row items-center justify-center py-4 rounded-2xl gap-2 border ${isSpeaking ? 'bg-teal border-teal' : 'bg-surface border-border'} shadow-sm`}
              onPress={narrateInfo}
            >
              <Ionicons name={isSpeaking ? "stop" : "mic"} size={22} color={isSpeaking ? APP_COLORS.base : APP_COLORS.green.DEFAULT} />
              <Text className={`text-sm font-bold ${isSpeaking ? 'text-base' : 'text-teal'}`}>
                {isSpeaking ? "Detener" : "Narrar"}
              </Text>
            </TouchableOpacity>
          </View>

          <View className="bg-surface rounded-3xl p-5 border border-border mb-8 shadow-sm">
            <DetailRow icon="paw-outline" label="Clase" value={details.clase} />
            <DetailRow icon="git-merge-outline" label="Orden" value={details.orden} />
            <DetailRow icon="library-outline" label="Familia" value={species.family} />
            <DetailRow icon="earth-outline" label="Hábitat" value={details.habitat} />
            <DetailRow icon="restaurant-outline" label="Dieta" value={details.dieta} />
          </View>

          <Text className="text-xl font-extrabold text-primary mb-4 px-1">Descripción</Text>
          <Text className="text-base leading-7 text-secondary px-1 mb-8 text-justify">
            {details.description}
          </Text>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}