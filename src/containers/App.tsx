import React from 'react'
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native'
import BoxBreath from '../containers/BoxBreath'
import {LinearGradient} from 'expo'
import {heading, spacing} from '../theme'

const dimensions = Dimensions.get("screen")

export default class App extends React.Component {

  render() {
    return (
      <LinearGradient 
        start={[0.1, 0.1]}
        end={[1,1]}
        colors={["rgb(255,255,255)", "rgb(235,235,235)"]}
        style={styles.container}>

        <View style={styles.header}>
          <Image source={require("../../assets/title_logo.png")} style={styles.logoTitle} resizeMode={"contain"}/>
          <View style={styles.title}>
            <Text style={styles.titleHeader}>
              Box Breath
            </Text>
            <Text style={styles.titleSubHeader}>
              Calming breath that regulates the autonomic nervous system.
            </Text>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <BoxBreath />
        </View>

      </LinearGradient>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoTitle: {
    position: "absolute",
    top: 40,
    width: 200,
    height: 40,
    left: (dimensions.width / 2) - 100
  },
  header: {
    flex: 1,
    paddingTop: spacing.four,
    paddingLeft: spacing.four,
    paddingRight: spacing.four,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    
  },
  title: {
    flex: 1,
  },
  titleHeader: {
    fontSize: heading.one,
    color: "rgba(0,0,0,0.96)",
    marginBottom: spacing.one
  },
  titleSubHeader: {
    fontSize: heading.three,
    color: "rgba(0,0,0,0.7)",
  },
  contentContainer: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxBreath: {
    height: 200,
    width: 200
  }
})