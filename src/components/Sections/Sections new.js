import React, { useState } from 'react';
import { Text, View, Image, TextInput, Button } from 'react-native';
import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory';
import styles from './styles';

const Section = ({ children }) => {
  return <View style={styles.section}>{children}</View>;
};

const SectionTitle = ({ children }) => {
  return (
    <View style={styles.nameWrapper}>
      <Text style={styles.characterNameText}>{children}</Text>
    </View>
  );
};
Section.Title = SectionTitle;

const SectionSubtitle = ({ children }) => {
  return (
    <View style={styles.sectionTitleWrapper}>
      <Text style={styles.sectionTitleText}>{children}</Text>
    </View>
  );
};
Section.Subtitle = SectionSubtitle;

const SectionTaggedDataContainer = ({ children }) => {
  return <View style={styles.taggedDataContainer}>{children}</View>;
};
Section.TaggedData = SectionTaggedDataContainer;

const SectionDataTag = ({ children }) => {
  return (
    <View style={styles.tagWrapper}>
      <Text style={styles.tagText}>{children}</Text>
    </View>
  );
};
Section.TaggedData.Tag = SectionDataTag;

const SectionData = ({ children }) => {
  return (
    <View style={styles.dataWrapper}>
      <Text style={styles.dataText}>{children}</Text>
    </View>
  );
};
Section.TaggedData.Data = SectionData;

const SectionTitleImage = ({ source }) => {
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
  const [editableComment, setEditableComment] = useState('');
  const [comments, setComments] = useState(props.data);
  const [editingIndex, setEditingIndex] = useState(-1);

  React.useEffect(() => {
    setComments(props.data);
  }, [props.data]);

  const submit = (e) => {
    if (editableComment.trim() !== '') {
      if (editingIndex === -1) {
        // Add a new comment
        const newComment = {
          comment_id: Math.random().toString(),
          comment_string: editableComment,
        };
        setComments([...comments, newComment]);
        props.submitCallback(e);        
        
      } else {
        // Edit an existing comment
        let updatedComments = [...comments];
        const editedComment = {
            comment_id: updatedComments[editingIndex].comment_id,
            comment_string: editableComment,
          };
        updatedComments[editingIndex] = editedComment
        updatedComments[editingIndex].comment_string = editableComment;
        setComments(updatedComments);
        props.editCallback(editableComment, updatedComments[editingIndex].comment_id);
        setEditingIndex(-1)
    
        
      }
      setEditableComment('');
    }
  };

  const handleEditComment = (index) => {
    //props.editCallback({commentId, newText})
    
    setEditableComment(comments[index].comment_string);
    setEditingIndex(index);
    //props.editCallback(comments[index].comment_string);
  };

  const handleDeleteComment = (index) => {
    
    props.removeCallback(comments[index].comment_id)
    const updatedComments = [...comments];
    updatedComments.splice(index,1)
    setComments(updatedComments);
  };

  if (props.isFavorite) {
    return (
      <>
        <Section.Subtitle>Comentarios</Section.Subtitle>
        <View style={styles.editableTextWrapper}>
          <TextInput
            placeholder={'Escriba su comentario...'}
            style={styles.commentText}
            onChangeText={setEditableComment}
            value={editableComment}
            //onSubmitEditing={ submit}
          />
          <Button
            title={editingIndex === -1 ? 'Agregar' : 'Actualizar'}
            onPress={ () => submit(editableComment)}
          />
        </View>
        {comments.map((comment_data, index) => (
          <View key={comment_data.comment_id} style={styles.commentContainer}>
            <SingleComment>{comment_data.comment_string}</SingleComment>
            <View style={styles.commentButtonContainer}>
              <Button
                title="Editar"
                onPress={() => handleEditComment(index)}
              />
              <Button
                title="Eliminar"
                onPress={() => handleDeleteComment(index)}
              />
            </View>
          </View>
        ))}
      </>
    );
  } else {
    return (
      <Section.Subtitle>Favoritear para comentar</Section.Subtitle>
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
