import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const bills = [
  { id: '1', invoice: 'INV-00001', patient: 'Rahul Sharma', amount: 1300, status: 'paid', method: 'UPI' },
  { id: '2', invoice: 'INV-00002', patient: 'Priya Patel', amount: 300, status: 'paid', method: 'Cash' },
  { id: '3', invoice: 'INV-00003', patient: 'Amit Kumar', amount: 2150, status: 'partial', method: 'Card' },
  { id: '4', invoice: 'INV-00004', patient: 'Sneha Gupta', amount: 2000, status: 'pending', method: '-' },
];

export default function BillingScreen() {
  const statusColor = { paid: '#059669', partial: '#d97706', pending: '#dc2626' };
  const statusBg = { paid: '#ecfdf5', partial: '#fffbeb', pending: '#fef2f2' };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Revenue Summary */}
      <View style={styles.revenueCard}>
        <Text style={styles.revenueLabel}>This Month</Text>
        <Text style={styles.revenueAmount}>&#8377;85,000</Text>
        <View style={styles.revenueRow}>
          <View style={styles.revenueStat}>
            <Text style={styles.revenueStatValue}>&#8377;4,100</Text>
            <Text style={styles.revenueStatLabel}>Today</Text>
          </View>
          <View style={styles.revenueStat}>
            <Text style={[styles.revenueStatValue, { color: '#fbbf24' }]}>&#8377;3,150</Text>
            <Text style={styles.revenueStatLabel}>Pending</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Recent Bills</Text>
      {bills.map(bill => (
        <TouchableOpacity key={bill.id} style={styles.card}>
          <View style={styles.billInfo}>
            <Text style={styles.patient}>{bill.patient}</Text>
            <Text style={styles.invoice}>{bill.invoice} | {bill.method}</Text>
          </View>
          <View style={styles.billRight}>
            <Text style={styles.amount}>&#8377;{bill.amount.toLocaleString()}</Text>
            <View style={[styles.badge, { backgroundColor: statusBg[bill.status] }]}>
              <Text style={[styles.badgeText, { color: statusColor[bill.status] }]}>
                {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
      <View style={{ height: 80 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb', padding: 16 },
  revenueCard: { backgroundColor: '#2563eb', borderRadius: 20, padding: 20, marginBottom: 20 },
  revenueLabel: { color: '#bfdbfe', fontSize: 13 },
  revenueAmount: { color: '#fff', fontSize: 36, fontWeight: 'bold', marginTop: 4 },
  revenueRow: { flexDirection: 'row', marginTop: 16, gap: 20 },
  revenueStat: {},
  revenueStatValue: { color: '#fff', fontSize: 18, fontWeight: '700' },
  revenueStatLabel: { color: '#bfdbfe', fontSize: 11, marginTop: 2 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1f2937', marginBottom: 12 },
  card: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#f3f4f6' },
  billInfo: {},
  patient: { fontSize: 15, fontWeight: '600', color: '#1f2937' },
  invoice: { fontSize: 12, color: '#6b7280', marginTop: 3 },
  billRight: { alignItems: 'flex-end' },
  amount: { fontSize: 16, fontWeight: 'bold', color: '#1f2937' },
  badge: { marginTop: 4, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12 },
  badgeText: { fontSize: 10, fontWeight: '600' },
  fab: { position: 'absolute', bottom: 20, right: 20, width: 56, height: 56, borderRadius: 16, backgroundColor: '#2563eb', justifyContent: 'center', alignItems: 'center', elevation: 8 },
  fabText: { color: '#fff', fontSize: 28, fontWeight: '300' },
});
