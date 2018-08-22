import React from 'react'
import { StyleSheet, Text, View, Picker, Animated, TouchableWithoutFeedback} from 'react-native'
import range from 'lodash/range'
import map from 'lodash/map'
import reduce from 'lodash/reduce'
import { spacing, colors, heading} from '../theme'

export interface Value {
  [key:string]: number
}

export interface Props {
  style: Object;
  value?: Value;
  ratios: {
    [key:string]: {default: number, label: string}
  }
  onChange?: (value:Value) => void
}

export interface State {
  activeValue: Animated.Value;
  value: Value;
  active: boolean
}

export default class RatioPicker extends React.Component<Props, State> {

  active:boolean = false
  timer:any

  constructor(props:Props, ctx:any) {
    super(props, ctx)
    this.state = {
      active: false,
      activeValue: new Animated.Value(0),
      value: props.value || reduce(props.ratios, (value, ratio, key) => ({
        ...value,
        [key]: ratio.default
      }), {})
    }
  }

  activityHandler = () => {
    this.activate()
  }

  activate() {
    this.setState({active: true})
    Animated.spring(this.state.activeValue, {
      toValue: 1
    }).start()
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {this.deactivate()}, 3000)
  }

  deactivate() {
    this.setState({active: false})
    Animated.spring(this.state.activeValue, {
      toValue: 0
    }).start()
  }

  createValueChangeHandler = (key:string) => (value:number) => {
    const newValue = {
      ...this.state.value,
      [key]: value
    }
    this.setState({ value: newValue })
    this.props.onChange && this.props.onChange(newValue)
  }

  render() {

    const {style, ratios} = this.props
    const {value, activeValue, active} = this.state

    const scale = activeValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.6, 1]
    })

    const labelOpacity = activeValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    })

    return (
      <Animated.View style={[styles.container, style, {transform: [{scale}]}]}>
        <Text style={styles.header}>
          ratio
        </Text>
        <View style={styles.pickersContainer}>
          {
            map(ratios, (ratio, key) => (
              <View key={key} style={styles.ratioContainer} onTouchStart={this.activityHandler}>
                <View style={styles.pickerContainer}>
                  <Picker style={styles.secondsPicker}  itemStyle={styles.secondsPickerItem} selectedValue={value[key]} onValueChange={this.createValueChangeHandler(key)}>
                    {
                      range(1,60).map((num) => 
                        <Picker.Item key={num} label={num.toString()} value={num}/>)
                    }
                  </Picker>
                </View>
                <Animated.Text style={[styles.labelText, {opacity:labelOpacity}]}>
                  {ratio.label}
                </Animated.Text>
              </View>
            ))
          }
        </View>
        
      </Animated.View>
    )
  }

}


const styles = StyleSheet.create({
  container: {
    
  },
  header: {
    flex: 1,
    textAlign: "center",
    color: colors.blue,
    fontSize: heading.two
  },
  pickersContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  ratioContainer: {
    width: 80,
  },
  secondsChooserContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pickerContainer: {
    flex: 2,
    justifyContent: "center",
  },
  secondsPicker: {
    width: 80,
    height: 45,
    marginBottom: spacing.two,
    overflow: "hidden",
    justifyContent:'center',
  },
  secondsPickerItem: {
    fontSize: 40,
    color: colors.blue,
  },
  labelText: {
    flex: 1,
    textAlign: "center",
    color: colors.blue
  },
  activitySurface: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});
