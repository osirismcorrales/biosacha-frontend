import { APP_COLORS } from '@shared/constants/theme';
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { getReserveById } from '@features/reserve/data/mock';

export default function JoinReserveScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const reserve = getReserveById(id ?? 'horco_molle');

  const [manualCode, setManualCode] = useState('');
  const [error, setError] = useState('');
  const [scanning, setScanning] = useState(true);
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const correctCode = reserve?.accessCode ?? '';

  const shake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
    ]).start();
  };

  const handleJoin = () => {
    const normalized = manualCode.trim().toUpperCase().replace(/\s/g, '-');
    if (!normalized) {
      setError('Ingresá el código de acceso');
      shake();
      return;
    }
    if (normalized !== correctCode.toUpperCase()) {
      setError('Código incorrecto. Revisá la entrada.');
      shake();
      return;
    }
    // Navigate to active expedition
    router.replace(`/reserve/${id}/expedition` as any);
  };

  const handleExploreWithout = () => {
    router.replace(`/reserve/${id}/expedition` as any);
  };

  return (
    <SafeAreaView className="flex-1 bg-base" edges={['top']}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* ── Header ── */}
        <View className="px-5 pt-2 pb-4 border-b border-border">
          <TouchableOpacity
            className="flex-row items-center gap-1 mb-3"
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={18} color={APP_COLORS.muted} />
            <Text className="text-muted text-sm">Mapa</Text>
          </TouchableOpacity>
          <Text className="text-xs font-bold tracking-widest text-teal uppercase mb-1">
            UNIRSE A LA EXPEDICIÓN
          </Text>
          <Text className="text-2xl font-extrabold text-primary">{reserve?.name}</Text>
        </View>

        <View className="flex-1 px-5 py-6">

          {/* ── QR Scanner Placeholder ── */}
          <Text className="text-xs font-bold tracking-widest text-muted uppercase mb-3">
            ESCANEÁ EL CÓDIGO QR DE LA ENTRADA
          </Text>
          <View
            className="bg-surface rounded-3xl border border-border overflow-hidden mb-5"
            style={{ height: 220 }}
          >
            {/* Scanner frame */}
            <View className="flex-1 items-center justify-center">
              {/* Corner brackets */}
              {[
                { top: 24, left: 24 },
                { top: 24, right: 24 },
                { bottom: 24, left: 24 },
                { bottom: 24, right: 24 },
              ].map((pos, i) => (
                <View
                  key={i}
                  style={[
                    {
                      position: 'absolute',
                      width: 32,
                      height: 32,
                      borderColor: APP_COLORS.green.DEFAULT,
                    },
                    pos,
                    i < 2 ? { borderTopWidth: 3 } : { borderBottomWidth: 3 },
                    i % 2 === 0 ? { borderLeftWidth: 3 } : { borderRightWidth: 3 },
                  ]}
                />
              ))}
              <View
                className="w-16 h-16 rounded-2xl items-center justify-center"
                style={{ backgroundColor: APP_COLORS.green.DEFAULT + '20' }}
              >
                <Ionicons name="qr-code" size={36} color={APP_COLORS.green.DEFAULT} />
              </View>
              <Text className="text-muted text-xs mt-3 text-center px-6">
                El código QR está en el cartel de la{'\n'}entrada
              </Text>
            </View>
          </View>

          {/* Divider */}
          <View className="flex-row items-center gap-3 mb-5">
            <View className="flex-1 h-px bg-border" />
            <Text className="text-xs text-muted font-medium">o ingresá el código</Text>
            <View className="flex-1 h-px bg-border" />
          </View>

          {/* ── Manual Code Input ── */}
          <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
            <View
              className="bg-surface rounded-2xl border border-border px-5 py-4 mb-2 items-center"
              style={error ? { borderColor: APP_COLORS.danger } : {}}
            >
              <TextInput
                value={manualCode}
                onChangeText={v => { setManualCode(v); setError(''); }}
                placeholder="HORCO - 2847"
                placeholderTextColor={APP_COLORS.disabled}
                autoCapitalize="characters"
                style={{
                  fontSize: 22,
                  fontWeight: '800',
                  color: APP_COLORS.primary,
                  letterSpacing: 4,
                  textAlign: 'center',
                  width: '100%',
                }}
              />
            </View>
            {!!error && (
              <Text className="text-danger text-xs text-center mb-2">{error}</Text>
            )}
          </Animated.View>

          {/* Hint */}
          <Text className="text-muted text-[11px] text-center mb-6">
            El código está en el cartel de la entrada o lo da el guía
          </Text>

          {/* ── CTA Buttons ── */}
          <TouchableOpacity
            className="w-full bg-teal py-4 rounded-2xl items-center mb-3"
            onPress={handleJoin}
          >
            <Text className="text-white font-bold text-base">Unirme a la expedición</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="w-full py-3.5 rounded-2xl items-center border border-border bg-surface"
            onPress={handleExploreWithout}
          >
            <Text className="text-muted text-sm font-medium">Solo explorar sin unirme</Text>
          </TouchableOpacity>

          <Text
            className="text-center text-[10px] text-muted mt-4"
            style={{ color: APP_COLORS.green.DEFAULT }}
          >
            AL UNIRTE VAS A PODER GANAR CARTAS EXCLUSIVAS
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
