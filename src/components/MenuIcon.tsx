
import React from 'react'
import { TouchableWithoutFeedback, Animated, View, StyleSheet, StyleProp, ViewStyle, GestureResponderEvent } from 'react-native'


export interface Props {
  style?: StyleProp<ViewStyle> | Array<StyleProp<ViewStyle> | Object>;
  color?: string;
  onPress?: (event:GestureResponderEvent) => void
}

export interface State {
  tapAnimation: Animated.Value
}

export default class MenuIcon extends React.PureComponent<Props, State> {

  state = {
    tapAnimation: new Animated.Value(1)
  }

  onPress = (event:GestureResponderEvent) => {
    this.props.onPress(event)
    Animated.sequence([
      Animated.timing(this.state.tapAnimation, { toValue: 1.2, duration: 100 }),
      Animated.timing(this.state.tapAnimation, { toValue: 1, duration: 100 })
    ]).start()
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <Animated.View style={[this.props.style, {transform: [{scale: this.state.tapAnimation}]}]}>
          <View style={[styles.line, {backgroundColor: this.props.color || "black"}]} />
          <View style={styles.spacing} />
          <View style={[styles.line, {backgroundColor: this.props.color || "black"}]} />
          <View style={styles.spacing} />
          <View style={[styles.line, {backgroundColor: this.props.color || "black"}]} />
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    
  },
  line: {
    flex: 1,
    borderRadius: 2
  },
  spacing: {
    flex: 2,
  }
})