import React, { useEffect } from 'react';
import {styles} from './styles.js';
import {View, Text, Image, Pressable, FlatList} from 'react-native';
import { shallowEqual, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getHistory, selectAllHistory} from '../../redux/reducers/history';

const HistoryItem = (props) => {

    // useEffect(()=>{
    //     console.log(props);
    // });

    return (
        <View style={styles.favoriteItemView}>
            <Text style={styles.historyItemText}>
                {'action: ' + props.action + ' on character: ' + props.character_id + ' additional data: ' + props.extraData}
            </Text>
        </View>
    );
};

const HistoryScreen = ({route, navigation}) => {
    const dispatch = useDispatch();
    const historyData = useSelector(selectAllHistory, shallowEqual);

    useEffect(() => {
        dispatch(getHistory());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // useEffect(() => {
    //     console.log(historyData);
    // }, [historyData]);

    const goToResults = () => {
        navigation.goBack();
    };



    return (
        <View style={styles.viewport}>
            <View style={styles.headerSection}>
                <View style={styles.resultTextWrapper}>
                    <Text style={styles.resultText}>History</Text>
                </View>
                <View style={styles.headerButtonsWrapper}>
                    <View style={styles.favoritesButtonWrapper}>
                        <Pressable
                            onPress={goToResults}
                            style={styles.favoritesButton}>
                            <Image
                                style={styles.favoritesButtonImage}
                                source={require('../../../img/favorites.png')}
                            />
                        </Pressable>
                    </View>
                </View>
            </View>
            <FlatList
            data={historyData}
            renderItem={({item, index}) => {
                return (<HistoryItem key={item.history_id + index} extraData={item.extraData} character_id={item.character_id} action={item.action}/>);}
            }
            style={styles.flatList}
            contentContainerStyle={styles.flatListContent}
            />
        </View>
    );
};

export default HistoryScreen;
