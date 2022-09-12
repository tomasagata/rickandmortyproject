import React from 'react';
import {View, Text, Image, TextInput, Button} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const AppTitle = () => {
    return (
        <View>
            <Image source={require('../img/rick_and_morty_logo.png')} />
            <Text>Character Reference</Text>
        </View>
    );
};

const TaggedTextInput = props => {

    return (
        <View>
            <Text style={props.tagStyle}>{props.tag}</Text>
            <TextInput style={props.inputStyle}/>
        </View>
    );
};


const Form = props => {
    return (
        <View>
            <View>
                <Text>Species</Text>
                <TextInput/>
            </View>
            <View>
                <Text>Type</Text>
                <TextInput/>
            </View>
            <View>
                <Text>Name</Text>
                <TextInput/>
            </View>
            <Text>Status</Text><Picker>
                <Picker.Item label="Any" value=""/>
                <Picker.Item label="Dead" value="dead"/>
                <Picker.Item label="Alive" value="alive"/>
                <Picker.Item label="Unknown" value="unknown"/>
            </Picker>
            <Text>Gender</Text><Picker>
                <Picker.Item label="Any" value=""/>
                <Picker.Item label="Male" value="male"/>
                <Picker.Item label="Female" value="female"/>
                <Picker.Item label="Genderless" value="genderless"/>
                <Picker.Item label="Unknown" value="unknown"/>
            </Picker>

            <Button title="Find them" />
        </View>
    );
};

const MainPage = () => {
    return (
        <View>
            <View>
                <Image source={require('../img/rick_and_morty_logo.png')} />
                <Text>Character Reference</Text>
            </View>

            <View>
                <View>
                    <Text>Species</Text>
                    <TextInput/>
                </View>
                <View>
                    <Text>Type</Text>
                    <TextInput/>
                </View>
                <View>
                    <Text>Name</Text>
                    <TextInput/>
                </View>
                <View>
                    <Text>Status</Text>
                    <Picker>
                        <Picker.Item label="Any" value=""/>
                        <Picker.Item label="Dead" value="dead"/>
                        <Picker.Item label="Alive" value="alive"/>
                        <Picker.Item label="Unknown" value="unknown"/>
                    </Picker>
                </View>
                <View>
                    <Text>Gender</Text>
                    <Picker>
                        <Picker.Item label="Any" value=""/>
                        <Picker.Item label="Male" value="male"/>
                        <Picker.Item label="Female" value="female"/>
                        <Picker.Item label="Genderless" value="genderless"/>
                        <Picker.Item label="Unknown" value="unknown"/>
                    </Picker>
                </View>

                <View>
                   <Button title="Find them" />
                </View>
            </View>
        </View>
    );
};

export default MainPage;
