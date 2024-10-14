import { BleManager } from 'react-native-ble-plx';
import { Platform, PermissionsAndroid } from 'react-native';

const bleManager = new BleManager();

export const requestBluetoothPermission = async () => {
  if (Platform.OS === 'android' && Platform.Version >= 23) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Permissão para acessar localização',
        message: 'O Bluetooth precisa de acesso à sua localização',
        buttonNeutral: 'Perguntar depois',
        buttonNegative: 'Cancelar',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
};

export const enableBluetooth = async () => {
  return await bleManager.state().then(state => {
    if (state !== 'PoweredOn') {
      bleManager.enable();
    }
  });
};

export const disableBluetooth = async () => {
  return await bleManager.state().then(state => {
    if (state === 'PoweredOn') {
      bleManager.disable();
    }
  });
};
