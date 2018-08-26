import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import BreathHeader from '../components/BreathHeader'
import RatioPicker from '../components/RatioPicker'
import BoxBreathVisualization from '../components/visualizations/BoxBreath'
import { spacing } from '../theme'
import { TRatio, ratioToMs, BoxRatio } from '../lib/Ratio'
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

const settingsKey = "boxbreath"

const mapStateToProps = (state:RootState) => ({
  ratio: settings.getRatioForKey(state, settingsKey)
})

const mapDispatchToprops = (dispatch) => ({
  setRatio: (ratio:TRatio) => dispatch(settings.setRatioForKey(settingsKey, ratio))
})

const { width } = Dimensions.get("window")

export default connect(mapStateToProps, mapDispatchToprops)(
  class BoxBreath extends React.Component<Props> {

    onRatioChange = (ratio:TRatio) => {
      this.props.setRatio(ratio)
    }

    render() {
      return (
        <View style={[styles.container]}>
          
          <BreathHeader 
            title="Box Breath"
            subTitle="Regulate, vitalize and calm the autonomic nervous system."
          />

          <View style={styles.visualizationContainer}>
            <BoxBreathVisualization size={((width - (spacing.four * 2)) / 100) * 100} ratio={ratioToMs(this.props.ratio)} />
          </View>
          
          <RatioPicker 
            style={styles.ratioPicker}
            value={this.props.ratio}
            showValues={["inhale", "inHold", "exhale", "outHold"]}
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
