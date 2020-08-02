import React ,{useState, useRef} from 'react';
import {View,Text,StyleSheet, Button, Alert} from 'react-native';

import NumberCotainer from '../components/NumberContainer';
import Card from '../components/Card';

const generateRandomBetween=(min, max, exclude)=>{
    min=Math.ceil(min);
    max=Math.floor(max);
    const rndNum=Math.floor(Math.random()*(max-min))+min;

    if (rndNum===exclude) {
        return generateRandomBetween(min,max,exclude);
    }else{
        return rndNum;
    }
};

const GameScreen=props=>{
    const [currentGuess, setCurrentGuess]=useState(generateRandomBetween(1,100,props.userChoice));
    const currentLow=useRef(1);
    const currentHigh=useRef(100);

    const nextGuessHandler=direction=>{
        if ((direction==='lower' && currentGuess<props.userChoice) || direction==='greater' && currentGuess>props.userChoice){
            Alert.alert('You are Lying', 'You entered a wrong inpput',[{text:'Okay',style:"cancel"}]);
            return;
        }
        if (direction==='lower') {
            currentHigh.current=currentGuess;
           
        }else{
            currentLow.current=currentGuess;
        }
        const nextNumber=generateRandomBetween(currentLow.current,currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
    };

    return (
        <View style={Styles.screen}>
            <Text>Oppenent's Guess</Text>
            <NumberCotainer>{currentGuess}</NumberCotainer>
            <Card style={Styles.buttonContainer}>
                <Button title={'LOWER'} onPress={nextGuessHandler.bind('lower')}/>
                <Button title={'GREATER'} onPress={()=>{nextGuessHandler('greater')}}/>
            </Card>
        </View>
    );
};

const Styles=StyleSheet.create({
    screen:{
        flex:1,
        padding:50,
        alignItems:'center'
    },
    buttonContainer:{
        flexDirection:'row',
        marginTop:50,
        justifyContent:'space-between',
        width:300,
        maxWidth:'80%'
    }
});

export default GameScreen;