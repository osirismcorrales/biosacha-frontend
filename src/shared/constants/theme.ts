import { Platform } from 'react-native';
// @ts-ignore
import { ACTIVE_PALETTE } from './palette';

export const APP_COLORS = {
  base:     ACTIVE_PALETTE.base,
  surface:  ACTIVE_PALETTE.surface,
  elevated: ACTIVE_PALETTE.elevated,
  sunken:   ACTIVE_PALETTE.sunken,
  border:   ACTIVE_PALETTE.border,

  primary:   ACTIVE_PALETTE.textColor.primary,
  secondary: ACTIVE_PALETTE.textColor.secondary,
  muted:     ACTIVE_PALETTE.textColor.muted,
  disabled:  ACTIVE_PALETTE.textColor.disabled,

  green:   ACTIVE_PALETTE.green,
  sky:     ACTIVE_PALETTE.sky,
  gold:    ACTIVE_PALETTE.gold,
  danger:  ACTIVE_PALETTE.danger,
  warning: ACTIVE_PALETTE.warning,
};

export const Colors = {
  light: {
    text: APP_COLORS.primary,
    background: APP_COLORS.base,
    tint: APP_COLORS.green.DEFAULT,
    icon: APP_COLORS.muted,
    tabIconDefault: APP_COLORS.muted,
    tabIconSelected: APP_COLORS.green.DEFAULT,
  },
  dark: {
    text: APP_COLORS.primary,
    background: APP_COLORS.base,
    tint: APP_COLORS.green.DEFAULT,
    icon: APP_COLORS.muted,
    tabIconDefault: APP_COLORS.muted,
    tabIconSelected: APP_COLORS.green.DEFAULT,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
});
