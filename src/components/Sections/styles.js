import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    // sections
    section: { //*
        width: '90%',
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: '#C13A3A',
        borderStyle: 'solid',
        borderRadius: 10,
        borderColor: '#9A2E2E',
        borderWidth: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    // containers (1st order)
    taggedDataContainer: { //*
        width: '90%',
        height: 50,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5,
    },
    // wrappers
    nameWrapper: { //*
        display: 'flex',
        width: '90%',
        height: 60,
        borderRadius: 10,
        backgroundColor: '#9A2E2E',
        marginTop: 10,
        marginBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageWrapper: { //*
        display: 'flex',
        flexDirection: 'row',
        width: '90%',
        height: 240,
        marginTop: 5,
        marginBottom: 10,
        borderStyle: 'solid',
        borderRadius: 10,
        borderColor: '#9A2E2E',
        borderWidth: 3,
        backgroundColor: '#9A2E2E',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionTitleWrapper: { //*
        display: 'flex',
        width: '90%',
        height: 40,
        borderRadius: 10,
        backgroundColor: '#9A2E2E',
        marginTop: 10,
        marginBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagWrapper: { //*
        display: 'flex',
        height: '100%',
        width: '32.5%',
        borderRadius: 10,
        backgroundColor: '#9A2E2E',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dataWrapper: { //*
        display: 'flex',
        width: '62.5%',
        height: '100%',
        borderRadius: 10,
        backgroundColor: '#9A2E2E',
        justifyContent: 'center',
        alignItems: 'center',
    },
    // text tags
    dataText: { //*
        color: '#FFFFFF',
        fontSize: 15,
    },
    tagText: { //*
        color: '#FFFFFF',
        fontSize: 15,
    },
    characterNameText: { //*
        color: '#FFFFFF',
        fontSize: 30,
    },
    sectionTitleText: { //*
        color: '#FFFFFF',
        fontSize: 20,
    },
    characterImage: { //*
        resizeMode: 'contain',
        height: '100%',
        width: '100%',
    },
});

export default styles;
