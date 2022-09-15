import { View, Text } from 'react-native';
import React from 'react';

const ResultsPage = () => {
    const [loading, setLoading] = React.useState(false)
    const [charactersInfo, setCharactersInfo] = React.useState('')
    const [episodeInfo, setEpisodeInfo] = React.useState('')


    React.useEffect(() => { 
        getCharacters('https://rickandmortyapi.com/api/character'); 
    }, [])

    function getCharacters(uriCharacter){
        setLoading(true)
        
        fetch (uriCharacter)
          .then (res => res.json()) /** una vez que el servidor responde, la respuesta se convierte en json */
          .then( res => {
            console.log(res)
            setCharactersInfo(res)
            setLoading(false)
            getEpisode(charactersInfo.episode)
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


  return (
    <View>
        <View>
            {/* Vista para las opciones del filtro */}
        </View>

        <View>
            {/* Vista para el apartado de Results */}
        </View>

        <View>
            {/* Vista para el boton de Filtros */}
        </View>

        <View>
            {/* Vista para la FlatList */}
        </View>

        <View>
            {/* Vista para la UI del navegador */}
        </View>
    </View>
  );
};

export default ResultsPage;