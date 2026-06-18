/** @type {import('tailwindcss').Config} */
const { ACTIVE_PALETTE } = require('./src/shared/constants/palette.js');

module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        base:     ACTIVE_PALETTE.base,
        surface:  ACTIVE_PALETTE.surface,
        elevated: ACTIVE_PALETTE.elevated,
        sunken:   ACTIVE_PALETTE.sunken,
        border:   ACTIVE_PALETTE.border,

        green:    ACTIVE_PALETTE.green,
        teal:     ACTIVE_PALETTE.green, // Alias por compatibilidad
        sky:      ACTIVE_PALETTE.sky,
        
        gold:     ACTIVE_PALETTE.gold,
        danger:   ACTIVE_PALETTE.danger,
        warning:  ACTIVE_PALETTE.warning,
        
        // Colores de rareza explícitos
        common:    { DEFAULT: ACTIVE_PALETTE.green.DEFAULT, bg: ACTIVE_PALETTE.surface, border: ACTIVE_PALETTE.border },
        rare:      { DEFAULT: '#D4880A', bg: '#FFF0D0', border: '#F5A623' },
        epic:      { DEFAULT: '#7B5FD4', bg: '#EAE0FF', border: '#A090E8' },
        legendary: { DEFAULT: '#D4A010', bg: '#FFF8D0', border: '#E8C020' },
      },
      textColor: {
        primary:   ACTIVE_PALETTE.textColor.primary,
        secondary: ACTIVE_PALETTE.textColor.secondary,
        muted:     ACTIVE_PALETTE.textColor.muted,
        disabled:  ACTIVE_PALETTE.textColor.disabled,
      },
      fontFamily: {
        sans: ["PlusJakartaSans_400Regular"],
        medium: ["PlusJakartaSans_500Medium"],
        mono: ["ui-monospace"],
      },
      borderRadius: {
        sm:  "8px",
        md:  "10px",
        lg:  "14px",
        xl:  "20px",
        "2xl": "24px",
      },
    },
  },
  plugins: [],
};
