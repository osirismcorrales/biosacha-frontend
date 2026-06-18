import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { HapticTab } from '@shared/components/haptic-tab';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { APP_COLORS } from '@shared/constants/theme';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: APP_COLORS.secondary,
        tabBarInactiveTintColor: APP_COLORS.disabled,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: APP_COLORS.surface,
          borderTopColor: APP_COLORS.border,
          borderTopWidth: 1,
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 8,
        },
        tabBarLabelStyle: { fontSize: 10, fontFamily: 'PlusJakartaSans_500Medium' },
      }}>
      <Tabs.Screen name="species" options={{ title: 'Especies', tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'leaf' : 'leaf-outline'} size={24} color={color} /> }} />
      <Tabs.Screen name="quizzes" options={{ title: 'Quizzes', tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'help-circle' : 'help-circle-outline'} size={24} color={color} /> }} />
      <Tabs.Screen name="map" options={{ title: 'Mapa', tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'map' : 'map-outline'} size={24} color={color} /> }} />
      <Tabs.Screen name="dex" options={{ title: 'Colección', tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'albums' : 'albums-outline'} size={24} color={color} /> }} />
      <Tabs.Screen name="profile" options={{ title: 'Perfil', tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'person' : 'person-outline'} size={24} color={color} /> }} />
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen name="sightings" options={{ href: null }} />
    </Tabs>
  );
}
