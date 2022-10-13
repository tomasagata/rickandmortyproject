import React from 'react';
import {Text, View, Image} from 'react-native';
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


export default Section;
