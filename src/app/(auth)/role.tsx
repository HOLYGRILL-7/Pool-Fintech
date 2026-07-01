import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ShieldCheck, Users, ChevronRight } from 'lucide-react-native';

export default function RoleScreen() {
  const router = useRouter();

  const handleRole = (role: 'admin' | 'member') => {
    router.push({ pathname: '/(auth)/action', params: { role } });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.container}>
        
        {/* Top Section */}
        <View style={styles.topSection}>
          <Image 
            source={require('../../../assets/icon.png')} 
            style={styles.logo} 
          />
          <Text style={styles.title}>Welcome to Pool</Text>
          <Text style={styles.subtitle}>Who are you?</Text>
        </View>

        {/* Cards Section */}
        <View style={styles.cardsSection}>
          
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
            
            <Text style={styles.cardSubtitle}>
              I create and manage savings pools
            </Text>
            
            <View style={styles.cardFooter}>
              <Text style={styles.footerItalicText}>Tap to continue</Text>
              <ChevronRight size={18} color="#F59E0B" />
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
            
            <Text style={styles.cardSubtitle}>
              I join and contribute to pools
            </Text>
            
            <View style={styles.cardFooter}>
              <Text style={styles.footerItalicText}>Tap to continue</Text>
              <ChevronRight size={18} color="#0D9488" />
            </View>
          </TouchableOpacity>

        </View>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          <Text style={styles.bottomText}>
            Pool — Save together. Grow together.
          </Text>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0D1F1A',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 24,
  },
  topSection: {
    alignItems: 'center',
    marginTop: 40,
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#8BA89E',
    fontWeight: '500',
  },
  cardsSection: {
    marginHorizontal: 24,
    gap: 16,
  },
  card: {
    backgroundColor: '#162820',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#1E3328',
  },
  adminCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  memberCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#2ECC71',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 12,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  adminIconCircle: {
    backgroundColor: '#2C2010',
  },
  memberIconCircle: {
    backgroundColor: '#1E3328',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  cardSubtitle: {
    fontSize: 15,
    color: '#8BA89E',
    lineHeight: 22,
    marginBottom: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerItalicText: {
    fontSize: 13,
    color: '#8BA89E',
    fontStyle: 'italic',
  },
  bottomSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  bottomText: {
    fontSize: 12,
    color: '#8BA89E',
    fontWeight: '500',
  },
});

