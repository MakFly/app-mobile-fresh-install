import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import {
  BookOpen,
  ChevronRight,
  CreditCard,
  HelpCircle,
  LogOut,
  Moon,
  Settings,
  Shield,
  Star,
} from 'lucide-react-native';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type MenuItemProps = {
  icon: React.ElementType;
  label: string;
  subtitle?: string;
  color?: string;
  showChevron?: boolean;
  danger?: boolean;
};

const MENU_SECTIONS: { title: string; items: MenuItemProps[] }[] = [
  {
    title: 'Preferences',
    items: [
      { icon: Moon, label: 'Appearance', subtitle: 'Light', color: '#7C3AED' },
      { icon: Star, label: 'Favorites', subtitle: '12 items', color: '#F59E0B' },
      { icon: CreditCard, label: 'Subscription', subtitle: 'Pro Plan', color: '#0EA5E9' },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: BookOpen, label: 'Documentation', color: '#10B981' },
      { icon: HelpCircle, label: 'Help Center', color: '#6B7280' },
      { icon: Shield, label: 'Privacy & Security', color: '#3B82F6' },
      { icon: Settings, label: 'Advanced Settings', color: '#8B5CF6' },
    ],
  },
  {
    title: '',
    items: [{ icon: LogOut, label: 'Sign Out', danger: true, showChevron: false }],
  },
];

function MenuItem({
  icon: Icon,
  label,
  subtitle,
  color,
  showChevron = true,
  danger,
}: MenuItemProps) {
  return (
    <Pressable className="flex-row items-center gap-4 px-6 py-3.5">
      <View
        className={cn(
          'items-center justify-center rounded-xl p-2.5',
          danger ? 'bg-red-50' : 'bg-neutral-50'
        )}
        style={!danger && color ? { backgroundColor: color + '12' } : undefined}>
        <Icon color={danger ? '#EF4444' : (color ?? '#000')} size={18} strokeWidth={1.8} />
      </View>
      <View className="flex-1">
        <Text className={cn('text-[15px] font-medium', danger ? 'text-red-500' : 'text-black')}>
          {label}
        </Text>
      </View>
      {subtitle ? <Text className="text-sm text-neutral-400">{subtitle}</Text> : null}
      {showChevron ? <ChevronRight color="#D4D4D4" size={18} /> : null}
    </Pressable>
  );
}

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="items-center px-6 pt-8 pb-2">
          <View className="mb-4 h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-100 to-violet-50">
            <View className="h-20 w-20 items-center justify-center rounded-full bg-neutral-100">
              <Text className="text-3xl font-bold text-neutral-300">A</Text>
            </View>
          </View>
          <Text className="text-xl font-bold text-black">Alex Johnson</Text>
          <Text className="mt-1 text-sm text-neutral-400">alex@example.com</Text>

          {/* Stats */}
          <View className="mt-6 w-full flex-row rounded-2xl bg-neutral-50 p-4">
            <View className="flex-1 items-center">
              <Text className="text-2xl font-bold text-black">128</Text>
              <Text className="mt-0.5 text-xs text-neutral-400">Projects</Text>
            </View>
            <View className="w-[1px] bg-neutral-200" />
            <View className="flex-1 items-center">
              <Text className="text-2xl font-bold text-black">3.2k</Text>
              <Text className="mt-0.5 text-xs text-neutral-400">Following</Text>
            </View>
            <View className="w-[1px] bg-neutral-200" />
            <View className="flex-1 items-center">
              <Text className="text-2xl font-bold text-black">847</Text>
              <Text className="mt-0.5 text-xs text-neutral-400">Likes</Text>
            </View>
          </View>
        </View>

        {/* Menu Sections */}
        <View className="mt-6 pb-32">
          {MENU_SECTIONS.map((section, idx) => (
            <View key={idx} className="mt-4">
              {section.title ? (
                <Text className="mb-2 px-6 text-xs font-semibold tracking-widest text-neutral-300">
                  {section.title.toUpperCase()}
                </Text>
              ) : null}
              {section.items.map((item) => (
                <MenuItem key={item.label} {...item} />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
