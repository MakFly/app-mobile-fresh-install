import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { Bell, ChevronRight, Flame, Sparkles, TrendingUp, Zap } from 'lucide-react-native';
import * as React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const FEATURED = [
  { id: 1, label: 'Design Systems', tag: 'Trending', color: '#FF6B35' },
  { id: 2, label: 'AI Interfaces', tag: 'New', color: '#7C3AED' },
  { id: 3, label: 'Spatial Computing', tag: 'Hot', color: '#0EA5E9' },
];

const QUICK_ACTIONS = [
  { icon: Sparkles, label: 'For You', bg: 'bg-violet-50', color: '#7C3AED' },
  { icon: Flame, label: 'Popular', bg: 'bg-orange-50', color: '#F97316' },
  { icon: TrendingUp, label: 'Rising', bg: 'bg-emerald-50', color: '#10B981' },
  { icon: Zap, label: 'Flash', bg: 'bg-amber-50', color: '#F59E0B' },
];

const FEED = [
  {
    id: 1,
    title: 'The future of mobile design',
    subtitle: 'How spatial interfaces are changing everything',
    time: '2h ago',
    accent: '#7C3AED',
  },
  {
    id: 2,
    title: 'Building with intention',
    subtitle: 'Minimalism meets functionality in 2026',
    time: '4h ago',
    accent: '#0EA5E9',
  },
  {
    id: 3,
    title: 'Color theory reimagined',
    subtitle: 'Dynamic palettes powered by ambient light',
    time: '6h ago',
    accent: '#F97316',
  },
  {
    id: 4,
    title: 'Micro-interactions matter',
    subtitle: 'The invisible details that delight users',
    time: '8h ago',
    accent: '#10B981',
  },
];

export default function DiscoverScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 pt-4 pb-2">
          <View>
            <Text className="text-sm tracking-widest text-neutral-400">SATURDAY</Text>
            <Text className="text-[34px] font-bold tracking-tight text-black">Discover</Text>
          </View>
          <Pressable className="items-center justify-center rounded-full bg-neutral-100 p-2.5">
            <Bell color="#000" size={20} strokeWidth={1.8} />
          </Pressable>
        </View>

        {/* Featured Cards - Horizontal */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, gap: 12 }}
          className="mt-6">
          {FEATURED.map((item) => (
            <Pressable
              key={item.id}
              className="w-64 overflow-hidden rounded-2xl p-5"
              style={{ backgroundColor: item.color }}>
              <View className="mb-10 self-start rounded-full bg-white/20 px-3 py-1">
                <Text className="text-xs font-semibold text-white">{item.tag}</Text>
              </View>
              <Text className="text-2xl font-bold text-white">{item.label}</Text>
              <View className="mt-3 flex-row items-center gap-1">
                <Text className="text-sm font-medium text-white/70">Explore</Text>
                <ChevronRight color="rgba(255,255,255,0.7)" size={14} />
              </View>
            </Pressable>
          ))}
        </ScrollView>

        {/* Quick Actions */}
        <View className="mt-8 flex-row justify-between px-6">
          {QUICK_ACTIONS.map((action) => (
            <Pressable key={action.label} className="items-center gap-2">
              <View className={cn('items-center justify-center rounded-2xl p-4', action.bg)}>
                <action.icon color={action.color} size={22} strokeWidth={1.8} />
              </View>
              <Text className="text-xs font-medium text-neutral-500">{action.label}</Text>
            </Pressable>
          ))}
        </View>

        {/* Feed */}
        <View className="mt-8 px-6 pb-32">
          <Text className="mb-4 text-xl font-bold tracking-tight text-black">Latest</Text>
          <View className="gap-3">
            {FEED.map((item) => (
              <Pressable
                key={item.id}
                className="flex-row items-center gap-4 rounded-2xl bg-neutral-50 p-4">
                <View
                  className="h-12 w-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: item.accent + '15' }}>
                  <View className="h-3 w-3 rounded-full" style={{ backgroundColor: item.accent }} />
                </View>
                <View className="flex-1">
                  <Text className="text-[15px] font-semibold text-black">{item.title}</Text>
                  <Text className="mt-0.5 text-[13px] text-neutral-400">{item.subtitle}</Text>
                </View>
                <Text className="text-xs text-neutral-300">{item.time}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
