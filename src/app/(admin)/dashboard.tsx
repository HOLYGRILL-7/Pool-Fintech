import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  Bell,
  TrendingUp,
  Wallet,
  UserPlus,
  Users,
  PlusCircle,
  ChevronRight,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle,
  XCircle,
  Zap,
  BarChart2,
  Shield,
} from 'lucide-react-native';

// ─── Types ───────────────────────────────────────────────────────────────────

type RequestStatus = 'pending' | 'accepted';

interface MemberRequest {
  id: string;
  name: string;
  initials: string;
  action: string;
  status: RequestStatus;
  color: string;
}

interface Activity {
  id: string;
  icon: 'wallet' | 'userplus' | 'arrowdown';
  label: string;
  sub: string;
  amount?: string;
  amountPositive?: boolean;
  time: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const REQUESTS: MemberRequest[] = [
  {
    id: '1',
    name: 'Marcus Chen',
    initials: 'MC',
    action: 'Wants to join Tech Founders',
    status: 'pending',
    color: '#F59E0B',
  },
  {
    id: '2',
    name: 'Elena Rodriguez',
    initials: 'ER',
    action: 'Joined 2 days ago',
    status: 'accepted',
    color: '#2ECC71',
  },
  {
    id: '3',
    name: 'James Okafor',
    initials: 'JO',
    action: 'Wants to join Founders Ring',
    status: 'pending',
    color: '#F59E0B',
  },
];

const ACTIVITIES: Activity[] = [
  {
    id: '1',
    icon: 'wallet',
    label: 'Contribution Received',
    sub: 'Sarah · Tech Founders',
    amount: '+$500',
    amountPositive: true,
    time: '2h ago',
  },
  {
    id: '2',
    icon: 'userplus',
    label: 'New Member Joined',
    sub: 'Sarah joined Tech Founders',
    time: 'Yesterday',
  },
  {
    id: '3',
    icon: 'arrowdown',
    label: 'Payout Sent',
    sub: 'Marcus · Founders Ring',
    amount: '-$1,200',
    amountPositive: false,
    time: '2 days ago',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function AdminDashboardScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'requests' | 'pending'>('requests');

  const filteredRequests =
    activeTab === 'requests'
      ? REQUESTS
      : REQUESTS.filter((r) => r.status === 'pending');

  const activityIcon = (icon: Activity['icon'], size: number) => {
    if (icon === 'wallet')
      return <Wallet size={size} color="#2ECC71" />;
    if (icon === 'userplus')
      return <UserPlus size={size} color="#8BA89E" />;
    return <ArrowDownLeft size={size} color="#F59E0B" />;
  };

  const activityCircleStyle = (icon: Activity['icon']) => {
    if (icon === 'wallet') return styles.actIconGreen;
    if (icon === 'userplus') return styles.actIconGray;
    return styles.actIconAmber;
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#0D1F1A" />

      {/* ── Header ── */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarRing}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>PA</Text>
            </View>
          </View>
          <View>
            <Text style={styles.headerGreeting}>Good morning 👋</Text>
            <Text style={styles.headerName}>Pool Admin</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.bellWrap} activeOpacity={0.7}>
          <Bell size={20} color="#FFFFFF" />
          <View style={styles.badgeDot} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* ── Hero Card ── */}
        <View style={styles.heroCard}>
          {/* Decorative accent blobs */}
          <View style={styles.heroBlob1} />
          <View style={styles.heroBlob2} />

          <Text style={styles.heroEyebrow}>TOTAL POOL VALUE</Text>
          <Text style={styles.heroAmount}>$12,450.00</Text>

          <View style={styles.heroRow}>
            <View style={styles.heroTrend}>
              <TrendingUp size={14} color="#2ECC71" />
              <Text style={styles.heroTrendText}>+4.2% this month</Text>
            </View>
            <TouchableOpacity
              style={styles.heroViewBtn}
              activeOpacity={0.8}
              onPress={() => router.push('/(admin)/records')}
            >
              <Text style={styles.heroViewBtnText}>Full report</Text>
              <ChevronRight size={12} color="#F59E0B" />
            </TouchableOpacity>
          </View>

          {/* Pool health bar */}
          <View style={styles.healthBarContainer}>
            <View style={styles.healthBarBg}>
              <View style={[styles.healthBarFill, { width: '72%' }]} />
            </View>
            <Text style={styles.healthBarLabel}>Pool health · 72%</Text>
          </View>
        </View>

        {/* ── KPI Stat Row ── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.kpiRow}
        >
          <View style={[styles.kpiCard, { borderTopColor: '#2ECC71' }]}>
            <View style={[styles.kpiIconWrap, { backgroundColor: '#1A3D2A' }]}>
              <Wallet size={16} color="#2ECC71" />
            </View>
            <Text style={styles.kpiValue}>$3,210</Text>
            <Text style={styles.kpiLabel}>Balance</Text>
          </View>

          <View style={[styles.kpiCard, { borderTopColor: '#F59E0B' }]}>
            <View style={[styles.kpiIconWrap, { backgroundColor: '#2C2010' }]}>
              <Clock size={16} color="#F59E0B" />
            </View>
            <Text style={styles.kpiValue}>Oct 24</Text>
            <Text style={styles.kpiLabel}>Due Date</Text>
          </View>

          <View style={[styles.kpiCard, { borderTopColor: '#818CF8' }]}>
            <View style={[styles.kpiIconWrap, { backgroundColor: '#1E1E3A' }]}>
              <Users size={16} color="#818CF8" />
            </View>
            <Text style={styles.kpiValue}>14</Text>
            <Text style={styles.kpiLabel}>Members</Text>
          </View>

          <View style={[styles.kpiCard, { borderTopColor: '#EC4899' }]}>
            <View style={[styles.kpiIconWrap, { backgroundColor: '#2A1020' }]}>
              <BarChart2 size={16} color="#EC4899" />
            </View>
            <Text style={styles.kpiValue}>3</Text>
            <Text style={styles.kpiLabel}>Active Pools</Text>
          </View>
        </ScrollView>

        {/* ── Quick Actions ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity
              style={[styles.actionTile, { backgroundColor: '#1A3D2A' }]}
              activeOpacity={0.8}
              onPress={() => router.push('/(admin)/create-group')}
            >
              <View style={[styles.actionIcon, { backgroundColor: '#225035' }]}>
                <PlusCircle size={22} color="#2ECC71" />
              </View>
              <Text style={styles.actionLabel}>Create Pool</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionTile, { backgroundColor: '#2C2010' }]}
              activeOpacity={0.8}
              onPress={() => router.push('/(admin)/requests')}
            >
              <View style={[styles.actionIcon, { backgroundColor: '#3D2E10' }]}>
                <UserPlus size={22} color="#F59E0B" />
              </View>
              <Text style={styles.actionLabel}>Invite Member</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionTile, { backgroundColor: '#1E1E3A' }]}
              activeOpacity={0.8}
              onPress={() => router.push('/(admin)/records')}
            >
              <View style={[styles.actionIcon, { backgroundColor: '#272748' }]}>
                <ArrowUpRight size={22} color="#818CF8" />
              </View>
              <Text style={styles.actionLabel}>Records</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionTile, { backgroundColor: '#2A1020' }]}
              activeOpacity={0.8}
              onPress={() => router.push('/(admin)/records')}
            >
              <View style={[styles.actionIcon, { backgroundColor: '#3A1530' }]}>
                <Zap size={22} color="#EC4899" />
              </View>
              <Text style={styles.actionLabel}>Nudge All</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Member Requests ── */}
        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Member Requests</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.push('/(admin)/requests')}
            >
              <Text style={styles.viewAll}>View all</Text>
            </TouchableOpacity>
          </View>

          {/* Filter chips */}
          <View style={styles.chipRow}>
            <TouchableOpacity
              style={[styles.chip, activeTab === 'requests' && styles.chipActive]}
              activeOpacity={0.8}
              onPress={() => setActiveTab('requests')}
            >
              <Text
                style={[
                  styles.chipText,
                  activeTab === 'requests' && styles.chipTextActive,
                ]}
              >
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.chip, activeTab === 'pending' && styles.chipActive]}
              activeOpacity={0.8}
              onPress={() => setActiveTab('pending')}
            >
              <Text
                style={[
                  styles.chipText,
                  activeTab === 'pending' && styles.chipTextActive,
                ]}
              >
                Pending
              </Text>
            </TouchableOpacity>
          </View>

          {filteredRequests.map((req) => (
            <View key={req.id} style={styles.requestCard}>
              <View
                style={[
                  styles.initialsCircle,
                  { borderColor: req.color },
                ]}
              >
                <Text style={[styles.initialsText, { color: req.color }]}>
                  {req.initials}
                </Text>
              </View>

              <View style={styles.requestInfo}>
                <Text style={styles.requestName}>{req.name}</Text>
                <Text style={styles.requestSub}>{req.action}</Text>
              </View>

              {req.status === 'pending' ? (
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={styles.approveBtn}
                    activeOpacity={0.8}
                    onPress={() => router.push('/(admin)/requests')}
                  >
                    <CheckCircle size={16} color="#2ECC71" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.rejectBtn}
                    activeOpacity={0.8}
                    onPress={() => router.push('/(admin)/requests')}
                  >
                    <XCircle size={16} color="#DC2626" />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.acceptedBadge}>
                  <Shield size={12} color="#2ECC71" />
                  <Text style={styles.acceptedBadgeText}>Approved</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* ── Recent Activity ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>

          {ACTIVITIES.map((act, idx) => (
            <View
              key={act.id}
              style={[
                styles.activityRow,
                idx < ACTIVITIES.length - 1 && styles.activityDivider,
              ]}
            >
              <View style={[styles.actIconBase, activityCircleStyle(act.icon)]}>
                {activityIcon(act.icon, 18)}
              </View>

              <View style={styles.actText}>
                <Text style={styles.actLabel}>{act.label}</Text>
                <Text style={styles.actSub}>{act.sub}</Text>
              </View>

              <View style={styles.actRight}>
                {act.amount && (
                  <Text
                    style={[
                      styles.actAmount,
                      { color: act.amountPositive ? '#2ECC71' : '#F59E0B' },
                    ]}
                  >
                    {act.amount}
                  </Text>
                )}
                <Text style={styles.actTime}>{act.time}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* ── Nudge CTA ── */}
        <TouchableOpacity
          style={styles.nudgeBtn}
          activeOpacity={0.9}
          onPress={() => router.push('/(admin)/records')}
        >
          <Zap size={18} color="#0D1F1A" style={{ marginRight: 8 }} />
          <Text style={styles.nudgeBtnText}>Nudge All Unpaid Members</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0D1F1A',
  },

  // ── Header ──
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarRing: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 2,
    borderColor: '#2ECC71',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#1A3D2A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#2ECC71',
    fontSize: 13,
    fontWeight: '800',
  },
  headerGreeting: {
    fontSize: 12,
    color: '#8BA89E',
    fontWeight: '500',
  },
  headerName: {
    fontSize: 17,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  bellWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#162820',
    borderWidth: 1,
    borderColor: '#1E3328',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeDot: {
    position: 'absolute',
    top: 8,
    right: 9,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F59E0B',
    borderWidth: 1.5,
    borderColor: '#0D1F1A',
  },

  scroll: {
    paddingBottom: 40,
  },

  // ── Hero Card ──
  heroCard: {
    backgroundColor: '#162820',
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#1E3328',
    overflow: 'hidden',
  },
  heroBlob1: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#2ECC71',
    opacity: 0.06,
    top: -50,
    right: -40,
  },
  heroBlob2: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F59E0B',
    opacity: 0.07,
    bottom: -30,
    left: 20,
  },
  heroEyebrow: {
    fontSize: 10,
    fontWeight: '700',
    color: '#8BA89E',
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  heroAmount: {
    fontSize: 38,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 14,
    letterSpacing: -0.5,
  },
  heroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  heroTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#1A3D2A',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  heroTrendText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2ECC71',
  },
  heroViewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  heroViewBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#F59E0B',
  },
  healthBarContainer: {
    gap: 6,
  },
  healthBarBg: {
    height: 6,
    backgroundColor: '#1E3328',
    borderRadius: 3,
  },
  healthBarFill: {
    height: 6,
    backgroundColor: '#2ECC71',
    borderRadius: 3,
  },
  healthBarLabel: {
    fontSize: 11,
    color: '#8BA89E',
    fontWeight: '500',
  },

  // ── KPI Row ──
  kpiRow: {
    paddingHorizontal: 20,
    gap: 12,
    paddingBottom: 4,
    marginBottom: 20,
  },
  kpiCard: {
    backgroundColor: '#162820',
    borderRadius: 14,
    padding: 16,
    width: 110,
    borderWidth: 1,
    borderColor: '#1E3328',
    borderTopWidth: 3,
    gap: 6,
  },
  kpiIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  kpiValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  kpiLabel: {
    fontSize: 11,
    color: '#8BA89E',
    fontWeight: '500',
  },

  // ── Sections ──
  section: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 14,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  viewAll: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2ECC71',
  },

  // ── Quick Actions ──
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionTile: {
    width: '47%',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1E3328',
    gap: 10,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // ── Filter Chips ──
  chipRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  chip: {
    paddingVertical: 7,
    paddingHorizontal: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1E3328',
    backgroundColor: '#162820',
  },
  chipActive: {
    backgroundColor: '#F59E0B',
    borderColor: '#F59E0B',
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8BA89E',
  },
  chipTextActive: {
    color: '#0D1F1A',
  },

  // ── Request Cards ──
  requestCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#162820',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#1E3328',
    gap: 12,
  },
  initialsCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1E3328',
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  initialsText: {
    fontSize: 13,
    fontWeight: '800',
  },
  requestInfo: {
    flex: 1,
  },
  requestName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  requestSub: {
    fontSize: 12,
    color: '#8BA89E',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  approveBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1A3D2A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rejectBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2A1010',
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#1A3D2A',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  acceptedBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2ECC71',
  },

  // ── Activity Feed ──
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 12,
  },
  activityDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#1E3328',
  },
  actIconBase: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  actIconGreen: { backgroundColor: '#1A3D2A' },
  actIconGray: { backgroundColor: '#1E3328' },
  actIconAmber: { backgroundColor: '#2C2010' },
  actText: {
    flex: 1,
  },
  actLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  actSub: {
    fontSize: 12,
    color: '#8BA89E',
  },
  actRight: {
    alignItems: 'flex-end',
    gap: 2,
  },
  actAmount: {
    fontSize: 15,
    fontWeight: '700',
  },
  actTime: {
    fontSize: 11,
    color: '#8BA89E',
  },

  // ── Nudge CTA ──
  nudgeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2ECC71',
    borderRadius: 14,
    height: 54,
    marginHorizontal: 20,
    marginTop: 4,
  },
  nudgeBtnText: {
    color: '#0D1F1A',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
});