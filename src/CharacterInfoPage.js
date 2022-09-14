import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

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
        width: '100%',
        flex: 1,
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'scroll',
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
        height: 30,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5,
    },
    taggedDataContainerLast: {
        width: '90%',
        height: 30,
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
        width: '90%',
        height: 180,
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
});

const CharacterImage = props => {
    let imageStyle = {
        width: '100%',
        height: undefined,
        aspectRatio: (235 / 93),
    };

    return (
        <Image style={imageStyle} source={props.source}/>
    );
};

const CharacterInfoPage = () => {
    return (
        <View style={styles.viewport}>
            <View style={styles.section}>
                <View style={styles.nameWrapper}>
                    <Text style={styles.characterNameText}>Character Name</Text>
                </View>
                <View style={styles.imageWrapper}>
                    <CharacterImage height={10} width={10} source={require('../img/rick_and_morty_logo.png')}/>
                </View>
            </View>

            <View style={styles.section}>
                <View style={styles.sectionTitleWrapper}>
                    <Text style={styles.sectionTitleText}>Information</Text>
                </View>
                <View style={styles.taggedDataContainer}>
                    <View style={styles.tagWrapper}>
                        <Text style={styles.tagText}>Status</Text>
                    </View>
                    <View style={styles.dataWrapper}>
                        <Text style={styles.dataText}>Character Status</Text>
                    </View>
                </View>
                <View style={styles.taggedDataContainer}>
                    <View style={styles.tagWrapper}>
                        <Text style={styles.tagText}>Species</Text>
                    </View>
                    <View style={styles.dataWrapper}>
                        <Text style={styles.dataText}>Character Species</Text>
                    </View>
                </View>
                <View style={styles.taggedDataContainer}>
                    <View style={styles.tagWrapper}>
                        <Text style={styles.tagText}>Type</Text>
                    </View>
                    <View style={styles.dataWrapper}>
                        <Text style={styles.dataText}>Character Type</Text>
                    </View>
                </View>
                <View style={styles.taggedDataContainerLast}>
                    <View style={styles.tagWrapper}>
                        <Text style={styles.tagText}>Gender</Text>
                    </View>
                    <View style={styles.dataWrapper}>
                        <Text style={styles.dataText}>Character Gender</Text>
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <View style={styles.sectionTitleWrapper}>
                    <Text style={styles.sectionTitleText}>Origin</Text>
                </View>
                <View style={styles.taggedDataContainerLast}>
                    <View style={styles.tagWrapper}>
                        <Text style={styles.tagText}>Name</Text>
                    </View>
                    <View style={styles.dataWrapper}>
                        <Text style={styles.dataText}>Character Origin</Text>
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <View style={styles.sectionTitleWrapper}>
                    <Text style={styles.sectionTitleText}>First Seen In</Text>
                </View>
                <View style={styles.taggedDataContainerLast}>
                    <View style={styles.tagWrapper}>
                        <Text style={styles.tagText}>Episode</Text>
                    </View>
                    <View style={styles.dataWrapper}>
                        <Text style={styles.dataText}>Character Episode</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default CharacterInfoPage;
