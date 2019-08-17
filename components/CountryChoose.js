import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { create } from 'uuid-js';

export default function CountryChoose(props){
    return(
        <View>
            <TouchableOpacity style={styles.btnCountry} onPress = {() => {props.onPressButton(props.nameCountry)}}>
                <Text style={{color: 'black'}}> {props.nameCountry} </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    btnCountry: {
        width: 90,
        height: 35,
        borderColor: "#5F9EA0",
        borderRadius: 10,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: "center",
    }
})