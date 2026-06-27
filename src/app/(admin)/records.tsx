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
  Menu,
  Bell,
  UserCircle,
  FileText,
  SlidersHorizontal,
  Download,
  Receipt,
} from 'lucide-react-native';

// ─── Mock Data ───────────────────────────────────────────────────────────────

const MOCK_RECORDS = [
  { id: '1', name: 'Marcus Chen',  date: 'Oct 24, 2023', amount: '$500.00',  status: 'Paid' },
  { id: '2', name: 'Sarah Jenkins', date: 'Oct 23, 2023', amount: '$750.00',  status: 'Paid' },
  { id: '3', name: 'David Wilson',  date: 'Oct 22, 2023', amount: '$500.00',  status: 'Paid' },
];

const REPORT_CARDS = [
  { id: 'contribution', label: 'Contribution' },
  { id: 'requests',     label: 'Requests' },
  { id: 'members',      label: 'Members' },
];

// ─── Helper: Avatar initials ──────────────────────────────────────────────────

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function RecordsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'Paid' | 'Unpaid'>('Paid');

  const filteredRecords = MOCK_RECORDS.filter(
    (r) => r.status === activeTab
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIcon} activeOpacity={0.7} onPress={() => router.push('/(admin)/dashboard')}>
          <Menu size={24} color="#0A1628" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Records</Text>

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon} activeOpacity={0.7}>
            <Bell size={22} color="#0A1628" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon} activeOpacity={0.7} onPress={() => router.push('/(admin)/profile')}>
            <UserCircle size={26} color="#0A1628" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Scrollable Body ── */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Stat Cards ── */}
        <View style={styles.statsRow}>
          {/* Total Collected */}
          <View style={[styles.statCard, styles.greenLeftBorder]}>
            <Text style={styles.statLabel}>Total Collected</Text>
            <Text style={[styles.statAmount, styles.greenText]}>$12,450.00</Text>
          </View>

          {/* Remaining */}
          <View style={[styles.statCard, styles.redLeftBorder]}>
            <Text style={styles.statLabel}>Remaining</Text>
            <Text style={[styles.statAmount, styles.redText]}>$3,200.00</Text>
          </View>
        </View>

        {/* ── Paid / Unpaid Toggle ── */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.togglePill,
              activeTab === 'Paid' && styles.togglePillActive,
            ]}
            activeOpacity={0.85}
            onPress={() => setActiveTab('Paid')}
          >
            <Text
              style={[
                styles.toggleText,
                activeTab === 'Paid' && styles.toggleTextActive,
              ]}
            >
              Paid
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.togglePill,
              activeTab === 'Unpaid' && styles.togglePillActive,
            ]}
            activeOpacity={0.85}
            onPress={() => setActiveTab('Unpaid')}
          >
            <Text
              style={[
                styles.toggleText,
                activeTab === 'Unpaid' && styles.toggleTextActive,
              ]}
            >
              Unpaid
            </Text>
          </TouchableOpacity>
        </View>

        {/* ── Payment Cards ── */}
        <View style={styles.listContainer}>
          {filteredRecords.length > 0 ? (
            filteredRecords.map((record) => (
              <View
                key={record.id}
                style={[styles.paymentCard, styles.greenLeftBorder]}
              >
                {/* Avatar */}
                <View style={styles.avatarCircle}>
                  <Text style={styles.avatarText}>
                    {getInitials(record.name)}
                  </Text>
                </View>

                {/* Name & Date */}
                <View style={styles.cardInfo}>
                  <Text style={styles.memberName}>{record.name}</Text>
                  <Text style={styles.memberDate}>{record.date}</Text>
                </View>

                {/* Amount & Status Pill */}
                <View style={styles.cardRight}>
                  <Text style={styles.amountText}>{record.amount}</Text>
                  <View style={styles.paidPill}>
                    <Receipt size={12} color="#0D9488" style={styles.pillIcon} />
                    <Text style={styles.paidPillText}>{record.status}</Text>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No {activeTab.toLowerCase()} records</Text>
            </View>
          )}
        </View>

        {/* ── Reports Section ── */}
        <View style={styles.reportsHeader}>
          <View style={styles.reportsHeaderLeft}>
            <FileText size={20} color="#0A1628" style={styles.reportsIcon} />
            <SlidersHorizontal size={20} color="#0A1628" />
          </View>
          <Text style={styles.reportsTitle}>Reports</Text>
        </View>

        {/* 2-column report card grid */}
        <View style={styles.reportsGrid}>
          {REPORT_CARDS.map((card) => (
            <TouchableOpacity
              key={card.id}
              style={styles.reportCard}
              activeOpacity={0.8}
              onPress={() => {
                if (card.id === 'contribution') router.push('/(admin)/dashboard');
                else if (card.id === 'requests') router.push('/(admin)/requests');
                else if (card.id === 'members') router.push('/(admin)/create-group' as any);
              }}
            >
              <Text style={styles.reportCardLabel}>{card.label}</Text>
              <Download size={18} color="#0D9488" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
    paddingBottom: 48,
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

  // ── Stat Cards ──
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginTop: 16,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  greenLeftBorder: {
    borderLeftWidth: 4,
    borderLeftColor: '#0D9488',
  },
  redLeftBorder: {
    borderLeftWidth: 4,
    borderLeftColor: '#DC2626',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 6,
  },
  statAmount: {
    fontSize: 18,
    fontWeight: '800',
  },
  greenText: {
    color: '#0D9488',
  },
  redText: {
    color: '#DC2626',
  },

  // ── Toggle ──
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    borderRadius: 50,
    marginHorizontal: 16,
    marginBottom: 20,
    padding: 4,
  },
  togglePill: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  togglePillActive: {
    backgroundColor: '#0A1628',
  },
  toggleText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6B7280',
  },
  toggleTextActive: {
    color: '#FFFFFF',
  },

  // ── Payment Cards ──
  listContainer: {
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 24,
  },
  paymentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  avatarCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#475569',
  },
  cardInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0A1628',
    marginBottom: 3,
  },
  memberDate: {
    fontSize: 13,
    color: '#6B7280',
  },
  cardRight: {
    alignItems: 'flex-end',
    gap: 6,
  },
  amountText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0A1628',
  },
  paidPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1FAE5',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 10,
    gap: 4,
  },
  pillIcon: {
    marginRight: 2,
  },
  paidPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0D9488',
  },

  // ── Empty state ──
  emptyContainer: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#9CA3AF',
  },

  // ── Reports ──
  reportsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  reportsHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  reportsIcon: {
    marginRight: 2,
  },
  reportsTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0A1628',
  },
  reportsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
  },
  reportCard: {
    // 2-column: subtract 16px padding each side + 12px gap, divided by 2
    width: '47.5%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  reportCardLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0A1628',
  },
});
