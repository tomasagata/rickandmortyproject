import {View, Text, Image, Pressable, FlatList} from 'react-native';
import React from 'react';
import {styles} from './styles';
import CharacterCard from '../../components/CharacterCard/CharacterCard';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {
    fetchCompleteFavorites,
    selectAllFavoriteCharacterData,
} from '../../redux/reducers/favoriteCharacters';

const SavedCharacters = ({route, navigation}) => {
    const flatListRef = React.useRef(null);
    const charactersInfo = useSelector(selectAllFavoriteCharacterData, shallowEqual);
    const dispatch = useDispatch();

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // getSavedCharacters();
            dispatch(fetchCompleteFavorites());
        });
        return unsubscribe;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigation]);

    const goToResults = () => {
        navigation.navigate('Results');
    };

    const handleItemPress = character => {
        navigation.navigate('CharacterInfo', character);
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
            />
        );
    };

    return (
        <View style={styles.viewport}>
            <View style={styles.headerSection}>
                <View style={styles.resultTextWrapper}>
                    <Text style={styles.resultText}>Favorites</Text>
                </View>
                <View style={styles.headerButtonsWrapper}>
                    <View style={styles.favoritesButtonWrapper}>
                        <Pressable
                            onPress={goToResults}
                            style={styles.favoritesButton}>
                            <Image
                                style={styles.favoritesButtonImage}
                                source={require('../../../img/favorites.png')}
                            />
                        </Pressable>
                    </View>
                </View>
            </View>

            <View style={styles.resultsSection}>
                <FlatList
                    ref={flatListRef}
                    style={styles.flatList}
                    data={charactersInfo}
                    ListHeaderComponent={() => {
                        <Text>No hay personajes cargados</Text>;
                    }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderCharacterCard}
                />
            </View>
        </View>
    );
};

export default SavedCharacters;
