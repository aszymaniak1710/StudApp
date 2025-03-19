// SignUpScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
//import { firebase } from './firebase'; // Zakładając, że masz poprawnie skonfigurowany firebase.ts
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

  import LoginScreen from './LoginScreen';
  import App from './App';

const SignUpScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);




  const handleSignUp = async () => {
    setLoading(true);
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Rejestracja udana!', `Witaj ${userCredential.user.displayName}`);
      setLoading(false);
      // Możesz przekierować użytkownika na ekran logowania lub od razu na ekran główny
      navigation.navigate('SignIn'); // Przykład przekierowania na ekran logowania
    } catch (error) {
      setLoading(false);
      console.error(error.message);
      Alert.alert('Błąd rejestracji', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Rejestracja</Text>
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
      <Button title="Zarejestruj się" onPress={handleSignUp} disabled={loading} />
      <Text style={styles.footer}>
        Masz już konto? <Text style={styles.link} onPress={() => navigation.navigate('LoginScreen')}>Zaloguj się</Text>
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


export default SignUpScreen;
