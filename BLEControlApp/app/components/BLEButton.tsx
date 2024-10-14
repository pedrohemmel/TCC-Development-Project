import React, { useState, useEffect } from 'react';
import { Button, View, Alert, StyleSheet } from 'react-native';
import { checkBleStatus, toggleBluetooth, monitorBleState } from '../hooks/useBleManager';

const BluetoothToggle: React.FC = () => {
  // Estado com tipagem explícita (booleano)
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  useEffect(() => {
    // Verificar o estado inicial do BLE ao montar o componente
    checkBleStatus(setIsEnabled);

    // Monitorar as mudanças no estado do BLE
    const subscription = monitorBleState(setIsEnabled);

    // Limpar a subscrição quando o componente for desmontado
    return () => subscription.remove();
  }, []);

  const handleToggle = (): void => {
    toggleBluetooth(isEnabled, setIsEnabled);
  };

  return (
    <View style={styles.container}>
      <Button
        title={isEnabled ? 'Desativar Bluetooth' : 'Ativar Bluetooth'}
        onPress={handleToggle}
        color={isEnabled ? 'red' : 'green'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default BluetoothToggle;
