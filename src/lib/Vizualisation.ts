import { Animated } from 'react-native'
import head from 'lodash/head'
import tail from 'lodash/tail'


interface Step {
  instruction: string;
  value: {x:number, y:number}
}

interface Options {
  repeat?: boolean;
  onInstruction?: (instruction:string) => void
}

export default class Vizualization {

  animation:Animated.CompositeAnimation;
  value: Animated.ValueXY;
  steps: Step[];
  opts: Options;
  state: 'running' | 'stopped'

  constructor(steps:Step[], opts:Options = {repeat:false}) {
    this.steps = steps
    this.opts = opts
  }

  async start() {
    return await this.next(this.steps)
  }

  async stop() {
    this.state = "stopped"
    if(this.animation) {
      this.animation.stop()
    }
  }

  async next(steps:Step[]):Promise<void> {
    if(this.state == "stopped") {
      return null
    }
    if(!steps.length && this.opts.repeat) {
      return this.next(this.steps)
    }
    if(!steps.length) {
      return null
    }
    const nextStep = head(this.steps)
    await this.runStep(nextStep)
    return this.next(tail(this.steps))
  }

  async runStep(step:Step) {
    return new Promise(resolve => {
      this.opts.onInstruction && this.opts.onInstruction(step.instruction)
      this.animation = Animated.timing(this.value, {toValue: step.value})
      this.animation.start(resolve)
    })
  }

}