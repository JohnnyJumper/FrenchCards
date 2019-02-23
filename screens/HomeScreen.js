import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  PanResponder,
} from 'react-native';
import { WebBrowser } from 'expo';
import styles from '../styles';
import { MonoText } from '../components/StyledText';
import Card from '../components/Card';
import {getNextColor, getPrevColor} from '../constants/Colors';

const data = [
  'card', 'second', 'third', 'forth'
];

import dimensions from '../constants/Layout';
const {window} = dimensions;

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();

    this.position = new Animated.ValueXY();

    this.state = {
      currentIndex: 0
    };

    this.rotate = this.position.x.interpolate({
      inputRange: [-window.width/2, 0, window.width/2],
      outputRange: ['-10deg', '0deg', '10deg'],
      extrapolate: 'clamp'
    });

    this.rotateAndTranslate = {
      transform: [{
        rotate: this.rotate
      },
      ...this.position.getTranslateTransform()]
    };

  }


  componentWillMount() {
    this.PanResponder = PanResponder.create({

      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (event, gestureState) => {
        this.position.setValue({x: gestureState.dx, y: 0});
      }
    })
  }

  renderCards() {
    const {currentIndex} = this.state;
    return data.map((cardText, index) => {
      if (index <  currentIndex) {return null;}
      else if (index == currentIndex) {
       return (
        <Animated.View key={index} style={[this.rotateAndTranslate, styles.animatedContainer]} {...this.PanResponder.panHandlers}>
           <Card color={getNextColor()} text={cardText} />
        </Animated.View>
        );
      }
      else {
        return (
          <Animated.View key={index} style={[styles.animatedContainer]}>
           <Card color={getNextColor()}  text={cardText} />
        </Animated.View> 
        );
      }
    }).reverse()
  }


  render() {
    return (
      <View style={styles.homeStyle}>
        <View style={styles.topBar}>
          <Text>Some scores will be here</Text>
        </View>
        <View style={styles.cardPlaceholder}>
        {this.renderCards()}        
        </View>
      </View>
    );
  }
}