import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  User,
  Bell,
  Search,
  MoreVertical,
  Plus,
  TrendingUp,
  HeartHandshake,
  Users,
} from 'lucide-react-native';

const MOCK_GROUPS = [
  {
    id: '1',
    name: 'Vanguard Alpha',
    description: 'Strategic growth fund focusing on technology and renewable energy startups. Monthly...',
    contribution: '$250/Monthly',
    buttonType: 'join',
    iconBg: '#D1FAE5',
    iconColor: '#0D9488',
    borderColor: '#0D9488',
    icon: TrendingUp,
  },
  {
    id: '2',
    name: 'Unity Parish Fund',
    description: 'A mutual aid group for members of the Unity Parish to support community outreach and...',
    contribution: '$50/Monthly',
    buttonType: 'request',
    iconBg: '#FEF3C7',
    iconColor: '#F59E0B',
    borderColor: '#E5E7EB',
    icon: Users,
  },
  {
    id: '3',
    name: 'Eldercare Network',
    description: 'Collaborative savings to provide medical support and home care services for the elderly...',
    contribution: '$100/Monthly',
    buttonType: 'join',
    iconBg: '#FEE2E2',
    iconColor: '#EF4444',
    borderColor: '#EF4444',
    icon: HeartHandshake,
  },
];

export default function DiscoveryScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

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

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#6B7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for groups, members, or categories"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Categories Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeading}>Categories</Text>
          <View style={styles.pillContainer}>
            <TouchableOpacity style={styles.activePill} activeOpacity={0.8}>
              <Text style={styles.activePillText}>All Groups</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Available Groups Header */}
        <View style={styles.listHeader}>
          <Text style={styles.listHeading}>Available Groups</Text>
          <Text style={styles.listSubheading}>128 found</Text>
        </View>

        {/* Scrollable list of Group Cards */}
        {MOCK_GROUPS.map((group) => {
          const IconComponent = group.icon;
          return (
            <View
              key={group.id}
              style={[
                styles.groupCard,
                { borderLeftColor: group.borderColor },
              ]}
            >
              {/* Card Top Row */}
              <View style={styles.cardHeader}>
                <View style={styles.cardHeaderLeft}>
                  <View style={[styles.groupIconContainer, { backgroundColor: group.iconBg }]}>
                    <IconComponent size={24} color={group.iconColor} />
                  </View>
                  <Text style={styles.groupName} numberOfLines={1}>
                    {group.name}
                  </Text>
                </View>
                <TouchableOpacity style={styles.menuButton} activeOpacity={0.7}>
                  <MoreVertical size={20} color="#6B7280" />
                </TouchableOpacity>
              </View>

              {/* Description */}
              <Text style={styles.groupDescription} numberOfLines={2}>
                {group.description}
              </Text>

              {/* Divider line before contribution */}
              <View style={styles.divider} />

              {/* Contribution Amount */}
              <View style={styles.contributionSection}>
                <Text style={styles.contributionLabel}>CONTRIBUTION</Text>
                <Text style={styles.contributionAmount}>{group.contribution}</Text>
              </View>

              {/* Action Button */}
              {group.buttonType === 'join' ? (
                <TouchableOpacity style={styles.joinButton} activeOpacity={0.9} onPress={() => router.push('/(member)/groups')}>
                  <Text style={styles.joinButtonText}>Join Group</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.requestButton} activeOpacity={0.8} onPress={() => router.push('/(member)/groups')}>
                  <Text style={styles.requestButtonText}>Request to Join</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </ScrollView>

      {/* Floating "+" Action Button */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.9} onPress={() => router.push('/(member)/contribute' as any)}>
        <Plus size={24} color="#FFFFFF" />
      </TouchableOpacity>
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
  searchSection: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#0A1628',
    height: '100%',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100, // Safe padding for FAB
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0A1628',
    marginBottom: 12,
  },
  pillContainer: {
    flexDirection: 'row',
  },
  activePill: {
    backgroundColor: '#0A1628',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  activePillText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  listHeading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0A1628',
  },
  listSubheading: {
    fontSize: 13,
    color: '#6B7280',
  },
  groupCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderLeftWidth: 4,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  groupIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  groupName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0A1628',
    flex: 1,
  },
  menuButton: {
    padding: 4,
  },
  groupDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginBottom: 12,
  },
  contributionSection: {
    marginBottom: 16,
  },
  contributionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#9CA3AF',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  contributionAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0D9488',
  },
  joinButton: {
    backgroundColor: '#0A1628',
    borderRadius: 10,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  requestButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#0A1628',
    borderRadius: 10,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  requestButtonText: {
    color: '#0A1628',
    fontSize: 15,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0D9488',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
});
