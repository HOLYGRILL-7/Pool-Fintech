import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  LogIn,
  Grid,
} from 'lucide-react-native';

// ─── Component ────────────────────────────────────────────────────────────────

export default function SignupScreen() {
  const router = useRouter();
  const { role } = useLocalSearchParams<{ role: string }>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleSignUp = () => {
    if (!name.trim() || !email.trim() || !password.trim()) return;
    if (!agreed) return;
    if (role === 'admin') {
      router.replace('/(admin)/dashboard');
    } else {
      router.replace('/(member)/dashboard');
    }
  };

  const handleLoginTab = () => {
    router.push({ pathname: '/(auth)/login', params: { role } });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ── Top Section ── */}
          <View style={styles.topSection}>
            {/* Decorative shape — absolute, top-right */}
            <View style={styles.decorativeSwirl} />

            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>
              Secure your financial future with Pool.
            </Text>
          </View>

          {/* ── White Card ── */}
          <View style={styles.card}>

            {/* Full Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <View style={styles.inputRow}>
                <User size={18} color="#8BA89E" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="John Doe"
                  placeholderTextColor="#8BA89E"
                  autoCapitalize="words"
                  value={name}
                  onChangeText={setName}
                />
              </View>
            </View>

            {/* Email Address */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <View style={styles.inputRow}>
                <Mail size={18} color="#8BA89E" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="john@example.com"
                  placeholderTextColor="#8BA89E"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.inputRow}>
                <Lock size={18} color="#8BA89E" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="••••••••"
                  placeholderTextColor="#8BA89E"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                  activeOpacity={0.7}
                >
                  {showPassword ? (
                    <EyeOff size={18} color="#8BA89E" />
                  ) : (
                    <Eye size={18} color="#8BA89E" />
                  )}
                </TouchableOpacity>
              </View>
              <Text style={styles.passwordHelper}>
                Must be at least 8 characters with a mix of letters and numbers.
              </Text>
            </View>

            {/* Terms Checkbox */}
            <TouchableOpacity
              style={styles.checkboxRow}
              activeOpacity={0.8}
              onPress={() => setAgreed(!agreed)}
            >
              <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
                {agreed && <View style={styles.checkboxInner} />}
              </View>
              <Text style={styles.checkboxText}>
                I agree to the{' '}
                <Text style={styles.checkboxLink}>Terms of Service</Text>
                {' '}and{' '}
                <Text style={styles.checkboxLink}>Privacy Policy</Text>
                .
              </Text>
            </TouchableOpacity>

            {/* Sign Up Button */}
            <TouchableOpacity
              style={styles.signUpButton}
              onPress={handleSignUp}
              activeOpacity={0.9}
            >
              <Text style={styles.signUpButtonText}>Sign Up →</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR REGISTER WITH</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Buttons */}
            <View style={styles.socialRow}>
              {/* Google */}
              <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
                <Text style={styles.socialLabel}>Google</Text>
              </TouchableOpacity>

              {/* Apple */}
              <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
                <Grid size={16} color="#FFFFFF" style={styles.socialIcon} />
                <Text style={styles.socialLabel}>Apple</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* ── Bottom Tab Bar ── */}
        <View style={styles.tabBar}>
          {/* Register tab — active */}
          <View style={styles.tabActive}>
            <UserPlus size={18} color="#0D1F1A" />
            <Text style={styles.tabActiveText}>Register</Text>
          </View>

          {/* Login tab — inactive */}
          <TouchableOpacity
            style={styles.tabInactive}
            onPress={handleLoginTab}
            activeOpacity={0.8}
          >
            <LogIn size={18} color="#8BA89E" />
            <Text style={styles.tabInactiveText}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0D1F1A',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },

  // ── Top Section ──
  topSection: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 28,
    overflow: 'hidden',
  },
  decorativeSwirl: {
    position: 'absolute',
    top: -20,
    right: -30,
    width: 140,
    height: 90,
    borderRadius: 28,
    backgroundColor: '#1E3328',
    opacity: 0.35,
    transform: [{ rotate: '-18deg' }],
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#8BA89E',
    lineHeight: 22,
  },

  // ── Card ──
  card: {
    backgroundColor: '#162820',
    borderRadius: 20,
    marginHorizontal: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#1E3328',
  },

  // ── Input Fields ──
  inputGroup: {
    marginBottom: 18,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#1E3328',
    borderRadius: 10,
    backgroundColor: '#162820',
    paddingHorizontal: 12,
    height: 50,
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: '#FFFFFF',
    height: '100%',
  },
  eyeButton: {
    padding: 6,
  },
  passwordHelper: {
    marginTop: 6,
    fontSize: 12,
    color: '#8BA89E',
    lineHeight: 17,
  },

  // ── Checkbox ──
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 22,
    gap: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: '#1E3328',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
    flexShrink: 0,
  },
  checkboxChecked: {
    backgroundColor: '#F59E0B',
    borderColor: '#F59E0B',
  },
  checkboxInner: {
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: '#0D1F1A',
  },
  checkboxText: {
    flex: 1,
    fontSize: 13,
    color: '#8BA89E',
    lineHeight: 20,
  },
  checkboxLink: {
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // ── Sign Up Button ──
  signUpButton: {
    backgroundColor: '#F59E0B',
    borderRadius: 12,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  signUpButtonText: {
    color: '#0D1F1A',
    fontSize: 16,
    fontWeight: '700',
  },

  // ── Divider ──
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#1E3328',
  },
  dividerText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#8BA89E',
    letterSpacing: 0.6,
  },

  // ── Social Buttons ──
  socialRow: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#1E3328',
    borderRadius: 10,
    height: 48,
    gap: 8,
  },
  socialIcon: {
    // spacing handled by gap
  },
  socialLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // ── Tab Bar ──
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#0D1F1A',
    borderTopWidth: 1,
    borderTopColor: '#1E3328',
    paddingVertical: 12,
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabActive: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F59E0B',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 24,
    gap: 8,
  },
  tabActiveText: {
    color: '#0D1F1A',
    fontSize: 14,
    fontWeight: '700',
  },
  tabInactive: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  tabInactiveText: {
    color: '#8BA89E',
    fontSize: 14,
    fontWeight: '500',
  },
});