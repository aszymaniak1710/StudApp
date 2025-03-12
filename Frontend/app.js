import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const api = axios.create({
    baseURL: 'http://192.168.1.26:8080', // Adres backendu Spring Boot
});

// ✅ Interceptor dodający token do każdego requestu
api.interceptors.request.use(async (config) => {
    // const token = await AsyncStorage.getItem('token');
    const token = "123";
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// ✅ Interceptor obsługujący błędne tokeny (401 Unauthorized)
api.interceptors.response.use(
    (response) => response, // Jeśli response jest OK, zwracamy normalnie
    async (error) => {
        if (error.response?.status === 401) {
            Alert.alert('Sesja wygasła', 'Musisz się zalogować ponownie.');
            await AsyncStorage.removeItem('token'); // Usuwamy token
            // Można przekierować na stronę logowania, jeśli mamy dostęp do nawigacji
        }
        return Promise.reject(error);
    }
);

export default api;
