import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from './screens/Home';
import SVGsScreen from './screens/SVGExamples';
import SetGameScreen from './screens/SetGame';



const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SVGs" component={SVGsScreen} />
        <Stack.Screen name="SetGame" component={SetGameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
