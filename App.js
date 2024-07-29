
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from  "./src/Context/AuthContext";
import RegisterScreen from "./src/RegisterScreen/RegisterScreen";
import LoginScreen from './src/LoginScreen/LoginScreen';
import Dashboard from './src/Dashboard/Dashboard';

const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={Dashboard}  options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
