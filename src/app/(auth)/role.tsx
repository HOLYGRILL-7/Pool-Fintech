import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RoleScreen() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<'admin' | 'member'>('admin');

  const handleRole = (role: 'admin' | 'member') => {
    router.push({ pathname: '/(auth)/action', params: { role } });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.container}>
        {/* Top Illustration Section */}
        <View style={styles.topSection}>
          <Image
            source={require('../../../assets/images/role-illustration.png')}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        {/* Center content: title and buttons */}
        <View style={styles.centerSection}>
          <Text style={styles.title}>Are you an Admin or a Member?</Text>

          <View style={styles.buttonContainer}>
            {/* Admin Button */}
            <TouchableOpacity
              style={[
                styles.button,
                selectedRole === 'admin' ? styles.btnActive : styles.btnInactive,
              ]}
              activeOpacity={0.8}
              onPress={() => {
                setSelectedRole('admin');
                handleRole('admin');
              }}
            >
              <Text style={styles.buttonText}>Admin</Text>
            </TouchableOpacity>

            {/* Member Button */}
            <TouchableOpacity
              style={[
                styles.button,
                selectedRole === 'member' ? styles.btnActive : styles.btnInactive,
              ]}
              activeOpacity={0.8}
              onPress={() => {
                setSelectedRole('member');
                handleRole('member');
              }}
            >
              <Text style={styles.buttonText}>Member</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: '#FEFAE0',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  topSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  illustration: {
    width: '100%',
    height: 280,
  },
  centerSection: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#283618',
    textAlign: 'center',
    marginHorizontal: 24,
    lineHeight: 32,
  },
  buttonContainer: {
    marginHorizontal: 24,
    gap: 12,
    marginTop: 32,
  },
  button: {
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  btnActive: {
    backgroundColor: '#283618',
  },
  btnInactive: {
    backgroundColor: '#606C38',
  },
  buttonText: {
    color: '#FEFAE0',
    fontWeight: '700',
    fontSize: 16,
  },
  bottomSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  bottomText: {
    fontSize: 12,
    color: '#606C38',
    fontWeight: '600',
    textAlign: 'center',
  },
});
