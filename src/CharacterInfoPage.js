import React from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';

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
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
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
        resizeMode: 'center',
        width: '100%',
        height: '100%',
    },
});

const CharacterInfoPage = (props) => {
   /** const [characterInfo, setCharacterInfo] = React.useState('')*/
    const [episodeInfo, setEpisodeInfo] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [url, setUrl] = React.useState('https://rickandmortyapi.com/api/character/577')
    const [selectedValue, setSelectedValue] = React.useState("java");

   React.useEffect(() => { 
        getEpisode(props.characterInfo.episode[0]); 
    }, [])  // los primeros parentesis no hacen nada, donde van las llaves va el código, los corchetes tienen las variables de estado? Funciona como componentDidMount
    //como en la llave va lo que uso en use efect, pongo el getCharacter ahí
    //Si pongo los corchetes afuera del parentesis, me refreshea al instante!!
   /** function getCharacter(uriCharacter){
        setLoading(true)
        
        fetch (uriCharacter)
          .then (res => res.json())
          .then( res => {
            console.log(res)
            setCharacterInfo(res)
            setLoading(false)
            try{
                getEpisode(res.episode)

            }catch(e){
                console.log(uriCharacter)
                console.log(e)
            }
            
          });
        };
*/
    function getEpisode(uriEpisode){
        console.log('me trajo esto: ', uriEpisode)
        setLoading(true)
        
        fetch (uriEpisode)
            .then (res => res.json())
            .then( res => {
                
                console.log('me trajo esto: ', res) //esto deja que en el node vea los capitulos!
                setEpisodeInfo(res)
                setLoading(false)
            });
    };
    return (
        <ScrollView contentContainerStyle={styles.viewport}>
            <View style={styles.section}>
                <View style={styles.nameWrapper}>
                    <Text style={styles.characterNameText}>{ props.characterInfo ? props.characterInfo.name.toString() : 'None.' }</Text>
                </View>
                <View style={styles.imageWrapper}>
                    <Image style={styles.characterImage} source={props.characterInfo ? {uri: props.characterInfo.image} : require('../img/rick_and_morty_logo.png')  }/>
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
                        <Text style={styles.dataText}>{ props.characterInfo ? props.characterInfo.status.toString() : 'None.' }</Text>
                    </View>
                </View>
                <View style={styles.taggedDataContainer}>
                    <View style={styles.tagWrapper}>
                        <Text style={styles.tagText}>Species</Text>
                    </View>
                    <View style={styles.dataWrapper}>
                        <Text style={styles.dataText}>{ props.characterInfo ? props.characterInfo.species.toString() : 'None.' }</Text>
                    </View>
                </View>
                <View style={styles.taggedDataContainer}>
                    <View style={styles.tagWrapper}>
                        <Text style={styles.tagText}>Type</Text>
                    </View>
                    <View style={styles.dataWrapper}>
                        <Text style={styles.dataText}>{ props.characterInfo.type ? props.characterInfo.type.toString() : 'None' }</Text>
                    </View>
                </View>
                <View style={styles.taggedDataContainerLast}>
                    <View style={styles.tagWrapper}>
                        <Text style={styles.tagText}>Gender</Text>
                    </View>
                    <View style={styles.dataWrapper}>
                        <Text style={styles.dataText}>{ props.characterInfo ? props.characterInfo.gender.toString() : 'None.' }</Text>
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <View style={styles.sectionTitleWrapper}>
                    <Text style={styles.sectionTitleText}>Origin</Text>
                </View>
                <View style={styles.taggedDataContainerLast}>
                    <View style={styles.tagWrapper}>
                        <Text style={styles.tagText}>Origin</Text>
                    </View>
                    <View style={styles.dataWrapper}>
                        <Text style={styles.dataText}>{ props.characterInfo ? props.characterInfo.origin.name.toString() : 'None'}</Text>
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
                        <Text style={styles.dataText}>{ episodeInfo ? episodeInfo.name.toString() : 'No hay episodio cargado' }</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};
/** { episodeInfo ? episodeInfo.name.toString() : 'No hay episodio cargado' }*/

export default CharacterInfoPage