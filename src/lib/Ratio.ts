
import { Breath } from './Breath'

export type Ratio = {
  [key in Breath]?: number
}

export const map = (ratio:Ratio, mapper:(duration:number, breath:Breath) => number):Ratio => ({
  inhale: mapper(ratio.inhale || 0, 'inhale'),
  inHold: mapper(ratio.inHold || 0, 'inHold'),
  exhale: mapper(ratio.exhale || 0, 'exhale'),
  outHold: mapper(ratio.outHold || 0, 'outHold')
})