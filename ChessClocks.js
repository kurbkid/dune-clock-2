import React, {useState} from 'react';
import { 
    Text, 
    View,
    StyleSheet, 
    Button,
    TouchableOpacity,
  } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import pSBC from './colorhack'

//some functions to display the time
const getMinutes = (time) => (Math.floor(time/60))
const getSeconds = (time) => (time - getMinutes(time)*60)
const renderTime = (time) => {
  m = getMinutes(time);
  s = getSeconds(time);
  return(
    <View style={styles.timebox}>
      <Text style={styles.timeText}>
        {m<10 ? '0'+m : m}:{s<10 ? '0'+s : s}
      </Text>
    </View>
  )
}

// the main component
// props: numberOfPlayers, duration, colors
const ChessClocks = (props) => {
    let n = props.numberOfPlayers
    const [Pause,setPause] = useState(true)
    const [aanDeBeurt,setAanDeBeurt] = useState(0)

    var clocks = [];
    for (let i = 0; i<n; i++) {
      clocks.push(
      <View style={{flex:1,justifyContent:'center',transform: clockStyleRotation(i)}} key={i}>
        <TouchableOpacity
          onPress = {() => {
            (aanDeBeurt == i) && setAanDeBeurt( (aanDeBeurt+1) % n )
          }}
          >
          <CountdownCircleTimer
            isPlaying={ !Pause && aanDeBeurt==i }
            duration={props.duration}
            size={170}
            //initialTimeRemaining={0.0020}
            colors={props.colors[i]}
            trailColor={pSBC(-.75,props.colors[i])}
            >
            {({remainingTime}) => renderTime(remainingTime)}
          </CountdownCircleTimer>
        </TouchableOpacity>
      </View>)
    }
  
    return(
      <View style={{flex:1}}>
        <View style={{flex:1}}>
          <Button 
            onPress ={ () => {setPause(!Pause)}}
            title = {Pause ? "START":"PAUSE"}
          />
        </View>
        <View style={{flex:12}}>
          <View style={{flex:1,flexDirection:'row',justifyContent:'space-evenly'}}>
            <View style={{backgroundColor: aanDeBeurt==0 ? '#80808099':'transparent'}}>{clocks[0]}</View>
            <View style={{backgroundColor: aanDeBeurt==1 ? '#80808099':'transparent'}}>{clocks[1]}</View>
            </View>
          <View style={{flex:1,flexDirection:'row',justifyContent:'space-evenly'}}>
            <View style={{backgroundColor: aanDeBeurt==3 ? '#80808099':'transparent'}}>{clocks[3]}</View>
            <View style={{backgroundColor: aanDeBeurt==2 ? '#80808099':'transparent'}}>{clocks[2]}</View>
          </View>
        </View>
      </View>
    )
  }

const clockStyleRotation = (player) => {
    let rot = (player == 0 || player == 3) ? "90deg" : "270deg"
    return (
        [
        {rotate: rot}
        ]
    )
}

const styles = StyleSheet.create({
    timebox: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    timeText:{
      fontSize:40 ,
      fontWeight:'800',
      backgroundColor:'#AAAAAA60',
      alignSelf:'auto',
      borderRadius:10,
      // textShadowColor:"#9B6F34",
      // textShadowOffset:{width:-3,height:-3},
      // textShadowRadius:1,
    }
})
  

export default ChessClocks