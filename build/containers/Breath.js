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
        this.onRatioChange = (ratio) => {
            this.setState({ ratio: ratio });
        };
        this.state = {
            ratio: {
                innhale: 4,
                exhale: 4
            }
        };
    }
    render() {
        const { ratio } = this.state;
        console.log(ratio);
        return (React.createElement(View, { style: [styles.container] },
            React.createElement(BreathHeader, { title: "Just Breathe", subTitle: "Relieve stress or anxiety by training your breath to the vizualisation." }),
            React.createElement(View, { style: styles.visualizationContainer },
                React.createElement(BreathVisualization, { ratio: [ratio["innhale"] * 1000, ratio["exhale"] * 1000], size: ((width - (spacing.four * 2)) / 100) * 100 })),
            React.createElement(RatioPicker, { style: styles.ratioPicker, ratios: {
                    innhale: { label: "innhale", default: 4 },
                    exhale: { label: "exhale", default: 4 }
                }, onChange: this.onRatioChange })));
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