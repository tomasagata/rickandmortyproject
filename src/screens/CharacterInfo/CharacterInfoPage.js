import React from 'react';
import {View, Text, ScrollView, Pressable, Image} from 'react-native';
import styles from './styles';
import Section from '../../components/Sections/Sections';
import database from '@react-native-firebase/database';
import FavoriteAddImage from '../../../img/favorite_add.png';
import FavoriteRemoveImage from '../../../img/favorite_remove.png';

/*
    En nuestra base de datos, utilizamos un objeto mas ligero para hacer las queries mucho mas eficientes.
    El personaje completo esta en un apartado en la base de datos llamado 'favorite_data'. Hay momentos en
    los que no hace falta descargar el objeto completo. Un ejemplo: Ver si el objeto esta en favoritos.
    Para ello utilizamos un objeto mucho mas ligero en un apartado distinto de la base de datos (conocida
    como 'favorite_ids') llamado favoriteIdObject.

    favoriteIdObject:
    {
        object_id: Es el id de este objeto,
        database_id: Es el puntero al personaje completo en la base 'favorite_data'
        character_id: Es el id del personaje que estamos guardando
    }
*/


function getKeyByCharacterId(object, value) {
    return Object.keys(object).find(key => {
        return (object[key].character_id === value);
    });
}


const CharacterInfoPage = ({route, navigation}) => {

    const [episodeInfo, setEpisodeInfo] = React.useState('');
    const [favoriteIdObject, setFavoriteIdObject] = React.useState(undefined);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getEpisode(route.params.episode[0]);
            getFavoriteIdObject();
        });
        return unsubscribe;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigation]);

    const getFavoriteIdObject = () => {
        database()
        .ref('favorite_ids')
        .once('value')
        .then(snapshot => {
            let favorite_id_object_dict = snapshot.val();
            if (favorite_id_object_dict) {
                let favorite_id_object_key = getKeyByCharacterId(favorite_id_object_dict, route.params.id);
                if (favorite_id_object_key){
                    setFavoriteIdObject({...favorite_id_object_dict[favorite_id_object_key], object_id: favorite_id_object_key});
                }
            }
        });
    };



    function getEpisode(uriEpisode){
        fetch(uriEpisode)
        .then(res => res.json())
        .then(res => {
            setEpisodeInfo(res);
        });
    }

    const addFavoriteStatus = () => {
        if (route.params === undefined) {
            return;
        }
        // Push character and get key
        let data_key = database().ref('favorite_data').push(route.params).key;

        // Get key to generate a 'light' favoriteIdObject with pointer to real data object
        let id_object_key = database().ref('favorite_ids').push().key;

        // Create the object to be set
        let favorite_id_object = {
            object_id: id_object_key,
            character_id: route.params.id,
            database_id: data_key,
        };

        // Use key to set the real data
        database().ref('favorite_ids').child(id_object_key).set(favorite_id_object);

        // Update the state
        setFavoriteIdObject(favorite_id_object);
    };

    const removeFavoriteStatus = () => {

        // Borro el caracter completo de 'favorite_data'
        database()
        .ref('favorite_data')
        .child(favoriteIdObject.database_id)
        .set(null)
        .then(() => {
            // Una vez terminado, borro el objeto ligero con su puntero de 'favorite_ids'
            database()
            .ref('favorite_ids')
            .child(favoriteIdObject.object_id)
            .set(null)
            .then(() => {
                console.log('Removed character id ' + route.params.id + ' from favorites');
            });
        });

        // Actualizo el state
        setFavoriteIdObject(undefined);
    };

    return (
        <View style={styles.viewport}>
            <Pressable style={styles.pressable} onPress={navigation.goBack}>
                <Text style={styles.backButton}>X</Text>
            </Pressable>
            <Pressable style={styles.addToFavoritesPressable} onPress={favoriteIdObject ? removeFavoriteStatus : addFavoriteStatus}>
                <Image style={styles.addToFavoritesIcon} source={{ uri: (favoriteIdObject ? Image.resolveAssetSource(FavoriteRemoveImage).uri : Image.resolveAssetSource(FavoriteAddImage).uri) }} />
            </Pressable>
            <ScrollView contentContainerStyle={styles.scrollView}>

                <Section>
                    <Section.Title>
                        { route.params ? route.params.name.toString() : 'None.' }
                    </Section.Title>
                    <Section.TitleImage source={route.params ? {uri: route.params.image} : require('../../../img/rick_and_morty_logo.png')  } />
                </Section>

                <Section>
                    <Section.Subtitle>Information</Section.Subtitle>

                    <Section.TaggedData>
                        <Section.TaggedData.Tag>Status</Section.TaggedData.Tag>
                        <Section.TaggedData.Data>{ route.params?.status ?? 'None' }</Section.TaggedData.Data>
                    </Section.TaggedData>

                    <Section.TaggedData>
                        <Section.TaggedData.Tag>Species</Section.TaggedData.Tag>
                        <Section.TaggedData.Data>{ route.params?.species ?? 'None' }</Section.TaggedData.Data>
                    </Section.TaggedData>

                    <Section.TaggedData>
                        <Section.TaggedData.Tag>Type</Section.TaggedData.Tag>
                        <Section.TaggedData.Data>{ route.params?.type ?? 'None' }</Section.TaggedData.Data>
                    </Section.TaggedData>

                    <Section.TaggedData>
                        <Section.TaggedData.Tag>Gender</Section.TaggedData.Tag>
                        <Section.TaggedData.Data>{ route.params?.gender ?? 'None' }</Section.TaggedData.Data>
                    </Section.TaggedData>
                </Section>

                <Section>
                    <Section.Subtitle>Origin</Section.Subtitle>
                    <Section.TaggedData>
                        <Section.TaggedData.Tag>Name</Section.TaggedData.Tag>
                        <Section.TaggedData.Data>{ route.params?.origin?.name ?? 'None'}</Section.TaggedData.Data>
                    </Section.TaggedData>
                </Section>

                <Section>
                    <Section.Subtitle>Last Known Location</Section.Subtitle>
                    <Section.TaggedData>
                        <Section.TaggedData.Tag>Name</Section.TaggedData.Tag>
                        <Section.TaggedData.Data>{ route.params?.location?.name ?? 'None'}</Section.TaggedData.Data>
                    </Section.TaggedData>
                </Section>

                <Section>
                    <Section.Subtitle>First Seen In</Section.Subtitle>
                    <Section.TaggedData>
                        <Section.TaggedData.Tag>Episode</Section.TaggedData.Tag>
                        <Section.TaggedData.Data>{ episodeInfo ? episodeInfo.name.toString() : 'No hay episodio cargado' }</Section.TaggedData.Data>
                    </Section.TaggedData>
                </Section>
            </ScrollView>
        </View>
    );
};

export default CharacterInfoPage;
