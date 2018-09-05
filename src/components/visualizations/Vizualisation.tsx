import React from 'react'
import { Animated } from 'react-native'
import head from 'lodash/head'
import tail from 'lodash/tail'
import { TRatio } from '../../lib/Ratio'


export interface Step {
  instruction: Instruction;
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
  ratio: TRatio;
}

interface State {
  instruction?:Instruction;
}


export default class Vizualization<P, S> extends React.Component<P & Props, State & S> {

  initialValue: { x: number; y:number } = {x: 0, y: 0}
  steps:Step[] = []
  animation:Animated.CompositeAnimation;
  running: boolean = false;
  value: Animated.ValueXY = new Animated.ValueXY();

  constructor(props: P & Props) {
    super(props)
    this.value.setValue(this.initialValue)
  }

  async startAnimation() {
    if(this.running) {
      console.warn("trying to start a already running Vizualization")
      return null
    }
    this.running = true
    return await this.next(this.steps)
  }

  async stopAnimation() {
    this.running = false
    if(this.animation) {
      this.animation.stop()
    }
  }

  async restartAnimation() {
    this.stopAnimation()
    this.value.setValue(this.initialValue)
    return new Promise(resolve => {
      setImmediate(() => resolve(this.startAnimation()))
    })
  }

  async next(steps:Step[]):Promise<void> {
    if(!this.running) {
      return null
    }
    if(!steps.length) {
      return this.next(this.steps)
    }
    if(!steps.length) {
      return null
    }
    const nextStep = head(this.steps)
    await this.runStep(nextStep)
    return this.next(tail(this.steps))
  }

  createAnimationForStep(step:Step) {
    return Animated.timing(this.value, {toValue: step.value})
  }

  async runStep(step:Step) {
    return new Promise(resolve => {
      this.setState({ instruction: step.instruction })
      this.animation = this.createAnimationForStep(step)
      this.animation.start(resolve)
    })
  }

}