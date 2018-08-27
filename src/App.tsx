import React from 'react'
import {LinearGradient, Asset} from 'expo'
import { StyleSheet, Text, View, Image, Dimensions, Animated, TouchableOpacity, Switch } from 'react-native'
import { Dispatch } from 'redux'
import { Provider, connect } from 'react-redux'
import {spacing, colors, heading} from './theme'
import { store } from './redux/store'
import { RootState } from './redux/root-reducer'
import * as navigation from './redux/navigation'
import * as appstate from './redux/appstate'
import * as settings from './redux/settings'
import Breath from './containers/Breath'
import BoxBreath from './containers/BoxBreath'
import TriangleBreath from './containers/TriangleBreath'
import ReminderTimes from './containers/ReminderTimes'
import DateTimePicker from 'react-native-modal-datetime-picker'


type DProps = {
  setLocation: (location:navigation.Location) => navigation.NavigationAction;
  setRemindersOn: (on:Boolean) => settings.SettingsAction
}

type SProps = {
  location?: navigation.Location;
  loaded: boolean;
  settings: settings.State
}

type IProps = {

}

type Props = IProps & DProps & SProps

interface State {
  menuOpen: boolean;
}

const mapStateToProps = (state:RootState) => ({
  location: navigation.getLocation(state),
  loaded: appstate.getIsLoaded(state),
  settings: settings.getState(state)
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setLocation: (location:navigation.Location) => dispatch(navigation.setLocation(location)),
  setRemindersOn: (on:boolean) => dispatch(settings.setRemindersOn(on))
})

const screen = Dimensions.get("screen")

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
)

const App = connect<SProps, DProps>(mapStateToProps, mapDispatchToProps)(
  class extends React.Component<Props, State> {

    menuAnimation = new Animated.Value(0)

    state = {
      menuOpen: false
    }

    menuButtonPress = () => {
      this.setState({menuOpen: !this.state.menuOpen})
    }

    componentWillUpdate(nextProps:Props, nextState:State) {
      if(!this.state.menuOpen && nextState.menuOpen) {
        Animated.spring(this.menuAnimation, {
          toValue: 1
        }).start()
      }
      else if(this.state.menuOpen && !nextState.menuOpen) {
        Animated.spring(this.menuAnimation, {
          toValue: 0
        }).start()
      }
    }

    navigate = (path:string) => {
      return () => {
        this.closeMenu()
        this.props.setLocation({
          path
        })
      }
    }

    closeMenu = () => {
      this.setState({ menuOpen: false })
    }

    setRemindersOn = (value:boolean) => {
      this.props.setRemindersOn(value)
    }

    render() {

      const { path } = this.props.location
      const { menuOpen } = this.state
      const { settings, loaded } = this.props
      
      const menuScale = this.menuAnimation.interpolate({
        inputRange: [0,1],
        outputRange: [0, 48]
      })

      const innerMenuOpacity = this.menuAnimation.interpolate({
        inputRange: [0,1],
        outputRange: [0, 42]
      })

      const innerMenuScale = this.menuAnimation.interpolate({
        inputRange: [0,1],
        outputRange: [0, 1]
      })

      const innerMenuRotation = this.menuAnimation.interpolate({
        inputRange: [0,1],
        outputRange: ['-10deg', '0deg']
      })


      return (
        loaded &&
        <LinearGradient 
          start={[0.1, 0.1]}
          end={[1,1]}
          colors={["rgb(255,255,255)", "rgb(235,235,235)"]}
          style={styles.container}>

          <Image source={Asset.fromModule(require("../assets/title_logo.png"))} style={styles.logoTitle} resizeMode={"contain"}/>

          <View style={styles.contentContainer}>
            {
              path == "breathe" ?
                <Breath /> :
              path == "boxbreath" ?
                <BoxBreath /> :
              path == "detoxbreath" ?
                <TriangleBreath />
              : null
            }
          </View>

          <Animated.View style={[styles.menuBackground, {transform: [{ scale: menuScale }] }]} />

          {
            menuOpen &&
              <TouchableOpacity style={styles.touchableCloseBackground} onPress={this.closeMenu}/>
          }

          <TouchableOpacity onPress={this.menuButtonPress} style={styles.menuIcon}>
            <Image source={Asset.fromModule(require("../assets/line-menu.png"))} style={styles.menuIconImage} resizeMode={"contain"}/>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.menuButtonPress} style={styles.menuIcon}>
            <Animated.Image source={Asset.fromModule(require("../assets/line-menu-white.png"))} style={[styles.menuIconImage, {opacity: innerMenuOpacity}]} resizeMode={"contain"}/>
          </TouchableOpacity>

          <Animated.Image source={Asset.fromModule(require("../assets/title_logo_white.png"))} style={[styles.logoTitle, {opacity: innerMenuOpacity}]} resizeMode={"contain"}/>
          
          <Animated.View style={[styles.menuContainer, {opacity: innerMenuOpacity}, {transform: [
            {scale: innerMenuScale},
            {rotate: innerMenuRotation}
          ]}]}>
            <TouchableOpacity style={styles.menuButtonContainer} onPress={this.navigate("breathe")}>
              <Text style={styles.menuButtonText}>Just Breathe</Text>
              <Text style={styles.menuButtonDescription}>A guided and calming breath.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButtonContainer} onPress={this.navigate("boxbreath")}>
              <Text style={styles.menuButtonText}>Box Breath</Text>
              <Text style={styles.menuButtonDescription}>Relieve stress in the nervous system.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButtonContainer} onPress={this.navigate("detoxbreath")}>
              <Text style={styles.menuButtonText}>O2 Breath</Text>
              <Text style={styles.menuButtonDescription}>Re-oxygenate your blood.</Text>
            </TouchableOpacity>
            <View style={styles.menuButtonContainer}>
              <Text style={[styles.menuButtonDescription, { fontSize: heading.three, marginBottom: spacing.one}]}>Reminders</Text>
              <View style={styles.reminderSettingsToggleRow}>
                <Switch value={settings.remindersOn} onValueChange={this.setRemindersOn}/>
                {
                  settings.remindersOn &&
                    <ReminderTimes />
                }
              </View>
            </View>
          </Animated.View>


        </LinearGradient>
      )
    }

  })



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoTitle: {
    position: "absolute",
    top: 45,
    width: 200,
    height: 40,
    left: (screen.width / 2) - 100
  },
  menuIcon: {
    height: 24,
    width: 24,
    position: "absolute",
    top: 45,
    left: spacing.four
  },
  menuIconImage: {
    height: 24,
    width: 24,
  },
  contentContainer: {
    flex: 1,
    paddingTop: spacing.one,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuBackground: {
    backgroundColor: colors.blue,
    position: "absolute",
    top: 45,
    left: spacing.four,
    width: 24,
    height: 24,
    borderRadius: 24,
    shadowOffset: {height: 0, width: 0},
    shadowRadius: 1,
    shadowOpacity: 0.5,
    elevation: 1,
    shadowColor: 'black'
  },
  touchableCloseBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  menuContainer: {
    position: "absolute",
    top: 45 + + 24 + spacing.four,
    left: spacing.four
  },
  menuButtonContainer: {
    marginBottom: spacing.three
  },
  menuButtonText: {
    color: "white",
    fontSize: heading.one,
    marginBottom: spacing.one
  },
  menuButtonDescription: {
    color: "white",
    fontSize: heading.four
  },
  reminderSettingsToggleRow: {
    flexDirection: "row"
  }
})
