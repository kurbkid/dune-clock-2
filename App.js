import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  SafeAreaView,
  StyleSheet, 
  Text, 
  Button,
  View,
  ImageBackground,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChessClocks from './ChessClocks';
import Config from './configscreen';
import bckgrnd from './assets/duneboxcut2.png'; 

//the player colors eyedropped from dune and their names. 
const colors = ['#89292A','#9B6F34','#1E3560','#186047']
const colornames = ['red','yellow','blue','green']


const Stack = createNativeStackNavigator();

const ScreenStack = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName='Config'
        screenOptions={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      >
        <Stack.Screen
          name="Config"
          component={ConfigScreen}
          options={{ title:'Settings' }}
        />
        <Stack.Screen
          name="Clocks" component={ClockScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const ConfigScreen = ({navigation}) => {
  const [configuration, setConfiguration] = useState({
    numberOfPlayers:4,
    timerDuration: 20*60,
    playerColors:colors,
  })

  return(
    <ImageBackground source={bckgrnd} resizeMode="cover" style={styles.background}>
    <View style={styles.container}>
      <Config 
        configuration={configuration} onChange={setConfiguration}
      />
      <Button
        title="Let's go"
        onPress={() =>
          navigation.navigate('Clocks', {
            numberOfPlayers:configuration.numberOfPlayers,
            duration:configuration.timerDuration,
            colors:configuration.playerColors,
          })
        }
      />
    </View>
    </ImageBackground>
  )
}

const ClockScreen = ({navigation, route}) => {
  const p = route.params
  return(
    <ImageBackground source={bckgrnd} resizeMode="cover" style={styles.background}>
      <ChessClocks 
        numberOfPlayers={p.numberOfPlayers}
        duration={p.duration}
        colors={p.colors}
      />
    </ImageBackground>
  )
}

const App = () => {
  return (
    // <SafeAreaView style={{flex:1}}>
    //   <ImageBackground source={bckgrnd} resizeMode="cover" style={styles.background}>

    //   <ScreenStack/>

    //   </ImageBackground>
    // </SafeAreaView>
    <ScreenStack/>
  );
}


export default App;

const styles = StyleSheet.create({
  container: {
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


