import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Settings,
  ShieldCheck,
  User,
  Landmark,
  Lock,
  Smartphone,
  Bell,
  Palette,
  HelpCircle,
  Info,
  LogOut,
  ChevronRight,
} from 'lucide-react-native';

export default function MemberProfileScreen() {
  const router = useRouter();

  const handleMenuItemPress = (title: string) => {
    Alert.alert(
      'Feature Coming Soon',
      `The "${title}" settings page is currently under development.`,
      [{ text: 'OK' }]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out of your account?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => router.replace('/(auth)/role'),
        },
      ]
    );
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(member)/dashboard');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={handleBack}>
          <ArrowLeft size={24} color="#0A1628" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity 
          style={styles.headerButton} 
          onPress={() => handleMenuItemPress('System Preferences')}
        >
          <Settings size={24} color="#0A1628" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Profile Header Section ── */}
        <View style={styles.profileHero}>
          <View style={styles.avatarWrapper}>
            <Image
              source={require('../../../assets/alex_sterling.png')}
              style={styles.avatar}
            />
            <View style={styles.verifiedBadge}>
              <ShieldCheck size={14} color="#FFFFFF" />
            </View>
          </View>
          <Text style={styles.userName}>Alex Sterling</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleBadgeText}>Verified Member</Text>
          </View>
        </View>

        {/* ── Stats Card ── */}
        <View style={styles.statsCard}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Pools</Text>
            <Text style={styles.statValue}>12</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Savings</Text>
            <Text style={styles.statValue}>$4.2k</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Trust Score</Text>
            <Text style={[styles.statValue, { color: '#0D9488' }]}>980</Text>
          </View>
        </View>

        {/* ── Settings Sections ── */}

        {/* Account Settings */}
        <Text style={styles.sectionTitle}>ACCOUNT SETTINGS</Text>
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => handleMenuItemPress('Personal Information')}
          >
            <View style={styles.menuLeft}>
              <View style={styles.iconContainer}>
                <User size={20} color="#0A1628" />
              </View>
              <Text style={styles.menuText}>Personal Information</Text>
            </View>
            <ChevronRight size={18} color="#9CA3AF" />
          </TouchableOpacity>

          <View style={styles.menuSeparator} />

          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => handleMenuItemPress('Linked Bank Accounts')}
          >
            <View style={styles.menuLeft}>
              <View style={styles.iconContainer}>
                <Landmark size={20} color="#0A1628" />
              </View>
              <Text style={styles.menuText}>Linked Bank Accounts</Text>
            </View>
            <ChevronRight size={18} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Security */}
        <Text style={styles.sectionTitle}>SECURITY</Text>
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => handleMenuItemPress('Password & Biometrics')}
          >
            <View style={styles.menuLeft}>
              <View style={styles.iconContainer}>
                <Lock size={20} color="#0A1628" />
              </View>
              <Text style={styles.menuText}>Password & Biometrics</Text>
            </View>
            <ChevronRight size={18} color="#9CA3AF" />
          </TouchableOpacity>

          <View style={styles.menuSeparator} />

          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => handleMenuItemPress('Two-Factor Authentication')}
          >
            <View style={styles.menuLeft}>
              <View style={styles.iconContainer}>
                <Smartphone size={20} color="#0A1628" />
              </View>
              <Text style={styles.menuText}>Two-Factor Authentication</Text>
            </View>
            <ChevronRight size={18} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Preferences */}
        <Text style={styles.sectionTitle}>PREFERENCES</Text>
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => handleMenuItemPress('Notifications')}
          >
            <View style={styles.menuLeft}>
              <View style={styles.iconContainer}>
                <Bell size={20} color="#0A1628" />
              </View>
              <Text style={styles.menuText}>Notifications</Text>
            </View>
            <ChevronRight size={18} color="#9CA3AF" />
          </TouchableOpacity>

          <View style={styles.menuSeparator} />

          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => handleMenuItemPress('App Theme')}
          >
            <View style={styles.menuLeft}>
              <View style={styles.iconContainer}>
                <Palette size={20} color="#0A1628" />
              </View>
              <Text style={styles.menuText}>App Theme</Text>
            </View>
            <ChevronRight size={18} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Support */}
        <Text style={styles.sectionTitle}>SUPPORT</Text>
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => handleMenuItemPress('Help Center')}
          >
            <View style={styles.menuLeft}>
              <View style={styles.iconContainer}>
                <HelpCircle size={20} color="#0A1628" />
              </View>
              <Text style={styles.menuText}>Help Center</Text>
            </View>
            <ChevronRight size={18} color="#9CA3AF" />
          </TouchableOpacity>

          <View style={styles.menuSeparator} />

          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => handleMenuItemPress('About Kinship Finance')}
          >
            <View style={styles.menuLeft}>
              <View style={styles.iconContainer}>
                <Info size={20} color="#0A1628" />
              </View>
              <Text style={styles.menuText}>About Kinship Finance</Text>
            </View>
            <ChevronRight size={18} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* ── Logout Button ── */}
        <TouchableOpacity
          style={styles.logoutButton}
          activeOpacity={0.8}
          onPress={handleLogout}
        >
          <LogOut size={20} color="#EF4444" style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0A1628',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  profileHero: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 20,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: '#E2E8F0',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: '#0D9488',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0A1628',
    marginBottom: 6,
  },
  roleBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  roleBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0D9488',
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 3,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 4,
    fontWeight: '500',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0A1628',
  },
  divider: {
    width: 1,
    height: 28,
    backgroundColor: '#E2E8F0',
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 1,
    marginHorizontal: 20,
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 20,
    paddingVertical: 4,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 12,
  },
  menuText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0A1628',
  },
  menuSeparator: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginHorizontal: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEE2E2',
    borderRadius: 16,
    marginHorizontal: 16,
    paddingVertical: 16,
    marginTop: 10,
    marginBottom: 20,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#EF4444',
  },
});
