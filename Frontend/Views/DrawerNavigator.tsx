// DrawerNavigator.tsx
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginView from './LoginView';
import RegisterScreen from './RegisterView';
import HomeView from './HomeView';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeView} />
      <Drawer.Screen name="Login" component={LoginView} />
      <Drawer.Screen name="Register" component={RegisterScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
