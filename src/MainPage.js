/*
Este archivo fue creado con la idea de dar una pagina principal,
para luego ir navegando por las distintas páginas de forma fluida.
No obstante, todavia al no haber visto alguna forma de navegar, lo
dejamos como un WIP.
*/

import React, { useState } from 'react';
import {View, Text, Image, TextInput, StyleSheet, TouchableOpacity} from 'react-native';


const styles = StyleSheet.create({
    viewport: {
        height: '100%',
        width: '100%',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    titleSection: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '20%',
        width: '62%',
    },
    formSection: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '40%',
        width: '80%',
    },
    buttonSection: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        alignItems: 'stretch',
        justifyContent: 'center',
        height: '7.5%',
        width: '40%',
    },
    titleImage: {
        width: '100%',
        height: undefined,
        aspectRatio: (235 / 93),
    },
    button: {
        backgroundColor: '#D9D9D9',
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#000000',
    },
    titleImageContainer: {
        height: '70%',
    },
    titleTextContainer :{
        height: '30%',
    },
    titleText: {
        fontFamily: 'Inder',
        fontWeight: '400',
        fontSize: 20,
        lineHeight: 25,
        textAlign: 'center',
        color: '#02B1C8',
    },
    textInputContainer: {
        height: '100%',
        width: '55%',
    },
    pickerInputContainer: {
        height: '100%',
        width: '55%',
        backgroundColor: '#D9D9D9',
        color: '#000000',
        fontSize: 15,
    },
    textInput: {
        height: '100%',
        width: '100%',
        backgroundColor: '#D9D9D9',
        color: '#000000',
        paddingLeft: '10%',
        fontSize: 15,
    },
    pickerInput: {
        color: '#000000',
        lineHeight: '100%',
        fontSize: 15,
    },
    formInputContainer: {
        display: 'flex',
        width: '100%',
        height: '15%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inputTagText: {
        color: '#000000',
    },
    inputTagContainer: {
        width: '35%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const FormButton = props => {
    return (
        <TouchableOpacity style={props.style}>
            <Text style={props.textStyle}>{props.text}</Text>
        </TouchableOpacity>
    );
};

const MainPage = () => {
    const [species, setSpecies] = useState('');
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    // const [status, setStatus] = useState('');
    // const [gender, setGender] = useState('');

    return (
        <View style={styles.viewport}>
            <View style={styles.titleSection}>
                <View style={styles.titleImageContainer}>
                    <Image style={styles.titleImage} source={require('../img/rick_and_morty_logo.png')} />
                </View>
                <View style={styles.titleTextContainer}>
                    <Text style={styles.titleText}>Character Reference</Text>
                </View>
            </View>

            <View style={styles.formSection}>
                <View style={styles.formInputContainer}>
                    <View style={styles.inputTagContainer}>
                        <Text style={styles.inputTagText}>Species</Text>
                    </View>
                    <View style={styles.textInputContainer}>
                        <TextInput style={styles.textInput} onChangeText={setSpecies} value={species} placeholder="Any"/>
                    </View>
                </View>
                <View style={styles.formInputContainer}>
                    <View style={styles.inputTagContainer}>
                        <Text style={styles.inputTagText}>Type</Text>
                    </View>
                    <View style={styles.textInputContainer}>
                        <TextInput style={styles.textInput} onChangeText={setType} value={type} placeholder="Any"/>
                    </View>
                </View>
                <View style={styles.formInputContainer}>
                    <View style={styles.inputTagContainer}>
                        <Text style={styles.inputTagText}>Name</Text>
                    </View>
                    <View style={styles.textInputContainer}>
                        <TextInput style={styles.textInput} onChangeText={setName} value={name} placeholder="Any"/>
                    </View>
                </View>
            </View>

            <View style={styles.buttonSection}>
                <FormButton style={styles.button} text={'Find them'} textStyle={styles.buttonText}/>
            </View>
        </View>
    );
};

export default MainPage;
