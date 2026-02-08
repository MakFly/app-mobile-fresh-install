import { useColorScheme as useRNColorScheme } from 'react-native';

export function useColorScheme() {
  const scheme = useRNColorScheme();
  return {
    colorScheme: scheme ?? 'light',
    isDark: scheme === 'dark',
  } as const;
}
