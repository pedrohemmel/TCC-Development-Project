// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();
import React from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import BleButton from './components/BLEButton';

const Layout = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <BleButton />
      </View>
    </SafeAreaView>
  );
};

export default Layout;
