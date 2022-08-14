import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  SafeAreaView,
  StyleSheet, 
  Text, 
  View,
  ImageBackground,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import ChessClocks from './ChessClocks';

import bckgrnd from './assets/duneboxcut2.png'; 

//the player colors eyedropped from dune and their names. 
const colors = ['#89292A','#9B6F34','#1E3560','#186047']
const colornames = ['red','yellow','blue','green']


const App = () => {
  const [numberOfPlayers,setNumberOfPlayers] = useState(4);
  const [timerDuration, setTimerDuration] = useState(25*60);
  const [playerColors, setPlayerColors] = useState(colors);
  
  //fill arrays with items for the Pickers
  const timeItems = []
  for (i=1; i<46; i++){ timeItems.push(<Picker.Item key={i} label={String(i)} value={i*60}/>)}
  const numberOfPlayersItems = []
  for (i=1; i<5; i++){ numberOfPlayersItems.push(<Picker.Item key={i} label={String(i)} value={i}/>)}
  const colorItems = []
  for (i=0; i<4; i++){ colorItems.push(<Picker.Item key={i} label={colornames[i]} value={colors[i]}/>)}

  //Color picker for certain player
  const PlayerColorPicker = (i) => {
    return(
      <View key={i} style={{flex:1,flexDirection:'row'}}>
        <Picker
          selectedValue={playerColors[i]}
          style={{flex:1,backgroundColor:playerColors[i]}}
          onValueChange={(itemValue,itemIndex) => { 
            let c = playerColors.slice()
            c[i] = itemValue
            setPlayerColors(c)
          }}
          >
          {colorItems}
        </Picker>
      </View>
    )
  }
  //Array with Color Pickers for each player
  PlayerColorPickerArray = []
  for (i=0;i<numberOfPlayers; i++){
    PlayerColorPickerArray.push(PlayerColorPicker(i))
  }

  return (
    <SafeAreaView style={{flex:1}}>
      <ImageBackground source={bckgrnd} resizeMode="cover" style={styles.background}>

      {/* Top part of the app with the settings  */}
      <View style={[styles.container, {justifyContent:'flex-end',marginTop:30}]}>
        {/* Display the number of players and time per player Pickers */}
        <View style={[styles.container, {flexDirection: "row"}]}>
          <Picker 
            selectedValue={numberOfPlayers}
            style={{flex:1,color:colors[1]}}
            dropdownIconColor={colors[1]}
            onValueChange={(itemValue, itemIndex) => {
              setNumberOfPlayers(itemValue);
            }}
          >
            {numberOfPlayersItems}
          </Picker>
          <Text style={[styles.normal, {flex:1}]}>players</Text>
          <Picker
            selectedValue={timerDuration}
            style={{flex:1,color:colors[1]}}
            dropdownIconColor={colors[1]}
            onValueChange={(itemValue, itemIndex) => {
              setTimerDuration(itemValue)
            }}
            >
            {timeItems}
          </Picker>
          <Text style={[styles.normal, {flex:1}]}>minutes</Text>
        </View>    
      </View>
      
      {/* Display the color pickers for each player */}
      <View style={[styles.container, {flexDirection:'row'}]}>
        <Text style={[styles.normal, {flex:1}]}>Player colors:</Text>
        {PlayerColorPickerArray}
      </View>
      
      {/* Main part of the app that displays the clocks */}
      <View style={{flex:8}}>
        <ChessClocks numberOfPlayers={numberOfPlayers} duration={timerDuration} colors={playerColors}/>
      </View>
  
      </ImageBackground>
    </SafeAreaView>
  );
}


export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  normal: {
    fontSize: 20,
    color : colors[1],
  },
  clock: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "center"
  },
  buttonText: {
    fontSize: 20,
    marginTop: 10,
  },
});


