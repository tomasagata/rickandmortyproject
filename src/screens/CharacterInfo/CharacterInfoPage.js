import React from 'react';
import {View, Text, ScrollView, Pressable} from 'react-native';
import styles from './styles';
import Section from '../../components/Sections/Sections';



const CharacterInfoPage = (props) => {
    // const [characterInfo, setCharacterInfo] = React.useState('')
    const [episodeInfo, setEpisodeInfo] = React.useState('');
    // const [loading, setLoading] = React.useState(false);
    // const [selectedValue, setSelectedValue] = React.useState('java');

   React.useEffect(() => {
        getEpisode(props.characterInfo.episode[0]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // Los primeros parentesis no hacen nada, donde van las llaves va el código,
    // los corchetes tienen los elementos que deben cambiar para que el efecto se ejecute
    // es decir, para que el useEffect se ejecute, lo que esta dentro de los parentesis
    // debe ser ditinto a la anterior ejecución del useEffect.
    // Si pongo los corchetes afuera del parentesis, me refreshea al instante!!


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

    return (
        <View style={styles.viewport}>
            <Pressable style={styles.pressable} onPress={() => {props.visibilityCallback(false);}}>
                <Text style={styles.backButton}>X</Text>
            </Pressable>
            <ScrollView contentContainerStyle={styles.scrollView}>

                <Section>
                    <Section.Title>
                        { props.characterInfo ? props.characterInfo.name.toString() : 'None.' }
                    </Section.Title>
                    <Section.TitleImage source={props.characterInfo ? {uri: props.characterInfo.image} : require('../../../img/rick_and_morty_logo.png')  } />
                </Section>

                <Section>
                    <Section.Subtitle>Information</Section.Subtitle>

                    <Section.TaggedData>
                        <Section.TaggedData.Tag>Status</Section.TaggedData.Tag>
                        <Section.TaggedData.Data>{ props.characterInfo ? props.characterInfo.status.toString() : 'None.' }</Section.TaggedData.Data>
                    </Section.TaggedData>

                    <Section.TaggedData>
                        <Section.TaggedData.Tag>Species</Section.TaggedData.Tag>
                        <Section.TaggedData.Data>{ props.characterInfo ? props.characterInfo.species.toString() : 'None.' }</Section.TaggedData.Data>
                    </Section.TaggedData>

                    <Section.TaggedData>
                        <Section.TaggedData.Tag>Type</Section.TaggedData.Tag>
                        <Section.TaggedData.Data>{ props.characterInfo.type ? props.characterInfo.type.toString() : 'None' }</Section.TaggedData.Data>
                    </Section.TaggedData>

                    <Section.TaggedData>
                        <Section.TaggedData.Tag>Gender</Section.TaggedData.Tag>
                        <Section.TaggedData.Data>{ props.characterInfo ? props.characterInfo.gender.toString() : 'None.' }</Section.TaggedData.Data>
                    </Section.TaggedData>
                </Section>

                <Section>
                    <Section.Subtitle>Origin</Section.Subtitle>
                    <Section.TaggedData>
                        <Section.TaggedData.Tag>Name</Section.TaggedData.Tag>
                        <Section.TaggedData.Data>{ props.characterInfo ? props.characterInfo.origin.name.toString() : 'None'}</Section.TaggedData.Data>
                    </Section.TaggedData>
                </Section>

                <Section>
                    <Section.Subtitle>Last Known Location</Section.Subtitle>
                    <Section.TaggedData>
                        <Section.TaggedData.Tag>Name</Section.TaggedData.Tag>
                        <Section.TaggedData.Data>{ props.characterInfo ? props.characterInfo.location.name.toString() : 'None'}</Section.TaggedData.Data>
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
