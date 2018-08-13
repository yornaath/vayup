
import {EasingFunction, Animated, Easing} from 'react-native'
import EventEmitter from 'events'

export interface Pranayama {
  duration: number;
  ratio: [number, number, number, number];
}

export const animated = (pranayama:Pranayama, easings?:[EasingFunction, EasingFunction, EasingFunction, EasingFunction]) => {

  const [inn, innHold, out, outHold] = pranayama.ratio
  const durationPerUnit = pranayama.duration / (inn + innHold + out + outHold)

  const [innEasing, innHoldEasing, outEasing, outHoldEasing] = easings || [
    Easing.inOut(Easing.ease), Easing.linear, Easing.inOut(Easing.ease), Easing.linear
  ]

  const state = new EventEmitter()
  const value = new Animated.ValueXY({x: 0, y: 0})
  
  let animation:Animated.CompositeAnimation|null = null

  const run = () => {
    state.emit('update', {state: 'in', value: {x: value.x, y: value.y}})

    animation = Animated.timing(value, {
      toValue: {x: 0, y: 1},
      easing: innEasing,
      useNativeDriver: true,
      duration: inn * durationPerUnit
    })
    
    animation.start(() => {
      state.emit('update', {state: 'hold-in', value: {x: value.x, y: value.y}})
      Animated.timing(value, {
        toValue: {x: 1, y: 1},
        easing: innHoldEasing,
        useNativeDriver: true,
        duration: innHold * durationPerUnit
      }).start(() => {
        state.emit('update', {state: 'out', value: {x: value.x, y: value.y}})
        Animated.timing(value, {
          toValue: {x: 0, y: 1},
          easing: outEasing,
          useNativeDriver: true,
          duration: out * durationPerUnit
        }).start(() => {
          state.emit('update', {state: 'hold-out', value: {x: value.x, y: value.y}})
          Animated.timing(value, {
            toValue: {x: 0, y: 0},
            easing: outHoldEasing,
            useNativeDriver: true,
            duration: outHold * durationPerUnit
          }).start(() => run())
        })
      })
    })
  }

  const start = () => {
    if(animation) {
      return animation.start()
    }
    else {
      return run()
    }
  }

  const stop = () => {
    if(animation) {
      animation.stop()
      animation = null
    }
  }

  return {
    value,
    state,
    start,
    stop
  }
}