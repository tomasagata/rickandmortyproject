import React from 'react';
import {View, Text, ScrollView, Pressable, Image, Animated} from 'react-native';
import styles from './styles';
import Section from '../../components/Sections/Sections';
import FavoriteAddImage from '../../../img/favorite_add.png';
import FavoriteRemoveImage from '../../../img/favorite_remove.png';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { fetchEpisode, selectEpisodeByURI } from '../../redux/reducers/episodes';
import { fetchComments, pushComment, selectCommentsByCharacterId } from '../../redux/reducers/comments';
import { addToFavorites, removeFromFavorites, selectFavoriteIdObjectByCharacterId } from '../../redux/reducers/favoriteCharacters';

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

    Luego para los comentarios, hacemos uso de otro objeto liviano y varios pesados

    comment_data:
    {
        character_id: Es el id del personaje a comentar
        comment_string: String del comentario
    }

*/



const CharacterInfoPage = ({route, navigation}) => {

    const [currentValue] = React.useState(new Animated.Value(1));
    const dispatch = useDispatch();
    const episodeInfo = useSelector(selectEpisodeByURI(route.params.episode[0]), shallowEqual);
    const favoriteIdObject = useSelector(selectFavoriteIdObjectByCharacterId(route.params.id), shallowEqual);
    const commentData = useSelector(selectCommentsByCharacterId(route.params.id), shallowEqual);

    // React.useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {
    //         dispatch(fetchEpisode(route.params.episode[0]));
    //         dispatch(fetchComments());
    //     });
    //     return unsubscribe;
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [navigation]);

    React.useEffect(() => {
        dispatch(fetchEpisode(route.params.episode[0]));
        dispatch(fetchComments());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const favoriteButtonHandler = () => {

        // if there isn't a favoriteIdObject, object is not favorited
        if (favoriteIdObject === undefined) {

            // Add it to favorites
            dispatch(addToFavorites({characterData: route.params}));

            // Do animation
            Animated.spring(currentValue,{
                toValue: 2,
                friction: 2,
                useNativeDriver:false,
            }).start(()=> {
                Animated.spring(currentValue,{
                    toValue:1,
                    useNativeDriver:false,
                }).start();
            });
        } else {

            // Remove from favorites
            dispatch(removeFromFavorites(favoriteIdObject));
        }

    };

    const commentSubmitHandler = (text) => {
        dispatch(
            pushComment({
                character_id: route.params.id,
                comment_string: text,
            })
        );
    };

    return (
        <View style={styles.viewport}>
            <Pressable style={styles.pressable} onPress={navigation.goBack}>
                <Text style={styles.backButton}>X</Text>
            </Pressable>
            <Pressable style={styles.addToFavoritesPressable} onPress={favoriteButtonHandler}>
                <Animated.Image style={[styles.addToFavoritesIcon, {transform: [{scale: currentValue}]}]} source={{ uri: (favoriteIdObject ? Image.resolveAssetSource(FavoriteRemoveImage).uri : Image.resolveAssetSource(FavoriteAddImage).uri) }} />
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
                        <Section.TaggedData.Data>{ episodeInfo?.name ?? 'No hay episodio cargado' }</Section.TaggedData.Data>
                    </Section.TaggedData>
                </Section>

                <Section>
                    <Section.Comments
                    data={commentData}
                    isFavorite={favoriteIdObject ? true : false}
                    submitCallback={commentSubmitHandler}/>
                </Section>
            </ScrollView>
        </View>
    );
};

export default CharacterInfoPage;
