import { 
  StyleSheet, 
  Text, 
  View,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';


//the player colors eyedropped from dune and their names. 
const colors = ['#89292A','#9B6F34','#1E3560','#186047']
const colornames = ['red','yellow','blue','green']

const Config = (props) => {
  numberOfPlayers=props.configuration.numberOfPlayers
  timerDuration=props.configuration.timerDuration
  playerColors=props.configuration.playerColors

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
      <View key={i} style={{borderWidth:3,borderColor:'grey',borderRadius:4}}>
        <Picker
          selectedValue={playerColors[i]}
          style={{width:70,height:70,backgroundColor:playerColors[i]}}
          onValueChange={(itemValue,itemIndex) => { 
            let c = playerColors.slice()
            j = c.findIndex( (x) => x==itemValue ) //where was the picked color before
            c[j] = c[i] // old color goes to that place
            c[i] = itemValue //new color goes here
            props.onChange({...props.configuration,playerColors:c})
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

  //The return has a shitload of Views in order to make for a nice options table
  return(
    <View style={{justifyContent:'flex-start'}}>
      <View style={{flexDirection:'row',}}>
        <Text style={styles.configText}>Number of players:</Text>
        <Picker 
          selectedValue={numberOfPlayers}
          style={{flex:1,color:colors[1]}}
          dropdownIconColor={colors[1]}
          onValueChange={(itemValue, itemIndex) => {
            props.onChange({...props.configuration,numberOfPlayers:itemValue})
          }}
        >
          {numberOfPlayersItems}
        </Picker>
      </View>
      <View style={{flexDirection:'row'}}>
        <Text style={styles.configText}>Time per player:</Text>
        <Picker
          selectedValue={timerDuration}
          style={{flex:1,color:colors[1]}}
          dropdownIconColor={colors[1]}
          onValueChange={(itemValue, itemIndex) => {
            props.onChange({...props.configuration,timerDuration:itemValue})
          }}
          >
          {timeItems}
        </Picker>
      </View>
      <View style={{flexDirection:'row',}}>
        <Text style={styles.configText}>Colors:</Text>
        <View style={{flex:1,height:150,margin:10}}>
          <View style={{flex:1,justifyContent:'space-around'}}>
            <View style={{flex:1,flexDirection:'row',justifyContent:'space-around'}}>
              {PlayerColorPickerArray[0]}
              {PlayerColorPickerArray[1]}
            </View>
            <View style={{flex:1,flexDirection:'row',justifyContent:'space-around'}}>
              {PlayerColorPickerArray[3]}
              {PlayerColorPickerArray[2]}
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Config

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    normal: {
      fontSize: 20,
      color : colors[1],
    },
    configText: {
      flex:1,
      textAlign:'right',
      textAlignVertical:'center',
      color : colors[1],
      fontSize: 20,
    }
})