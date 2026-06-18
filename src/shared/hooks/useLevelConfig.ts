export type LevelKey = 'SEED' | 'SPROUT' | 'SAPLING' | 'TREE' | 'FOREST';

const levels: Record<LevelKey, { label: string; icon: string }> = {
  SEED:    { label: 'Semilla',  icon: 'leaf-outline' },
  SPROUT:  { label: 'Brote',    icon: 'leaf' },
  SAPLING: { label: 'Plantón',  icon: 'flower-outline' },
  TREE:    { label: 'Árbol',    icon: 'flower' },
  FOREST:  { label: 'Bosque',   icon: 'earth' },
};

export function useLevelConfig(level: string) {
  return levels[level as LevelKey] ?? levels.SEED;
}
