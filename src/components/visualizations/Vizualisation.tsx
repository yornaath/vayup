import React from 'react'
import { Animated } from 'react-native'
import { Haptic } from 'expo'
import head from 'lodash/head'
import tail from 'lodash/tail'
import range from 'lodash/range'
import { delay } from 'bluebird'
import * as Ratio from '../../lib/Ratio'
import { TBreath } from '../../lib/Breath'


export interface Step {
  instruction: Instruction;
  duration:number;
  breath: TBreath;
  value: {x:number, y:number}
}

export interface Instruction {
  text: string;
}

export interface Options {
  repeat?: boolean;
  onInstruction?: (instruction:string) => void
}

interface Props {
  ratio: Ratio.TRatio;
  haptic?: boolean
}

interface State {
  instruction?:Instruction;
}


export default class Vizualization<P, S> extends React.Component<P & Props, State & S> {

  steps:Step[] = []
  animation:Animated.CompositeAnimation;
  running: boolean = false;
  value: Animated.ValueXY = new Animated.ValueXY();
  feedbackTimeout:any = null

  onStep?:(step:Step) => void;

  constructor(props: P & Props) {
    super(props)
    this.value.setValue(this.getInitialValue())
    this.steps = this.stepsFromRatio(props.ratio)
  }

  getInitialValue() {
    return {x: 0, y: 0}
  }

  async startAnimation() {
    if(this.running) {
      console.warn("trying to start a already running Vizualization")
      return null
    }
    this.running = true
    this.steps = this.stepsFromRatio(this.props.ratio)
    return await this.next(this.steps)
  }

  async next(steps:Step[]):Promise<void> {
    if(!this.running) {
      return null
    }
    if(!steps.length) {
      return this.next(this.steps)
    }
    const nextStep = head(steps)
    await this.runStep(nextStep)
    return this.next(tail(steps))
  }

  async stopAnimation() {
    this.running = false
    if(this.animation) {
      this.animation.stop()
    }
    if(this.feedbackTimeout) {
      clearInterval(this.feedbackTimeout)
    }
  }

  async restartAnimation() {
    this.stopAnimation()
    this.value.setValue(this.getInitialValue())
    await delay(500)
    return new Promise(resolve => {
      setImmediate(() => resolve(this.startAnimation()))
    })
  }

  async runStep(step:Step) {
    return new Promise(resolve => {
      this.setState({ instruction: step.instruction })
      this.animation = this.createAnimationForStep(step)
      this.onStep && this.onStep(step)
      if(this.props.haptic) {
        this.provideHapticFeedbackForStep(step)
      }
      this.animation.start(resolve)
    })
  }

  provideHapticFeedbackForStep(step: Step) {
    Haptic.impact(Haptic.ImpactStyles.Heavy)
    for(let tick of range(1, step.duration /1000)) {
      setTimeout(() => {
        if(!this.running || !this.props.haptic) {
          return null
        }
        Haptic.impact(Haptic.ImpactStyles.Medium)
      }, tick * 1000)
    }
  }

  stepsFromRatio(ratio:Ratio.TRatio) {
    return Ratio.mapToArray<Step>((duration, breath) => ({
      duration,
      breath,
      instruction: {
        text: 
          breath == "inhale" ?  "inhale" :
          breath == "inHold" ?  "hold" :
          breath == "exhale" ?  "exhale" :
          breath == "outHold" ? "hold" :
            null
      },
      value: 
        breath == "inhale" ?  {x: 0, y: 1} :
        breath == "inHold" ?  {x: 1, y: 1} :
        breath == "exhale" ?  {x: 1, y: 0} :
        breath == "outHold" ? {x: 0, y: 0} :
          null
    }), ratio)
  }

  createAnimationForStep(step:Step) {
    return Animated.timing(this.value, {toValue: step.value, duration: step.duration})
  }

  componentDidUpdate(lastProps:Props) {
    if(!Ratio.equals(lastProps.ratio, this.props.ratio)) {
      this.restartAnimation()
    }
  }

  componentDidMount() {
    this.startAnimation()
  }

  componentWillUnmount() {
    this.stopAnimation()
  }

}