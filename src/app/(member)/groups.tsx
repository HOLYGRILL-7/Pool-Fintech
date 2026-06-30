import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Bell,
  TrendingUp,
  Users,
  Briefcase,
  Plane,
  HeartHandshake,
  GraduationCap,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react-native';

// ─── Mock Data ────────────────────────────────────────────────────────────────

interface Group {
  id: string;
  name: string;
  status: 'Active' | 'Pending' | 'Overdue';
  statusColor: string;
  members: string;
  detail: string;
  borderColor: string;
  iconBg: string;
  iconColor: string;
  icon: 'Users' | 'Briefcase' | 'Plane' | 'HeartHandshake' | 'GraduationCap';
}

const MOCK_GROUPS: Group[] = [
  {
    id: '1',
    name: 'Family Savings',
    status: 'Active',
    statusColor: '#0D9488',
    members: '5 members',
    detail: 'Next in 4 days',
    borderColor: '#0D9488',
    iconBg: '#D1FAE5',
    iconColor: '#0D9488',
    icon: 'Users',
  },
  {
    id: '2',
    name: 'Tech Founders',
    status: 'Active',
    statusColor: '#0D9488',
    members: '8 members',
    detail: 'Next in 12 days',
    borderColor: '#0D9488',
    iconBg: '#DBEAFE',
    iconColor: '#2563EB',
    icon: 'Briefcase',
  },
  {
    id: '3',
    name: 'Holiday Fund',
    status: 'Pending',
    statusColor: '#F59E0B',
    members: '4 members',
    detail: 'Awaiting start',
    borderColor: '#F59E0B',
    iconBg: '#FEF3C7',
    iconColor: '#F59E0B',
    icon: 'Plane',
  },
  {
    id: '4',
    name: 'Community Support',
    status: 'Overdue',
    statusColor: '#DC2626',
    members: '12 members',
    detail: 'Contribution missed',
    borderColor: '#DC2626',
    iconBg: '#FEE2E2',
    iconColor: '#DC2626',
    icon: 'HeartHandshake',
  },
  {
    id: '5',
    name: 'Education Trust',
    status: 'Active',
    statusColor: '#0D9488',
    members: '3 members',
    detail: 'Monthly cycle',
    borderColor: '#0D9488',
    iconBg: '#D1FAE5',
    iconColor: '#0D9488',
    icon: 'GraduationCap',
  },
];

// ─── Helper to Resolve Icons ─────────────────────────────────────────────────

const getIconComponent = (iconName: Group['icon'], color: string) => {
  const iconProps = { size: 22, color: color };
  switch (iconName) {
    case 'Users':
      return <Users {...iconProps} />;
    case 'Briefcase':
      return <Briefcase {...iconProps} />;
    case 'Plane':
      return <Plane {...iconProps} />;
    case 'HeartHandshake':
      return <HeartHandshake {...iconProps} />;
    case 'GraduationCap':
      return <GraduationCap {...iconProps} />;
    default:
      return <Users {...iconProps} />;
  }
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function MyPoolsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F4F8" />
      
      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Pools</Text>
        <TouchableOpacity style={styles.bellButton} activeOpacity={0.7}>
          <Bell size={24} color="#0A1628" />
        </TouchableOpacity>
      </View>

      {/* ── Scrollable Content ── */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Hero Card ── */}
        <View style={styles.heroCard}>
          <ShieldCheck
            size={110}
            color="#FFFFFF"
            style={styles.heroBgIcon}
          />
          <View style={styles.heroContent}>
            <Text style={styles.heroLabel}>TOTAL CONTRIBUTED ACROSS ALL POOLS</Text>
            <Text style={styles.heroAmount}>$12,450.00</Text>
            <View style={styles.trendingRow}>
              <TrendingUp size={16} color="#0D9488" style={styles.trendingIcon} />
              <Text style={styles.trendingText}>↑ 8.2% from last month</Text>
            </View>
          </View>
        </View>

        {/* ── Section Title ── */}
        <Text style={styles.sectionTitle}>My Pools</Text>

        {/* ── Pools List ── */}
        <View style={styles.listContainer}>
          {MOCK_GROUPS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.card, { borderLeftColor: item.borderColor }]}
              activeOpacity={0.7}
              onPress={() =>
                router.push({
                  pathname: '/(member)/dashboard',
                  params: { groupId: item.id, groupName: item.name },
                })
              }
            >
              <View style={[styles.iconCircle, { backgroundColor: item.iconBg }]}>
                {getIconComponent(item.icon, item.iconColor)}
              </View>
              
              <View style={styles.cardContent}>
                <View style={styles.groupHeaderRow}>
                  <Text style={styles.groupName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <View style={[styles.statusBadge, { backgroundColor: item.iconBg }]}>
                    <View style={[styles.statusDot, { backgroundColor: item.statusColor }]} />
                    <Text style={[styles.statusText, { color: item.statusColor }]}>
                      {item.status}
                    </Text>
                  </View>
                </View>
                <Text style={styles.metaText}>
                  {item.members} • {item.detail}
                </Text>
              </View>

              <ChevronRight size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0A1628',
  },
  bellButton: {
    padding: 4,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  heroCard: {
    backgroundColor: '#0A1628',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 16,
    padding: 20,
    position: 'relative',
    overflow: 'hidden',
    // shadow
    shadowColor: '#0A1628',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  heroBgIcon: {
    position: 'absolute',
    right: -10,
    bottom: -15,
    opacity: 0.06,
  },
  heroContent: {
    zIndex: 1,
  },
  heroLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 1,
    marginBottom: 8,
  },
  heroAmount: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  trendingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendingIcon: {
    marginRight: 4,
  },
  trendingText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0D9488',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0A1628',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 12,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    // shadow
    shadowColor: '#0A1628',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 8,
  },
  groupHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  groupName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0A1628',
    flexShrink: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginLeft: 8,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  metaText: {
    fontSize: 13,
    color: '#6B7280',
  },
});
