import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  Bell,
  UserCircle,
  CheckCircle,
  Clock,
  XCircle,
  Wallet,
  SlidersHorizontal,
  Plus,
} from 'lucide-react-native';

// ─── Types ────────────────────────────────────────────────────────────────────

type TabKey = 'All' | 'Paid' | 'Pending';

type ContributionStatus = 'paid' | 'processing' | 'overdue';

interface Contribution {
  id: string;
  title: string;
  subtitle: string;
  amount: string;
  status: ContributionStatus;
  borderColor: string;
  iconBg: string;
  iconColor: string;
  icon: 'CheckCircle' | 'Clock' | 'XCircle';
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_CONTRIBUTIONS: Contribution[] = [
  {
    id: '1',
    title: 'Week 1 Contribution',
    subtitle: 'Paid on Oct 04',
    amount: '$625.00',
    status: 'paid',
    borderColor: '#0D9488',
    iconBg: '#D1FAE5',
    iconColor: '#0D9488',
    icon: 'CheckCircle',
  },
  {
    id: '2',
    title: 'Week 2 Contribution',
    subtitle: 'Paid on Oct 11',
    amount: '$625.00',
    status: 'paid',
    borderColor: '#0D9488',
    iconBg: '#D1FAE5',
    iconColor: '#0D9488',
    icon: 'CheckCircle',
  },
  {
    id: '3',
    title: 'Week 3 Contribution',
    subtitle: 'Processing Payment...',
    amount: '$625.00',
    status: 'processing',
    borderColor: '#F59E0B',
    iconBg: '#FEF3C7',
    iconColor: '#F59E0B',
    icon: 'Clock',
  },
  {
    id: '4',
    title: 'Week 4 Contribution',
    subtitle: 'Overdue by 2 days',
    amount: '$625.00',
    status: 'overdue',
    borderColor: '#DC2626',
    iconBg: '#FEE2E2',
    iconColor: '#DC2626',
    icon: 'XCircle',
  },
];

const TABS: TabKey[] = ['All', 'Paid', 'Pending'];

// ─── Helper: resolve icon component ──────────────────────────────────────────

function StatusIcon({
  name,
  size,
  color,
}: {
  name: Contribution['icon'];
  size: number;
  color: string;
}) {
  if (name === 'CheckCircle') return <CheckCircle size={size} color={color} />;
  if (name === 'Clock') return <Clock size={size} color={color} />;
  return <XCircle size={size} color={color} />;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function GroupsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>('All');

  const filteredContributions = MOCK_CONTRIBUTIONS.filter((c) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Paid') return c.status === 'paid';
    // "Pending" covers processing + overdue
    return c.status === 'processing' || c.status === 'overdue';
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIcon} activeOpacity={0.7} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#0A1628" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Contributions</Text>

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon} activeOpacity={0.7}>
            <Bell size={22} color="#0A1628" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.avatarButton} activeOpacity={0.7} onPress={() => router.push('/(member)/profile')}>
            <UserCircle size={34} color="#0A1628" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Scrollable Body ── */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Dark Navy Hero Card ── */}
        <View style={styles.heroCard}>
          <Text style={styles.heroLabel}>ACTIVE GROUP</Text>
          <Text style={styles.heroGroupName}>
            Tech Founders Savings Circle
          </Text>

          <View style={styles.heroStats}>
            {/* Left stat */}
            <View style={styles.heroStatBlock}>
              <Text style={styles.heroStatLabel}>Total Contributed</Text>
              <Text style={styles.heroStatAmount}>$12,450.00</Text>
            </View>

            {/* Right stat */}
            <View style={styles.heroStatBlockRight}>
              <Text style={[styles.heroStatLabel, styles.textRight]}>
                This Month
              </Text>
              <Text style={[styles.heroStatAmount, styles.textRight]}>
                $2,500.00
              </Text>
            </View>
          </View>
        </View>

        {/* ── Underline Tab Row ── */}
        <View style={styles.tabRow}>
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                style={styles.tabItem}
                activeOpacity={0.7}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  style={[
                    styles.tabText,
                    isActive && styles.tabTextActive,
                  ]}
                >
                  {tab}
                </Text>
                {isActive && <View style={styles.tabUnderline} />}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ── Contribution Cards ── */}
        <View style={styles.listContainer}>
          {filteredContributions.map((item) => (
            <View
              key={item.id}
              style={[styles.contributionCard, { borderLeftColor: item.borderColor }]}
            >
              {/* Icon circle */}
              <View style={[styles.iconCircle, { backgroundColor: item.iconBg }]}>
                <StatusIcon
                  name={item.icon}
                  size={22}
                  color={item.iconColor}
                />
              </View>

              {/* Title & subtitle */}
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text
                  style={[
                    styles.cardSubtitle,
                    item.status === 'overdue' && styles.cardSubtitleRed,
                  ]}
                >
                  {item.subtitle}
                </Text>
              </View>

              {/* Amount */}
              <Text style={styles.cardAmount}>{item.amount}</Text>
            </View>
          ))}
        </View>

        {/* ── Make Contribution Button ── */}
        <TouchableOpacity style={styles.makeContribBtn} activeOpacity={0.9} onPress={() => router.push('/(member)/contribute' as any)}>
          <Wallet size={20} color="#FFFFFF" style={styles.walletIcon} />
          <Text style={styles.makeContribText}>Make Contribution</Text>
        </TouchableOpacity>

        {/* ── Transaction History ── */}
        <View style={styles.txHeader}>
          <Text style={styles.txTitle}>Transaction History</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <SlidersHorizontal size={20} color="#0A1628" />
          </TouchableOpacity>
        </View>

        {/* Empty state */}
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No transactions yet</Text>
        </View>
      </ScrollView>

      {/* ── Floating "+" Button ── */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.9} onPress={() => router.push('/(member)/discovery')}>
        <Plus size={26} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  scrollContent: {
    paddingBottom: 100,
  },

  // ── Header ──
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F0F4F8',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#0A1628',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  headerIcon: {
    padding: 4,
  },
  avatarButton: {
    padding: 2,
  },

  // ── Hero Card ──
  heroCard: {
    backgroundColor: '#0A1628',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 14,
    elevation: 6,
  },
  heroLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#9CA3AF',
    letterSpacing: 1,
    marginBottom: 6,
  },
  heroGroupName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 30,
    marginBottom: 20,
  },
  heroStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  heroStatBlock: {
    flex: 1,
  },
  heroStatBlockRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  heroStatLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
    marginBottom: 4,
  },
  heroStatAmount: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  textRight: {
    textAlign: 'right',
  },

  // ── Tabs ──
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tabItem: {
    marginRight: 28,
    paddingBottom: 10,
    position: 'relative',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6B7280',
  },
  tabTextActive: {
    color: '#0A1628',
    fontWeight: '700',
  },
  tabUnderline: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#0A1628',
    borderRadius: 2,
  },

  // ── Contribution Cards ──
  listContainer: {
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 24,
  },
  contributionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderLeftWidth: 4,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0A1628',
    marginBottom: 3,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#6B7280',
  },
  cardSubtitleRed: {
    color: '#DC2626',
  },
  cardAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0A1628',
  },

  // ── Make Contribution Button ──
  makeContribBtn: {
    backgroundColor: '#0A1628',
    borderRadius: 14,
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginBottom: 28,
    shadowColor: '#0A1628',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  walletIcon: {
    marginRight: 10,
  },
  makeContribText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  // ── Transaction History ──
  txHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  txTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0A1628',
  },

  // ── Empty State ──
  emptyState: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  emptyText: {
    fontSize: 14,
    color: '#9CA3AF',
  },

  // ── FAB ──
  fab: {
    position: 'absolute',
    bottom: 28,
    right: 24,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#0A1628',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
});
