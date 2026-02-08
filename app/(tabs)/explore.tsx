import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { ArrowUpRight, SlidersHorizontal } from 'lucide-react-native';
import * as React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CATEGORIES = ['All', 'Design', 'Tech', 'Art', 'Music', 'Film'];

const GRID_ITEMS = [
  { id: 1, title: 'Ambient\nDesign', color: '#7C3AED', size: 'large' },
  { id: 2, title: 'Neural\nArt', color: '#0EA5E9', size: 'small' },
  { id: 3, title: 'Sound\nScapes', color: '#F97316', size: 'small' },
  { id: 4, title: 'Motion\nStudy', color: '#10B981', size: 'large' },
  { id: 5, title: 'Type\nLab', color: '#EC4899', size: 'small' },
  { id: 6, title: 'Color\nTheory', color: '#F59E0B', size: 'small' },
];

export default function ExploreScreen() {
  const [activeCategory, setActiveCategory] = React.useState('All');

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 pt-4 pb-2">
          <Text className="text-[34px] font-bold tracking-tight text-black">Explore</Text>
        </View>

        {/* Search */}
        <View className="mt-4 flex-row items-center gap-3 px-6">
          <View className="flex-1">
            <Input
              placeholder="Search anything..."
              className="h-12 rounded-xl border-0 bg-neutral-100 px-4 text-[15px] shadow-none"
              placeholderTextColor="#BCBCBC"
            />
          </View>
          <Pressable className="items-center justify-center rounded-xl bg-black p-3">
            <SlidersHorizontal color="#fff" size={20} strokeWidth={1.8} />
          </Pressable>
        </View>

        {/* Category Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, gap: 8 }}
          className="mt-6">
          {CATEGORIES.map((cat) => (
            <Pressable
              key={cat}
              onPress={() => setActiveCategory(cat)}
              className={cn(
                'rounded-full px-5 py-2.5',
                activeCategory === cat ? 'bg-black' : 'bg-neutral-100'
              )}>
              <Text
                className={cn(
                  'text-sm font-semibold',
                  activeCategory === cat ? 'text-white' : 'text-neutral-400'
                )}>
                {cat}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Bento Grid */}
        <View className="mt-6 flex-row flex-wrap gap-3 px-6 pb-32">
          {GRID_ITEMS.map((item) => (
            <Pressable
              key={item.id}
              className={cn(
                'overflow-hidden rounded-3xl p-5',
                item.size === 'large' ? 'w-full' : 'flex-1'
              )}
              style={{
                backgroundColor: item.color,
                minHeight: item.size === 'large' ? 180 : 160,
                minWidth: item.size === 'small' ? '45%' : undefined,
              }}>
              <View className="flex-1 justify-between">
                <View className="self-end rounded-full bg-white/20 p-2">
                  <ArrowUpRight color="rgba(255,255,255,0.9)" size={16} />
                </View>
                <Text className="text-2xl leading-tight font-bold text-white">{item.title}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
