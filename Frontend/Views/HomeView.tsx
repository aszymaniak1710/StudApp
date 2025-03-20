import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import api from '../api';

// Import ekranów
import PointsView from './PointsView';
import RegisterView from './RegisterView';
import LoginView from './LoginView';

type HomeScreenProps = {
    navigation: any;
};

const HomeView = ({ navigation }: HomeScreenProps) => {

    return (
        <View style={styles.container}>
            <Text style={styles.header}>StudApp</Text>

            {/*<Button title="HelloTest" onPress={fetchMessage} />*/}
            {/*<Button title="Go to Details" onPress={() => navigation.navigate('DetailsScreen')} />*/}
            <Button title="Mapa" onPress={() => navigation.navigate('Mapa')} />
            <Button title="Rejestracja" onPress={() => navigation.navigate('Rejestracja')} />
            <Button title="Logowanie" onPress={() => navigation.navigate('Logowanie')} />
        </View>
    );
};

const Stack = createStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Strona główna">
                <Stack.Screen name="Strona główna" component={HomeView} />
                {/*<Stack.Screen name="DetailsScreen" component={DetailsScreen} />*/}
                <Stack.Screen name="Mapa" component={PointsView} />
                <Stack.Screen name="Rejestracja" component={RegisterView} />
                <Stack.Screen name="Logowanie" component={LoginView} />
            </Stack.Navigator>
        </NavigationContainer>
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
