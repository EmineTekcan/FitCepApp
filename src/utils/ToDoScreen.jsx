import React from 'react';
import { StyleSheet, View } from 'react-native';
import WeeklyCalendar from 'react-native-weekly-calendar';

export default function App() {
  const sampleEvents = [
    { 'start': '2023-12-17 09:00:00', 'duration': '00:20:00', 'note': 'köpeği yürüyüşe çıkarma' },
    { 'start': '2023-12-18 14:00:00', 'duration': '01:00:00', 'note': 'yoga' },
    { 'start': '2023-12-19 08:00:00', 'duration': '00:30:00', 'note': 'Sabah sporu' },
    { 'start': '2023-12-19 14:00:00', 'duration': '02:00:00', 'note': 'Yoga ve yüzme' },
    { 'start': '2023-12-20 19:00:00', 'duration': '01:00:00', 'note': 'Yemek öncesi kardiyo' },
    { 'start': '2023-12-23 09:30:00', 'duration': '01:00:00', 'note': 'Aktivite 1' },
    { 'start': '2023-12-23 11:00:00', 'duration': '02:00:00', 'note': 'Aktivite 2' },
    { 'start': '2023-12-23 15:00:00', 'duration': '01:30:00', 'note': 'Aktivite 3' },
    { 'start': '2023-12-23 18:00:00', 'duration': '02:00:00', 'note': 'Aktivite 4' },
    { 'start': '2023-12-23 22:00:00', 'duration': '01:00:00', 'note': 'Aktivite 5' }
  ]

  return (
    <View style={styles.container}>
      <WeeklyCalendar events={sampleEvents} style={{ height: 800 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  }
});