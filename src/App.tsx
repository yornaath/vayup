import React from 'react'
import { LinearGradient, Asset, Linking, KeepAwake } from 'expo'
import { StyleSheet, Text, View, Image, Dimensions, Animated, TouchableOpacity, Switch, SafeAreaView } from 'react-native'
import Color from 'color'
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
import MenuIcon from './components/MenuIcon'
import isPad from './lib/isPad'


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

    onPressLuneticAddHandler = () => {
      Linking.openURL("https://itunes.apple.com/ca/app/lunetic/id1329646325?mt=8")
    }

    render() {

      const { path } = this.props.location
      const { menuOpen } = this.state
      const { settings, loaded } = this.props
      
      const menuScale = this.menuAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, isPad() ? 70 : 51]
      })

      const innerMenuOpacity = this.menuAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 42]
      })

      const innerMenuScale = this.menuAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
      })

      const innerMenuRotation = this.menuAnimation.interpolate({
        inputRange: [0,1],
        outputRange: ['-15deg', '0deg']
      })


      return (
        !loaded ?
          <View style={{ flex: 1 }}>
            <Image
              source={require('../assets/splash.png')}
            />
          </View>
        :
          <LinearGradient 
            start={[0.1, 0.1]}
            end={[1,1]}
            colors={["rgb(255,255,255)", "rgb(233,233,233)"]}
            style={styles.container}>
            <SafeAreaView style={{flex: 1}}>
              
              <KeepAwake />

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

              {
                menuOpen ?
                  <MenuIcon style={[styles.menuIcon]} color="white" onPress={this.menuButtonPress} /> :
                  <MenuIcon style={[styles.menuIcon]} color={colors.highlight} onPress={this.menuButtonPress}/>
              }

              <Animated.View style={[styles.logoTitle, {opacity: innerMenuOpacity}]}>
                <Text style={styles.logoTitleText}>vayup</Text>
              </Animated.View>
              
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
                <TouchableOpacity onPress={this.onPressLuneticAddHandler}>
                <LinearGradient 
                  start={[0.5, 0]}
                  end={[0.5,1]}
                  colors={[Color(colors.active).darken(0.15).toString(), Color(colors.active).darken(0.23).toString()]}
                  style={[styles.menuButtonContainer, styles.luneticButton]}>
                    <Image source={require('../assets/lunetic_icon.png')} style={styles.luneticIcon}/>
                    <View style={styles.luneticText}>
                      <Text style={[styles.luneticTitle]}>Lunetic</Text>
                      <Text style={[styles.luneticSubTitle]}>Keep Track of Moon Days</Text>
                    </View>
                  </LinearGradient>>
                </TouchableOpacity>
              </Animated.View>

            </SafeAreaView>
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
    justifyContent: 'center',
    alignItems: 'center',
    left: (screen.width / 2) - 100
  },
  logoTitleText: {
    flex: 1,
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'main-bold'
  },
  menuIcon: {
    height: 68,
    width: 68,
    padding: 20,
    position: "absolute",
    top: 25,
    left: spacing.four - 20
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
    backgroundColor: colors.active,
    position: "absolute",
    top: -20,
    left: -20,
    width: 28,
    height: 28,
    borderRadius: 28,
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
    overflow: "hidden",
    marginBottom: spacing.three
  },
  menuButtonText: {
    color: "white",
    fontSize: heading.one,
    marginBottom: spacing.one,
    fontFamily: 'main-regular'
  },
  menuButtonDescription: {
    color: "white",
    fontSize: heading.four,
    fontFamily: 'main-regular'
  },
  luneticButton: {
    alignSelf: "flex-start",
    flexDirection: "row",
    backgroundColor: Color(colors.active).darken(0.2).toString(),
    borderRadius: 4,
    padding: spacing.one
  },
  luneticIcon: {
    marginRight: spacing.one,
    height: 64,
    width: 64,
    borderRadius: 8
  },
  luneticText: {

  },
  luneticTitle: {
    fontSize: 20,
    color: "white",
    marginBottom: spacing.one / 3
  },
  luneticSubTitle: {
    color: "white",
    fontSize: 15
  },
  reminderSettingsToggleRow: {
    flexDirection: "row"
  }
})
