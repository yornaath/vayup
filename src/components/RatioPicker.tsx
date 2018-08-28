import React from 'react'
import { StyleSheet, View, Picker, Animated} from 'react-native'
import range from 'lodash/range'
import get from 'lodash/get'
import map from 'lodash/map'
import { spacing, colors, heading} from '../theme'
import { TRatio } from '../lib/Ratio'
import { Breath } from '../lib/Breath'

export interface Props {
  style: Object;
  value?: TRatio;
  labels?: RatioLabels;
  showValues: Array<Breath>
  onChange?: (value:TRatio) => void
}

export interface State {
  activeValue: Animated.Value;
  value: TRatio;
  active: boolean
}

type RatioLabels = {[key in Breath]?: string}

const valueLabels:RatioLabels = {
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


    return (
      <Animated.View style={[styles.container, style, {transform: [{scale}]}]}>
        <View style={styles.pickersContainer}>
          {
            map(showValues, (ratio) => (
              <View key={ratio} style={styles.ratioContainer} onTouchStart={this.activityHandler}>
                <View style={styles.pickerContainer}>
                  <Picker style={[styles.secondsPicker, { overflow: !active ? "hidden" : "visible" }]}  itemStyle={styles.secondsPickerItem} selectedValue={value[ratio]} onValueChange={this.createValueChangeHandler(ratio)}>
                    {
                      range(1,60).map((num) => 
                        <Picker.Item key={num} label={num.toString()} value={num}/>)
                    }
                  </Picker>
                </View>
                <Animated.View style={[styles.labelTextContainer, {opacity:labelOpacity}]}>
                  <Animated.Text style={[styles.labelText]}>
                    {get(this.props, ['labels', ratio],valueLabels[ratio])}
                  </Animated.Text>
                </Animated.View>
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
    color: colors.highlight,
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
    color: colors.highlight,
  },
  labelTextContainer: {
    flex: 1,
    padding: 5,
  },
  labelText: {
    color: colors.highlight,
    borderRadius: 4,
    textAlign: "center",
    overflow: "hidden"
  },
  activitySurface: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});
