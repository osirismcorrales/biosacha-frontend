import { APP_COLORS } from '@shared/constants/theme';
import React from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { ConservationBadge } from '@shared/components/ui/ConservationBadge';
import { SpeciesCardDTO } from '@features/species/types';
import { Rarity } from '@shared/types';

interface Props {
  species: SpeciesCardDTO & { stars?: number };
  onPress?: () => void;
  isList?: boolean;
}

// ── Rarity config ────────────────────────────────────────────────────────────
const RARITY: Record<Rarity, { label: string; bg: string; imgBg: string; badge: string; text: string }> = {
  COMMON:    { label: 'COMÚN',     bg: '#1F5C34', imgBg: '#27744080', badge: '#27744',  text: '#FFFFFF' },
  UNCOMMON:  { label: 'POCO COMÚN',bg: '#1A5230', imgBg: '#246A3A80', badge: '#246A3A', text: '#FFFFFF' },
  RARE:      { label: 'RARO',      bg: '#7A4800', imgBg: '#A0600080', badge: '#C07800', text: '#FFFFFF' },
  EPIC:      { label: 'ÉPICO',     bg: '#3D1F7A', imgBg: '#5A30A080', badge: '#7B5FD4', text: '#FFFFFF' },
  LEGENDARY: { label: 'LEGENDARIO',bg: '#6A4A00', imgBg: '#8A6A0080', badge: '#D4A010', text: '#FFFFFF' },
};

function Stars({ count, total = 3, size = 11 }: { count: number; total?: number; size?: number }) {
  return (
    <View style={{ flexDirection: 'row', gap: 3 }}>
      {Array.from({ length: total }).map((_, i) => (
        <Ionicons
          key={i}
          name={i < count ? 'star' : 'star-outline'}
          size={size}
          color={i < count ? APP_COLORS.gold : 'rgba(255,255,255,0.3)'}
        />
      ))}
    </View>
  );
}

function RarityLabel({ rarity }: { rarity: Rarity }) {
  const cfg = RARITY[rarity];
  return (
    <View style={{ backgroundColor: cfg.badge, borderRadius: 6, paddingHorizontal: 7, paddingVertical: 3 }}>
      <Text style={{ color: '#fff', fontSize: 9, fontWeight: '900', letterSpacing: 0.8 }}>
        {cfg.label}
      </Text>
    </View>
  );
}

// ── LIST VARIANT ─────────────────────────────────────────────────────────────
function ListCard({ species, onPress }: { species: Props['species']; onPress?: () => void }) {
  const cfg = RARITY[species.rarity];
  const locked = !species.mainImageUrl;
  const stars = species.stars ?? 0;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        flexDirection: 'row',
        borderRadius: 18,
        overflow: 'hidden',
        marginBottom: 12,
        backgroundColor: cfg.bg,
        shadowColor: '#000',
        shadowOpacity: 0.18,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 4,
      }}
    >
      {/* Thumb */}
      <View style={{ width: 96, height: 96, backgroundColor: cfg.imgBg, alignItems: 'center', justifyContent: 'center' }}>
        {locked ? (
          <Ionicons name="lock-closed" size={30} color="rgba(255,255,255,0.4)" />
        ) : (
          <Image source={{ uri: species.mainImageUrl }} style={{ width: '100%', height: '100%' }} contentFit="cover" transition={200} />
        )}
        {/* rarity pill bottom of thumb */}
        <View style={{ position: 'absolute', bottom: 6, left: 6 }}>
          <RarityLabel rarity={species.rarity} />
        </View>
      </View>

      {/* Text */}
      <View style={{ flex: 1, paddingHorizontal: 14, paddingVertical: 12, justifyContent: 'center', gap: 3 }}>
        <Text style={{ color: '#fff', fontSize: 15, fontWeight: '800', letterSpacing: -0.2 }} numberOfLines={1}>
          {locked ? '???' : species.commonName}
        </Text>
        <Text style={{ color: 'rgba(255,255,255,0.65)', fontSize: 11, fontStyle: 'italic' }} numberOfLines={1}>
          {locked ? 'Especie sin descubrir' : species.scientificName}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 }}>
          {!locked && <ConservationBadge status={species.conservationStatus} />}
          {!locked && (
            <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 9, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.8 }}>
              {species.family}
            </Text>
          )}
        </View>
        <Stars count={locked ? 0 : stars} size={13} />
      </View>
    </TouchableOpacity>
  );
}

// ── GRID VARIANT ──────────────────────────────────────────────────────────────
function GridCard({ species, onPress }: { species: Props['species']; onPress?: () => void }) {
  const { width } = useWindowDimensions();
  const isSmall = width < 375;
  const CARD_W = isSmall ? (width - 40) / 2 : (width - 48) / 2;
  const IMG_H = CARD_W * 0.78;

  const cfg = RARITY[species.rarity];
  const locked = !species.mainImageUrl;
  const stars = species.stars ?? 0;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        width: CARD_W,
        borderRadius: 18,
        overflow: 'hidden',
        marginBottom: 12,
        backgroundColor: cfg.bg,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 5,
      }}
    >
      {/* Image area */}
      <View style={{ height: IMG_H, backgroundColor: cfg.imgBg, alignItems: 'center', justifyContent: 'center' }}>
        {locked ? (
          <Ionicons name="lock-closed" size={38} color="rgba(255,255,255,0.35)" />
        ) : (
          <Image
            source={{ uri: species.mainImageUrl }}
            style={{ width: '100%', height: '100%' }}
            contentFit="contain"
            transition={200}
          />
        )}

        {/* Rarity badge – top left */}
        <View style={{ position: 'absolute', top: 8, left: 8 }}>
          <RarityLabel rarity={species.rarity} />
        </View>

        {/* Stars – top right */}
        <View style={{
          position: 'absolute', top: 8, right: 8,
          backgroundColor: 'rgba(0,0,0,0.35)',
          borderRadius: 20, paddingHorizontal: 6, paddingVertical: 4,
          flexDirection: 'row', gap: 2,
        }}>
          <Stars count={locked ? 0 : stars} size={10} />
        </View>
      </View>

      {/* Info */}
      <View style={{ paddingHorizontal: 11, paddingTop: 9, paddingBottom: 12, gap: 2 }}>
        <Text
          style={{ color: '#fff', fontSize: isSmall ? 11 : 13, fontWeight: '800', letterSpacing: -0.2 }}
          numberOfLines={1}
        >
          {locked ? '???' : species.commonName}
        </Text>
        <Text
          style={{ color: 'rgba(255,255,255,0.6)', fontSize: isSmall ? 9 : 10, fontStyle: 'italic' }}
          numberOfLines={1}
        >
          {locked ? 'Especie sin descubrir' : species.scientificName}
        </Text>
        {!locked && (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 3, flexWrap: 'wrap' }}>
            <ConservationBadge status={species.conservationStatus} />
            <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 8, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.7 }}>
              {species.family}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

// ── Public export ─────────────────────────────────────────────────────────────
export function SpeciesCard({ species, onPress, isList }: Props) {
  return isList
    ? <ListCard species={species} onPress={onPress} />
    : <GridCard species={species} onPress={onPress} />;
}
