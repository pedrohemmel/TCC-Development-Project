import React, { useState } from 'react';
import { Button, View, Text } from 'react-native';
import { enableBluetooth, disableBluetooth, requestBluetoothPermission } from '../hooks/useBleManager';

const BleButton = () => {
  const [bleEnabled, setBleEnabled] = useState(false);

  const toggleBluetooth = async () => {
    const permissionGranted = await requestBluetoothPermission();
    if (!permissionGranted) return;

    if (bleEnabled) {
      await disableBluetooth();
      setBleEnabled(false);
    } else {
      await enableBluetooth();
      setBleEnabled(true);
    }
  };

  return (
    <View>
      <Text>{bleEnabled ? 'Bluetooth está ligado' : 'Bluetooth está desligado'}</Text>
      <Button title={bleEnabled ? 'Desativar Bluetooth' : 'Ativar Bluetooth'} onPress={toggleBluetooth} />
    </View>
  );
};

export default BleButton;
