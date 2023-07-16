import React from "react";
import { View, Text } from "react-native";

const MiScreen = () => {
    const [miState, setMiState] = React.useState("HOLA!")

    return(
        <View>
            <Text style={{color: 'black'}}>{miState}</Text>
            <Text style={{color: 'black'}}>jaja</Text>
        </View>
    )
}

export default MiScreen