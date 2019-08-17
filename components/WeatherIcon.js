import React from 'react';
import {MaterialCommunityIcons,} from '@expo/vector-icons';

export default function WeatherIcon(props){
    return(
        <MaterialCommunityIcons 
            name = {props.name}
            size = {20}
            style = {{marginBottom: -3}}
        />
    );
}