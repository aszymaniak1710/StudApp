import * as React from 'react';
import { View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  createStaticNavigation,
  useNavigation,
} from '@react-navigation/native';
import { Button } from '@react-navigation/elements';
import PointsView from "../Views/PointsView"
import LoginView from "../Views/LoginView"
import RegisterView from "../Views/RegisterView"


function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.navigate('Mapa')}>
        Go to notifications
      </Button>
    </View>
  );
}

function NotificationsScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()}>Go back home</Button>
    </View>
  );
}

// @ts-ignore
// @ts-ignore
const Drawer = createDrawerNavigator({
  screens: {
      Mapa: {
        screen: PointsView,
        initialParams: { isButtonVisible: false }
      },
    Home: HomeScreen,
      'Zarejestruj nowy punkt': {
        screen: PointsView,
        initialParams: { isButtonVisible: true}
      },

    Logowanie: LoginView,
    Rejestracja: RegisterView
  },
});

const Navigation = createStaticNavigation(Drawer);

export default function App() {
  return <Navigation />;
}
