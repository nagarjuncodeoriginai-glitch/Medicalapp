import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const demoPatients = [
  { id: '1', patientId: 'PAT-0001', name: 'Rahul Sharma', phone: '9876543210', age: 35, gender: 'M', visits: 8 },
  { id: '2', patientId: 'PAT-0002', name: 'Priya Patel', phone: '9876543211', age: 28, gender: 'F', visits: 3 },
  { id: '3', patientId: 'PAT-0003', name: 'Amit Kumar', phone: '9876543212', age: 45, gender: 'M', visits: 12 },
  { id: '4', patientId: 'PAT-0004', name: 'Sneha Gupta', phone: '9876543213', age: 22, gender: 'F', visits: 2 },
  { id: '5', patientId: 'PAT-0005', name: 'Rajesh Iyer', phone: '9876543214', age: 55, gender: 'M', visits: 15 },
  { id: '6', patientId: 'PAT-0006', name: 'Meera Singh', phone: '9876543215', age: 32, gender: 'F', visits: 5 },
];

export default function PatientsScreen() {
  const [search, setSearch] = useState('');
  const filtered = demoPatients.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.phone.includes(search));

  const renderPatient = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <View style={[styles.avatar, { backgroundColor: item.gender === 'M' ? '#dbeafe' : '#fce7f3' }]}>
        <Text style={[styles.avatarText, { color: item.gender === 'M' ? '#2563eb' : '#db2777' }]}>{item.name[0]}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.detail}>{item.patientId} | {item.age}y | {item.phone}</Text>
      </View>
      <View style={styles.visits}>
        <Text style={styles.visitCount}>{item.visits}</Text>
        <Text style={styles.visitLabel}>visits</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Search patients by name or phone..."
        value={search}
        onChangeText={setSearch}
        placeholderTextColor="#9ca3af"
      />
      <FlatList
        data={filtered}
        renderItem={renderPatient}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb', padding: 16 },
  search: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, padding: 14, fontSize: 15, marginBottom: 16 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#f3f4f6' },
  avatar: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 18, fontWeight: 'bold' },
  info: { flex: 1, marginLeft: 12 },
  name: { fontSize: 15, fontWeight: '600', color: '#1f2937' },
  detail: { fontSize: 12, color: '#6b7280', marginTop: 3 },
  visits: { alignItems: 'center' },
  visitCount: { fontSize: 18, fontWeight: 'bold', color: '#3b82f6' },
  visitLabel: { fontSize: 10, color: '#9ca3af' },
  fab: { position: 'absolute', bottom: 20, right: 20, width: 56, height: 56, borderRadius: 16, backgroundColor: '#2563eb', justifyContent: 'center', alignItems: 'center', shadowColor: '#2563eb', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8 },
  fabText: { color: '#fff', fontSize: 28, fontWeight: '300' },
});
