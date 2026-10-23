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
  StatusBar,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
} from 'lucide-react-native';

// ─── Palette (matching role.tsx + login.tsx warm theme) ───────────────────────
const C = {
  bg: '#FEFAE0',
  pakistanGreen: '#283618',
  mosGreen: '#606C38',
  earthYellow: '#DDA15E',
  tigerEye: '#BC6C25',
  white: '#FEFAE0',
  inputBg: '#F5F0DC',
  border: '#D6CBA8',
};

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
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={C.bg} />
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ── Header ── */}
          <View style={styles.headerSection}>
            <View style={styles.blob1} />
            <View style={styles.blob2} />
            <Text style={styles.appName}>PoolUp</Text>
            <Text style={styles.heading}>Create Account</Text>
            <Text style={styles.subheading}>
              Secure your financial future with PoolUp.
            </Text>
          </View>

          {/* ── Form Card ── */}
          <View style={styles.card}>

            {/* Role badge */}
            <View style={styles.roleBadge}>
              <Text style={styles.roleBadgeText}>
                Registering as{' '}
                <Text style={styles.roleBadgeRole}>
                  {role === 'admin' ? 'Admin' : 'Member'}
                </Text>
              </Text>
            </View>

            {/* Full Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <View style={styles.inputRow}>
                <User size={18} color={C.mosGreen} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="John Doe"
                  placeholderTextColor={C.border}
                  autoCapitalize="words"
                  value={name}
                  onChangeText={setName}
                />
              </View>
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <View style={styles.inputRow}>
                <Mail size={18} color={C.mosGreen} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="john@example.com"
                  placeholderTextColor={C.border}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputRow}>
                <Lock size={18} color={C.mosGreen} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor={C.border}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeBtn}
                  activeOpacity={0.7}
                >
                  {showPassword ? (
                    <EyeOff size={18} color={C.mosGreen} />
                  ) : (
                    <Eye size={18} color={C.mosGreen} />
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
                <Text style={styles.checkboxLink}>Privacy Policy</Text>.
              </Text>
            </TouchableOpacity>

            {/* Sign Up Button */}
            <TouchableOpacity
              style={styles.signUpBtn}
              onPress={handleSignUp}
              activeOpacity={0.85}
            >
              <Text style={styles.signUpBtnText}>Create Account →</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR REGISTER WITH</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Buttons */}
            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8}>
                <Text style={styles.socialLabel}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8}>
                <Text style={styles.socialLabel}>Apple</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* ── Already have an account ── */}
          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={handleLoginTab} activeOpacity={0.7}>
              <Text style={styles.loginLink}>Log In</Text>
            </TouchableOpacity>
          </View>

          {/* ── Footer ── */}
          <View style={styles.footer}>
            <ShieldCheck size={14} color={C.mosGreen} style={{ marginRight: 6 }} />
            <Text style={styles.footerText}>Bank-grade 256-bit SSL encryption</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: C.bg,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },

  // ── Header ──
  headerSection: {
    paddingHorizontal: 28,
    paddingTop: 36,
    paddingBottom: 28,
    overflow: 'hidden',
  },
  blob1: {
    position: 'absolute',
    top: -20,
    right: -30,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: C.earthYellow,
    opacity: 0.15,
  },
  blob2: {
    position: 'absolute',
    top: 40,
    right: 30,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: C.mosGreen,
    opacity: 0.1,
  },
  appName: {
    fontSize: 13,
    fontWeight: '800',
    color: C.mosGreen,
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 14,
  },
  heading: {
    fontSize: 30,
    fontWeight: '800',
    color: C.pakistanGreen,
    marginBottom: 6,
  },
  subheading: {
    fontSize: 14,
    color: C.mosGreen,
    lineHeight: 20,
  },

  // ── Card ──
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    marginHorizontal: 16,
    padding: 24,
    shadowColor: C.pakistanGreen,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  roleBadge: {
    backgroundColor: '#F5F8F0',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#D8E4C8',
  },
  roleBadgeText: {
    fontSize: 12,
    color: C.mosGreen,
    fontWeight: '500',
  },
  roleBadgeRole: {
    fontWeight: '800',
    color: C.pakistanGreen,
  },

  // ── Inputs ──
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: C.pakistanGreen,
    marginBottom: 8,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: C.border,
    borderRadius: 12,
    backgroundColor: C.inputBg,
    paddingHorizontal: 14,
    height: 52,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: C.pakistanGreen,
    height: '100%',
  },
  eyeBtn: {
    padding: 6,
  },
  passwordHelper: {
    marginTop: 6,
    fontSize: 12,
    color: C.mosGreen,
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
    borderColor: C.border,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
    flexShrink: 0,
  },
  checkboxChecked: {
    backgroundColor: C.pakistanGreen,
    borderColor: C.pakistanGreen,
  },
  checkboxInner: {
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: C.bg,
  },
  checkboxText: {
    flex: 1,
    fontSize: 13,
    color: C.mosGreen,
    lineHeight: 20,
  },
  checkboxLink: {
    fontWeight: '700',
    color: C.pakistanGreen,
  },

  // ── Sign Up button ──
  signUpBtn: {
    backgroundColor: C.pakistanGreen,
    borderRadius: 14,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  signUpBtnText: {
    color: C.bg,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.3,
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
    backgroundColor: C.border,
  },
  dividerText: {
    fontSize: 11,
    fontWeight: '600',
    color: C.mosGreen,
    letterSpacing: 0.5,
  },

  // ── Social buttons ──
  socialRow: {
    flexDirection: 'row',
    gap: 12,
  },
  socialBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: C.border,
    borderRadius: 12,
    height: 48,
  },
  socialLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: C.pakistanGreen,
  },

  // ── Already have account ──
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loginText: {
    fontSize: 14,
    color: C.mosGreen,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '700',
    color: C.pakistanGreen,
    textDecorationLine: 'underline',
  },

  // ── Footer ──
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E8E2CA',
    marginHorizontal: 16,
    borderRadius: 8,
  },
  footerText: {
    fontSize: 12,
    color: C.mosGreen,
  },
});