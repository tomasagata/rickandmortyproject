import React from 'react';
import {View, Text, Image, TextInput, Button } from 'react-native';

const CharacterInfoPage = () => {
    const [characterInfo, setCharacterInfo] = React.useState('')
    const [episodeInfo, setEpisodeInfo] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [url, setUrl] = React.useState('https://rickandmortyapi.com/api/character/578')
    const [selectedValue, setSelectedValue] = React.useState("java");

    React.useEffect(() => { 
        getCharacter(url); 
    }, [])  // los primeros parentesis no hacen nada, donde van las llaves va el código, los corchetes tienen las variables de estado? Funciona como componentDidMount
    //como en la llave va lo que uso en use efect, pongo el getCharacter ahí
    //Si pongo los corchetes afuera del parentesis, me refreshea al instante!!
    function getCharacter(uriCharacter){
        setLoading(true)
        
        fetch (uriCharacter)
          .then (res => res.json()) /** una vez que el servidor responde, la respuesta se convierte en json */
          .then( res => {
            console.log(res)
            setCharacterInfo(res)
            setLoading(false)
            getEpisode(characterInfo.episode)
          });
        };

    function getEpisode(uriEpisode){
        setLoading(true)
        
        fetch (uriEpisode)
            .then (res => res.json()) /** una vez que el servidor responde, la respuesta se convierte en json */
            .then( res => {
            console.log(res) //esto deja que en el node vea los capitulos!
            setEpisodeInfo(res)
            setLoading(false)
        });
    };

//{ characterInfo ? characterInfo.name : 'No hay personaje cargado' } el signo de preg funciona como un bool. Me pregunta si hay algo dentro de characterInfo
//o sea es como un if character info. Si es true me pone character name, si es false  imprime que no hay personaje cargado
    return (
        <View>
            <Text>Character Name: { characterInfo ? characterInfo.name : 'No hay personaje cargado' }</Text> 
            <Image style={{ height: 180, width: 180}}
            source={ {uri:  characterInfo ? characterInfo.image : ''  }}/>

            <Text>Information:</Text>
            <Text>Status: </Text><Text> { characterInfo ? characterInfo.status : 'No hay personaje cargado' } </Text>
            <Text>Species:</Text><Text> { characterInfo ? characterInfo.species : 'No hay personaje cargado' }</Text>
            <Text>Type:</Text><Text>{ characterInfo ? characterInfo.type : 'No hay personaje cargado' }</Text>
            <Text>Gender:</Text><Text>{ characterInfo ? characterInfo.gender : 'No hay personaje cargado' }</Text>

            <Text>Origin:</Text>
            <Text>Name</Text><Text>{ characterInfo ? characterInfo.origin.name : 'No hay personaje cargado' }</Text>

            <Text>First Seen In:</Text>
            <Text>Episode</Text><Text>{ episodeInfo ? episodeInfo.name : 'No hay episodio cargado' }</Text>



        </View>
    );
};

export default CharacterInfoPage;
