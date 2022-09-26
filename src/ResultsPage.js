import { View, Text, StyleSheet, Image, TextInput, Pressable, FlatList, Keyboard, Modal } from 'react-native';
import React from 'react';
import CharacterInfoPage from './CharacterInfoPage';

const selectButtons = StyleSheet.create({
    taggedInputContainer: {
        width: '100%',
        flex: 12.5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    inputTagContainer: {
        width: '25%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputTag: {
        fontFamily: 'Inder-Regular',
        color: '#FEFAFA',
    },
    inputElementsContainer: {
        width: '65%',
        height: '80%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        alignContent: 'center',
    },
    pressableWrapper: {
        display: 'flex',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
        borderColor: '#9A2E2E',
        borderWidth: 2,
        borderRadius: 10,
        overflow: 'hidden',
    },
    unselectedPressable: {
        display: 'flex',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D9D9D9',
        paddingHorizontal: '3%',
        paddingVertical: '4%',
    },
    selectedPressable: {
        display: 'flex',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#44CD7B',
        paddingHorizontal: '3%',
        paddingVertical: '4%',
    },
    pressableLabel: {
        fontFamily: 'Inder-Regular',
        color: '#7D7676',
    },
});

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

const CharacterCard = props => {
    if (
        (props.name === undefined) ||
        (props.image === undefined)){
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
                    <Image style={characterCardStyles.timedOutImage} source={require('../img/timedOutIcon.png')} />
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

const characterCardStyles = StyleSheet.create({
    characterCardContainer: {
        width: '100%',
        display: 'flex',
        height: 500,
        backgroundColor: '#D9D9D9',
        borderRadius: 15,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5%',
        borderColor: '#6D6D6D',
        borderStyle: 'solid',
        borderWidth: 3,
    },
    characterCardPressable: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
    },
    characterImageWrapper: {
        width: '100%',
        height: '100%',
    },
    characterNameWrapper: {
        position: 'absolute',
        bottom: -1,
        left: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
        opacity: 0.65,
        height: '15%',
        width: '100%',
    },
    characterImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    characterName: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inder-Regular',
        fontSize: 25,
        color: '#FFFFFF',
    },
    timedOutViewWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    timedOutImageWrapper: {
        width: '25%',
        height: '25%',
        display: 'flex',
    },
    timedOutMessageWrapper: {
        marginTop: '5%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    timedOutImage: {
        resizeMode: 'center',
        width: '100%',
        height: '100%',
    },
    timedOutMessage: {
        color: '#000000',
        fontSize: 15,
        textAlign: 'center',
    },
});

const styles = StyleSheet.create({
    viewport: {
        display: 'flex',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    shownFilterOptionsSection: {
        display: 'flex',
        position: 'absolute',
        left: '0%',
        top: '0%',
        zIndex: 1,
        height: '60%',
        width: '100%',
    },
    hiddenFilterOptionsSection: {
        display: 'flex',
        position: 'absolute',
        left: '0%',
        top: '-60%', // Esto funciona!!!!!
        zIndex: 1,
        height: '60%',
        width: '100%',
    },
    headerSection: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#C13A3A',
        justifyContent: 'space-between',
        width: '100%',
        padding: '2%',
    },
    resultsSection: {
        display: 'flex',
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
    },
    resultTextWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: '5%',
    },
    resultText: {
        fontFamily: 'Inder-Regular',
        fontSize: 30,
        color: '#FFFFFF',
    },
    filterButtonWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '5%',
        width: '20%',
        height: undefined,
        aspectRatio: 1,
    },
    filterButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterButtonImage: {
        resizeMode: 'contain',
        height: '95%',
    },
    filterFormContainer: {
        height: '75%',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    filterFormButtonsContainer: {
        height: '20%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    characterCardsFrame: {

    },
    flagImageContainer: {
        marginTop: -1,
        width: '100%',
        height: '10%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#C13A3A',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    flagImage: {
        width: '110%',
        height: '100%',
        resizeMode: 'stretch',
    },
    taggedInputContainer: {
        width: '100%',
        flex: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    inputTagContainer: {
        width: '25%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputTag: {
        fontFamily: 'Inder-Regular',
        color: '#FEFAFA',
    },
    inputElementContainer: {
        width: '65%',
        height: '80%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
        borderColor: '#9A2E2E',
        borderWidth: 2,
        overflow: 'hidden',
        borderRadius: 20,
    },
    inputElement: {
        flex: 1,
        backgroundColor: '#D9D9D9',
        color: '#7D7676',
        paddingLeft: '8%',
    },
    formButton: {
        width: '40%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    applyButton: {
        flex: 1,
        backgroundColor: '#44CD7B',
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '4%',
        elevation: 6,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: '#B7B7B7',
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '4%',
        elevation: 6,
    },
    buttonText: {
        fontFamily: 'Inder-Regular',
        fontSize: 25,
    },
    flatList: {
        display: 'flex',
        width: '75%',
    },
    flatListContent: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
    },
});

const ResultsPage = props => {

    const flatListRef = React.useRef(null);
    const [currentFilters, setCurrentFilters] = React.useState({
        species: props.species ? props.species : '',
        type: props.type ? props.type : '',
        name: props.name ? props.name : '',
        status: props.status ? props.status : '',
        gender: props.gender ? props.gender : '',
    });
    const [temporaryFilters, setTemporaryFilters] = React.useState(currentFilters);
    const [filterOptionsStyle, setFilterOptionsStyle] = React.useState(styles.hiddenFilterOptionsSection);
    const [loading, setLoading] = React.useState(false);
    const [charactersInfo, setCharactersInfo] = React.useState([{name: 'elo', status: 'jeje', episode: ['https://rickandmortyapi.com/api/episode/1']},{name: 'elo2', status: 'jeje', episode:['https://rickandmortyapi.com/api/episode/1']}]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [aCharacterInfo, setACharacterInfo] = React.useState({});
    const [offset, setOffset] = React.useState(1);
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



    React.useEffect(() => {
        getCharacters('https://rickandmortyapi.com/api/character?page=' + offset);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
        setOffset(1);

        getCharacters(
            'https://rickandmortyapi.com/api/character/?page=1' +
            '&name=' + temporaryFilters.name +
            '&type=' + temporaryFilters.type +
            '&status=' + temporaryFilters.status +
            '&species=' + temporaryFilters.species +
            '&gender=' + temporaryFilters.gender
        );
        Keyboard.dismiss();
        setFilterOptionsStyle(styles.hiddenFilterOptionsSection);
        setCurrentFilters(temporaryFilters);
        console.log(temporaryFilters);
    };

    const getCharacters = (uriCharacter) => {

        setLoading(true);

        fetch(uriCharacter)
        .then(res => res.json()) /** una vez que el servidor responde, la respuesta se convierte en json */
        .then(res => {
            // Preguntar si la query tiene resultados previene que se añadan datos invalidos
            // al flatlist

            setCharactersInfo(res.results);
            setOffset(offset + 1);

            setLoading(false);

            /**setLocationInfo(res.location)
            setEpisodeInfo(res.episode)*/

        })
        .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
        });

        if (flatListRef.current && charactersInfo !== undefined){
            flatListRef.current.scrollToIndex({index: 0});
        }
    };

    const handleItemPress = (character) => {
        setACharacterInfo(character);
        setModalVisible(true);
    };

    const fetchMoreData = () => {
        fetch(
            'https://rickandmortyapi.com/api/character/?' +
            'page=' + offset +
            '&name=' + currentFilters.name +
            '&status=' + currentFilters.status +
            '&species=' + currentFilters.species +
            '&gender' + currentFilters.gender)
        .then(res => res.json()) /** una vez que el servidor responde, la respuesta se convierte en json */
        .then(res => {
            // Preguntar si la query tiene resultados previene que se añadan datos invalidos
            // al flatlist
            if (res.results) {
                setCharactersInfo([...charactersInfo, ...res.results]);
                setOffset(offset + 1);
            }

            setLoading(false);
        })
        .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
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
            name={item.name ? item.name.toString() : 'None.'}
            image={item.image}
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
                <Image style={styles.flagImage} source={require('../img/flagEnd.png')} />
            </View>
        </View>

        <View style={styles.headerSection}>
            <View style={styles.resultTextWrapper}>
                <Text style={styles.resultText}>Results</Text>
            </View>
            <View style={styles.filterButtonWrapper}>
                <Pressable onPress={showFilterOptions} style={styles.filterButton}>
                    <Image style={styles.filterButtonImage} source={require('../img/filter.png')}/>
                </Pressable>
            </View>
        </View>

        <View style={styles.resultsSection}>
            <FlatList
                ref={flatListRef}
                style={styles.flatList}
                data={charactersInfo}
                onEndReachedThreshold={0.1}
                onEndReached={fetchMoreData}
                ListHeaderComponent={() =>
                {<Text>No hay personajes cargados</Text>;}}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                renderItem={renderCharacterCard}
                refreshing={loading}
            />
        </View>
        <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => { setModalVisible(!modalVisible); }}>
            <CharacterInfoPage visibilityCallback={setModalVisible} characterInfo={aCharacterInfo} />
        </Modal>

    </View>
    );
};





export default ResultsPage;
