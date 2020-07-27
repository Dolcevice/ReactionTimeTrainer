import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Modal} from 'react-native';
import {Timer} from "./timer";
import RandomBeep from "./randomBeep";
import NumericInput from 'react-native-numeric-input'

export default function App() {
  const [timerTime, setTimerTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [numBeeps, setNumBeeps] = useState(0);
  const [needNewBeeps, setNeedNewBeeps] = useState(false);
  const [destroyImpendingBeeps, setDestroyImpendingBeeps] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  // Add better hooks TODO
  const [beepMin, setBeepMin] = useState(2)
  const [beepMax, setBeepMax] = useState(4)
  const [userBeepMin, setUserBeepMin] = useState(2)
  const [userBeepMax, setUserBeepMax] = useState(4)


  useEffect(() => {
    Timer.setUpInstance((time) => setTimerTime(time))
  })

  const saveUserInput = () => {
    if (userBeepMax >= userBeepMin) {
      setBeepMax(userBeepMax);
      setBeepMin(userBeepMin);
      setModalActive(false);
    }
    else {
      alert("The maximum must be greater than or equal to the minimum.")
    }
  }

  return (
    <View style={styles.container}>
      <Modal
          animationType="slide"
          transparent={true}
          visible={modalActive}
          onRequestClose={() => {
          }}
      >
        <View style={styles.centeredView}>
          <View style={{...styles.smallModalView}}>
            <Text style={{fontWeight:"bold", fontSize:20, marginBottom:10}}>Choose the time interval</Text>
            <Text style={{fontWeight:"bold", fontSize:17, marginBottom:10}}>(seconds)</Text>

            <Text style={{fontWeight:"bold", fontSize:15, marginBottom:10}}>Minimum</Text>
            <NumericInput minValue={0} onLimitReached={((isMax, msg) => {alert("Unfortunately, this app cannot break the laws of time (keep the value above 0)")})} onChange={value => setUserBeepMin(value)}/>
            <Text style={{fontWeight:"bold", fontSize:15, marginBottom:10}}>Maximum</Text>
            <NumericInput minValue={0} onLimitReached={((isMax, msg) => {alert("Unfortunately, this app cannot break the laws of time (keep the value above 0)")})} onChange={value => setUserBeepMax(value)}/>
            <TouchableOpacity style={{...styles.button, marginTop:20, backgroundColor : 'darkgoldenrod'}}onPress={() => {saveUserInput()}}><Text style={{...styles.buttonText,}}>Save</Text></TouchableOpacity>
            <TouchableOpacity style={{...styles.button, backgroundColor : 'crimson'}} onPress={() => {setModalActive(false)}}><Text style={{...styles.buttonText,}}>Cancel</Text></TouchableOpacity>
          </View>
        </View>

      </Modal>
      <Text style={styles.bigText}>{timerTime}</Text>
      {!timerActive && <TouchableOpacity style={{...styles.button, backgroundColor : 'aqua'}} onPress={() => {Timer.startTimer(timerTime); setTimerActive(true); setNeedNewBeeps(true); setDestroyImpendingBeeps(false);}}><Text style={{...styles.buttonText,}}>Start timer</Text></TouchableOpacity>}
      {timerActive && <TouchableOpacity style={{...styles.button, backgroundColor : 'crimson'}} onPress={() => {Timer.stopTimer(); setTimerActive(false); setNeedNewBeeps(false); setDestroyImpendingBeeps(true)}}><Text style={{...styles.buttonText,}}>Stop Timer</Text></TouchableOpacity>}
      {!timerActive && <TouchableOpacity style={{...styles.button, backgroundColor : 'grey'}}  onPress={() => {setTimerTime(0)}}><Text style={{...styles.buttonText,}}>Clear Timer</Text></TouchableOpacity>}
      <Text style={styles.medText}>{numBeeps}</Text>
      <Text style={{...styles.verySmallText, color : "darkgoldenrod", fontWeight : "bold"}}>Active</Text>
      {beepMax !== beepMin && <Text style={{...styles.smallText, fontWeight : "bold"}}>There will be a beep every {beepMin} ~ {beepMax} seconds.{'\n'}</Text>}
      {beepMax === beepMin && <Text style={{...styles.smallText, fontWeight : "bold"}}>There will be a beep every {beepMin} seconds.{'\n'}</Text>}
      <TouchableOpacity style={{...styles.button, backgroundColor : 'crimson'}} onPress={() => {setNumBeeps(0)}}><Text style={{...styles.buttonText,}}>Clear Beep Count</Text></TouchableOpacity>
      <TouchableOpacity style={{...styles.button, backgroundColor : 'orange'}}onPress={() => {setModalActive(true)}}><Text style={{...styles.buttonText,}}>Change Time Range</Text></TouchableOpacity>
      <RandomBeep beepInitialized={() => setNeedNewBeeps(false)} beepSatisfied={() => {setNeedNewBeeps(true); setNumBeeps(val => val + 1)}} needNewBeep={timerActive && needNewBeeps} destroyImpendingBeep={destroyImpendingBeeps} min={beepMin} max={beepMax}/>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  smallModalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 300,
    height: 400,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigText : {
    fontSize : 120,
    fontWeight : "bold",
  },
  medText : {
    fontSize : 90,
  },
  smallText : {
    fontSize : 20,
  },
  verySmallText : {
    fontSize : 12,
  },
  button : {
    justifyContent: 'center',
    width : "100%",
    height : 50,
    alignContent : "center",
    alignItems : "center",
  },
  buttonText : {
    alignSelf : "center",
    color : 'white',
    fontWeight : 'bold',
    fontSize: 24,
  }
});
