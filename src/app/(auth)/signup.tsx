import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function SignupScreen() {
  const router = useRouter();
  const { role } = useLocalSearchParams();

  const handleContinue = () => {
    if (role === 'admin') {
      router.replace('/(admin)/dashboard');
    } else {
      router.replace('/(member)/dashboard');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>signup</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleContinue}
      >
        <Text style={styles.buttonText}>Continue to Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  label: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    backgroundColor: '#0D9488',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
