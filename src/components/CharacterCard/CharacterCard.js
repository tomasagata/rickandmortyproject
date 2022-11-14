import React, { useRef } from 'react';
import {Text, Pressable, View, Image, Animated} from 'react-native';
import characterCardStyles from './styles';
import database from '@react-native-firebase/database';

const CharacterCard = props => {
    const translateValueRef = useRef(new Animated.Value(0)).current;
    const [favoriteIdObject, setFavoriteIdObject] = React.useState(props.favoriteId);


    if (props.characterData === undefined){
        return ( <TimedOutCard /> );
    }

    const addFavoriteStatus = () => {
        if (props.characterData === undefined) {
            return;
        }
        // Push character and get key
        let data_key = database().ref('favorite_data').push(props.characterData).key;

        // Get key to generate a 'light' favoriteIdObject with pointer to real data object
        let id_object_key = database().ref('favorite_ids').push().key;

        // Create the object to be set
        let favorite_id_object = {
            object_id: id_object_key,
            character_id: props.characterData.id,
            database_id: data_key,
        };

        // Use key to set the real data
        database().ref('favorite_ids').child(id_object_key).set(favorite_id_object);

        // Update the state
        setFavoriteIdObject(favorite_id_object);
    };

    const removeFavoriteStatus = () => {

        // Borro el caracter completo de 'favorite_data'
        database()
        .ref('favorite_data')
        .child(favoriteIdObject.database_id)
        .set(null)
        .then(() => {
            // Una vez terminado, borro el objeto ligero con su puntero de 'favorite_ids'
            database()
            .ref('favorite_ids')
            .child(favoriteIdObject.object_id)
            .set(null)
            .then(() => {
                console.log('Removed character id ' + props.characterData.id + ' from favorites');
            });
        });

        // Actualizo el state
        setFavoriteIdObject(undefined);
    };

    return (
        <Animated.View style={[characterCardStyles.characterCardContainer, {transform: [{translateX: translateValueRef}]}]}>
            <Pressable onPress={props.onPress} style={characterCardStyles.characterCardPressable }>
                <View style={characterCardStyles.favoriteButtonContainer}>
                    <Pressable style={characterCardStyles.favoriteButton} onPress={() => {props.favoritePressCallback(translateValueRef, props.characterData.id);  (props.favoritePressAction === 'add' ? addFavoriteStatus : removeFavoriteStatus)();}}>
                        <Image style={characterCardStyles.favoriteImage} source={require('../../../img/favorite_add.png')}/>
                    </Pressable>
                </View>
                <View style={characterCardStyles.characterImageWrapper}>
                    <Image style={characterCardStyles.characterImage} source={{uri: props.characterData.image}}/>
                </View>
                <View style={characterCardStyles.characterNameWrapper}>
                    <Text style={characterCardStyles.characterName}>
                        {props.characterData.name}
                    </Text>
                </View>
            </Pressable>
        </Animated.View>

    );
};

const TimedOutCard = () => {
    return (
        <View style={characterCardStyles.characterCardContainer}>
            <View style={characterCardStyles.timedOutViewWrapper}>
                <View style={characterCardStyles.timedOutImageWrapper}>
                    <Image style={characterCardStyles.timedOutImage} source={require('../../../img/timedOutIcon.png')} />
                </View>
                <View style={characterCardStyles.timedOutMessageWrapper}>
                    <Text style={characterCardStyles.timedOutMessage}>
                        Something went wrong. Go back and retry in a few minutes
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default CharacterCard;
