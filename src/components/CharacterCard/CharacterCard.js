import React, { useRef } from 'react';
import {Text, Pressable, View, Image, Animated} from 'react-native';
import characterCardStyles from './styles';
import { addToFavorites, removeFromFavorites, selectFavoriteIdObjectByCharacterId } from '../../redux/reducers/favoriteCharacters';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { addHistoryItem } from '../../redux/reducers/history';

const CharacterCard = props => {
    const translateValueRef = useRef(new Animated.Value(0)).current;
    const favoriteIdObject = useSelector(selectFavoriteIdObjectByCharacterId(props.characterData.id), shallowEqual);
    const dispatch = useDispatch();


    if (props.characterData === undefined){
        return ( <TimedOutCard /> );
    }

    const favoriteButtonHandler = () => {

        // if there isn't a favoriteIdObject, object is not favorited
        if (favoriteIdObject === undefined) {

            Animated.timing(translateValueRef, {
                toValue: 400,
                duration: 200,
                useNativeDriver: true,
            }).start();

            // Add it to favorites
            dispatch(addToFavorites({characterData: props.characterData}));
            dispatch(addHistoryItem({
                character_id: props.characterData.id,
                action: 'favorite add',
                extraData: '',
            }));
        } else {

            Animated.timing(translateValueRef, {
                toValue: -400,
                duration: 200,
                useNativeDriver: true,
            }).start();

            // Remove from favorites
            dispatch(removeFromFavorites(favoriteIdObject));
            dispatch(addHistoryItem({
                character_id: favoriteIdObject.character_id,
                action: 'favorite remove',
                extraData: '',
            }));
        }

    };

    return (
        <Animated.View style={[characterCardStyles.characterCardContainer, {transform: [{translateX: translateValueRef}]}]}>
            <Pressable onPress={props.onPress} style={characterCardStyles.characterCardPressable }>
                <View style={characterCardStyles.favoriteButtonContainer}>
                    <Pressable style={characterCardStyles.favoriteButton} onPress={favoriteButtonHandler}>
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
