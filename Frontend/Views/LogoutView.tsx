import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '../Context/AuthContext'

const LogoutView = () => {
  const navigation = useNavigation();
    const { logout } = useAuth();

  const handleLogout = async () => {
    // Usuwanie tokena z AsyncStorage
    await AsyncStorage.removeItem('jwtToken');
    await AsyncStorage.removeItem('roleid');
    logout();
    Alert.alert("Zostałeś wylogowany");
    // Przekierowanie na stronę logowania
    navigation.navigate('Mapa');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Jesteś pewien, że chcesz się wylogować?</Text>
      <Button title="Wyloguj się" onPress={handleLogout} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default LogoutView;
