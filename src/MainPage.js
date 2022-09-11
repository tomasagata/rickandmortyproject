import React from 'react';
import {View, Text, Image, TextInput, Button} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const MainPage = () => {
    return (
        <View>
            <Image source={require('../img/rick_and_morty_logo.png')}/>
            <Text>Character Reference</Text>

            <Text>Species</Text><TextInput/>
            <Text>Type</Text><TextInput/>
            <Text>Name</Text><TextInput/>
            <Text>Status</Text><Picker/>
            <Text>Gender</Text><Picker/>

            <Button title="Find them" />
        </View>
    );
};

export default MainPage;
