import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import BreathHeader from '../components/BreathHeader'
import RatioPicker from '../components/RatioPicker'
import BoxBreathVisualization from '../components/visualizations/BoxBreath'
import { spacing } from '../theme'
import { TRatio, ratioToMs } from '../lib/Ratio'
import isPad from '../lib/isPad'
import { RootState } from '../redux/root-reducer'
import * as settings from '../redux/settings'

interface SProps {
  ratio: TRatio;
}

interface DProps {
  setRatio: (ratio:TRatio) => void
}

interface IProps {
  ratio: TRatio
  haptic: boolean
}

type Props = SProps & DProps & IProps

const settingsKey = "boxbreath"

const mapStateToProps = (state:RootState) => ({
  haptic: settings.getState(state).haptic,
  ratio: settings.getRatioForKey(state, settingsKey)
})

const mapDispatchToprops = (dispatch: Dispatch) => ({
  setRatio: (ratio:TRatio) => dispatch(settings.setRatioForKey(settingsKey, ratio))
})

const { width } = Dimensions.get("window")

export default connect(mapStateToProps, mapDispatchToprops)(
  class BoxBreath extends React.Component<Props> {

    onRatioChange = (ratio:TRatio) => {
      this.props.setRatio(ratio)
    }

    render() {

      const size = isPad() ?
                    ((width - (spacing.four * 2)) / 100) * 65 :
                    ((width - (spacing.four * 2)) / 100) * 100

      return (
        <View style={[styles.container]}>
          
          <BreathHeader 
            title="Box Breath"
            subTitle="Create more range and availability in your breathing pattern."
          />

          <View style={styles.visualizationContainer}>
            <BoxBreathVisualization 
              size={size} 
              ratio={ratioToMs(this.props.ratio)} 
              haptic={this.props.haptic}/>
          </View>
          
          <RatioPicker 
            style={styles.ratioPicker}
            value={this.props.ratio}
            breaths={["inhale", "inHold", "exhale", "outHold"]}
            onChange={this.onRatioChange}
          />

        </View>
      );
    }
  })


const styles = StyleSheet.create({
  container: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center"
  },
  visualizationContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  ratioPicker: {
    flex: 1
  }
});
