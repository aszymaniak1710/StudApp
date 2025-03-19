import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

import SignUpScreen from './SignUpScreen'

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);

    // Przygotowanie danych do wysłania
    const loginData = {
      username: email,  // Zmieniamy na username jeśli backend tego wymaga
      password: password,
    };

    try {
      // Wyślij dane logowania do backendu
      const response = await axios.post('http://192.168.18.13:8080/api/login', loginData);

      // Sprawdzamy odpowiedź
      if (response.data.success) {
        // Zapisz token JWT do AsyncStorage lub innego bezpiecznego miejsca
        const jwtToken = response.data.jwtToken;
        // Możesz zapisać token w AsyncStorage lub w stanie aplikacji
        Alert.alert('Zalogowano pomyślnie!', `Token: ${jwtToken}`);

        // Możesz przekierować użytkownika na ekran główny po pomyślnym logowaniu
        navigation.navigate('Home');
      } else {
        Alert.alert('Błąd logowania', response.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.error(error.message);
      Alert.alert('Błąd logowania', 'Wystąpił problem podczas logowania');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Logowanie</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
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
        Nie masz konta? <Text style={styles.link} onPress={() => navigation.navigate('SignUpScreen')}>Zarejestruj się XD</Text>
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

export default LoginScreen;
