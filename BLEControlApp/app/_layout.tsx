import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import BluetoothToggle from './components/BLEButton';

export default function Layout() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Bluetooth Toggle</Text>
      <BluetoothToggle />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
