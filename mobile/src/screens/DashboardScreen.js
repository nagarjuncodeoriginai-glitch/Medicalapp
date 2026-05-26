import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

export default function DashboardScreen() {
  const stats = [
    { label: 'Patients', value: '248', color: '#3b82f6', bg: '#eff6ff' },
    { label: 'Today Appts', value: '12', color: '#8b5cf6', bg: '#f5f3ff' },
    { label: 'Revenue', value: '85K', color: '#10b981', bg: '#ecfdf5' },
    { label: 'Pending', value: '5', color: '#f59e0b', bg: '#fffbeb' },
  ];

  const todayQueue = [
    { name: 'Rahul Sharma', time: '10:00 AM', type: 'Consultation', status: 'completed', token: 1 },
    { name: 'Priya Patel', time: '10:30 AM', type: 'Follow-up', status: 'completed', token: 2 },
    { name: 'Amit Kumar', time: '11:00 AM', type: 'Procedure', status: 'in-progress', token: 3 },
    { name: 'Sneha Gupta', time: '11:30 AM', type: 'Consultation', status: 'scheduled', token: 4 },
    { name: 'Rajesh Iyer', time: '12:00 PM', type: 'Emergency', status: 'scheduled', token: 5 },
  ];

  const statusColor = { completed: '#10b981', 'in-progress': '#3b82f6', scheduled: '#9ca3af' };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Greeting */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Good Morning, Doctor</Text>
        <Text style={styles.subtext}>Here's your clinic overview</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsGrid}>
        {stats.map((stat, i) => (
          <View key={i} style={[styles.statCard, { backgroundColor: stat.bg }]}>
            <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actions}>
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#eff6ff' }]}>
          <Text style={styles.actionIcon}>+</Text>
          <Text style={styles.actionText}>New Patient</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#f5f3ff' }]}>
          <Text style={styles.actionIcon}>📅</Text>
          <Text style={styles.actionText}>Book Appt</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#ecfdf5' }]}>
          <Text style={styles.actionIcon}>📋</Text>
          <Text style={styles.actionText}>Prescribe</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#fffbeb' }]}>
          <Text style={styles.actionIcon}>💰</Text>
          <Text style={styles.actionText}>Bill</Text>
        </TouchableOpacity>
      </View>

      {/* Today's Queue */}
      <Text style={styles.sectionTitle}>Today's Queue</Text>
      {todayQueue.map((apt, i) => (
        <View key={i} style={styles.queueItem}>
          <View style={[styles.tokenBadge, { backgroundColor: statusColor[apt.status] + '20' }]}>
            <Text style={[styles.tokenText, { color: statusColor[apt.status] }]}>#{apt.token}</Text>
          </View>
          <View style={styles.queueInfo}>
            <Text style={styles.patientName}>{apt.name}</Text>
            <Text style={styles.aptDetails}>{apt.time} | {apt.type}</Text>
          </View>
          <View style={[styles.statusDot, { backgroundColor: statusColor[apt.status] }]} />
        </View>
      ))}
      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb', padding: 16 },
  header: { marginBottom: 20, marginTop: 8 },
  greeting: { fontSize: 24, fontWeight: 'bold', color: '#1f2937' },
  subtext: { fontSize: 14, color: '#6b7280', marginTop: 4 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  statCard: { width: '48%', borderRadius: 16, padding: 16, flexGrow: 1 },
  statValue: { fontSize: 28, fontWeight: 'bold' },
  statLabel: { fontSize: 12, color: '#6b7280', marginTop: 4, fontWeight: '500' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1f2937', marginBottom: 12 },
  actions: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  actionBtn: { flex: 1, borderRadius: 12, padding: 14, alignItems: 'center', gap: 6 },
  actionIcon: { fontSize: 20 },
  actionText: { fontSize: 10, fontWeight: '600', color: '#4b5563' },
  queueItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 8, borderWidth: 1, borderColor: '#f3f4f6' },
  tokenBadge: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  tokenText: { fontSize: 12, fontWeight: 'bold' },
  queueInfo: { flex: 1, marginLeft: 12 },
  patientName: { fontSize: 15, fontWeight: '600', color: '#1f2937' },
  aptDetails: { fontSize: 12, color: '#6b7280', marginTop: 2 },
  statusDot: { width: 10, height: 10, borderRadius: 5 },
});
