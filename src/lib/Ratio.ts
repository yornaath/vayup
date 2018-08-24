import _partial from 'lodash/partial'
import _isEqual from 'lodash/isEqual'
import { Breath } from './Breath'

export type Ratio = {
  [key in Breath]?: number
}

export const map = (mapper:(duration:number, breath:Breath) => number, ratio:Ratio):Ratio => ({
  inhale: mapper(ratio.inhale || 0, 'inhale'),
  inHold: mapper(ratio.inHold || 0, 'inHold'),
  exhale: mapper(ratio.exhale || 0, 'exhale'),
  outHold: mapper(ratio.outHold || 0, 'outHold')
})

export const equals = (a:Ratio, b:Ratio):boolean => _isEqual(a, b)

export const ratioToMs = _partial(map, (n:number) => n * 1000)