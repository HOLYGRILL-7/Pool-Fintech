import React from 'react';
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
  User,
  Bell,
  TrendingUp,
  Wallet,
  UserPlus,
} from 'lucide-react-native';

export default function AdminDashboardScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      {/* Header Row */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <User size={20} color="#0A1628" />
        </View>
        <Text style={styles.headerTitle}>Platform</Text>
        <TouchableOpacity style={styles.bellButton} activeOpacity={0.7}>
          <Bell size={24} color="#0A1628" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Dark Navy Hero Card */}
        <View style={styles.heroCard}>
          <Text style={styles.heroLabel}>TOTAL CONTRIBUTIONS</Text>
          <Text style={styles.heroAmount}>$12,450.00</Text>
          <View style={styles.heroTrendContainer}>
            <TrendingUp size={16} color="#0D9488" style={styles.trendIcon} />
            <Text style={styles.heroTrendText}>+4.2% from last month</Text>
          </View>
        </View>

        {/* Stat Card 1: Current Balance */}
        <View style={[styles.statCard, styles.greenLeftBorder]}>
          <View>
            <Text style={styles.statLabel}>Current Balance</Text>
            <Text style={styles.statValue}>$3,210</Text>
          </View>
        </View>

        {/* Stat Card 2: Next Contribution Due */}
        <View style={[styles.statCard, styles.redLeftBorder, styles.rowSpaceBetween]}>
          <View>
            <Text style={styles.statLabel}>Next Contribution Due</Text>
            <Text style={styles.statValue}>Oct 24, 2023</Text>
          </View>
          <TouchableOpacity style={styles.payNowButton} activeOpacity={0.9} onPress={() => router.push('/(admin)/records')}>
            <Text style={styles.payNowText}>PAY NOW</Text>
          </TouchableOpacity>
        </View>

        {/* Member Requests Section */}
        <View style={[styles.rowSpaceBetween, styles.sectionHeader]}>
          <Text style={styles.sectionHeading}>Member Requests</Text>
          <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('/(admin)/requests')}>
            <Text style={styles.viewAllText}>VIEW ALL</Text>
          </TouchableOpacity>
        </View>

        {/* Toggle Chips */}
        <View style={styles.chipContainer}>
          <View style={styles.activeChip}>
            <Text style={styles.activeChipText}>REQUESTS</Text>
          </View>
          <View style={styles.inactiveChip}>
            <Text style={styles.inactiveChipText}>PENDING REQUESTS</Text>
          </View>
        </View>

        {/* Request Cards */}
        {/* Card 1: Marcus Chen */}
        <View style={[styles.requestCard, styles.greenLeftBorder]}>
          <View style={styles.requestCardLeft}>
            <View style={styles.grayUserCircle}>
              <User size={20} color="#6B7280" />
            </View>
            <View style={styles.requestInfo}>
              <Text style={styles.memberName}>Marcus Chen</Text>
              <Text style={styles.memberAction}>Wants to join Tech Founders</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.reviewButton} activeOpacity={0.9} onPress={() => router.push('/(admin)/requests')}>
            <Text style={styles.reviewButtonText}>REVIEW</Text>
          </TouchableOpacity>
        </View>

        {/* Card 2: Elena Rodriguez */}
        <View style={[styles.requestCard, styles.greenLeftBorder]}>
          <View style={styles.requestCardLeft}>
            <View style={styles.greenUserCircle}>
              <User size={20} color="#0D9488" />
            </View>
            <View style={styles.requestInfo}>
              <Text style={styles.memberName}>Elena Rodriguez</Text>
              <Text style={styles.memberAction}>Joined 2 days ago</Text>
            </View>
          </View>
          <View style={styles.acceptedPill}>
            <Text style={styles.acceptedText}>ACCEPTED</Text>
          </View>
        </View>

        {/* Recent Activities Section */}
        <Text style={[styles.sectionHeading, styles.sectionHeader, { marginBottom: 16 }]}>
          Recent Activities
        </Text>

        {/* Activity Card 1 */}
        <View style={[styles.requestCard, styles.greenLeftBorder]}>
          <View style={styles.requestCardLeft}>
            <View style={styles.greenWalletCircle}>
              <Wallet size={20} color="#0D9488" />
            </View>
            <View style={styles.requestInfo}>
              <Text style={styles.memberName}>Member Past Contribution</Text>
              <Text style={styles.memberAction}>Paid to Tech Founders Group</Text>
            </View>
          </View>
          <View style={styles.activityRight}>
            <Text style={styles.activityAmount}>+$500</Text>
            <Text style={styles.activityTime}>2h ago</Text>
          </View>
        </View>

        {/* Activity Card 2 */}
        <View style={[styles.requestCard, styles.grayLeftBorder]}>
          <View style={styles.requestCardLeft}>
            <View style={styles.grayUserPlusCircle}>
              <UserPlus size={20} color="#6B7280" />
            </View>
            <View style={styles.requestInfo}>
              <Text style={styles.memberName}>New Member Joined</Text>
              <Text style={styles.memberAction}>Sarah joined Tech Founders</Text>
            </View>
          </View>
          <Text style={styles.activityTimeOnly}>Yesterday</Text>
        </View>

        {/* Bottom Red Action Button */}
        <TouchableOpacity style={styles.nudgeButton} activeOpacity={0.9} onPress={() => router.push('/(admin)/records')}>
          <Text style={styles.nudgeButtonText}>NUDGE ALL UNPAID MEMBERS</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F0F4F8',
  },
  avatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#0A1628',
  },
  bellButton: {
    padding: 6,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  heroCard: {
    backgroundColor: '#0A1628',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  heroLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#9CA3AF',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  heroAmount: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  heroTrendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendIcon: {
    marginRight: 4,
  },
  heroTrendText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0D9488',
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
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
  grayLeftBorder: {
    borderLeftWidth: 4,
    borderLeftColor: '#E5E7EB',
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 6,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0A1628',
  },
  payNowButton: {
    backgroundColor: '#0A1628',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  payNowText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  sectionHeader: {
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0A1628',
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0D9488',
  },
  chipContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    gap: 8,
  },
  activeChip: {
    backgroundColor: '#0A1628',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  activeChipText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  inactiveChip: {
    backgroundColor: '#E2E8F0',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  inactiveChipText: {
    color: '#475569',
    fontSize: 12,
    fontWeight: '600',
  },
  requestCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  requestCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  grayUserCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  greenUserCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  greenWalletCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  grayUserPlusCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  requestInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0A1628',
    marginBottom: 2,
  },
  memberAction: {
    fontSize: 13,
    color: '#6B7280',
  },
  reviewButton: {
    backgroundColor: '#0A1628',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  reviewButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  acceptedPill: {
    backgroundColor: '#D1FAE5',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  acceptedText: {
    color: '#0D9488',
    fontSize: 11,
    fontWeight: '700',
  },
  activityRight: {
    alignItems: 'flex-end',
  },
  activityAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0D9488',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  activityTimeOnly: {
    fontSize: 12,
    color: '#6B7280',
  },
  nudgeButton: {
    backgroundColor: '#DC2626',
    borderRadius: 12,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 24,
  },
  nudgeButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
