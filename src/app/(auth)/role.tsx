import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function RoleScreen() {
  const router = useRouter();

  const handleRole = (role: 'admin' | 'member') => {
    router.push({ pathname: '/(auth)/action', params: { role } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>role</Text>
      <TouchableOpacity style={styles.button} onPress={() => handleRole('admin')}>
        <Text style={styles.buttonText}>Admin</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleRole('member')}>
        <Text style={styles.buttonText}>Member</Text>
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
