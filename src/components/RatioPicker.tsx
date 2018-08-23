import React from 'react'
import { StyleSheet, View, Picker, Animated} from 'react-native'
import range from 'lodash/range'
import map from 'lodash/map'
import { spacing, colors, heading} from '../theme'

export type Ratio = {
  [key in Breath]?: number
}

export type Breath = "inhale" | "inHold" | "exhale" | "outHold"

export interface Props {
  style: Object;
  value?: Ratio;
  showValues: Array<Breath>
  onChange?: (value:Ratio) => void
}

export interface State {
  activeValue: Animated.Value;
  value: Ratio;
  active: boolean
}

const valueLabels:{[key in Breath]: string} = {
  inhale: "inhale",
  exhale: "exhale",
  inHold: "in-hold",
  outHold: "out-hold"
}

export default class RatioPicker extends React.Component<Props, State> {

  active:boolean = false
  timer:any

  constructor(props:Props, ctx:any) {
    super(props, ctx)
    this.state = {
      active: false,
      activeValue: new Animated.Value(0),
      value: props.value || {}
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

    const {style, showValues} = this.props
    const {value, activeValue, active} = this.state

    const scale = activeValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.6, 1]
    })

    const labelOpacity = activeValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    })

    const headerOpacity = activeValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0]
    })

    return (
      <Animated.View style={[styles.container, style, {transform: [{scale}]}]}>
        <Animated.Text style={[styles.header, {opacity: headerOpacity}]}>
          ratio
        </Animated.Text>
        <View style={styles.pickersContainer}>
          {
            map(showValues, (ratio, key) => (
              <View key={key} style={styles.ratioContainer} onTouchStart={this.activityHandler}>
                <View style={styles.pickerContainer}>
                  <Picker style={[styles.secondsPicker, { overflow: !active ? "hidden" : "visible" }]}  itemStyle={styles.secondsPickerItem} selectedValue={value[ratio]} onValueChange={this.createValueChangeHandler(ratio)}>
                    {
                      range(1,60).map((num) => 
                        <Picker.Item key={num} label={num.toString()} value={num}/>)
                    }
                  </Picker>
                </View>
                <Animated.Text style={[styles.labelText, {opacity:labelOpacity}]}>
                  {valueLabels[ratio]}
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
    justifyContent:'center',
  },
  secondsPickerItem: {
    fontSize: 40,
    color: colors.blue,
  },
  labelText: {
    flex: 1,
    textAlign: "center",
    color: colors.blue,
    padding: 4,
    backgroundColor: "white",
    borderRadius: 2
  },
  activitySurface: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});
