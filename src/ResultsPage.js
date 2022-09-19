import { View, Text, StyleSheet, Image, TextInput, Pressable, Alert, FlatList } from 'react-native';
import React, {useState} from 'react';
import { Picker } from '@react-native-picker/picker';


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
            <Pressable style={characterCardStyles.characterCardPressable}>
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

const alertar = () => Alert.alert(
    'Alert Title',
    'My Alert Msg',
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]
);

const ResultsPage = () => {
    const [species, setSpecies] = useState('');
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [status, setStatus] = useState('');
    const [gender, setGender] = useState('');

    return (
    <View style={styles.viewport}>

        <View style={styles.hiddenFilterOptionsSection}>
            <View style={styles.formContainer}>
                <View style={styles.filterFormContainer}>
                    <TaggedTextInput
                        tag={'Species'}
                        value={species}
                        onChangeText={text => setSpecies(text)}
                    />

                    <TaggedTextInput
                        tag={'Type'}
                        value={type}
                        onChangeText={text => setType(text)}
                    />

                    <TaggedTextInput
                        tag={'Name'}
                        value={name}
                        onChangeText={text => setName(text)}
                    />

                    <TaggedPickerInput
                        tag={'Status'}
                        selectedValue={status}
                        onValueChange={(itemValue, itemIndex) => setStatus(itemValue)}>
                            <Picker.Item label="Any" value=""/>
                            <Picker.Item label="Dead" value="dead"/>
                            <Picker.Item label="Alive" value="alive"/>
                            <Picker.Item label="Unknown" value="unknown"/>
                    </TaggedPickerInput>

                    <TaggedPickerInput
                        tag={'Gender'}
                        selectedValue={gender}
                        onValueChange={(itemValue, itemIndex) => setGender(itemValue)}>
                            <Picker.Item label="Any" value=""/>
                            <Picker.Item label="Male" value="male"/>
                            <Picker.Item label="Female" value="female"/>
                            <Picker.Item label="Genderless" value="genderless"/>
                            <Picker.Item label="Unknown" value="unknown"/>
                    </TaggedPickerInput>
                </View>

                <View style={styles.filterFormButtonsContainer}>
                    <Pressable style={styles.formButton}>
                        <View style={styles.applyButton}>
                            <Text style={styles.buttonText}>Apply</Text>
                        </View>
                    </Pressable>
                    <Pressable style={styles.formButton}>
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
                <Pressable onPress={alertar} style={styles.filterButton}>
                    <Image style={styles.filterButtonImage} source={require('../img/filter.png')}/>
                </Pressable>
            </View>
        </View>

        <View style={styles.resultsSection}>
            <FlatList
                style={styles.flatList}
                data={testData}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => <CharacterCard name={item.name} image={item.image}/> }
                keyExtractor={item => item.id} />
        </View>


    </View>
  );
};

const testData = [
    {
        id: 1,
        name: 'Rick Sanchez',
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    },
    {
        id: 2,
        name: 'Morty Smith',
        image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    },
    {
        id: 3,
        name: 'Summer Smith',
        image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
    },
    {
        id: 4,
        name: 'Beth Smith',
        image: 'https://rickandmortyapi.com/api/character/avatar/4.jpeg',
    },
    {
        id: 5,
        name: 'Jerry Smith',
        image: 'https://rickandmortyapi.com/api/character/avatar/5.jpeg',
    },
    {
        id: 6,
        name: 'Rick Sanchez',
        image: 'https://rickandmortyapi.com/api/character/avatar/6.jpeg',
    },
    {
        id: 7,
        name: 'Morty Smith',
        image: 'https://rickandmortyapi.com/api/character/avatar/7.jpeg',
    },
    {
        id: 8,
        name: 'Summer Smith',
        image: 'https://rickandmortyapi.com/api/character/avatar/8.jpeg',
    },
    {
        id: 9,
        name: 'Beth Smith',
        image: 'https://rickandmortyapi.com/api/character/avatar/9.jpeg',
    },
    {
        id: 10,
        name: 'Jerry Smith',
        image: 'https://rickandmortyapi.com/api/character/avatar/10.jpeg',
    },
    {
        id: 11,
        name: 'Rick Sanchez',
        image: 'https://rickandmortyapi.com/api/character/avatar/11.jpeg',
    },
    {
        id: 12,
        name: 'Morty Smith',
        image: 'https://rickandmortyapi.com/api/character/avatar/12.jpeg',
    },
    {
        id: 13,
        name: 'Summer Smith',
        image: 'https://rickandmortyapi.com/api/character/avatar/13.jpeg',
    },
    {
        id: 14,
        name: 'Beth Smith',
        image: 'https://rickandmortyapi.com/api/character/avatar/14.jpeg',
    },
    {
        id: 15,
        name: 'Jerry Smith',
        image: 'https://rickandmortyapi.com/api/character/avatar/15.jpeg',
    },
    {
        id: 16,
        name: 'Rick Sanchez',
        image: 'https://rickandmortyapi.com/api/character/avatar/16.jpeg',
    },
    {
        id: 17,
        name: 'Morty Smith',
        image: 'https://rickandmortyapi.com/api/character/avatar/17.jpeg',
    },
    {
        id: 18,
        name: 'Summer Smith',
        image: 'https://rickandmortyapi.com/api/character/avatar/18.jpeg',
    },
    {
        id: 19,
        name: 'Beth Smith',
        image: 'https://rickandmortyapi.com/api/character/avatar/19.jpeg',
    },
    {
        id: 20,
        name: 'Jerry Smith',
        image: 'https://rickandmortyapi.com/api/character/avatar/20.jpeg',
    },
    {
        id: 21,
        name: 'Rick Sanchez',
        image: 'https://rickandmortyapi.com/api/character/avatar/21.jpeg',
    },
    {
        id: 22,
        name: 'Morty Smith',
        image: 'https://rickandmortyapi.com/api/character/avatar/22.jpeg',
    },
    {
        id: 23,
        name: 'Summer Smith',
        image: 'https://rickandmortyapi.com/api/character/avatar/23.jpeg',
    },
    {
        id: 24,
        name: 'Beth Smith',
        image: 'https://rickandmortyapi.com/api/character/avatar/24.jpeg',
    },
    {
        id: 25,
        name: 'Jerry Smith',
        image: 'https://rickandmortyapi.com/api/character/avatar/25.jpeg',
    },
    {
        id: 26,
        name: 'Rick Sanchez',
        image: 'https://rickandmortyapi.com/api/character/avatar/26.jpeg',
    },
    {
        id: 27,
        name: 'Morty Smith',
        image: 'https://rickandmortyapi.com/api/character/avatar/27.jpeg',
    },
    {
        id: 28,
        name: 'Summer Smith',
        image: 'https://rickandmortyapi.com/api/character/avatar/28.jpeg',
    },
    {
        id: 29,
        name: 'Beth Smith',
        image: 'https://rickandmortyapi.com/api/character/avatar/29.jpeg',
    },
    {
        id: 30,
        name: 'Jerry Smith',
        image: 'https://rickandmortyapi.com/api/character/avatar/30.jpeg',
    },
  ];


export default ResultsPage;
