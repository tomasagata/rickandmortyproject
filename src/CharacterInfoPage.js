import React from 'react';
import {View, Text, Image, TextInput, Button} from 'react-native';

const CharacterInfoPage = () => {
    const [characterInfo, setCharacterInfo] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [url, setUrl] = React.useState('https://rickandmortyapi.com/api/character/578')
    
    React.useEffect(() => { 
        getCharacter(); 
    }, [])  // los primeros parentesis no hacen nada, donde van las llaves va el código, los corchetes tienen las variables de estado? Funciona como componentDidMount
    //como en la llave va lo que uso en use efect, pongo el getCharacter ahí
    //Si pongo los corchetes afuera del parentesis, me refreshea al instante!!
    function getCharacter(){
        setLoading(true)
    
        fetch (url)
          .then (res => res.json()) /** una vez que el servidor responde, la respuesta se convierte en json */
          .then( res => {
            console.log(res)
            setCharacterInfo(res)
            setLoading(false)
          });
        };

    return (
        <View>
            <Text>Character Name: { characterInfo.name }</Text>
            <Image style={{ height: 180, width: 180}}
            source={{uri: characterInfo.image}}/>

            <Text>Information</Text>
            <Text>Status</Text><Text>Character Status</Text>
            <Text>Species</Text><Text>Character Species</Text>
            <Text>Type</Text><Text>Character Type</Text>
            <Text>Gender</Text><Text>Character Gender</Text>

            <Text>Origin</Text>
            <Text>Name</Text><Text>Character Origin</Text>

            <Text>First Seen In</Text>
            <Text>Episode</Text><Text>Character Episode</Text>
        </View>
    );
};

export default CharacterInfoPage;
