import React, {useState} from 'react';
import { View,Text, StyleSheet,TextInput, Button, TouchableWithoutFeedback,Keyboard,Alert} from 'react-native';

import Card from '../components/Card';
import Colors from '../constants/color';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';

const StartGameScreen=props=>{

    const [enteredValue, setEnteredValue]=useState('');
    const [confirmed, setConfirmed]=useState(false);
    const [selectedNumber, setSelectedNumber]=useState();

    const numberInputHandler = inputText => {
        setEnteredValue(()=>inputText.replace(/[^0-9]/g ,''));
    };
    const restInputHandler=()=>{
        setEnteredValue('');
        setConfirmed(false);
    };
    const confirmInputHandler=()=>{
        
        let chosenNumber=parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber<=0 || chosenNumber>99) {
            Alert.alert('Invalid Number!', 'Number has to be a number between 1 and 99.',[{text:'Okay', style:'destructive',onPress:restInputHandler}]);
            return;
        }
        
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
        Keyboard.dismiss();
        // console.log(selectedNumber);
    }

    let confirmedOutput;
    if (confirmed) {
    confirmedOutput=(<Card style={styles.summerContainer}>
        <Text>You Selected</Text>
    <NumberContainer>{selectedNumber}</NumberContainer>
    <Button title={'START GAME'} onPress={()=>props.onStartGame(selectedNumber)}/>
    </Card>)
    }
    
    
    return (
        <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss();}}>
            <View style={styles.screen}>
                <Text style={styles.title}>Start a New Game!</Text>
                <Card style={styles.inputContainer}>
                    <Text>Select a Number</Text>
                    <Input onChangeText={numberInputHandler} value={enteredValue} style={styles.input} blurOnSubmit a autoCorrect={false} keyboardType={'number-pad'} maxLength={2}/>
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button title={'Reset'} onPress={restInputHandler}  color={Colors.accent} />
                        </View>
                        <View style={styles.button}>
                            <Button title={'Confirm'} onPress={confirmInputHandler}  color={Colors.primary}/>
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles=StyleSheet.create({
    screen:{
        flex:1,
        padding:10,
        alignItems:'center',
        justifyContent:'flex-start'
    },
    title:{
        fontSize:20,
        marginVertical:10
    },
    inputContainer:{
        width:300,
        maxWidth:'80%',
        alignItems:'center',
        

    },
    buttonContainer:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
        paddingHorizontal:15
    },
    button:{
        width:'40%'
    },
    input:{
        width:50,
        textAlign:'center'
    },
    summerContainer:{
        marginTop:20,
        alignItems:'center'
    }
});

export default StartGameScreen;