import { StyleSheet } from 'react-native';

/*
    nesting hierarchy is defined as such:

    viewport {
        section {
            container (0 or more){
                wrapper{
                    tagType{
                        ...
                    }
                }
            }
        }
    }

*/

const styles = StyleSheet.create({
    // viewport
    viewport: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 1,
    },
    // sections
    section: {
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
    taggedDataContainer: {
        width: '90%',
        height: 50,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5,
    },
    taggedDataContainerLast: {
        width: '90%',
        height: 50,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 10,
    },
    // wrappers
    nameWrapper: {
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
    imageWrapper: {
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
    sectionTitleWrapper: {
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
    tagWrapper: {
        display: 'flex',
        height: '100%',
        width: '32.5%',
        borderRadius: 10,
        backgroundColor: '#9A2E2E',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dataWrapper: {
        display: 'flex',
        width: '62.5%',
        height: '100%',
        borderRadius: 10,
        backgroundColor: '#9A2E2E',
        justifyContent: 'center',
        alignItems: 'center',
    },
    // text tags
    dataText: {
        color: '#FFFFFF',
        fontSize: 15,
    },
    tagText: {
        color: '#FFFFFF',
        fontSize: 15,
    },
    characterNameText: {
        color: '#FFFFFF',
        fontSize: 30,
    },
    sectionTitleText: {
        color: '#FFFFFF',
        fontSize: 20,
    },
    characterImage: {
        resizeMode: 'contain',
        height: '100%',
        width: '100%',
    },
    pressable: {
        position: 'absolute',
        right: 0,
        top: 0,
        height: 50,
        width: 50,
        backgroundColor: '#C13A3A',
        zIndex: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 1,
        borderBottomLeftRadius: 10,
        borderStyle: 'solid',
        borderColor: '#9A2E2E',
        borderWidth: 3,
    },
    backButton: {
        fontSize: 30,
    },
    scrollView: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'scroll',
    },
});

export default styles;
