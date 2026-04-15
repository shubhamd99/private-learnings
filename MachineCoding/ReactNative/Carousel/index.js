/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';
import App from './App';
import { name as appName } from './app.json';

// SafeAreaProvider must wrap the entire tree so every SafeAreaView
// and useSafeAreaInsets call below it gets the correct inset values.
const Root = () => (
  <SafeAreaProvider>
    <App />
  </SafeAreaProvider>
);

AppRegistry.registerComponent(appName, () => Root);
