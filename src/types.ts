
import { Animated } from 'react-native' 

export interface Vizualization {
  
  readonly animation: Animated.CompositeAnimation
  readonly animationRunning: boolean
  readonly timeout: any

  startAnimation():Promise<void>
  restartAnimation():Promise<void>
  stopAnimation():Promise<void>

}


export type Ratio = {
  [key in Breath]?: number
}


export type Breath = "inhale" | "inHold" | "exhale" | "outHold"