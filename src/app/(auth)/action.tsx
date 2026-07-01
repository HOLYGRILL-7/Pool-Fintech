import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function ActionScreen() {
  const router = useRouter();
  const { role } = useLocalSearchParams<{ role: 'admin' | 'member' }>();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>action</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push({ pathname: '/(auth)/signup', params: { role } })}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push({ pathname: '/(auth)/login', params: { role } })}
      >
        <Text style={styles.buttonText}>Log In</Text>
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
    backgroundColor: '#0D1F1A',
  },
  label: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
    color: '#FFFFFF',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    backgroundColor: '#F59E0B',
    borderRadius: 8,
  },
  buttonText: {
    color: '#0D1F1A',
    fontSize: 16,
    fontWeight: '600',
  },
});
