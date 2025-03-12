import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, Button } from 'react-native';
import api from './app';  // Importuj z pliku, gdzie masz ustawioną instancję API

export default function App() {
  // Stan do przechowywania odpowiedzi z backendu
  const [message, setMessage] = useState<string>('Loading...');

  // URL backendu (zamień na swoje lokalne IP)
  const API_URL = 'http://192.168.1.26:8080/hello';  // Zmień na swoje IP

  // Funkcja do wysyłania zapytania GET
  const fetchMessage = async () => {
    try {
      const response = await api.get(API_URL);  // Użyj 'api' z interceptorami
      setMessage(response.data);  // Ustaw odpowiedź w stanie
    } catch (error) {
      console.error('Error fetching message:', error);
      setMessage('Error fetching data');  // W przypadku błędu
    }
  };

  // Użycie useEffect do załadowania danych przy starcie aplikacji
  useEffect(() => {
    fetchMessage();  // Ładowanie danych przy starcie
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hello from React Native!</Text>
      <Text>{message}</Text>
      <Button title="Fetch Message" onPress={fetchMessage} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
