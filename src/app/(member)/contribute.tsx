import React, { useState } from 'react';
import { type LucideIcon } from 'lucide-react-native';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  X,
  Landmark,
  Smartphone,
  CreditCard,
} from 'lucide-react-native';

// ─── Types ────────────────────────────────────────────────────────────────────

type PaymentMethod = 'bank' | 'mobile' | 'card';

interface MethodOption {
  key: PaymentMethod;
  label: string;
  subtitle: string;
  Icon: LucideIcon;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PAYMENT_METHODS: MethodOption[] = [
  {
    key: 'bank',
    label: 'Bank Transfer',
    subtitle: 'Instant via Open Banking',
    Icon: Landmark,
  },
  {
    key: 'mobile',
    label: 'Mobile Money',
    subtitle: 'M-Pesa, Orange, or Airtel',
    Icon: Smartphone,
  },
  {
    key: 'card',
    label: 'Credit Card',
    subtitle: 'Visa, Mastercard, AMEX',
    Icon: CreditCard,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ContributeModal() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('bank');

  return (
    <View style={styles.overlay}>
      {/* Sheet container */}
      <View style={styles.sheet}>
        {/* ── Header ── */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.closeButton}
            activeOpacity={0.7}
            onPress={() => router.back()}
          >
            <X size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Make Contribution</Text>
          {/* Spacer to balance close button */}
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* ── Amount Card ── */}
          <View style={styles.amountCard}>
            {/* Labels row */}
            <View style={styles.amountLabelRow}>
              <Text style={styles.amountLabel}>AMOUNT DUE</Text>
              <Text style={styles.amountLabel}>PERIOD</Text>
            </View>
            {/* Values row */}
            <View style={styles.amountValueRow}>
              <Text style={styles.amountValue}>$625.00</Text>
              <Text style={styles.periodValue}>October Week 3</Text>
            </View>
          </View>

          {/* ── Payment Method Label ── */}
          <Text style={styles.sectionLabel}>SELECT PAYMENT METHOD</Text>

          {/* ── Payment Method Cards ── */}
          <View style={styles.methodList}>
            {PAYMENT_METHODS.map((method) => {
              const isActive = selectedMethod === method.key;
              return (
                <TouchableOpacity
                  key={method.key}
                  style={[
                    styles.methodCard,
                    isActive ? styles.methodCardActive : styles.methodCardInactive,
                  ]}
                  activeOpacity={0.8}
                  onPress={() => setSelectedMethod(method.key)}
                >
                  {/* Icon circle */}
                  <View style={styles.methodIconCircle}>
                    <method.Icon size={22} color="#FFFFFF" />
                  </View>

                  {/* Text block */}
                  <View style={styles.methodTextBlock}>
                    <Text style={styles.methodLabel}>{method.label}</Text>
                    <Text style={styles.methodSubtitle}>{method.subtitle}</Text>
                  </View>

                  {/* Radio button */}
                  <View style={[styles.radio, isActive && styles.radioActive]}>
                    {isActive && <View style={styles.radioDot} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* ── Divider ── */}
          <View style={styles.divider} />

          {/* ── Summary Rows ── */}
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryRowLabel}>Contribution Amount</Text>
              <Text style={styles.summaryRowValue}>$625.00</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryRowLabel}>Service Fee (0%)</Text>
              <Text style={styles.summaryRowValueGreen}>$0.00</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total to Pay</Text>
              <Text style={styles.totalValue}>$625.00</Text>
            </View>
          </View>

          {/* ── Confirm & Pay Button ── */}
          <TouchableOpacity style={styles.confirmButton} activeOpacity={0.9} onPress={() => router.back()}>
            <Text style={styles.confirmButtonText}>Confirm & Pay →</Text>
          </TouchableOpacity>

          {/* ── Cancel Button ── */}
          <TouchableOpacity
            style={styles.cancelButton}
            activeOpacity={0.8}
            onPress={() => router.back()}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  // Dim the screen behind the sheet
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
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
    elevation: 10,
  },

  // ── Header ──
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#162820',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerSpacer: {
    width: 36,
  },

  // ── Scroll body ──
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 36,
  },

  // ── Amount Card ──
  amountCard: {
    backgroundColor: '#162820',
    borderRadius: 14,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#1E3328',
  },
  amountLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  amountLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#8BA89E',
    letterSpacing: 0.6,
  },
  amountValueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  amountValue: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  periodValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // ── Section label ──
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#8BA89E',
    letterSpacing: 0.8,
    marginBottom: 12,
  },

  // ── Method Cards ──
  methodList: {
    gap: 10,
    marginBottom: 24,
  },
  methodCard: {
    backgroundColor: '#162820',
    borderRadius: 12,
    borderWidth: 1.5,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodCardActive: {
    borderColor: '#F59E0B',
  },
  methodCardInactive: {
    borderColor: '#1E3328',
  },
  methodIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1E3328',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  methodTextBlock: {
    flex: 1,
  },
  methodLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 3,
  },
  methodSubtitle: {
    fontSize: 13,
    color: '#8BA89E',
  },
  // Radio button
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#1E3328',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  radioActive: {
    borderColor: '#F59E0B',
  },
  radioDot: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: '#F59E0B',
  },

  // ── Divider ──
  divider: {
    height: 1,
    backgroundColor: '#1E3328',
    marginBottom: 20,
  },

  // ── Summary ──
  summaryContainer: {
    marginBottom: 28,
    gap: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryRowLabel: {
    fontSize: 14,
    color: '#8BA89E',
  },
  summaryRowValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  summaryRowValueGreen: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2ECC71',
  },
  totalRow: {
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  totalValue: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  // ── Confirm Button ──
  confirmButton: {
    backgroundColor: '#F59E0B',
    borderRadius: 14,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  confirmButtonText: {
    color: '#0D1F1A',
    fontSize: 16,
    fontWeight: '700',
  },

  // ── Cancel Button ──
  cancelButton: {
    backgroundColor: 'transparent',
    borderRadius: 14,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#F59E0B',
  },
  cancelButtonText: {
    color: '#F59E0B',
    fontSize: 16,
    fontWeight: '600',
  },
});