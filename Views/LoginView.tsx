import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RegisterView from './RegisterView'
import { useNavigation } from '@react-navigation/native';
import { baseUrl } from '../Context/AppVariables';
import {useAuth} from '../Context/AuthContext'

const LoginView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { login } = useAuth();

  const handleSignIn = async () => {
    setLoading(true);

    // Przygotowanie danych do wysłania
    const loginData = {
      username: username,  // Zmieniamy na username jeśli backend tego wymaga
      password: password,
    };


    try {
      // Wyślij dane logowania do backendu
      const response = await axios.post(baseUrl+'/login', loginData);

        if (response.status == 200){
      // Sprawdzamy odpowiedź
      const [jwtToken, roleid] = response.data;

      if (jwtToken && roleid) {
        // Zapisz token JWT do AsyncStorage lub innego bezpiecznego miejsca
        await AsyncStorage.setItem('jwtToken', jwtToken);
        await AsyncStorage.setItem('roleid', roleid.toString());
        Alert.alert('Zalogowano pomyślnie!');
        login();

        // Możesz przekierować użytkownika na ekran główny po pomyślnym logowaniu
       navigation.navigate('Mapa');
      } else {
          setLoading(false);
        Alert.alert('Błąd logowania', 'Niepoprawne dane logowania');
      }
  } else {
      Alert.alert(response.data)
      }
    } catch (error) {
        setLoading(false);
      console.error('Błąd logowania:', error);
      Alert.alert('Błąd', response.data);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Logowanie</Text>
      <TextInput
        style={styles.input}
        placeholder="Nazwa użytkownika"
        value={username}
        onChangeText={setUsername}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Hasło"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Zaloguj się" onPress={handleSignIn} disabled={loading} />
      <Text style={styles.footer}>
        Nie masz konta? <Text style={styles.link} onPress={() => navigation.navigate('Rejestracja')}>Zarejestruj się</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  footer: {
    textAlign: 'center',
    marginTop: 20,
  },
  link: {
    color: '#007bff',
  },
});

export default LoginView;
