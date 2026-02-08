import { cn } from '@/lib/utils';
import { BlurView } from 'expo-blur';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Animated, Platform, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';

export function GlassTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      {/* Outer glow / shadow */}
      <View style={styles.shadowLayer} />

      {/* Glass pill */}
      <BlurView
        intensity={Platform.select({ ios: 80, android: 100 })}
        tint="systemChromeMaterialLight"
        style={styles.blurContainer}>
        {/* Subtle inner border */}
        <View style={styles.innerBorder}>
          <View style={styles.tabsRow}>
            {state.routes.map((route, index) => {
              const { options } = descriptors[route.key];
              const isFocused = state.index === index;

              const onPress = () => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });
                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name, route.params);
                }
              };

              const icon = options.tabBarIcon?.({
                focused: isFocused,
                color: isFocused ? '#000000' : '#A3A3A3',
                size: 22,
              });

              return (
                <TabItem
                  key={route.key}
                  icon={icon}
                  label={options.title ?? route.name}
                  isFocused={isFocused}
                  onPress={onPress}
                />
              );
            })}
          </View>
        </View>
      </BlurView>
    </View>
  );
}

function TabItem({
  icon,
  label,
  isFocused,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  isFocused: boolean;
  onPress: () => void;
}) {
  const scale = React.useRef(new Animated.Value(1)).current;
  const bgOpacity = React.useRef(new Animated.Value(isFocused ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.spring(bgOpacity, {
      toValue: isFocused ? 1 : 0,
      useNativeDriver: true,
      friction: 8,
      tension: 100,
    }).start();
  }, [isFocused]);

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.88,
      useNativeDriver: true,
      friction: 5,
      tension: 200,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      friction: 4,
      tension: 150,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={styles.tabItem}>
      <Animated.View style={[styles.tabItemInner, { transform: [{ scale }] }]}>
        {/* Active background bubble */}
        <Animated.View style={[styles.activeBubble, { opacity: bgOpacity }]} />
        <View style={styles.iconContainer}>{icon}</View>
        <Text
          className={cn(
            'text-[10px] font-semibold',
            isFocused ? 'text-black' : 'text-neutral-400'
          )}>
          {label}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  shadowLayer: {
    ...StyleSheet.absoluteFillObject,
    // No shadow on the container itself — blur does the work
  },
  blurContainer: {
    width: '100%',
    borderRadius: 28,
    overflow: 'hidden',
    // Outer shadow for depth
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.08,
        shadowRadius: 24,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  innerBorder: {
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
    backgroundColor: Platform.select({
      ios: 'rgba(255,255,255,0.35)',
      android: 'rgba(255,255,255,0.85)',
    }),
  },
  tabsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  tabItemInner: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    position: 'relative',
  },
  activeBubble: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.06)',
    borderRadius: 20,
  },
  iconContainer: {
    marginBottom: 2,
  },
});
