// RegisterView.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
import api from "../api";
import { useNavigation } from '@react-navigation/native';
import { baseUrl } from '../Context/AppVariables';

const RegisterView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();


  const handleSignUp = async () => {
    setLoading(true);

    if (password !== password2) {
      Alert.alert("Błąd", "Hasła nie są takie same!");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post(baseUrl + '/register', {
        username: username,
        password: password,
      });

      const jsonResponse = JSON.stringify(response.data);

      if (response.data && response.data.success) {
        Alert.alert('Rejestracja udana!', jsonResponse);
        navigation.navigate('SignIn');
      } else {
        Alert.alert(jsonResponse);
      }
    } catch (error: any) {
      console.error('Błąd rejestracji:', error.message);
      Alert.alert('Błąd rejestracji', 'Wystąpił problem z połączeniem');
    } finally {
      setLoading(false);
    }
  };



  return (
    <View style={styles.container}>
      <Text style={styles.header}>Rejestracja</Text>
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

      <TextInput
          style={styles.input}
          placeholder="Powtórz hasło"
          value={password2}
          onChangeText={setPassword2}
          secureTextEntry
      />

      <Button title="Zarejestruj się" onPress={handleSignUp} disabled={loading} />
      <Text style={styles.footer}>
        Masz już konto? <Text style={styles.link} onPress={() => navigation.navigate('Logowanie')}>Zaloguj się</Text>
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


export default RegisterView;
