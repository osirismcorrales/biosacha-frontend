import { APP_COLORS } from '@shared/constants/theme';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';

export default function ReserveScreen() {
  const router = useRouter();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)/');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-base" edges={['top']}>
      {/* Header flotante transparente */}
      <View className="absolute top-12 left-4 z-10">
        <TouchableOpacity 
          className="w-10 h-10 rounded-full bg-black/40 items-center justify-center backdrop-blur-md"
          onPress={handleBack}
        >
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Banner Portada */}
        <View className="w-full h-72">
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800&h=600&fit=crop' }} 
            style={{ width: '100%', height: '100%' }} 
            contentFit="cover" 
          />
          <View className="absolute bottom-0 left-0 right-0 h-40 justify-end p-5 bg-black/40">
            <View className="bg-teal/90 self-start px-2 py-1 rounded mb-2">
              <Text className="text-[10px] font-bold text-white uppercase tracking-widest">Reserva Experimental</Text>
            </View>
            <Text className="text-3xl font-extrabold text-white leading-tight">Horco Molle</Text>
            <Text className="text-white/90 text-sm mt-1 font-medium">Yerba Buena, Tucumán</Text>
          </View>
        </View>

        {/* Info Stats */}
        <View className="flex-row mx-4 mt-[-20px] bg-surface rounded-2xl p-4 shadow-sm border border-border">
          <View className="flex-1 items-center border-r border-border/50">
            <Ionicons name="footsteps" size={24} color={APP_COLORS.green.DEFAULT} />
            <Text className="text-sm font-bold text-primary mt-1">1 km</Text>
            <Text className="text-[10px] text-muted text-center">Circuito</Text>
          </View>
          <View className="flex-1 items-center border-r border-border/50">
            <Ionicons name="time" size={24} color={APP_COLORS.green.DEFAULT} />
            <Text className="text-sm font-bold text-primary mt-1">45 min</Text>
            <Text className="text-[10px] text-muted text-center">Duración</Text>
          </View>
          <View className="flex-1 items-center">
            <Ionicons name="leaf" size={24} color={APP_COLORS.green.DEFAULT} />
            <Text className="text-sm font-bold text-primary mt-1">18 ha</Text>
            <Text className="text-[10px] text-muted text-center">Protegidas</Text>
          </View>
        </View>

        {/* Misiones del Recorrido */}
        <View className="px-4 mt-8">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-extrabold text-primary">Misiones del Recorrido</Text>
            <Ionicons name="compass" size={20} color={APP_COLORS.secondary} />
          </View>

          <TouchableOpacity className="bg-surface rounded-xl p-4 border border-border mb-3 flex-row items-center shadow-sm">
            <View className="w-12 h-12 bg-teal/10 rounded-full items-center justify-center mr-3 border border-border/50">
              <Ionicons name="camera" size={24} color={APP_COLORS.green.DEFAULT} />
            </View>
            <View className="flex-1">
              <Text className="text-sm font-bold text-primary">El Secreto de las Raíces</Text>
              <Text className="text-xs text-secondary mt-0.5">Fotografiá un árbol con raíces aéreas en el sector de aves.</Text>
            </View>
            <View className="bg-gold/20 px-2 py-1 rounded ml-2 flex-row items-center">
              <Text className="text-xs font-bold text-yellow-700">+50</Text>
              <Ionicons name="star" size={10} color={APP_COLORS.gold} style={{ marginLeft: 2 }} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="bg-surface rounded-xl p-4 border border-border mb-3 flex-row items-center shadow-sm">
            <View className="w-12 h-12 bg-sky/10 rounded-full items-center justify-center mr-3 border border-border/50">
              <Ionicons name="search" size={24} color={APP_COLORS.sky.DEFAULT} />
            </View>
            <View className="flex-1">
              <Text className="text-sm font-bold text-primary">El Gigante Acuático</Text>
              <Text className="text-xs text-secondary mt-0.5">Encontrá al Tapir e identifica su nombre científico en la app.</Text>
            </View>
            <View className="bg-gold/20 px-2 py-1 rounded ml-2 flex-row items-center">
              <Text className="text-xs font-bold text-yellow-700">+80</Text>
              <Ionicons name="star" size={10} color={APP_COLORS.gold} style={{ marginLeft: 2 }} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Colección Exclusiva */}
        <View className="px-4 mt-6">
          <View className="bg-sunken rounded-2xl p-5 border border-border flex-row items-center justify-between overflow-hidden">
            <View className="flex-1 pr-4">
              <Text className="text-base font-extrabold text-primary mb-1">Colección Exclusiva</Text>
              <Text className="text-xs text-secondary mb-3">
                Descubre especies endémicas y rescatadas que solo habitan en esta reserva.
              </Text>
              <TouchableOpacity className="bg-teal py-2 px-4 rounded-lg self-start">
                <Text className="text-white font-bold text-xs">Ver Especies (12)</Text>
              </TouchableOpacity>
            </View>
            <View className="w-20 h-20 bg-surface rounded-full items-center justify-center shadow-sm border border-border">
              <Ionicons name="book" size={36} color={APP_COLORS.green.DEFAULT} />
            </View>
          </View>
        </View>

        {/* Mapa Interactivo CTA */}
        <View className="px-4 mt-6">
          <TouchableOpacity className="bg-surface rounded-2xl p-4 border border-border shadow-sm flex-row items-center">
            <View className="bg-teal/10 p-3 rounded-xl mr-4">
              <Ionicons name="map" size={28} color={APP_COLORS.green.DEFAULT} />
            </View>
            <View className="flex-1">
              <Text className="text-base font-bold text-primary">Mapa del Recorrido</Text>
              <Text className="text-xs text-muted mt-1">Guía interactiva con puntos de interés.</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={APP_COLORS.disabled} />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
