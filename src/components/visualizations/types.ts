import { Component } from 'react'
import { Animated } from 'react-native' 
import { TRatio } from '../../lib/Ratio'

export interface VizualizationProps {
  ratio: TRatio;
}

export interface Vizualization extends Component<VizualizationProps> {
  
  readonly animation: Animated.CompositeAnimation
  readonly animationRunning: boolean
  readonly timeout: any

  startAnimation():Promise<void>
  restartAnimation():Promise<void>
  stopAnimation():Promise<void>

}
