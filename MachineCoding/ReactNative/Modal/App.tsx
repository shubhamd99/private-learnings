// React
import React from 'react';

// React Native
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Local
import { ModalApp } from './src/ModalApp';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <ModalApp />
    </SafeAreaProvider>
  );
}

export default App;
