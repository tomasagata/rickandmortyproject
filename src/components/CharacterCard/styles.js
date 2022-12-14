import { StyleSheet } from 'react-native';


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
    favoriteButtonContainer: {
        position: 'absolute',
        display: 'flex',
        left: 0,
        top: 0,
        width: '30%',
        height: undefined,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    favoriteButton: {
        display: 'flex',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    favoriteImage: {
        width: '100%',
        height: '100%',
        // backgroundColor: '#C13A3A',
    },
});

export default characterCardStyles;
