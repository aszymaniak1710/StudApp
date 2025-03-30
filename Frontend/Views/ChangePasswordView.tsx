import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginView from './LoginView'

const ChangePasswordView = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);

    // Przygotowanie danych do wysłania
    const changeData = {
      //username: username,  // Zmieniamy na username jeśli backend tego wymaga
      password: password,
    };

    try {
      // Wyślij dane logowania do backendu
      const response = await axios.post(baseUrl, changeData);
//jak tu będzie wyglądać odpowiedz serwera???

  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Zmiana hasła</Text>

      <TextInput
        style={styles.input}
        placeholder="Nowe hasło"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Zmień hasło" onPress={handleSignIn} disabled={loading} />
      <Text style={styles.footer}>
        Nie masz konta? <Text style={styles.link} onPress={() => navigation.navigate('LoginView')}>Zaloguj się</Text>
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

export default ChangePasswordView;
