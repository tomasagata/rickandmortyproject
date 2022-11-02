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

const App = () => {

    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Results" screenOptions={{headerShown: false}}>
                <Stack.Screen name="Results" component={ResultsPage} />
                <Stack.Screen name="CharacterInfo" component={CharacterInfoPage} />
                <Stack.Screen name="SavedCharacters" component={SavedCharacters} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};


export default App;
