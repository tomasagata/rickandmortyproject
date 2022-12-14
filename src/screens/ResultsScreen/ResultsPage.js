import { View, Text, Image, TextInput, Pressable, FlatList, Keyboard } from 'react-native';
import React from 'react';
import {styles, selectButtons} from './styles';
import CharacterCard from '../../components/CharacterCard/CharacterCard';
import { shallowEqual, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectShownCharacters, fetchAPICharacters, fetchMoreCharacters } from '../../redux/reducers/apiCharacters';
import { fetchCompleteFavorites } from '../../redux/reducers/favoriteCharacters';


const TaggedTextInput = props => {
    return (
        <View style={styles.taggedInputContainer}>
            <View style={styles.inputTagContainer}>
                <Text style={styles.inputTag}>{props.tag}</Text>
            </View>
            <View style={styles.inputElementContainer}>
                <TextInput
                    style={styles.inputElement}
                    value={props.value}
                    onChangeText={props.onChangeText}
                />
            </View>
        </View>
    );
};


const ResultsPage = ({route, navigation}) => {

    const flatListRef = React.useRef(null);
    const [currentFilters, setCurrentFilters] = React.useState({
        species: route.params?.species ?? '',
        type: route.params?.type ?? '',
        name: route.params?.name ?? '',
        status: route.params?.status ?? '',
        gender: route.params?.gender ?? '',
    });
    const [temporaryFilters, setTemporaryFilters] = React.useState(currentFilters);
    const [filterOptionsStyle, setFilterOptionsStyle] = React.useState(styles.hiddenFilterOptionsSection);
    const shownCharacters = useSelector(selectShownCharacters, shallowEqual);
    const [statusButtonsStyle, setStatusButtonsStyle] = React.useState({
        'alive': selectButtons.unselectedPressable,
        'dead': selectButtons.unselectedPressable,
        'unknown': selectButtons.unselectedPressable,
    });
    const [genderButtonsStyle, setGenderButtonsStyle] = React.useState({
        'male': selectButtons.unselectedPressable,
        'female': selectButtons.unselectedPressable,
        'genderless': selectButtons.unselectedPressable,
        'unknown': selectButtons.unselectedPressable,
    });

    const dispatch = useDispatch();

    React.useEffect(() => {
        let unsubscribe = navigation.addListener('focus', () => {
            dispatch(fetchCompleteFavorites());
        });
        return unsubscribe;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigation]);

    // similar a un didComponentUpdate
    React.useEffect(() => {
        dispatch(fetchAPICharacters({
            species: currentFilters.species,
            type: currentFilters.type,
            name: currentFilters.name,
            status: currentFilters.status,
            gender: currentFilters.gender,
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const goToFavorites = () => {
        navigation.navigate('SavedCharacters');
    };

    const goToHistory = () => {
        navigation.navigate('HistoryScreen');
    };

    const setStatus = (value) => {
        let unSelectedStyle = {
            'alive': selectButtons.unselectedPressable,
            'dead': selectButtons.unselectedPressable,
            'unknown': selectButtons.unselectedPressable,
        };

        let new_status = (value !== temporaryFilters.status) ? value : '';
        setTemporaryFilters({...temporaryFilters, status: new_status});

        if (new_status !== ''){
            unSelectedStyle[new_status] = selectButtons.selectedPressable;
        }
        setStatusButtonsStyle(unSelectedStyle);
    };

    const setGender = (value) => {
        let unSelectedStyle = {
            'male': selectButtons.unselectedPressable,
            'female': selectButtons.unselectedPressable,
            'genderless': selectButtons.unselectedPressable,
            'unknown': selectButtons.unselectedPressable,
        };

        let new_gender = (value !== temporaryFilters.gender) ? value : '';
        setTemporaryFilters({...temporaryFilters, gender: new_gender});

        if (new_gender !== ''){
            unSelectedStyle[new_gender] = selectButtons.selectedPressable;
        }
        setGenderButtonsStyle(unSelectedStyle);
    };


    const showFilterOptions = () => {
        setFilterOptionsStyle(styles.shownFilterOptionsSection);
    };

    const cancelFilter = () => {
        Keyboard.dismiss();
        setFilterOptionsStyle(styles.hiddenFilterOptionsSection);

        setTemporaryFilters(currentFilters);
    };

    const applyFilter = () => {

        dispatch(fetchAPICharacters({
            name: temporaryFilters.name,
            type: temporaryFilters.type,
            status: temporaryFilters.status,
            species: temporaryFilters.species,
            gender: temporaryFilters.gender,
        }));
        Keyboard.dismiss();
        setFilterOptionsStyle(styles.hiddenFilterOptionsSection);
        setCurrentFilters(temporaryFilters);
    };

    const handleItemPress = (character) => {
        navigation.navigate('CharacterInfo', character);
    };

    const fetchMoreData = () => {
        dispatch(fetchMoreCharacters({
            name: currentFilters.name,
            type: currentFilters.type,
            status: currentFilters.status,
            species: currentFilters.species,
            gender: currentFilters.gender,
        }));
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
        />);
    };

    return (

    <View style={styles.viewport}>
        <View style={filterOptionsStyle}>
            <View style={styles.formContainer}>
                <View style={styles.filterFormContainer}>

                    <TaggedTextInput
                        tag={'Species'}
                        value={temporaryFilters.species}
                        onChangeText={text => setTemporaryFilters({...temporaryFilters, species: text})}
                    />

                    <TaggedTextInput
                        tag={'Type'}
                        value={temporaryFilters.type}
                        onChangeText={text => setTemporaryFilters({...temporaryFilters, type: text})}
                    />

                    <TaggedTextInput
                        tag={'Name'}
                        value={temporaryFilters.name}
                        onChangeText={text => setTemporaryFilters({...temporaryFilters, name: text})}
                    />

                    <View style={selectButtons.taggedInputContainer}>
                        <View style={selectButtons.inputTagContainer}>
                            <Text style={selectButtons.inputTag}>Status</Text>
                        </View>
                        <View style={selectButtons.inputElementsContainer}>
                            <View style={selectButtons.pressableWrapper}>
                                <Pressable style={statusButtonsStyle.alive} onPress={() => {setStatus('alive');}}>
                                    <Text style={selectButtons.pressableLabel}>Alive</Text>
                                </Pressable>
                            </View>
                            <View style={selectButtons.pressableWrapper}>
                                <Pressable style={statusButtonsStyle.dead} onPress={() => {setStatus('dead');}}>
                                    <Text style={selectButtons.pressableLabel}>Dead</Text>
                                </Pressable>
                            </View>
                            <View style={selectButtons.pressableWrapper}>
                                <Pressable style={statusButtonsStyle.unknown} onPress={() => {setStatus('unknown');}}>
                                    <Text style={selectButtons.pressableLabel}>Unknown</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>

                    <View style={selectButtons.taggedInputContainer}>
                        <View style={selectButtons.inputTagContainer}>
                            <Text style={selectButtons.inputTag}>Gender</Text>
                        </View>
                        <View style={selectButtons.inputElementsContainer}>
                            <View style={selectButtons.pressableWrapper}>
                                <Pressable style={genderButtonsStyle.male} onPress={() => {setGender('male');}}>
                                    <Text style={selectButtons.pressableLabel}>Male</Text>
                                </Pressable>
                            </View>
                            <View style={selectButtons.pressableWrapper}>
                                <Pressable style={genderButtonsStyle.female} onPress={() => {setGender('female');}}>
                                    <Text style={selectButtons.pressableLabel}>Female</Text>
                                </Pressable>
                            </View>
                            <View style={selectButtons.pressableWrapper}>
                                <Pressable style={genderButtonsStyle.genderless} onPress={() => {setGender('genderless');}}>
                                    <Text style={selectButtons.pressableLabel}>Genderless</Text>
                                </Pressable>
                            </View>
                            <View style={selectButtons.pressableWrapper}>
                                <Pressable style={genderButtonsStyle.unknown} onPress={() => {setGender('unknown');}}>
                                    <Text style={selectButtons.pressableLabel}>Unknown</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.filterFormButtonsContainer}>
                    <Pressable style={styles.formButton} onPress={applyFilter}>
                        <View style={styles.applyButton}>
                            <Text style={styles.buttonText}>Apply</Text>
                        </View>
                    </Pressable>
                    <Pressable style={styles.formButton} onPress={cancelFilter}>
                        <View style={styles.cancelButton}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </View>
                    </Pressable>
                </View>
            </View>

            <View style={styles.flagImageContainer}>
                <Image style={styles.flagImage} source={require('../../../img/flagEnd.png')} />
            </View>
        </View>

        <View style={styles.headerSection}>
            <View style={styles.resultTextWrapper}>
                <Text style={styles.resultText}>Results</Text>
            </View>
            <View style={styles.headerButtonsWrapper}>
                <View style={styles.favoritesButtonWrapper}>
                    <Pressable onPress={goToHistory} style={styles.favoritesButton}>
                        <Image style={styles.favoritesButtonImage} source={require('../../../img/favorites.png')}/>
                    </Pressable>
                </View>
                <View style={styles.favoritesButtonWrapper}>
                    <Pressable onPress={goToFavorites} style={styles.favoritesButton}>
                        <Image style={styles.favoritesButtonImage} source={require('../../../img/favorites.png')}/>
                    </Pressable>
                </View>
                <View style={styles.filterButtonWrapper}>
                    <Pressable onPress={showFilterOptions} style={styles.filterButton}>
                        <Image style={styles.filterButtonImage} source={require('../../../img/filter.png')}/>
                    </Pressable>
                </View>
            </View>
        </View>

        <View style={styles.resultsSection}>
            <FlatList
                ref={flatListRef}
                style={styles.flatList}
                data={shownCharacters}
                onEndReachedThreshold={0.1}
                onEndReached={fetchMoreData}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                renderItem={renderCharacterCard}
            />
        </View>
    </View>
    );
};

export default ResultsPage;
