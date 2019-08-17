import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

export default function Card(props){
    return(
        <View style={styles.contaner}>
            <Image 
                source = {{uri : props.urlImage}}
                style = {styles.imageStype}
            />
            <Text style = {styles.titleStype}>Title {props.title}</Text>
            <TouchableOpacity onPress = {() => {props.onPressButton}} style = {styles.buttonStype}>
                <Text style={{color: 'white', textDecorationLine: 'underline'}}>READ MORE</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    contaner: {
        justifyContent: 'center',
        alignItems: 'center',
        textDecorationLine: 'underline',
    },
    imageStype: {
        width: '90%', 
        height: 250, 
        resizeMode: 'stretch'
    },
    titleStype: {
        marginHorizontal: '5%',
        marginVertical: '0%',
    },
    buttonStype: {
        width: 100,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#B8860B",
        borderRadius: 10,
        marginVertical: 5,
    }
    
})