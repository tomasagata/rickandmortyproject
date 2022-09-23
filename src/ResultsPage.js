import { View, Text, FlatList, TouchableOpacity, Modal } from 'react-native';
import React from 'react';
import CharacterInfoPage from './CharacterInfoPage';

const ResultsPage = (props) => {
    const [loading, setLoading] = React.useState(false)
    const [charactersInfo, setCharactersInfo] = React.useState([{name: 'elo', status: 'jeje', episode: ['https://rickandmortyapi.com/api/episode/1']},{name: 'elo2', status: 'jeje', episode:['https://rickandmortyapi.com/api/episode/1']}])
    const [modalVisible, setModalVisible] = React.useState(false)
    const [aCharacterInfo, setACharacterInfo] = React.useState({})
    const [offset, setOffset] = React.useState(1);
    const [filterValues, setFilteredValues] = React.useState({})

 

    React.useEffect(() => { 
        getCharacters('https://rickandmortyapi.com/api/character?page=' + offset); 
    }, [])

    function getCharacters(uriCharacter){
        setLoading(true)
        
        fetch (uriCharacter)
          .then (res => res.json()) /** una vez que el servidor responde, la respuesta se convierte en json */
          .then( res => {
            setCharactersInfo(res.results)
            setOffset(offset + 1)
            
            setLoading(false)

            /**setLocationInfo(res.location)
            setEpisodeInfo(res.episode)*/
          });
        };

    function handleItemPress(character){
        setACharacterInfo(character)
        setModalVisible(true)
    }
    
    function fetchMoreData() {
        fetch ('https://rickandmortyapi.com/api/character?page=' + offset)
        .then (res => res.json()) /** una vez que el servidor responde, la respuesta se convierte en json */
        .then( res => {
          
          setCharactersInfo([...charactersInfo, ...res.results]);
          setOffset(offset + 1)
          
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
            <FlatList
            data={charactersInfo}
            onEndReachedThreshold={0.1}
            onEndReached={fetchMoreData}
            ListHeaderComponent={() => 
                {<Text>No hay personajes cargados</Text>}}
            renderItem = { ( {item} )  => ( 
                <TouchableOpacity style={{padding: 30}} onPress={() => handleItemPress(item)}>
                    <Text>{item.name ? item.name.toString() : 'None.'}</Text>
                    <Text>{item.status ? item.status.toString() : 'None'}</Text>
                    <Text>{item.location ? item.location.name.toString() : 'None'}</Text> 
        
                    
                   
                </TouchableOpacity>
            )
            }
            />

           
        </View>

        <View>
            {/* Vista para la UI del navegador */}
        </View>

        <Modal
        animationType="slide"
        transparent={false}
        
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
          
          <CharacterInfoPage 
          characterInfo={aCharacterInfo} >

          </CharacterInfoPage>
      </Modal>

    </View>

  );
};

export default ResultsPage;
