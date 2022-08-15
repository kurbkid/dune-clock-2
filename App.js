import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  SafeAreaView,
  StyleSheet, 
  Text, 
  View,
  ImageBackground,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChessClocks from './ChessClocks';
import ConfigScreen from './configscreen';


import bckgrnd from './assets/duneboxcut2.png'; 

const Stack = createNativeStackNavigator();

const ScreenStack = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Config'>
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

// const ConfigScreen = ({navigation}) => {

// }

const ClockScreen = ({navigation, route}) => {
  const props = route.params
  return(
    <ChessClocks 
      numberOfPlayers={props.numberOfPlayers}
      duration={props.duration}
      colors={props.colors}
    />
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
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
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


