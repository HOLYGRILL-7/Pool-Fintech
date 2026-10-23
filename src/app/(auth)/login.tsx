import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  StatusBar,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Smartphone, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react-native';

// ─── Palette (from role.tsx warm theme) ──────────────────────────────────────
const C = {
  bg: '#FEFAE0',         // Cornsilk
  pakistanGreen: '#283618',
  mosGreen: '#606C38',
  earthYellow: '#DDA15E',
  tigerEye: '#BC6C25',
  white: '#FEFAE0',
  inputBg: '#F5F0DC',
  border: '#D6CBA8',
  error: '#BC6C25',
};

export default function LoginScreen() {
  const router = useRouter();
  const { role } = useLocalSearchParams<{ role: string }>();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');
    if (!phone.trim()) { setError('Please enter your phone number'); return; }
    if (!password.trim()) { setError('Please enter your password'); return; }
    if (role === 'admin') {
      router.replace('/(admin)/dashboard');
    } else {
      router.replace('/(member)/dashboard');
    }
  };

  const handleForgotPassword = () => {
    Alert.alert(
      'Reset Password',
      'A password reset link will be sent to your registered phone number.',
      [{ text: 'OK' }]
    );
  };

  const handleRegister = () => {
    router.push({ pathname: '/(auth)/signup', params: { role } });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={C.bg} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ── Header ── */}
          <View style={styles.headerSection}>
            {/* Decorative blobs */}
            <View style={styles.blob1} />
            <View style={styles.blob2} />
            <Text style={styles.appName}>PoolUp</Text>
            <Text style={styles.heading}>Welcome back</Text>
            <Text style={styles.subheading}>
              Sign in to continue managing your savings pools.
            </Text>
          </View>

          {/* ── Form Card ── */}
          <View style={styles.card}>

            {/* Role badge */}
            <View style={styles.roleBadge}>
              <Text style={styles.roleBadgeText}>
                Signing in as{' '}
                <Text style={styles.roleBadgeRole}>
                  {role === 'admin' ? 'Admin' : 'Member'}
                </Text>
              </Text>
            </View>

            {/* Phone */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <View style={styles.inputRow}>
                <Smartphone size={18} color={C.mosGreen} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="000-000-0000"
                  placeholderTextColor={C.border}
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
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
            </View>

            {/* Error */}
            {error ? (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            {/* Forgot password */}
            <TouchableOpacity
              style={styles.forgotRow}
              onPress={handleForgotPassword}
              activeOpacity={0.7}
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Log In button */}
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={handleLogin}
              activeOpacity={0.85}
            >
              <Text style={styles.loginBtnText}>Log In →</Text>
            </TouchableOpacity>
          </View>

          {/* ── Register link ── */}
          <View style={styles.registerRow}>
            <Text style={styles.registerText}>New to PoolUp? </Text>
            <TouchableOpacity onPress={handleRegister} activeOpacity={0.7}>
              <Text style={styles.registerLink}>Register Account</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* ── Footer ── */}
        <View style={styles.footer}>
          <ShieldCheck size={14} color={C.mosGreen} style={{ marginRight: 6 }} />
          <Text style={styles.footerText}>Bank-grade 256-bit SSL encryption</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: C.bg,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },

  // ── Header ──
  headerSection: {
    paddingHorizontal: 28,
    paddingTop: 40,
    paddingBottom: 32,
    overflow: 'hidden',
  },
  blob1: {
    position: 'absolute',
    top: -30,
    right: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: C.earthYellow,
    opacity: 0.15,
  },
  blob2: {
    position: 'absolute',
    top: 30,
    right: 20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: C.mosGreen,
    opacity: 0.1,
  },
  appName: {
    fontSize: 13,
    fontWeight: '800',
    color: C.mosGreen,
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  heading: {
    fontSize: 32,
    fontWeight: '800',
    color: C.pakistanGreen,
    marginBottom: 8,
  },
  subheading: {
    fontSize: 15,
    color: C.mosGreen,
    lineHeight: 22,
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
  errorBox: {
    backgroundColor: '#FFF3F0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: C.tigerEye,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  errorText: {
    color: C.tigerEye,
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
  },
  forgotRow: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotText: {
    fontSize: 13,
    fontWeight: '600',
    color: C.tigerEye,
  },

  // ── Login button ──
  loginBtn: {
    backgroundColor: C.pakistanGreen,
    height: 54,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtnText: {
    color: C.bg,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.3,
  },

  // ── Register link ──
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  registerText: {
    fontSize: 14,
    color: C.mosGreen,
  },
  registerLink: {
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
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#E8E2CA',
  },
  footerText: {
    fontSize: 12,
    color: C.mosGreen,
  },
});