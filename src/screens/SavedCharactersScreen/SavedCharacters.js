import { View, Text, Image, TextInput, Pressable, FlatList, Keyboard, Modal } from 'react-native';
import React from 'react';
import CharacterInfoPage from '../CharacterInfo/CharacterInfoPage';
import {styles, selectButtons} from './styles';
import CharacterCard from '../../components/CharacterCard/CharacterCard';


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


const SavedCharacters = props => {

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
    };

    const getCharacters = (uriCharacter) => {

        setLoading(true);

        fetch(uriCharacter)
        .then(res => res.json()) /** una vez que el servidor responde, la respuesta se convierte en json */
        .then(res => {
            // Preguntar si la query tiene resultados previene que se añadan datos invalidos
            // al flatlist

            setCharactersInfo(res.results);
            setOffset(2);

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
            '&gender=' + currentFilters.gender)
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
                <Image style={styles.flagImage} source={require('../../../img/flagEnd.png')} />
            </View>
        </View>

        <View style={styles.headerSection}>
            <View style={styles.resultTextWrapper}>
                <Text style={styles.resultText}>Results</Text>
            </View>
            <View style={styles.filterButtonWrapper}>
                <Pressable onPress={showFilterOptions} style={styles.filterButton}>
                    <Image style={styles.filterButtonImage} source={require('../../../img/filter.png')}/>
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

export default SavedCharacters;