import { StyleSheet } from 'react-native';

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
        backgroundColor: '#265ADE',
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

export {styles, selectButtons};
