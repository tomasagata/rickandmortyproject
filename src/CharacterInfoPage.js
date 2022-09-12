import React from 'react';
import {View, Text, Image} from 'react-native';

const CharacterInfoPage = () => {
    return (
        <View>
            <View>
                <Text>Character Name</Text>
                <Image source={require('../img/rick_and_morty_logo.png')}/>
            </View>

            <View>
                <Text>Information</Text>
                <Text>Status</Text><Text>Character Status</Text>
                <Text>Species</Text><Text>Character Species</Text>
                <Text>Type</Text><Text>Character Type</Text>
                <Text>Gender</Text><Text>Character Gender</Text>
            </View>

            <View>
                <Text>Origin</Text>
                <Text>Name</Text><Text>Character Origin</Text>
            </View>

            <View>
                <Text>First Seen In</Text>
                <Text>Episode</Text><Text>Character Episode</Text>
            </View>
        </View>
    );
};

export default CharacterInfoPage;
