import 'react-native-reanimated';
import "../global.css";
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, PlusJakartaSans_400Regular, PlusJakartaSans_500Medium } from '@expo-google-fonts/plus-jakarta-sans';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';  // ← agregar

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({ PlusJakartaSans_400Regular, PlusJakartaSans_500Medium });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Stack 
        screenOptions={{ 
          headerShown: false, 
          contentStyle: { backgroundColor: '#F5F9F5' },
          animation: 'fade',
        }}
      />
    </SafeAreaProvider>
  );
}