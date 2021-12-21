import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { Screens } from './src/screens/screens';
import TabStack from './src/screens/tabs';
import FilterModal from './src/screens/FilterModal';
import CryptoDetailModal from './src/screens/CryptoDetailModal';
import FilterProvider from './src/contexts/filter';
import CoinsProvider from './src/contexts/coins';
import Network from './src/screens/Network';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <CoinsProvider>
        <FilterProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}>
              <Stack.Screen name={Screens.TabStack} component={TabStack} />
              <Stack.Screen
                name={Screens.FilterModal}
                component={FilterModal}
                options={{
                  presentation: 'modal',
                }}
              />
              <Stack.Screen
                name={Screens.CryptoDetailModal}
                component={CryptoDetailModal}
                options={{
                  presentation: 'modal',
                }}
              />
              <Stack.Screen name={Screens.Network} component={Network} />
            </Stack.Navigator>
          </NavigationContainer>
        </FilterProvider>
      </CoinsProvider>
      <Toast />
    </SafeAreaProvider>
  );
};

export default App;
