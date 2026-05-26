import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const prescriptions = [
  { id: '1', rxNo: 'RX-00001', patient: 'Rahul Sharma', diagnosis: 'Viral Fever', medicines: 2, date: '15 Jan 2024' },
  { id: '2', rxNo: 'RX-00002', patient: 'Priya Patel', diagnosis: 'Migraine', medicines: 1, date: '14 Jan 2024' },
  { id: '3', rxNo: 'RX-00003', patient: 'Amit Kumar', diagnosis: 'Hypertension', medicines: 2, date: '13 Jan 2024' },
  { id: '4', rxNo: 'RX-00004', patient: 'Sneha Gupta', diagnosis: 'Acne', medicines: 3, date: '12 Jan 2024' },
];

export default function PrescriptionScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Recent Prescriptions</Text>
      {prescriptions.map(rx => (
        <TouchableOpacity key={rx.id} style={styles.card}>
          <View style={styles.iconBox}>
            <Text style={styles.icon}>📋</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.name}>{rx.patient}</Text>
            <Text style={styles.diagnosis}>{rx.diagnosis}</Text>
            <Text style={styles.detail}>{rx.rxNo} | {rx.medicines} medicines | {rx.date}</Text>
          </View>
          <TouchableOpacity style={styles.shareBtn}>
            <Text style={styles.shareText}>Share</Text>
          </TouchableOpacity>
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
  title: { fontSize: 18, fontWeight: 'bold', color: '#1f2937', marginBottom: 16 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#f3f4f6' },
  iconBox: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#eef2ff', justifyContent: 'center', alignItems: 'center' },
  icon: { fontSize: 20 },
  info: { flex: 1, marginLeft: 12 },
  name: { fontSize: 15, fontWeight: '600', color: '#1f2937' },
  diagnosis: { fontSize: 13, color: '#2563eb', marginTop: 2, fontWeight: '500' },
  detail: { fontSize: 11, color: '#9ca3af', marginTop: 3 },
  shareBtn: { backgroundColor: '#ecfdf5', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  shareText: { color: '#059669', fontSize: 12, fontWeight: '600' },
  fab: { position: 'absolute', bottom: 20, right: 20, width: 56, height: 56, borderRadius: 16, backgroundColor: '#2563eb', justifyContent: 'center', alignItems: 'center', elevation: 8 },
  fabText: { color: '#fff', fontSize: 28, fontWeight: '300' },
});
