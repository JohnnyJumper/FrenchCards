import React from 'react';
import {View, Text} from 'react-native';
import styles from '../styles';


const Card = ({color, text}) => (
	<View style={{...styles.cardView, backgroundColor:color}}>
		<Text>{text}</Text>
	</View>
);

export default Card;