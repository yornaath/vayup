import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import BoxBreath from './components/BoxBreath'
import Breath from './components/Breath'

export default class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        {/* <BoxBreath 
          style={styles.boxBreath} 
          size={200}
          duration={8 * 1000} 
          ratio={[1,1,1,1]}/> */}
        <Breath duration={3000} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxBreath: {
    height: 200,
    width: 200
  }
});
