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
  UserCircle,
  Clock,
  ChevronRight,
} from 'lucide-react-native';

const FILTER_CHIPS = ['All', 'Pending', 'Approved', 'Rejected'];

const MOCK_REQUESTS = [
  {
    id: '1',
    name: 'Sarah Miller',
    initials: 'SM',
    type: 'Withdrawal Request',
    time: '2 mins ago',
    status: 'Pending',
    borderColor: '#F59E0B',
    statusBg: '#2C2010',
    statusColor: '#F59E0B',
  },
  {
    id: '2',
    name: 'John Doe',
    initials: 'JD',
    type: 'Join Group',
    time: 'Yesterday at 4:15 PM',
    status: 'Approved',
    borderColor: '#2ECC71',
    statusBg: '#1E3328',
    statusColor: '#2ECC71',
  },
  {
    id: '3',
    name: 'Alex Lee',
    initials: 'AL',
    type: 'Contribution Edit',
    time: 'Oct 12, 10:30 AM',
    status: 'Rejected',
    borderColor: '#DC2626',
    statusBg: '#1E3328',
    statusColor: '#DC2626',
  },
  {
    id: '4',
    name: 'Rita Khan',
    initials: 'RK',
    type: 'Loan Application',
    time: 'Oct 11, 2:45 PM',
    status: 'Pending',
    borderColor: '#F59E0B',
    statusBg: '#2C2010',
    statusColor: '#F59E0B',
  },
];

export default function RequestsScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredRequests = MOCK_REQUESTS.filter((req) => {
    if (activeFilter === 'All') return true;
    return req.status === activeFilter;
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Row */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIconButton} activeOpacity={0.7} onPress={() => router.push('/(admin)/dashboard')}>
          <Menu size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Requests Management</Text>
        <TouchableOpacity style={styles.headerIconButton} activeOpacity={0.7} onPress={() => router.push('/(admin)/profile')}>
          <UserCircle size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Main Content (Scrollable) */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Horizontal Scrollable Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScrollView}
          contentContainerStyle={styles.filterContent}
        >
          {FILTER_CHIPS.map((chip) => {
            const isActive = activeFilter === chip;
            return (
              <TouchableOpacity
                key={chip}
                onPress={() => setActiveFilter(chip)}
                style={[
                  styles.filterChip,
                  isActive ? styles.activeChip : styles.inactiveChip,
                ]}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.chipText,
                    isActive ? styles.activeChipText : styles.inactiveChipText,
                  ]}
                >
                  {chip}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Side-by-Side Stat Cards */}
        <View style={styles.statsContainer}>
          {/* Card 1: Attention Required */}
          <View style={[styles.statCard, styles.yellowLeftBorder]}>
            <Text style={styles.statLabel}>Attention Required</Text>
            <Text style={styles.statValue}>12 New</Text>
          </View>

          {/* Card 2: Today's Goal */}
          <View style={[styles.statCard, styles.greenLeftBorder]}>
            <Text style={styles.statLabel}>Today's Goal</Text>
            <Text style={styles.statValue}>85%</Text>
            <Text style={styles.statValueSub}>Processed</Text>
          </View>
        </View>

        {/* Scrollable list of Request Cards */}
        <View style={styles.listContainer}>
          {filteredRequests.map((req) => (
            <View
              key={req.id}
              style={[
                styles.requestCard,
                { borderLeftColor: req.borderColor },
              ]}
            >
              <View style={styles.cardMainSection}>
                {/* Fallback avatar with initials */}
                <View style={styles.avatarCircle}>
                  <Text style={styles.avatarText}>{req.initials}</Text>
                </View>

                {/* Main Information */}
                <View style={styles.infoContainer}>
                  <View style={styles.nameRow}>
                    <Text style={styles.memberName}>{req.name}</Text>
                    <View
                      style={[
                        styles.statusPill,
                        { backgroundColor: req.statusBg },
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusText,
                          { color: req.statusColor },
                        ]}
                      >
                        {req.status}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.requestType}>{req.type}</Text>

                  {/* Time Row */}
                  <View style={styles.timeRow}>
                    <Clock size={14} color="#8BA89E" style={styles.clockIcon} />
                    <Text style={styles.timeText}>{req.time}</Text>
                  </View>
                </View>

                {/* Right Chevron Arrow */}
                <ChevronRight size={20} color="#8BA89E" style={styles.chevron} />
              </View>
            </View>
          ))}

          {filteredRequests.length === 0 && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No requests in this category</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1F1A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#0D1F1A',
  },
  headerIconButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  filterScrollView: {
    marginVertical: 12,
  },
  filterContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterChip: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeChip: {
    backgroundColor: '#F59E0B',
  },
  inactiveChip: {
    backgroundColor: '#162820',
    borderWidth: 1,
    borderColor: '#1E3328',
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  activeChipText: {
    color: '#0D1F1A',
  },
  inactiveChipText: {
    color: '#8BA89E',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#162820',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1E3328',
  },
  yellowLeftBorder: {
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  greenLeftBorder: {
    borderLeftWidth: 4,
    borderLeftColor: '#2ECC71',
  },
  statLabel: {
    fontSize: 12,
    color: '#8BA89E',
    fontWeight: '500',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  statValueSub: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: -2,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  requestCard: {
    backgroundColor: '#162820',
    borderRadius: 12,
    borderLeftWidth: 4,
    marginBottom: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#1E3328',
  },
  cardMainSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#162820',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#1E3328',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#8BA89E',
  },
  infoContainer: {
    flex: 1,
    marginRight: 8,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  statusPill: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  requestType: {
    fontSize: 14,
    color: '#8BA89E',
    marginBottom: 6,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clockIcon: {
    marginRight: 4,
  },
  timeText: {
    fontSize: 12,
    color: '#8BA89E',
  },
  chevron: {
    alignSelf: 'center',
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#8BA89E',
  },
});