
import {Animated, Easing} from 'react-native'
import EventEmitter from 'events'



export interface PranayamaSequence {
  steps: Array<PranayamaStep|PranayamaSequence>;
  ratio?: Array<number>;
  duration?: number;
  cycles?: number;
}

function isPranayamaSequence (pranayama:any): pranayama is PranayamaSequence {
  return pranayama && typeof pranayama["duration"] == "number"
}


export type Breath = "puraka" | "rechaka" | "antar-kumbhaka" | "bahya-kumbhaka"


export interface PranayamaStep {
  breath:Breath;
  instruction:string;
  duration?: number;
}


export const BoxBreath = (ratio:[number, number, number, number], duration:number, cycles:number):PranayamaSequence => ({
  steps: [
    { breath: "bahya-kumbhaka", instruction: "3", duration: 1000 },
    { breath: "bahya-kumbhaka", instruction: "2", duration: 1000 },
    { breath: "bahya-kumbhaka", instruction: "1", duration: 1000 },
    {
      steps: [
        { breath: "puraka", instruction: "breath in" },
        { breath: "antar-kumbhaka", instruction: "hold" },
        { breath: "rechaka", instruction: "breath out" },
        { breath: "bahya-kumbhaka", instruction: "hold" }
      ],
      ratio, duration, cycles
    }
  ]
})


export interface Guide {
  value: Animated.ValueXY;
  instructions: EventEmitter;
  start: () => void
}


export const guide = (pranayama:PranayamaSequence):Guide => {

  const value = new Animated.ValueXY({x: 0, y: 0})
  const instructions = new EventEmitter()

  const next = async (pranayama:PranayamaSequence, cyclesRun:number = 0) => new Promise(async (resolve) => {

    for(let step of pranayama.steps) {
      if(isPranayamaSequence(step)) {
        await next(step)
      }
      else  {

        const [inn, innHold, out, outHold] = pranayama.ratio
        const durationPerUnit = pranayama.duration / (inn + innHold + out + outHold)

        let animation:Animated.CompositeAnimation|null = null
        let toValue = {x: 0, y: 0}
        let easing = Easing.inOut(Easing.ease)
        let duration = 250 

        switch(step.breath) {
          case 'puraka':
            toValue =  {x: 0, y: 1}
            duration =  step.duration || out * durationPerUnit
          break
          case 'antar-kumbhaka':
            toValue = {x: 1, y: 1},
            easing = Easing.linear
            duration = step.duration || (innHold * durationPerUnit) 
          break
          case 'rechaka':
            toValue =  {x: 1, y: 0}
            duration =  step.duration || out * durationPerUnit
          break
          case 'bahya-kumbhaka':
            toValue =  {x: 0, y: 0}
            easing = Easing.linear
            duration =  step.duration || (outHold * durationPerUnit)
          break
        }

        animation = Animated.timing(value, {
          toValue, duration, easing, useNativeDriver: true,
        })

        instructions.emit("step", step)

        await new Promise((resolve) => animation.start(resolve))

      }
    }

    if(pranayama.cycles && cyclesRun + 1 < pranayama.cycles) {
      await next(pranayama, cyclesRun + 1)
    }

    resolve()
  })

  const start = () => next(pranayama)

  return {
    value,
    instructions,
    start
  }
}