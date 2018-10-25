import React from 'react'
import { LinearGradient, Asset, Linking, KeepAwake } from 'expo'
import { StyleSheet, Text, View, Image, Dimensions, Animated, TouchableOpacity, Switch, SafeAreaView, StatusBar, PanResponder } from 'react-native'
import Color from 'color'
import { Dispatch } from 'redux'
import { Provider, connect } from 'react-redux'
import { spacing, colors, heading } from './theme'
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
import VibrationIcon from './components/VibrationIcon'
import isPad from './lib/isPad'


type DProps = {
  setLocation: (location:navigation.Location) => navigation.NavigationAction;
  setRemindersOn: (on:Boolean) => settings.SettingsAction
  setHaptic: (on:Boolean) => settings.SettingsAction
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
  setRemindersOn: (on:boolean) => dispatch(settings.setRemindersOn(on)),
  setHaptic: (on:boolean) => dispatch(settings.setHaptic(on))
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

    disableSwipe = false

    panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return this.disableSwipe    ? false :
               gestureState.dx > 10 || gestureState.dx < -10 ? true :
                                      false

      },
      onMoveShouldSetPanResponderCapture: (evt) => false,
      onPanResponderMove: (evt, gestureState) => {
        const pxMoved = gestureState.dx < 0 ? gestureState.dx * -1 : gestureState.dx
        const prctMoved = pxMoved / screen.width
        const currentAnimValue = (this.menuAnimation as any)._value
        if(gestureState.dx > 0 && currentAnimValue < 1) {
          this.menuAnimation.setValue(prctMoved)
        }
        if(gestureState.dx < 0 && currentAnimValue > 0) {
          this.menuAnimation.setValue(1 - prctMoved)
        }
      },
      onPanResponderTerminationRequest: (evt) => true,
      onPanResponderRelease: (evt, gestureState) => {
        if(gestureState.dx < 100) {
          this.closeMenu()
        }
        else if(gestureState.dx > 100) {
          this.openMenu()
        }
      },
      onShouldBlockNativeResponder: (evt) => {
        return true;
      },
    })

    menuButtonPress = () => {
      this.openMenu()
    }

    menuButtonPressIn = () => {
      this.disableSwipe = true
    }

    menuButtonPressOut = () => {
      this.disableSwipe = false
    }

    openMenu = () => {
      this.setState({menuOpen : true})
      Animated.spring(this.menuAnimation, {
        toValue: 1,
      }).start()
    }

    closeMenu = () => {
      this.setState({menuOpen : false})
      Animated.spring(this.menuAnimation, {
        toValue: 0,
      }).start()
    }

    navigate = (path:string) => {
      return () => {
        this.closeMenu()
        this.props.setLocation({
          path
        })
      }
    }

    setRemindersOn = (value:boolean) => {
      this.props.setRemindersOn(value)
    }

    onPressLuneticAddHandler = () => {
      Linking.openURL("https://itunes.apple.com/ca/app/lunetic/id1329646325?mt=8")
    }

    onPressVbrationIconHandler = () => {
      this.props.setHaptic(!this.props.settings.haptic)
    }

    render() {

      const { path } = this.props.location
      const { settings, loaded } = this.props
      const { menuOpen } = this.state
      
      const contentContainerTransform = {
        borderWidth: this.menuAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [2, 7]
        }),
        borderColor: colors.highlight,
        borderRadius: this.menuAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [5, 20]
        }),
        transform: [
          { 
            scale: this.menuAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0.7]
            }) 
          },
          {
            translateX: this.menuAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 270]
            }) 
          }
        ]
      }

      const logoTitleTransform = {
        transform: [
          {
            translateY: this.menuAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [-100, 0]
            }) 
          }
        ]
      }

      const menuTransform = {
        transform: [
          {
            translateX: this.menuAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [-200, 0]
            }) 
          }
        ]
      }

      const contentTouchOverlayTransform = {
        transform: [
          {
            translateY: this.menuAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [screen.height * 2, 0]
            }) 
          }
        ]
      }

      const menuIconTransform = {
        top: this.menuAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [40, 20]
        }) 
      }

      const luneticButtonContainerTransform = {
        transform: [
          {
            translateY: this.menuAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [100, 0]
            }) 
          }
        ]
      }

      return (
        !loaded ?
          <View style={{ flex: 1 }}>
            <Image
              source={require('../assets/splash.png')}
            />
          </View>
        :
        <View
          {...this.panResponder.panHandlers}
          style={[styles.container]}>

            <StatusBar backgroundColor={"white"}/>

            <KeepAwake />

            <Animated.View style={[styles.logoTitle, logoTitleTransform]}>
              <Text style={styles.logoTitleText}>vayup</Text>
            </Animated.View>

            <Animated.View style={[styles.menuContainer, menuTransform]}>
              <TouchableOpacity onPress={this.navigate("breathe")}>
                <Animated.View style={[styles.navItemContainer]}>
                  <Text style={[styles.navItemtext]}>Just Breathe</Text>
                  <Text style={styles.navItemDescription}>A guided and calming breath.</Text>
                </Animated.View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.navigate("boxbreath")}>
                <Animated.View style={[styles.navItemContainer]}>
                  <Text style={[styles.navItemtext]}>Box-Breath</Text>
                  <Text style={styles.navItemDescription}>Relieve stress in the nervous system.</Text>
                </Animated.View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.navigate("detoxbreath")}>
                <Animated.View style={[styles.navItemContainer]}>
                  <Text style={[styles.navItemtext]}>02 Breath</Text>
                  <Text style={styles.navItemDescription}>Re-oxygenate your blood.</Text>
                </Animated.View>
              </TouchableOpacity>
              <Animated.View style={[styles.navItemContainer]}>
                <Text style={styles.navItemDescription}>Reminders</Text>
                <View style={styles.reminderSettingsToggleRow}>
                  <Switch value={settings.remindersOn} onValueChange={this.setRemindersOn} tintColor={colors.active} onTintColor={colors.highlight}/>
                  {
                    settings.remindersOn &&
                      <ReminderTimes />
                  }
                </View>
              </Animated.View>
            </Animated.View>

            <Animated.View style={[styles.luneticButtonContainer, luneticButtonContainerTransform]}>
              <TouchableOpacity style={styles.luneticButton} onPress={this.onPressLuneticAddHandler}>
                <Image source={require('../assets/lunetic_icon.png')} style={styles.luneticIcon}/>
                <View style={styles.luneticText}>
                  <Text style={[styles.luneticTitle]}>Lunetic</Text>
                  <Text style={[styles.luneticSubTitle]}>Track Moon Days</Text>
                  <Text style={[styles.luneticSubTitle]}>Available on Appstore</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>

            <Animated.View 
              style={[styles.outerContentContainer, contentContainerTransform]}>
                <LinearGradient
                  start={[0.1, 0.1]}
                  end={[1,1]}
                  colors={["rgb(255,255,255)", "rgb(233,233,233)"]}
                  style={[styles.contentContainer, {borderRadius: 20}]}>
                    

                    {
                      path == "breathe" ?
                        <Breath /> :
                      path == "boxbreath" ?
                        <BoxBreath /> :
                      path == "detoxbreath" ?
                        <TriangleBreath />
                      : null
                    }

                    <MenuIcon style={[styles.menuIcon, menuIconTransform]} color={colors.highlight} onPressIn={this.menuButtonPressIn} onPressOut={this.menuButtonPressOut} onPress={this.menuButtonPress}/>

                    <TouchableOpacity onPress={this.onPressVbrationIconHandler}>
                      <View style={styles.vibrationIconContainer}>
                        <VibrationIcon 
                          active={settings.haptic}
                          onPress={this.onPressVbrationIconHandler}/>
                        <Text style={styles.hapticFeedbackText}>
                          {
                            !settings.haptic ?
                              "Turn On haptic feedback" : " "
                          }
                        </Text>
                      </View>
                    </TouchableOpacity>

                  
                </LinearGradient>
              
                <Animated.View style={[styles.contentTouchOverlay, contentTouchOverlayTransform]}>
                  <TouchableOpacity style={styles.contentTouchOverlay} onPress={this.closeMenu} />
                </Animated.View>
              
            </Animated.View>

          </View>
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
    color: colors.highlight,
    textAlign: 'center',
    fontFamily: 'main-bold'
  },
  menuIcon: {
    height: 68,
    width: 68,
    padding: 20,
    position: "absolute",
    left: spacing.four - 20
  },
  menuIconImage: {
    height: 24,
    width: 24,
  },
  menuContainer: {
    position: 'absolute',
    left: 0,
    paddingLeft: spacing.two,
    top: (screen.height / 100) * 20
  },
  navItemContainer: {
    marginBottom: spacing.four,
  },
  navItemtext: {
    fontFamily: 'main-bold',
    fontSize: 23,
    color: colors.highlight
  },
  navItemDescription: {
    fontFamily: 'main-regular',
    fontSize: 11,
    color: colors.highlight,
  },
  outerContentContainer: {
    flex: 1
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: screen.height,
    paddingTop: spacing.three
  },
  contentTouchOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: screen.width,
    height: screen.height,
    backgroundColor: 'transparent'
  },
  luneticButtonContainer: {
    display: 'flex',
    position: 'absolute',
    left: 0,
    bottom: spacing.two,
    width: screen.width,
  },
  luneticButton: {
    display: 'flex',
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    marginTop: spacing.four,
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
    fontSize: 18,
    marginBottom: 5,
    color: colors.highlight,
  },
  luneticSubTitle: {
    color: colors.highlight,
    fontSize: 12
  },
  reminderSettingsToggleRow: {
    marginTop: 5,
    flexDirection: "row"
  },
  vibrationIconContainer: {
    alignItems: "center",
    marginBottom: spacing.four,
  },
  hapticFeedbackText: {
    color: Color(colors.active).toString()
  }
})
