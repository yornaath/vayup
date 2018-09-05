import _partial from 'lodash/partial'
import _isEqual from 'lodash/isEqual'
import { Breath } from './Breath'

export type TRatio = {
  [key in Breath]?: number
}

export const Ratio = (inhale:number, inHold:number, exhale:number, outHold:number):TRatio => ({
  inhale, inHold, exhale, outHold
})

export const BoxRatio = (num:number):TRatio => ({
  inhale: num,
  inHold: num,
  exhale: num,
  outHold: num
})

export const map = (mapper:(duration:number, breath:Breath) => number, ratio:TRatio):TRatio => ({
  inhale: mapper(ratio.inhale || 0, 'inhale'),
  inHold: mapper(ratio.inHold || 0, 'inHold'),
  exhale: mapper(ratio.exhale || 0, 'exhale'),
  outHold: mapper(ratio.outHold || 0, 'outHold')
})

export const mapToArray = <T> (mapper:(value:number, breath:Breath) => T, ratio:TRatio):Array<T> => {
  return [
    mapper(ratio.inhale, "inhale"),
    mapper(ratio.inHold, "inHold"),
    mapper(ratio.exhale, "exhale"),
    mapper(ratio.outHold, "outHold")
  ]
}

export const ratioToMs = _partial(map, (n:number) => n * 1000)

export const equals = (a:TRatio, b:TRatio):boolean => _isEqual(a, b)