import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, Check, Users, MapPin, UserPlus } from 'lucide-react-native';

export default function GroupCreatedScreen() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  const handleGoToDashboard = () => {
    router.replace('/(admin)/dashboard');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          activeOpacity={0.7}
          onPress={handleClose}
        >
          <X size={20} color="#0A1628" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Group Created</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Hero Illustration Section ── */}
        <View style={styles.heroSection}>
          {/* Decorative scattered dots */}
          <View style={[styles.dot, { top: 20, left: 30, width: 8, height: 8, backgroundColor: '#0D9488' }]} />
          <View style={[styles.dot, { top: 40, right: 40, width: 12, height: 12, backgroundColor: '#3B82F6' }]} />
          <View style={[styles.dot, { bottom: 30, left: 50, width: 10, height: 10, backgroundColor: '#D1D5DB' }]} />
          <View style={[styles.dot, { bottom: 40, right: 60, width: 6, height: 6, backgroundColor: '#0D9488' }]} />
          <View style={[styles.dot, { top: 80, left: 80, width: 6, height: 6, backgroundColor: '#D1D5DB' }]} />

          {/* Large green outer circle */}
          <View style={styles.outerCircle}>
            {/* Medium green middle circle */}
            <View style={styles.middleCircle}>
              {/* White center circle */}
              <View style={styles.innerCircle}>
                <Check size={48} color="#0D9488" strokeWidth={3} />
              </View>
            </View>
          </View>
        </View>

        {/* ── Title & Subtitle ── */}
        <Text style={styles.successTitle}>Success! Your group is ready.</Text>
        <Text style={styles.successSubtitle}>
          Tech Founders Savings Circle has been successfully created. You can now start inviting members to join.
        </Text>

        {/* ── White Card ── */}
        <View style={styles.card}>
          {/* Group Name Row */}
          <View style={styles.cardHeaderRow}>
            <View style={styles.iconContainer}>
              <Users size={20} color="#0D9488" />
            </View>
            <View style={styles.groupNameBlock}>
              <Text style={styles.cardLabel}>GROUP NAME</Text>
              <Text style={styles.groupNameText}>Tech Founders Savings Circle</Text>
            </View>
          </View>

          <View style={styles.cardDivider} />

          {/* Target & Category Row */}
          <View style={styles.detailsRow}>
            <View style={styles.detailCol}>
              <Text style={styles.cardLabel}>Monthly Target</Text>
              <Text style={styles.detailValue}>$2,500.00</Text>
            </View>
            <View style={[styles.detailCol, styles.alignRight]}>
              <Text style={[styles.cardLabel, styles.alignRightText]}>Category</Text>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryBadgeText}>BUSINESS</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ── Tip Row ── */}
        <View style={styles.tipRow}>
          <MapPin size={18} color="#6B7280" style={styles.tipIcon} />
          <Text style={styles.tipText}>
            Tip: Groups with a clear target description tend to reach their goals 20% faster.
          </Text>
        </View>

        {/* ── Action Buttons ── */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.inviteButton} activeOpacity={0.9} onPress={handleGoToDashboard}>
            <UserPlus size={18} color="#FFFFFF" style={styles.buttonIcon} />
            <Text style={styles.inviteButtonText}>Invite Members</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.dashboardButton}
            activeOpacity={0.8}
            onPress={handleGoToDashboard}
          >
            <Text style={styles.dashboardButtonText}>Go to Dashboard</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0A1628',
  },
  headerSpacer: {
    width: 36,
  },
  scrollContent: {
    paddingBottom: 40,
  },

  // ── Hero Section ──
  heroSection: {
    backgroundColor: '#0A1628',
    borderRadius: 20,
    margin: 16,
    padding: 24,
    height: 240,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  dot: {
    position: 'absolute',
    borderRadius: 99,
  },
  outerCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(13, 148, 136, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: 'rgba(13, 148, 136, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },

  // ── Typography ──
  successTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0A1628',
    textAlign: 'center',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 6,
  },
  successSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginHorizontal: 24,
    marginBottom: 16,
  },

  // ── Card ──
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#0D9488',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupNameBlock: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  groupNameText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0A1628',
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 14,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailCol: {
    flex: 1,
  },
  alignRight: {
    alignItems: 'flex-end',
  },
  alignRightText: {
    textAlign: 'right',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0A1628',
    marginTop: 2,
  },
  categoryBadge: {
    backgroundColor: '#EFF6FF',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 2,
    alignSelf: 'flex-end',
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0A1628',
  },

  // ── Tip Row ──
  tipRow: {
    flexDirection: 'row',
    backgroundColor: '#F0FDF4',
    borderRadius: 10,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 12,
    alignItems: 'center',
    gap: 8,
  },
  tipIcon: {
    flexShrink: 0,
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    color: '#6B7280',
    fontStyle: 'italic',
    lineHeight: 18,
  },

  // ── Buttons ──
  buttonContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
    gap: 12,
  },
  inviteButton: {
    backgroundColor: '#0A1628',
    borderRadius: 12,
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0A1628',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonIcon: {
    marginRight: 8,
  },
  inviteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  dashboardButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    height: 52,
    borderWidth: 1.5,
    borderColor: '#0A1628',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dashboardButtonText: {
    color: '#0A1628',
    fontSize: 16,
    fontWeight: '700',
  },
});
