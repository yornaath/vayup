import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import RatioPicker from '../components/RatioPicker'
import BreathHeader from '../components/BreathHeader'
import TriangleBreathVisualization from '../components/visualizations/TriangleBreath'
import { spacing } from '../theme'
import { TRatio, ratioToMs, } from '../lib/Ratio'
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
}

type Props = SProps & DProps & IProps

const settingsKey = "detoxbreath"

const mapStateToProps = (state:RootState) => ({
  ratio: settings.getRatioForKey(state, settingsKey)
})

const mapDispatchToprops = (dispatch: Dispatch) => ({
  setRatio: (ratio:TRatio) => dispatch(settings.setRatioForKey(settingsKey, ratio))
})

const { width } = Dimensions.get("window")

export default connect(mapStateToProps, mapDispatchToprops)(
  class TriangleBreath extends React.Component<Props> {

    onRatioChange = (ratio:TRatio) => {
      this.props.setRatio(ratio)
    }

    render() {
      return (
        <View style={[styles.container]}>
          
          <BreathHeader 
            title="O2 Breath"
            subTitle="Emphazise the removal of c02 and reoxygenation of the blood."
          />

          <View style={styles.visualizationContainer}>
            <TriangleBreathVisualization size={((width - (spacing.four * 2)) / 100) * 100} ratio={ratioToMs(this.props.ratio)} />
          </View>
          
          <RatioPicker 
            style={styles.ratioPicker}
            value={this.props.ratio}
            showValues={["inhale", "inHold", "exhale"]}
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
