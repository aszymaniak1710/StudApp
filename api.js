import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { baseUrl } from './Context/AppVariables';

const api = axios.create({
    baseURL: baseUrl, // Adres backendu Spring Boot
});

api.interceptors.request.use(async (config) => {
    const jwtToken = await AsyncStorage.getItem('jwtToken');
    if (jwtToken) {
        config.headers.Authorization = `Bearer ${jwtToken}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response, // Jeśli response jest OK, zwracamy normalnie
    async (error) => {
        if (error.response?.status === 401) {
            Alert.alert('Sesja wygasła', 'Musisz się zalogować ponownie.');
            await AsyncStorage.removeItem('jwtToken');
            // Można przekierować na stronę logowania, jeśli mamy dostęp do nawigacji
        }
        return Promise.reject(error);
    }
);

export default api;
