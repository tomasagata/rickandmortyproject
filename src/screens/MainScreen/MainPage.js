/*
Este archivo fue creado con la idea de dar una pagina principal,
para luego ir navegando por las distintas páginas de forma fluida.
No obstante, todavia al no haber terminado el tema de navegación,
lo dejamos para una próxima entrega
*/

import React, { useState } from 'react';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import styles from './styles';



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
                    <Image style={styles.titleImage} source={require('../../../img/rick_and_morty_logo.png')} />
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
