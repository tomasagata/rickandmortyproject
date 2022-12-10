import React from 'react';
import {Text, View, Image, TextInput} from 'react-native';
import styles from './styles';

const Section = ({children}) => {
    return (
        <View style={styles.section}>
            {children}
        </View>
    );
};

const SectionTitle = ({children}) => {
    return (
        <View style={styles.nameWrapper}>
            <Text style={styles.characterNameText}>{children}</Text>
        </View>
    );
};
Section.Title = SectionTitle;

const SectionSubtitle = ({children}) => {
    return (
        <View style={styles.sectionTitleWrapper}>
            <Text style={styles.sectionTitleText}>{children}</Text>
        </View>
    );
};
Section.Subtitle = SectionSubtitle;

const SectionTaggedDataContainer = ({children}) => {
    return (
        <View style={styles.taggedDataContainer}>
            {children}
        </View>
    );
};
Section.TaggedData = SectionTaggedDataContainer;

const SectionDataTag = ({children}) => {
    return (
        <View style={styles.tagWrapper}>
            <Text style={styles.tagText}>{children}</Text>
        </View>
    );
};
Section.TaggedData.Tag = SectionDataTag;

const SectionData = ({children}) => {
    return (
        <View style={styles.dataWrapper}>
            <Text style={styles.dataText}>{children}</Text>
        </View>
    );
};
Section.TaggedData.Data = SectionData;

const SectionTitleImage = ({source}) => {
    return (
        <View style={styles.imageWrapper}>
            <Image style={styles.characterImage} source={source} />
        </View>
    );
};
Section.TitleImage = SectionTitleImage;

const SingleComment = (props) => {
    return (
        <View style={styles.commentTextWrapper}>
            <Text style={styles.commentText}>{props.children}</Text>
        </View>
    );
};

const SectionComments = (props) => {
    const [editableComment, setEditableComment] = React.useState('');
    const [comments, setComments] = React.useState(props.data);

    React.useEffect(() => {
        setComments(props.data);
    }, [props.data]);

    const submit = (e) => {
        props.submitCallback(e.nativeEvent.text);
        setEditableComment('');
    };

    if (props.isFavorite){
        return (
            <>
                <Section.Subtitle>
                    Comentarios
                </Section.Subtitle>
                <View style={styles.editableTextWrapper}>
                    <TextInput
                    placeholder={'Escriba su comentario...'}
                    style={styles.commentText}
                    onChangeText={setEditableComment}
                    value={editableComment}
                    onSubmitEditing={submit}
                    />
                </View>
                {comments.map((comment_data) => <SingleComment key={comment_data.comment_id}>{comment_data.comment_string}</SingleComment>)}
            </>
        );
    } else {
        return (
            <Section.Subtitle>
                Favoritear para comentar
            </Section.Subtitle>
        );
    }
};
Section.Comments = SectionComments;


export default Section;

/*
No fav
Agregar a favoritos para comentar

Agregar Comentario...
comentario 3: QSY
comentario 2: Hola
comentario 1: Holaaaa
*/
