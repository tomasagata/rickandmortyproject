import { StyleSheet } from 'react-native';

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

export default styles;
