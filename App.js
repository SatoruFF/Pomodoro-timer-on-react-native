import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { Text, View, Image } from 'react-native';
import { Button } from 'react-native-paper';
import styled from 'styled-components/native';
import BackgroundTimer from 'react-native-background-timer';
let logo = require('./assets/tomato.png');

const WorkSpace = styled.View`
  background-color: #eb2f96;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const TimerView = styled.Text`
 font-size: 54px;
 color: white;
 margin-bottom: 15px;
`;

const ImageMain = styled.Image`
  height: 100px;
  width: 100px;
  margin-bottom: 20px;
`;

const MyInput = styled.TextInput`
  padding: 10px;
  height: 40px;
  width: 60%;
  color: white;
  border-radius: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  border: 2px solid white;
`;

const TimeSelectSpace = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 60%;
`;

const SelectTime = styled.Text`
  color: white;
  margin-top: 15px;
  border: 2px solid white;
  padding: 7px;
  border-radius: 10px;
  font-size: 16px;
`;

export default function App() {
  
  const [runToggle, setRunToggle] = useState(false)
  const inter = useRef(null)
  const [minuts, setMinuts] = useState(49)
  const [seconds, setSeconds] = useState(60)
  const [newValue, setNewValue] = useState(0)

  const stopHandler = () => {
    BackgroundTimer.stopBackgroundTimer(inter.current)
  }

  const timer = () => {
    setRunToggle(prev => !prev)
    if (!runToggle) {
      inter.current = BackgroundTimer.runBackgroundTimer(() => setSeconds((sec) => sec - 1), 1000)
    } if (runToggle) {  
      stopHandler()
    }
  }

  useEffect(() => {
    if (seconds == 0) {
      setMinuts(min => min - 1)
      setSeconds(60)
    } if (minuts == 0 && seconds == 0) {
      stopHandler()
      alert('Times up! May be you need a short break?')
      setMinuts(10)
      setSeconds(60)
      setRunToggle(false)
    }
  }, [minuts, seconds])

  const newValueFunc = () => {
    if (typeof +newValue !== Number) {
      alert('please inter a number value')
      setNewValue(0)
    } else {
      setMinuts(newValue)
      setNewValue(0)
    }
  }

  return (
    <View>
      <WorkSpace>
        <StatusBar hidden={true}/>
        <ImageMain source={logo}></ImageMain>
        <TimerView>{seconds == 60 ? +minuts + 1 : minuts}:{seconds == 60 ? '00' : seconds}</TimerView>
        <Button mode='elevated' onPress={timer}>{runToggle ? 'PAUSE' :  'START'}</Button>
        <MyInput placeholder='set minuts' placeholderTextColor='white' value={newValue.toString()} onChangeText={setNewValue}></MyInput>
        <Button mode='elevated' onPress={newValueFunc}>SET</Button>
        <TimeSelectSpace>
          <SelectTime onPress={() => setMinuts(25)}>25 min</SelectTime>
          <SelectTime onPress={() => setMinuts(50)}>50 min</SelectTime>
        </TimeSelectSpace>
      </WorkSpace>
    </View>
  );
}
