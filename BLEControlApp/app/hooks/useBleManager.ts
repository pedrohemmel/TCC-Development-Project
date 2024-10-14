import { BleManager, State } from 'react-native-ble-plx';
import { PermissionsAndroid, Platform, Alert } from 'react-native';

// Tipagem para a função setState
type SetStateType = React.Dispatch<React.SetStateAction<boolean>>;

const manager = new BleManager();

// Função para checar o estado do BLE no dispositivo
export const checkBleStatus = async (setIsEnabled: SetStateType): Promise<void> => {
  try {
    const state: State = await manager.state();
    setIsEnabled(state === 'PoweredOn'); // Define como true se o estado for "PoweredOn"
  } catch (error: any) {
    Alert.alert('Erro', 'Não foi possível checar o estado do BLE: ' + error.message);
  }
};

// Função para alternar o estado do Bluetooth
export const toggleBluetooth = async (isEnabled: boolean, setIsEnabled: SetStateType): Promise<void> => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        title: 'Permissão para acessar o Bluetooth',
        message: 'Este aplicativo precisa de acesso ao Bluetooth.',
        buttonNeutral: 'Perguntar depois',
        buttonNegative: 'Cancelar',
        buttonPositive: 'OK',
      }
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      Alert.alert('Permissão negada', 'Não foi possível acessar o Bluetooth.');
      return;
    }
  }

  try {
    if (isEnabled) {
      await manager.disable(); // Método para desativar o Bluetooth (baseado na plataforma)
      setIsEnabled(false);
      Alert.alert('Bluetooth', 'O Bluetooth foi desativado.');
    } else {
      await manager.enable(); // Método para ativar o Bluetooth (baseado na plataforma)
      setIsEnabled(true);
      Alert.alert('Bluetooth', 'O Bluetooth foi ativado.');
    }
  } catch (error: any) {
    Alert.alert('Erro', `Não foi possível alterar o estado do Bluetooth: ${error.message}`);
  }
};

// Monitorar as mudanças no estado do BLE
export const monitorBleState = (setIsEnabled: SetStateType) => {
  const subscription = manager.onStateChange((state: State) => {
    const isOn = state === 'PoweredOn';
    setIsEnabled(isOn);
    if (isOn) {
      Alert.alert('Bluetooth', 'O Bluetooth foi ativado com sucesso.');
    } else {
      Alert.alert('Bluetooth', 'O Bluetooth foi desativado.');
    }
  }, true); // Inicia imediatamente a verificação

  return subscription;
};
