import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ShieldCheck, Users, ChevronRight } from 'lucide-react-native';

export default function RoleScreen() {
  const router = useRouter();

  const handleRole = (role: 'admin' | 'member') => {
    router.push({ pathname: '/(auth)/action', params: { role } });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topContainer}>
          {/* Top section centered */}
          <View style={styles.headerSection}>
            <Image
              source={require('../../../assets/icon.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>Welcome to Pool</Text>
            <Text style={styles.subtitle}>Who are you?</Text>
          </View>

          {/* Large stacked cards */}
          <View style={styles.cardsContainer}>
            {/* Admin Card */}
            <TouchableOpacity
              style={[styles.card, styles.adminCard]}
              onPress={() => handleRole('admin')}
              activeOpacity={0.8}
            >
              <View style={styles.cardHeader}>
                <View style={[styles.iconCircle, styles.adminIconCircle]}>
                  <ShieldCheck size={24} color="#F59E0B" />
                </View>
                <Text style={styles.cardTitle}>Pool Admin</Text>
              </View>
              
              <Text style={styles.cardBodyText}>I create and manage savings pools</Text>
              
              <View style={styles.cardFooter}>
                <Text style={styles.cardFooterText}>Tap to continue</Text>
                <ChevronRight size={16} color="#F59E0B" />
              </View>
            </TouchableOpacity>

            {/* Member Card */}
            <TouchableOpacity
              style={[styles.card, styles.memberCard]}
              onPress={() => handleRole('member')}
              activeOpacity={0.8}
            >
              <View style={styles.cardHeader}>
                <View style={[styles.iconCircle, styles.memberIconCircle]}>
                  <Users size={24} color="#0D9488" />
                </View>
                <Text style={styles.cardTitle}>Pool Member</Text>
              </View>
              
              <Text style={styles.cardBodyText}>I join and contribute to pools</Text>
              
              <View style={styles.cardFooter}>
                <Text style={styles.cardFooterText}>Tap to continue</Text>
                <ChevronRight size={16} color="#0D9488" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom text */}
        <View style={styles.footerSection}>
          <Text style={styles.footerText}>Pool — Save together. Grow together.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: 24,
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 16,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0A1628',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  cardsContainer: {
    paddingHorizontal: 24,
    gap: 16,
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#0A1628',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  adminCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  memberCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#0D9488',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  adminIconCircle: {
    backgroundColor: '#FEF3C7',
  },
  memberIconCircle: {
    backgroundColor: '#D1FAE5',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0A1628',
  },
  cardBodyText: {
    fontSize: 15,
    color: '#6B7280',
    paddingLeft: 64,
    marginBottom: 4,
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 16,
  },
  cardFooterText: {
    fontSize: 13,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  footerSection: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  footerText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
});
