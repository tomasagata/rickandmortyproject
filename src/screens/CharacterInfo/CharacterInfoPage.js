import React from 'react';
import {View, Text, ScrollView, Pressable, Image} from 'react-native';
import styles from './styles';
import Section from '../../components/Sections/Sections';
import database from '@react-native-firebase/database';
import FavoriteAddImage from '../../../img/favorite_add.png';
import FavoriteRemoveImage from '../../../img/favorite_remove.png';



const CharacterInfoPage = ({route, navigation}) => {

    // const [characterInfo, setCharacterInfo] = React.useState('')
    const [episodeInfo, setEpisodeInfo] = React.useState('');
    const [favoriteIdObject, setFavoriteIdObject] = React.useState(undefined);
    const [favoriteIdObjectKey, setFavoriteIdObjectKey] = React.useState(undefined);
    // const [loading, setLoading] = React.useState(false);
    // const [selectedValue, setSelectedValue] = React.useState('java');

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getEpisode(route.params.episode[0]);
            getFavoriteIdObject();
        });
        return unsubscribe;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigation]);
    // Los primeros parentesis no hacen nada, donde van las llaves va el código,
    // los corchetes tienen los elementos que deben cambiar para que el efecto se ejecute
    // es decir, para que el useEffect se ejecute, lo que esta dentro de los parentesis
    // debe ser ditinto a la anterior ejecución del useEffect.
    // Si pongo los corchetes afuera del parentesis, me refreshea al instante!!

    const getFavoriteIdObject = () => {
        // Get favoriteIdObjectKey
        database()
        .ref('favorite_ids')
        .once('value')
        .then(snapshot => {
            let favorite_id_object_dict = snapshot.val();
            if (favorite_id_object_dict) {
                let favorite_id_object_key = getKeyByCharacterId(favorite_id_object_dict, route.params.id);
                setFavoriteIdObjectKey(favorite_id_object_key);
                // Use favoriteIdObjectKey to set favoriteIdObject
                setFavoriteIdObject(favorite_id_object_dict[favorite_id_object_key]);
            }
        });

    };

    function getKeyByCharacterId(object, value) {
        return Object.keys(object).find(key => {
            // console.log('key:' + key);
            // console.log('object[' + key + '] = ' + object[key]);
            // console.log('object[' + key + '].character_id = ' + object[key].character_id );
            // console.log('value: ' + value);
            // console.log(object[key].character_id + ' === ' + value + ' ? JS says: ' + (object[key].character_id === value));
            // console.log('final return value: ' + (object[key].character_id === value));
            return (object[key].character_id === value);
        });
    }


    function getEpisode(uriEpisode){
        //console.log('me trajo esto: ', uriEpisode);
        // setLoading(true);

        fetch(uriEpisode)
        .then(res => res.json())
        .then(res => {

            // console.log('me trajo esto: ', res); //esto deja que en el node vea los capitulos!
            setEpisodeInfo(res);
            // setLoading(false);
        });
    }

    const addFavoriteStatus = () => {
        if (route.params === undefined) {
            return;
        }
        // Push character and get key
        let data_key = database().ref('favorite_data').push(route.params).key;

        // Use key to generate a 'light' favoriteIdObject with pointer to real data object
        let id_object_key = database()
        .ref('favorite_ids')
        .push({
            character_id: route.params.id,
            database_id: data_key,
        }).key;

        setFavoriteIdObjectKey(id_object_key);
        setFavoriteIdObject({
            character_id: route.params.id,
            database_id: data_key,
        });
    };

    const removeFavoriteStatus = () => {
        database()
        .ref('favorite_data')
        .child(favoriteIdObject.database_id)
        .set(null)
        .then(() => {
            database()
            .ref('favorite_ids')
            .child(favoriteIdObjectKey)
            .set(null)
            .then(() => {
                console.log('Removed character id ' + route.params.id + ' from favorites');
            });
        });

        setFavoriteIdObject(undefined);
        setFavoriteIdObjectKey(undefined);
    };

    return (
        <View style={styles.viewport}>
            <Pressable style={styles.pressable} onPress={navigation.goBack}>
                <Text style={styles.backButton}>X</Text>
            </Pressable>
            <Pressable style={styles.addToFavoritesPressable} onPress={favoriteIdObjectKey ? removeFavoriteStatus : addFavoriteStatus}>
                <Image style={styles.addToFavoritesIcon} source={{ uri: (favoriteIdObjectKey ? Image.resolveAssetSource(FavoriteRemoveImage).uri : Image.resolveAssetSource(FavoriteAddImage).uri) }} />
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
