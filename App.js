// import React from 'react';
// import {View, Text, Button} from 'react-native';
// import { useState } from 'react';
// import MainPage from './src/MainPage';
// import CharacterInfoPage from './src/CharacterInfoPage';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ResultsPage from './src/screens/ResultsScreen/ResultsPage';
import CharacterInfoPage from './src/screens/CharacterInfo/CharacterInfoPage';
import SavedCharacters from './src/screens/SavedCharactersScreen/SavedCharacters';
import firebase from '@react-native-firebase/app';
import firebaseConfig from './.firebaseconfig';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import HistoryScreen from './src/screens/historial/historialScreen';
import MiScreen from './src/screens/MiNuevaScreen';

const App = () => {

    if (!firebase.apps.length){
        firebase.initializeApp(firebaseConfig);
    }
    firebase.database().setPersistenceEnabled(true);
    const Stack = createNativeStackNavigator();

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Results" screenOptions={{headerShown: false}}>
                    <Stack.Screen name="Results" component={ResultsPage} />
                    <Stack.Screen name="CharacterInfo" component={CharacterInfoPage} />
                    <Stack.Screen name="SavedCharacters" component={SavedCharacters} />
                    <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
                    <Stack.Screen name="JAJA" component={MiScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
};


export default App;
