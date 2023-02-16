import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from './screens/Home';
import SVGsScreen from './screens/SVGs';



const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName='SVGs'>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SVGs" component={SVGsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
