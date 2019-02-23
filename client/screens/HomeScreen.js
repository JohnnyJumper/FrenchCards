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

const data = [
  'card', 'second', 'third', 'forth'
];

import dimensions from '../constants/Layout';
const axios = require('axios');
const {window} = dimensions;

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();

    this.position = new Animated.ValueXY();

    this.state = {
      currentIndex: 0,
      cards: [],
      score: 0
    };

    this.moveToNextCard = this.moveToNextCard.bind(this);
    this.colors = ['#ffe26f', '#6d3580', '#cc4165', '#e4734f'];
    this.currentColor = 0;
    this.getNextColor = () => {
      this.currentColor += 1;
      if (this.currentColor == this.colors.length)
        this.currentColor = 0;
      return this.colors[this.currentColor];
    }

    this.getPrevColor = () => {
      this.currentColor -= 1;
      if (this.currentColor < 0)
        this.currentColor = this.colors.length - 1;
      
      return this.colors[this.currentColor];
    }

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

    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-window.width/2, 0, window.width/2],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp'
    });

    this.cardNextScale = this.position.x.interpolate({
      inputRange: [-window.width/2, 0, window.width/2],
      outputRange: [1.0, 0.8, 1.0],
      extrapolate: 'clamp'
    });

    this.leftCardOpacity = this.position.x.interpolate({
      inputRange: [-window.width/2, 0, window.width/2],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp'
    });
    this.rightCardOpacity = this.position.x.interpolate({
      inputRange: [-window.width/2, 0, window.width/2],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp'
    });
    
  }


 async componentWillMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (event, gestureState) => {
        this.position.setValue({x: gestureState.dx, y: 0});
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dx > 120) {
          Animated.spring(this.position, {
            toValue: {x: window.width + 10, y: 0},
            speed: 50,
          }).start(async () => await this.moveToNextCard('right'));
        } else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: {x: -window.width - 10, y: 0},
            speed: 50,
          }).start(async () => await this.moveToNextCard('left'));
        } else {
          Animated.spring(this.position, {
            toValue: {x: 0, y: 0},
            friction: 4
          }).start();
        }
      }
    });

    const response = await axios.get('http://10.114.8.12:6357/api/cards/3');
   
    if (response.data.success) {
      const cardWithTexts =  response.data.data.map(card => {
        const random = Math.floor(Math.random() * Math.floor(2));
        const leftText = random ? card.answer : card.wrongAnswer;
        const rightText = random ? card.wrongAnswer : card.answer;
        card.left = leftText;
        card.right = rightText;
        return card;
      });
      this.setState({cards: cardWithTexts});
    }
  }
 
  checkAnswer(answer) {
    const card = this.state.cards[this.state.currentIndex];
    return card.answer === answer;
  }



  moveToNextCard(direction) {
    const card = this.state.cards[this.state.currentIndex];
    console.log('currentIndex = ', this.state.currentIndex);
    if (this.state.currentIndex == this.state.cards.length - 1) this.updateCards();
    switch(direction) {
      case 'left': {
        if (this.checkAnswer(card.left)) {
            axios.post(`http://10.114.8.12:6357/api/update/${card._id}`, {isCorrect: true});
           return this.setState(prevState => ({currentIndex: prevState.currentIndex + 1, score: prevState.score + 1}), () => {this.position.setValue({x: 0, y: 0})})
        } else {
           axios.post(`http://10.114.8.12:6357/api/update/${card._id}`, {isCorrect: false});
           return this.setState(prevState => ({currentIndex: prevState.currentIndex + 1, score: 0}), () => {this.position.setValue({x: 0, y: 0})})
        }
      }
      case 'right': {
        if (this.checkAnswer(card.right)) {
           axios.post(`http://10.114.8.12:6357/api/update/${card._id}`, {isCorrect: true});
           return this.setState(prevState => ({currentIndex: prevState.currentIndex + 1, score: prevState.score + 1}), () => {this.position.setValue({x: 0, y: 0})})
        } else {
          axios.post(`http://10.114.8.12:6357/api/update/${card._id}`, {isCorrect: false});
           return this.setState(prevState => ({currentIndex: prevState.currentIndex + 1, score: 0}), () => {this.position.setValue({x: 0, y: 0})})
        }
      }
    }
  }

  async updateCards() {
    console.log('trying to update');
    const {currentIndex, cards} = this.state;
    if (currentIndex !== cards.length - 1) return null
    const response = await axios.get('http://10.114.8.12:6357/api/cards/16');
    // console.log('response = ', response);
    if (response.data.success) {
      const cardWithTexts =  response.data.data.map(card => {
        const random = Math.floor(Math.random() * Math.floor(2));
        const leftText = random ? card.answer : card.wrongAnswer;
        const rightText = random ? card.wrongAnswer : card.answer;
        card.left = leftText;
        card.right = rightText;
        return card;
      });
      this.setState({cards: cardWithTexts, currentIndex: 0}, () => console.log('this.state = ', this.state)); 
    }
  }

  renderCards() {
    const {currentIndex, cards} = this.state;
    const currentColor = this.colors[this.currentColor];
    const nextColor = this.getNextColor();
    return cards.map((card, index) => {
      if (index <  currentIndex) {return null;}
      else if (index == currentIndex) { 
       return (
        <Animated.View key={card._id} style={[this.rotateAndTranslate, styles.animatedContainer]} {...this.PanResponder.panHandlers}>
          <Animated.View style={{opacity: this.rightCardOpacity, transform: [{rotate: '-10deg'}], position: 'absolute', top: 50, left: 40, zIndex: 1000}}>
            <Text style={[styles.left]}>{card.right}</Text>
          </Animated.View>
           <Card color={currentColor} text={card.cardText}/>
           <Animated.View style={{opacity: this.leftCardOpacity, transform: [{rotate: '10deg'}], position: 'absolute', top: 50, right: 40, zIndex: 1000}}>
            <Text style={[styles.left]}>{card.left}</Text>
          </Animated.View> 
        </Animated.View>
        );
      }
      else {
        return (
          <Animated.View key={card._id} style={[{opacity: this.nextCardOpacity, transform:[{scale: this.cardNextScale}]}, styles.animatedContainer]}>
            <Card color={nextColor}  text={card.cardText} answer={card.answer} wrongAnswer={card.wrongAnswer}/>
        </Animated.View> 
        );
      }
    }).reverse()
  }


  render() {
    return (
      <View style={styles.homeStyle}>
        <View style={styles.topBar}>
          <Text>{this.state.score} in a row!</Text>
        </View>
        <View style={styles.cardPlaceholder}>
        {this.renderCards()}        
        </View>
      </View>
    );
  }
}