import { View, Text, StyleSheet } from 'react-native';

export default function AdminProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  label: { fontSize: 24, fontWeight: '600' },
});
