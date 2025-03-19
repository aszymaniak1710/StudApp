import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import api from './api'; // Twój plik API

// Import nowych ekranów
import NewScreen from './NewScreen';  // Zakładam, że ten plik już istnieje
import SignUpScreen from './SignUpScreen'; // Import ekranu z mapą
import LoginScreen from './LoginScreen';

// Typ dla props nawigacji
type HomeScreenProps = {
  navigation: any;
};

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [message, setMessage] = useState<string>('Loading...');
  const API_URL = 'http://192.168.1.26:8080/hello';

  const fetchMessage = async () => {
    try {
      const response = await api.get(API_URL);  // Użyj 'api' z interceptorami
      setMessage(response.data);  // Ustaw odpowiedź w stanie
    } catch (error) {
      console.error('Error fetching message:', error);
      setMessage('Error fetching data');  // W przypadku błędu
    }
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hello from React Native!</Text>
      <Text>{message}</Text>
      <Button title="Fetch Message" onPress={fetchMessage} />
      <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
      <Button title="Go to Map" onPress={() => navigation.navigate('NewScreen')} />
      <Button title="Go to Register" onPress={() => navigation.navigate('SignUpScreen')} />
      <Button title="Go to Login" onPress={() => navigation.navigate('LoginScreen')} />
      <StatusBar style="auto" />
    </View>
  );
};

// Ekran szczegółów
const DetailsScreen = () => (
  <View style={styles.container}>
    <Text style={styles.header}>This is the Details Screen</Text>
  </View>
);

// Create stack navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="NewScreen" component={NewScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
