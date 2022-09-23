import { View, Text, StyleSheet, Image, TextInput, Pressable, FlatList, Keyboard, TouchableOpacity, Modal } from 'react-native';
import React, {useState} from 'react';
import { Picker } from '@react-native-picker/picker';
import CharacterInfoPage from './CharacterInfoPage';


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

const TaggedPickerInput = props => {
    return (
        <View style={styles.taggedInputContainer}>
            <View style={styles.inputTagContainer}>
                <Text style={styles.inputTag}>{props.tag}</Text>
            </View>
            <View style={styles.inputElementContainer}>
                <Picker
                    style={styles.inputElement}
                    selectedValue={props.selectedValue}
                    onValueChange={props.onValueChange}>
                        {props.children}
                </Picker>
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
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    filterFormButtonsContainer: {
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
    },
    formContainer: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#C13A3A',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    flagImage: {
        width: '100%',
        height: undefined,
        aspectRatio: (421.53 / 118.7),
    },
    taggedInputContainer: {
        width: '100%',
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
        padding: 7,
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
        padding: 7,
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

    const [currentFilters, setCurrentFilters] = useState({
        species: props.species ? props.species : '',
        type: props.type ? props.type : '',
        name: props.name ? props.name : '',
        status: props.status ? props.status : '',
        gender: props.gender ? props.gender : '',
    });
    const [temporaryFilters, setTemporaryFilters] = useState(currentFilters);
    const [modalData, setModalData] = useState({
        characterInfo: {
            id: 0,
            name: '',

        },
        style: styles.characterModal,
        shown: false,
    });
    const [filterOptionsStyle, setFilterOptionsStyle] = useState(styles.hiddenFilterOptionsSection);

    const showFilterOptions = () => {
        setFilterOptionsStyle(styles.shownFilterOptionsSection);
    };

    const cancelFilter = () => {
        Keyboard.dismiss();
        setFilterOptionsStyle(styles.hiddenFilterOptionsSection);
        
        setTemporaryFilters(currentFilters);
    };

    const applyFilter = () => {
        Keyboard.dismiss();
        setOffset(1)
        getCharacters('https://rickandmortyapi.com/api/character/?page=1' + '&name=' + temporaryFilters.name + '&type=' + temporaryFilters.type + '&status=' + temporaryFilters.status + '&species=' + temporaryFilters.species + '&gender' + temporaryFilters.gender); 

        console.log(temporaryFilters)
        
    };

    const [loading, setLoading] = React.useState(false)
    const [charactersInfo, setCharactersInfo] = React.useState([{name: 'elo', status: 'jeje', episode: ['https://rickandmortyapi.com/api/episode/1']},{name: 'elo2', status: 'jeje', episode:['https://rickandmortyapi.com/api/episode/1']}])
    const [modalVisible, setModalVisible] = React.useState(false)
    const [aCharacterInfo, setACharacterInfo] = React.useState({})
    const [offset, setOffset] = React.useState(1);


 

    React.useEffect(() => { 
        getCharacters('https://rickandmortyapi.com/api/character?page=' + offset); 
    }, [])

    function getCharacters(uriCharacter){
       
        setLoading(true)
        
        fetch (uriCharacter)
          .then (res => res.json()) /** una vez que el servidor responde, la respuesta se convierte en json */
          .then( res => {
            
            setCharactersInfo(res.results)
            setOffset(offset + 1)
            
            setLoading(false)

            /**setLocationInfo(res.location)
            setEpisodeInfo(res.episode)*/

          });
        };

    function handleItemPress(character){
        setACharacterInfo(character)
        setModalVisible(true)
    }
    
    function fetchMoreData() {
        fetch ('https://rickandmortyapi.com/api/character/?page='+ offset + '&name=' + temporaryFilters.name + '&status=' + temporaryFilters.status + '&species=' + temporaryFilters.species + '&gender' + temporaryFilters.gender)
        .then (res => res.json()) /** una vez que el servidor responde, la respuesta se convierte en json */
        .then( res => {
          
          setCharactersInfo([...charactersInfo, ...res.results]);
          setOffset(offset + 1)
          
          setLoading(false)
     });
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

                    <TaggedPickerInput
                        tag={'Status'}
                        selectedValue={temporaryFilters.status}
                        onValueChange={text => setTemporaryFilters({...temporaryFilters, status: text})}>
                            <Picker.Item label="Any" value=""/>
                            <Picker.Item label="Dead" value="dead"/>
                            <Picker.Item label="Alive" value="alive"/>
                            <Picker.Item label="Unknown" value="unknown"/>
                    </TaggedPickerInput>

                    <TaggedPickerInput
                        tag={'Gender'}
                        selectedValue={temporaryFilters.gender}
                        onValueChange={text => setTemporaryFilters({...temporaryFilters, gender: text})}>
                            <Picker.Item label="Any" value=""/>
                            <Picker.Item label="Male" value="male"/>
                            <Picker.Item label="Female" value="female"/>
                            <Picker.Item label="Genderless" value="genderless"/>
                            <Picker.Item label="Unknown" value="unknown"/>
                    </TaggedPickerInput>
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
                style={styles.flatList}
                data={charactersInfo}
                onEndReachedThreshold={0.1}
                onEndReached={fetchMoreData}
                ListHeaderComponent={() => 
                {<Text>No hay personajes cargados</Text>}}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => 
                
                <CharacterCard onPress={() => handleItemPress(item)} name={item.name ? item.name.toString() : 'None.'} image={item.image  } /> }
                
                />
        </View>
        <Modal
        animationType="slide"
        transparent={false}
        
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }
    }
      >
          
          <CharacterInfoPage 
          characterInfo={aCharacterInfo} >
              

          </CharacterInfoPage>
      </Modal>

    </View>
    );
};





export default ResultsPage;
