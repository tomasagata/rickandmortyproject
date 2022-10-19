import React from 'react';
import {Text, Pressable, View, Image} from 'react-native';
import characterCardStyles from './styles';

const CharacterCard = props => {
    if ((props.name === undefined) || (props.image === undefined)){
        return ( <TimedOutCard /> );
    }

    return (
        <View style={characterCardStyles.characterCardContainer}>
            <Pressable onPress={props.onPress} style={characterCardStyles.characterCardPressable }>
                <View style={characterCardStyles.characterImageWrapper}>
                    <Image style={characterCardStyles.characterImage} source={{uri: props.image}}/>
                </View>
                <View style={characterCardStyles.characterNameWrapper}>
                    <Text style={characterCardStyles.characterName}>
                        {props.name}
                    </Text>
                </View>
            </Pressable>
        </View>

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
