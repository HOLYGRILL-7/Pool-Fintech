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
      <StatusBar barStyle="light-content" backgroundColor="#0D1F1A" />

      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={handleBack}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity 
          style={styles.headerButton} 
          onPress={() => handleMenuItemPress('System Preferences')}
        >
          <Settings size={24} color="#FFFFFF" />
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
            <Text style={[styles.statValue, { color: '#2ECC71' }]}>980</Text>
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
                <User size={20} color="#FFFFFF" />
              </View>
              <Text style={styles.menuText}>Personal Information</Text>
            </View>
            <ChevronRight size={18} color="#8BA89E" />
          </TouchableOpacity>

          <View style={styles.menuSeparator} />

          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => handleMenuItemPress('Linked Bank Accounts')}
          >
            <View style={styles.menuLeft}>
              <View style={styles.iconContainer}>
                <Landmark size={20} color="#FFFFFF" />
              </View>
              <Text style={styles.menuText}>Linked Bank Accounts</Text>
            </View>
            <ChevronRight size={18} color="#8BA89E" />
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
                <Lock size={20} color="#FFFFFF" />
              </View>
              <Text style={styles.menuText}>Password & Biometrics</Text>
            </View>
            <ChevronRight size={18} color="#8BA89E" />
          </TouchableOpacity>

          <View style={styles.menuSeparator} />

          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => handleMenuItemPress('Two-Factor Authentication')}
          >
            <View style={styles.menuLeft}>
              <View style={styles.iconContainer}>
                <Smartphone size={20} color="#FFFFFF" />
              </View>
              <Text style={styles.menuText}>Two-Factor Authentication</Text>
            </View>
            <ChevronRight size={18} color="#8BA89E" />
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
                <Bell size={20} color="#FFFFFF" />
              </View>
              <Text style={styles.menuText}>Notifications</Text>
            </View>
            <ChevronRight size={18} color="#8BA89E" />
          </TouchableOpacity>

          <View style={styles.menuSeparator} />

          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => handleMenuItemPress('App Theme')}
          >
            <View style={styles.menuLeft}>
              <View style={styles.iconContainer}>
                <Palette size={20} color="#FFFFFF" />
              </View>
              <Text style={styles.menuText}>App Theme</Text>
            </View>
            <ChevronRight size={18} color="#8BA89E" />
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
                <HelpCircle size={20} color="#FFFFFF" />
              </View>
              <Text style={styles.menuText}>Help Center</Text>
            </View>
            <ChevronRight size={18} color="#8BA89E" />
          </TouchableOpacity>

          <View style={styles.menuSeparator} />

          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => handleMenuItemPress('About Kinship Finance')}
          >
            <View style={styles.menuLeft}>
              <View style={styles.iconContainer}>
                <Info size={20} color="#FFFFFF" />
              </View>
              <Text style={styles.menuText}>About Kinship Finance</Text>
            </View>
            <ChevronRight size={18} color="#8BA89E" />
          </TouchableOpacity>
        </View>

        {/* ── Logout Button ── */}
        <TouchableOpacity
          style={styles.logoutButton}
          activeOpacity={0.8}
          onPress={handleLogout}
        >
          <LogOut size={20} color="#DC2626" style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0D1F1A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#0D1F1A',
    borderBottomWidth: 1,
    borderBottomColor: '#1E3328',
  },
  headerButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  profileHero: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#162820',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#1E3328',
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
    borderColor: '#1E3328',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: '#2ECC71',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#0D1F1A',
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  roleBadge: {
    backgroundColor: '#1E3328',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  roleBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2ECC71',
  },
  statsCard: {
    backgroundColor: '#162820',
    borderRadius: 16,
    marginHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#1E3328',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#8BA89E',
    marginBottom: 4,
    fontWeight: '500',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  divider: {
    width: 1,
    height: 28,
    backgroundColor: '#1E3328',
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#8BA89E',
    letterSpacing: 1,
    marginHorizontal: 20,
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#162820',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 20,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#1E3328',
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
    color: '#FFFFFF',
  },
  menuSeparator: {
    height: 1,
    backgroundColor: '#1E3328',
    marginHorizontal: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E3328',
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
    color: '#DC2626',
  },
});