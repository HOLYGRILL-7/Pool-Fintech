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
import { useRouter } from 'expo-router';
import { X } from 'lucide-react-native';

// ─── Types & Data ─────────────────────────────────────────────────────────────

const CATEGORIES = ['Business', 'Education', 'Health', 'Personal', 'Other'] as const;
type Category = typeof CATEGORIES[number];

// ─── Component ────────────────────────────────────────────────────────────────

export default function CreateGroupModal() {
  const router = useRouter();

  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [contribution, setContribution] = useState('');
  const [memberLimit, setMemberLimit] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('Business');

  return (
    <View style={styles.overlay}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.sheet}>
          {/* Drag handle */}
          <View style={styles.dragHandle} />

          {/* ── Header ── */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Create New Group</Text>
            <TouchableOpacity
              style={styles.closeButton}
              activeOpacity={0.7}
              onPress={() => router.back()}
            >
              <X size={20} color="#8BA89E" />
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* ── Group Name ── */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Group Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Tech Founders Savings"
                placeholderTextColor="#8BA89E"
                value={groupName}
                onChangeText={setGroupName}
                autoCapitalize="words"
              />
            </View>

            {/* ── Description ── */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Describe the group's financial goal and purpose..."
                placeholderTextColor="#8BA89E"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            {/* ── Monthly Contribution Target ── */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Monthly Contribution Target</Text>
              <View style={styles.prefixInputRow}>
                <Text style={styles.prefix}>$</Text>
                <TextInput
                  style={styles.prefixInput}
                  placeholder="0.00"
                  placeholderTextColor="#8BA89E"
                  value={contribution}
                  onChangeText={setContribution}
                  keyboardType="decimal-pad"
                />
              </View>
            </View>

            {/* ── Member Limit ── */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Member Limit (Optional)</Text>
              <TextInput
                style={styles.input}
                placeholder="No limit"
                placeholderTextColor="#8BA89E"
                value={memberLimit}
                onChangeText={setMemberLimit}
                keyboardType="number-pad"
              />
            </View>

            {/* ── Category ── */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Category</Text>
              <View style={styles.chipWrap}>
                {CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <TouchableOpacity
                      key={cat}
                      style={[styles.chip, isActive ? styles.chipActive : styles.chipInactive]}
                      activeOpacity={0.8}
                      onPress={() => setSelectedCategory(cat)}
                    >
                      <Text style={[styles.chipText, isActive ? styles.chipTextActive : styles.chipTextInactive]}>
                        {cat}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* ── Create Group Button ── */}
            <TouchableOpacity style={styles.createButton} activeOpacity={0.9} onPress={() => router.back()}>
              <Text style={styles.createButtonText}>Create Group →</Text>
            </TouchableOpacity>

            {/* ── Cancel ── */}
            <TouchableOpacity
              style={styles.cancelButton}
              activeOpacity={0.7}
              onPress={() => router.back()}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'flex-end',
  },
  keyboardView: {
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#0D1F1A',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '92%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 12,
  },

  // ── Drag handle ──
  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#1E3328',
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 4,
  },

  // ── Header ──
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1E3328',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#162820',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ── Scroll body ──
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 36,
  },

  // ── Inputs ──
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8BA89E',
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#1E3328',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#FFFFFF',
    backgroundColor: '#162820',
  },
  textArea: {
    height: 80,
    paddingTop: 12,
  },
  prefixInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#1E3328',
    borderRadius: 10,
    backgroundColor: '#162820',
    paddingHorizontal: 14,
    height: 48,
  },
  prefix: {
    fontSize: 15,
    fontWeight: '600',
    color: '#8BA89E',
    marginRight: 6,
  },
  prefixInput: {
    flex: 1,
    fontSize: 14,
    color: '#FFFFFF',
    height: '100%',
  },

  // ── Category chips ──
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1.5,
  },
  chipActive: {
    backgroundColor: '#F59E0B',
    borderColor: '#F59E0B',
  },
  chipInactive: {
    backgroundColor: '#162820',
    borderColor: '#1E3328',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
  },
  chipTextActive: {
    color: '#0D1F1A',
  },
  chipTextInactive: {
    color: '#FFFFFF',
  },

  // ── Create button ──
  createButton: {
    backgroundColor: '#F59E0B',
    borderRadius: 12,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    marginBottom: 14,
  },
  createButtonText: {
    color: '#0D1F1A',
    fontSize: 16,
    fontWeight: '700',
  },

  // ── Cancel ──
  cancelButton: {
    alignItems: 'center',
    paddingVertical: 6,
  },
  cancelText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8BA89E',
  },
});