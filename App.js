import React from 'react'
import { StyleSheet, View } from 'react-native'
import BoxBreath from './build/components/pranayama/BoxBreath'
import Breath from './build/components/pranayama/Breath'
import TriangleBreath from './build/components/pranayama/TriangleBreath'

export default class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <BoxBreath 
          style={styles.boxBreath} 
          size={200}
          duration={8 * 1000} 
          ratio={[1,1,1,1]}/>
        {/* <Breath duration={6000} ratio={[1,2]} />
        <TriangleBreath size={200} /> */}
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
    width: 200,
    marginBottom: 40
  }
})
