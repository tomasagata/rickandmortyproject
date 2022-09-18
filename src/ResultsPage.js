import { View, Text, StyleSheet, Image, TextInput, Pressable, Alert } from 'react-native';
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
        justifyContent: 'space-around',
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

const CharacterCards = props => {
    return (
        <>
        </>
    );
};

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
            <CharacterCards />
        </View>


    </View>
  );
};

export default ResultsPage;
