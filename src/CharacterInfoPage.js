import React from 'react';
import {View, Text, Image, TextInput, Button} from 'react-native';

const CharacterInfoPage = () => {
    return (
        <View>
            <Text>Character Name</Text>
            <Image source={require('../img/rick_and_morty_logo.png')}/>

            <Text>Information</Text>
            <Text>Status</Text><Text>Character Status</Text>
            <Text>Species</Text><Text>Character Species</Text>
            <Text>Type</Text><Text>Character Type</Text>
            <Text>Gender</Text><Text>Character Gender</Text>

            <Text>Origin</Text>
            <Text>Name</Text><Text>Character Origin</Text>

            <Text>First Seen In</Text>
            <Text>Episode</Text><Text>Character Episode</Text>
        </View>
    );
};

export default CharacterInfoPage;
