import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import BreathVisualization from '../components/visualizations/Breath';
import BreathHeader from '../components/BreathHeader';
import RatioPicker from '../components/RatioPicker';
import { spacing } from '../theme';
const { width } = Dimensions.get("window");
export default class Breath extends React.Component {
    constructor(props) {
        super(props);
        this.onSecondsChange = (duration) => {
            this.setState({ duration: Math.floor(duration) });
        };
        this.state = {
            duration: 4
        };
    }
    render() {
        const duration = this.state.duration * 1000;
        return (React.createElement(View, { style: [styles.container] },
            React.createElement(BreathHeader, { title: "Just Breathe", subTitle: "Relieve stress or anxiety by training your breath to the vizualisation." }),
            React.createElement(View, { style: styles.visualizationContainer },
                React.createElement(BreathVisualization, { ratio: [duration, duration], size: ((width - (spacing.four * 2)) / 100) * 100 })),
            React.createElement(RatioPicker, { style: styles.ratioPicker })));
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
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
//# sourceMappingURL=Breath.js.map