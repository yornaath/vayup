
import React from 'react'
import { TouchableWithoutFeedback, Animated, View, StyleSheet, StyleProp, ViewStyle, GestureResponderEvent } from 'react-native'


export interface Props {
  style?: StyleProp<ViewStyle> | Array<StyleProp<ViewStyle> | Object>;
  color?: string;
  onPress?: (event:GestureResponderEvent) => void
}

export interface State {}

export default class MenuIcon extends React.PureComponent<Props, State> {
  render() {

    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <Animated.View style={this.props.style}>
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