import { useWindowDimensions } from 'react-native';

export function useResponsive() {
  const { width, height } = useWindowDimensions();
  const isSmall = width < 375;
  const isMedium = width >= 375 && width < 414;
  const isLarge = width >= 414;
  const isPortrait = height > width;

  return {
    width,
    height,
    isSmall,
    isMedium,
    isLarge,
    isPortrait,
  };
}