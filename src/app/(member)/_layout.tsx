import { Tabs } from 'expo-router';
import { LayoutDashboard, Compass, Users, User } from 'lucide-react-native';

export default function MemberLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#F59E0B',
        tabBarInactiveTintColor: '#8BA89E',
        tabBarStyle: { backgroundColor: '#0D1F1A', borderTopColor: '#1E3328', borderTopWidth: 1 },
      }}
    >
      <Tabs.Screen
        name="groups"
        options={{
          title: 'My Pools',
          tabBarIcon: ({ color, size }) => (
            <Users color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <LayoutDashboard color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="discovery"
        options={{
          title: 'Discovery',
          tabBarIcon: ({ color, size }) => (
            <Compass color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <User color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="contribute"
        options={{ href: null }}
      />
    </Tabs>
  );
}