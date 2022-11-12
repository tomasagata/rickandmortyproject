import { View, Text, Image, Pressable, FlatList, Animated } from 'react-native';
import React from 'react';
import {styles} from './styles';
import CharacterCard from '../../components/CharacterCard/CharacterCard';
import database from '@react-native-firebase/database';


const SavedCharacters = ({route, navigation}) => {

    const flatListRef = React.useRef(null);
    const [loading, setLoading] = React.useState(false);
    const [charactersInfo, setCharactersInfo] = React.useState([]);


    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getSavedCharacters();
        });
        return unsubscribe;
    }, [navigation]);

    const goToResults = () => {
        navigation.navigate('Results');
    };

    const getSavedCharacters = () => {
        setLoading(true);

        database()
        .ref()
        .child('favorite_data')
        .once('value')
        .then(
            (snapshot) => {
                let characters = snapshot.val();
                if (characters) {
                    // There are characters in favorites
                    setCharactersInfo(Object.values(characters));
                } else {
                    // There are no characters available
                    setCharactersInfo([]);
                }
                setLoading(false);
            },
            (reason) => {
                console.log('There has been a problem with your fetch operation: ' + reason);
            }
        );
    };


    const handleItemPress = (character) => {
        navigation.navigate('CharacterInfo', character);
    };

    const removeFromFavorites = (translateValueRef, id) => {
        Animated.timing(translateValueRef, {
            toValue: -300,
            duration: 500,
            useNativeDriver: true,
        }).start(() => {
            setCharactersInfo(charactersInfo.filter((c) => c.id !== id));
        });
    };

    // Siguiendo las recomendaciones de reactnative.dev/docs,
    // renderItem de la flatList no debería tener una función anonima
    // puesto que se crea una nueva para cada elemento. En cambio,
    // renderItem debería llamar a una función común, en este caso nuestra
    // renderCharacterCard que recibe un item y devuelve el JSX
    const renderCharacterCard = ({item}) => {
        return (
        <CharacterCard
            onPress={() => handleItemPress(item)}
            characterData={item}
            favoritePressCallback={removeFromFavorites}
            favoritePressAction={'remove'}
        />);
    };



    return (

    <View style={styles.viewport}>

        <View style={styles.headerSection}>
            <View style={styles.resultTextWrapper}>
                <Text style={styles.resultText}>Favorites</Text>
            </View>
            <View style={styles.headerButtonsWrapper}>
                <View style={styles.favoritesButtonWrapper}>
                    <Pressable onPress={goToResults} style={styles.favoritesButton}>
                        <Image style={styles.favoritesButtonImage} source={require('../../../img/favorites.png')}/>
                    </Pressable>
                </View>
            </View>
        </View>

        <View style={styles.resultsSection}>
            <FlatList
                ref={flatListRef}
                style={styles.flatList}
                data={charactersInfo}
                ListHeaderComponent={() =>
                {<Text>No hay personajes cargados</Text>;}}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                renderItem={renderCharacterCard}
                refreshing={loading}
            />
        </View>

    </View>
    );
};

export default SavedCharacters;
