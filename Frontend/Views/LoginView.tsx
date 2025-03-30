import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
import api from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RegisterView from './RegisterView'
import { useNavigation } from '@react-navigation/native';
import { baseUrl } from '../Context/AppVariables';
import {useAuth} from '../Context/AuthContext'
import * as WebBrowser from 'expo-web-browser';

const LoginView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { login, admin } = useAuth();

  const handleSignIn = async () => {
    setLoading(true);

    // Przygotowanie danych do wysłania
    const loginData = {
      username: username,  // Zmieniamy na username jeśli backend tego wymaga
      password: password,
    };


    try {
      // Wyślij dane logowania do backendu
      const response = await api.post(baseUrl+'/mylogin', loginData);

      if (response.status == 200){
        const [jwtToken, roleid] = response.data;

        if (jwtToken && roleid) {
          await AsyncStorage.setItem('jwtToken', jwtToken);
          await AsyncStorage.setItem('roleid', roleid.toString());
          Alert.alert('Zalogowano pomyślnie!');
          login();
	  if (roleid == 'HEAD_ADMIN'|| roleid == 'ADMIN'){
            admin();
            }

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
      Alert.alert('Błąd logowania', 'Niepoprawne dane logowania');
    }
  }
  const handleGoogleLogin = async () => {
    const randomState = Math.floor(Math.random() * 10000000000).toString();
    await AsyncStorage.setItem('state', randomState);
    const googleUrl = `${baseUrl}/oauth2/authorization/google?state=${randomState}`;
    await WebBrowser.openBrowserAsync(googleUrl);
  };

  const handleFinishGoogleLogin = async () => {
    const state = await AsyncStorage.getItem('state');
    if (!state) {
      Alert.alert('Błąd', 'Nie rozpoczęto logowania Google');
      return;
    }
    try {
      const response = await axios.get(`${baseUrl}/finishgooglelogin`, { params: { state: state } });
      if (response.status === 200) {
        const [jwtToken, roleid] = response.data;
        await AsyncStorage.setItem('jwtToken', jwtToken);
        await AsyncStorage.setItem('roleid', roleid.toString());
        Alert.alert('Zalogowano pomyślnie przez Google!');
        login();
        navigation.navigate('Mapa');
      } else {
        Alert.alert('Błąd logowania przez Google');
      }
    } catch (error) {
      Alert.alert('Błąd logowania przez Google');
    }
  };
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
        <Button title="Zaloguj przez Google" onPress={handleGoogleLogin} />
        <Button title="Potwierdź logowanie Google" onPress={handleFinishGoogleLogin} />
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