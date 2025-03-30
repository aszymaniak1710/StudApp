import React from 'react';
import 'react-native-gesture-handler';
import { View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Button } from 'react-native'; // Poprawiony import
import PointsView from '../Views/PointsView';
import LoginView from '../Views/LoginView';
import RegisterView from '../Views/RegisterView';
import { AuthProvider, useAuth } from './AuthContext';

// Komponent ekranu głównego
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Go to Mapa" onPress={() => navigation.navigate('Mapa')} />
    </View>
  );
}

// Komponent ekranu powiadomień
function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Go back home" onPress={() => navigation.goBack()} />
    </View>
  );
}

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const { isAuthenticated }  = useAuth(); // Pobranie statusu zalogowania

  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Mapa" component={PointsView} initialParams={{ isButtonVisible: false }} />
      <Drawer.Screen name="Zarejestruj nowy punkt" component={PointsView} initialParams={{ isButtonVisible: true }} />

      {!isAuthenticated && (
        <>
          <Drawer.Screen name="Logowanie" component={LoginView} />
          <Drawer.Screen name="Rejestracja" component={RegisterView} />
        </>
      )}
    </Drawer.Navigator>
  );
};

// Główna nawigacja aplikacji
export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

