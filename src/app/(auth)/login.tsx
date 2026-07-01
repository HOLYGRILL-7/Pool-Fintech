import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Smartphone, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react-native';

export default function LoginScreen() {
  const router = useRouter();
  const { role } = useLocalSearchParams<{ role: string }>();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');

    if (!phone.trim()) {
      setError('Please enter your phone number');
      return;
    }
    if (!password.trim()) {
      setError('Please enter your password');
      return;
    }

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
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Logo Section */}
          <View style={styles.logoSection}>
            <Image
              source={require('../../../assets/icon.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.appName}>Pool</Text>
            <Text style={styles.tagline}>Collective Trust. Financial Growth.</Text>
          </View>

          {/* Login Card */}
          <View style={styles.card}>
            <Text style={styles.cardHeading}>Welcome Back</Text>

            {/* Phone Number Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <View style={styles.inputContainer}>
                <Smartphone size={20} color="#8BA89E" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="000-000-0000"
                  placeholderTextColor="#8BA89E"
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.inputContainer}>
                <Lock size={20} color="#8BA89E" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
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
                    <EyeOff size={20} color="#8BA89E" />
                  ) : (
                    <Eye size={20} color="#8BA89E" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Error Message */}
            {error ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            {/* Forgot Password */}
            <TouchableOpacity style={styles.forgotPassword} activeOpacity={0.7} onPress={handleForgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Log In Button */}
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin} activeOpacity={0.9}>
              <Text style={styles.loginButtonText}>Log In →</Text>
            </TouchableOpacity>
          </View>

          {/* Bottom Register Link */}
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>
              New to Pool?{' '}
              <Text style={styles.registerLink} onPress={handleRegister}>
                Register Account
              </Text>
            </Text>
          </View>
        </ScrollView>

      </KeyboardAvoidingView>

        {/* SSL Encryption Footer */}
        <View style={styles.footer}>
          <ShieldCheck size={16} color="#8BA89E" style={styles.shieldIcon} />
          <Text style={styles.footerText}>Bank-grade 256-bit SSL encryption</Text>
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1F1A',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 16,
    marginBottom: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  tagline: {
    fontSize: 14,
    color: '#8BA89E',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#162820',
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#2ECC71',
    padding: 24,
    borderWidth: 1,
    borderColor: '#1E3328',
    marginBottom: 24,
  },
  cardHeading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#8BA89E',
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1E3328',
    borderRadius: 8,
    backgroundColor: '#162820',
    paddingHorizontal: 12,
    height: 48,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#FFFFFF',
    height: '100%',
  },
  eyeButton: {
    padding: 8,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2ECC71',
  },
  errorContainer: {
    backgroundColor: '#1E3328',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DC2626',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#F59E0B',
    height: 48,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#0D1F1A',
    fontSize: 16,
    fontWeight: '700',
  },
  registerContainer: {
    alignItems: 'center',
  },
  registerText: {
    fontSize: 14,
    color: '#8BA89E',
  },
  registerLink: {
    fontWeight: '600',
    color: '#2ECC71',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingBottom: 16,
  },
  shieldIcon: {
    marginRight: 6,
  },
  footerText: {
    fontSize: 12,
    color: '#8BA89E',
  },
});