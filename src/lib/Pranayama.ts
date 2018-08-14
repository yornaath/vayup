
import {Animated, Easing} from 'react-native'
import EventEmitter from 'events'



export interface PranayamaSequence {
  steps: Array<PranayamaStep|PranayamaSequence>;
  ratio: Array<number>;
  duration: number;
  cycles: number;
}

function isPranayamaSequence (pranayama:any): pranayama is PranayamaSequence {
  return pranayama && typeof pranayama["duration"] == "number"
}


export type Breath = "puraka" | "rechaka" | "antar-kumbhaka" | "bahya-kumbhaka"


export interface PranayamaStep {
  breath:Breath;
  instruction:string;
}


export const BoxBreath = (ratio:[number, number, number, number], duration:number, cycles:number):PranayamaSequence => ({
  steps: [
    { breath: "puraka", instruction: "breath in" },
    { breath: "antar-kumbhaka", instruction: "hold" },
    { breath: "rechaka", instruction: "breath out" },
    { breath: "bahya-kumbhaka", instruction: "hold" }
  ],
  ratio, duration, cycles
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

    const [inn, innHold, out, outHold] = pranayama.ratio
    const durationPerUnit = pranayama.duration / (inn + innHold + out + outHold)

    for(let step of pranayama.steps) {
      if(isPranayamaSequence(step)) {
        await next(step)
      }
      else  {

        let animation:Animated.CompositeAnimation|null = null

        switch(step.breath) {
          case 'puraka':
            animation = Animated.timing(value, {
              toValue: {x: 0, y: 1},
              useNativeDriver: true,
              duration: inn * durationPerUnit
            })
          break
          case 'antar-kumbhaka':
            animation = Animated.timing(value, {
              toValue: {x: 1, y: 1},
              useNativeDriver: true,
              easing: Easing.linear,
              duration: inn * durationPerUnit
            })
          break
          case 'rechaka':
            animation = Animated.timing(value, {
              toValue: {x: 1, y: 0},
              useNativeDriver: true,
              duration: inn * durationPerUnit
            })
          break
          case 'bahya-kumbhaka':
            animation = Animated.timing(value, {
              toValue: {x: 0, y: 0},
              useNativeDriver: true,
              duration: inn * durationPerUnit
            })
          break
        }

        instructions.emit("step", step)

        await new Promise((resolve) => animation.start(resolve))

      }
    }

    if(cyclesRun +1 < pranayama.cycles) {
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