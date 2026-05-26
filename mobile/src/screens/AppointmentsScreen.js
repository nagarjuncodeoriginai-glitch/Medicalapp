import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const appointments = [
  { id: '1', name: 'Rahul Sharma', time: '09:00 AM', type: 'Consultation', status: 'completed', token: 1 },
  { id: '2', name: 'Priya Patel', time: '09:30 AM', type: 'Follow-up', status: 'completed', token: 2 },
  { id: '3', name: 'Amit Kumar', time: '10:00 AM', type: 'Procedure', status: 'in-progress', token: 3 },
  { id: '4', name: 'Sneha Gupta', time: '10:30 AM', type: 'Consultation', status: 'scheduled', token: 4 },
  { id: '5', name: 'Rajesh Iyer', time: '11:00 AM', type: 'Emergency', status: 'scheduled', token: 5 },
];

export default function AppointmentsScreen() {
  const statusStyles = {
    completed: { bg: '#ecfdf5', color: '#059669', label: 'Done' },
    'in-progress': { bg: '#eff6ff', color: '#2563eb', label: 'Active' },
    scheduled: { bg: '#f3f4f6', color: '#6b7280', label: 'Waiting' },
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Date */}
      <View style={styles.dateRow}>
        <Text style={styles.dateText}>Today, {new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</Text>
        <Text style={styles.countText}>{appointments.length} appointments</Text>
      </View>

      {/* Summary */}
      <View style={styles.summaryRow}>
        <View style={[styles.summaryCard, { backgroundColor: '#ecfdf5' }]}>
          <Text style={[styles.summaryNum, { color: '#059669' }]}>{appointments.filter(a => a.status === 'completed').length}</Text>
          <Text style={styles.summaryLabel}>Done</Text>
        </View>
        <View style={[styles.summaryCard, { backgroundColor: '#eff6ff' }]}>
          <Text style={[styles.summaryNum, { color: '#2563eb' }]}>{appointments.filter(a => a.status === 'in-progress').length}</Text>
          <Text style={styles.summaryLabel}>Active</Text>
        </View>
        <View style={[styles.summaryCard, { backgroundColor: '#f3f4f6' }]}>
          <Text style={[styles.summaryNum, { color: '#6b7280' }]}>{appointments.filter(a => a.status === 'scheduled').length}</Text>
          <Text style={styles.summaryLabel}>Waiting</Text>
        </View>
      </View>

      {/* List */}
      {appointments.map(apt => (
        <TouchableOpacity key={apt.id} style={[styles.card, apt.status === 'in-progress' && styles.activeCard]}>
          <View style={[styles.token, { backgroundColor: statusStyles[apt.status].bg }]}>
            <Text style={[styles.tokenNum, { color: statusStyles[apt.status].color }]}>{apt.token}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.name}>{apt.name}</Text>
            <Text style={styles.detail}>{apt.time} | {apt.type}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: statusStyles[apt.status].bg }]}>
            <Text style={[styles.statusText, { color: statusStyles[apt.status].color }]}>{statusStyles[apt.status].label}</Text>
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
  dateRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  dateText: { fontSize: 18, fontWeight: 'bold', color: '#1f2937' },
  countText: { fontSize: 13, color: '#6b7280' },
  summaryRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  summaryCard: { flex: 1, borderRadius: 12, padding: 14, alignItems: 'center' },
  summaryNum: { fontSize: 24, fontWeight: 'bold' },
  summaryLabel: { fontSize: 11, color: '#6b7280', marginTop: 2 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#f3f4f6' },
  activeCard: { borderColor: '#bfdbfe', backgroundColor: '#f0f7ff' },
  token: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  tokenNum: { fontSize: 16, fontWeight: 'bold' },
  info: { flex: 1, marginLeft: 12 },
  name: { fontSize: 15, fontWeight: '600', color: '#1f2937' },
  detail: { fontSize: 12, color: '#6b7280', marginTop: 3 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  statusText: { fontSize: 11, fontWeight: '600' },
  fab: { position: 'absolute', bottom: 20, right: 20, width: 56, height: 56, borderRadius: 16, backgroundColor: '#2563eb', justifyContent: 'center', alignItems: 'center', elevation: 8 },
  fabText: { color: '#fff', fontSize: 28, fontWeight: '300' },
});
