import React from 'react';
import { StyleSheet, Text, View, Dimensions, Slider } from 'react-native';
import BoxBreathVisualization from '../components/visualizations/BoxBreath';
import { spacing } from '../theme';
const { width } = Dimensions.get("window");
export default class BoxBreath extends React.Component {
    constructor(props) {
        super(props);
        this.onDurationSliderChange = (duration) => {
            this.setState({ duration: Math.floor(duration) });
        };
        this.state = {
            duration: 4
        };
    }
    render() {
        return (React.createElement(View, { style: [styles.container] },
            React.createElement(View, { style: styles.visualizationContainer },
                React.createElement(BoxBreathVisualization, { size: (width / 100) * 70, duration: this.state.duration * 1000 })),
            React.createElement(View, { style: styles.sliderContainer },
                React.createElement(Slider, { minimumValue: 1, maximumValue: 30, value: this.state.duration, style: styles.slider, onValueChange: this.onDurationSliderChange }),
                React.createElement(Text, { style: styles.durationText },
                    this.state.duration,
                    " seconds"))));
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center"
    },
    visualizationContainer: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center"
    },
    sliderContainer: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    slider: {
        width: width - (spacing.four * 2)
    },
    durationText: {
        color: "blue"
    }
});
//# sourceMappingURL=BoxBreath.js.map