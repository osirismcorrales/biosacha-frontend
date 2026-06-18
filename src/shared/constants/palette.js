// Cambia este valor a 'true' para ver la paleta oscura antigua, o 'false' para la nueva clara.
const USE_OLD_THEME = true;

const OLD_PALETTE = {
  base:     "#F5F9F5",
  surface:  "#FFFFFF",
  elevated: "#EDF5ED",
  sunken:   "#E2EFE2",
  border:   "#C8E0C8",
  green: { DEFAULT: "#2E8B4E", dark: "#1F6B38", light: "#5AB878", subtle: "#D4F0DE" },
  sky: { DEFAULT: "#2B9AC8", subtle: "#D6EEFA" },
  gold:    "#F5A623",
  danger:  "#E85454",
  warning: "#E8A020",
  textColor: {
    primary:   "#1A3A0F",
    secondary: "#3D6B28",
    muted:     "#6B9E50",
    disabled:  "#A8C896",
  }
};

const NEW_PALETTE = {
  base:     '#F0FAF2',
  surface:  '#D0EED8',
  elevated: '#B8E0C4',
  sunken:   '#B8E0C4',
  border:   '#7AC87A',
  green: { DEFAULT: '#3DAA5C', dark: '#2A7A40', light: '#7AC87A', subtle: '#D0EED8' },
  sky: { DEFAULT: '#5B7FD4', subtle: '#EAE0FF' },
  gold:    '#E8C020',
  danger:  '#E84B4B',
  warning: '#F5A623',
  textColor: {
    primary:   '#1A4228',
    secondary: '#2A6A3A',
    muted:     '#3DAA5C',
    disabled:  '#7AC87A',
  }
};

module.exports = {
  USE_OLD_THEME,
  ACTIVE_PALETTE: USE_OLD_THEME ? OLD_PALETTE : NEW_PALETTE
};
