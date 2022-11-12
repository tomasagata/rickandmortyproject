import React, { useRef } from 'react';
import {Text, Pressable, View, Image, Animated} from 'react-native';
import characterCardStyles from './styles';

const CharacterCard = props => {
    const translateValueRef = useRef(new Animated.Value(0)).current;
    if ((props.name === undefined) || (props.image === undefined)){
        return ( <TimedOutCard /> );
    }

    return (
        <Animated.View style={[characterCardStyles.characterCardContainer, {transform: [{translateX: translateValueRef}]}]}>
            <Pressable onPress={props.onPress} style={characterCardStyles.characterCardPressable }>
                <View style={characterCardStyles.favoriteButtonContainer}>
                    <Pressable style={characterCardStyles.favoriteButton} onPress={() => props.favoritePressCallback(translateValueRef, props.id)}>
                        <Image style={characterCardStyles.favoriteImage} source={ require('../../../img/favorite_add.png') }/>
                    </Pressable>
                </View>
                <View style={characterCardStyles.characterImageWrapper}>
                    <Image style={characterCardStyles.characterImage} source={{uri: props.image}}/>
                </View>
                <View style={characterCardStyles.characterNameWrapper}>
                    <Text style={characterCardStyles.characterName}>
                        {props.name}
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
