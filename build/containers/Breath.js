import React from 'react';
import { StyleSheet, Text, View, Dimensions, Picker } from 'react-native';
import range from 'lodash/range';
import BreathVisualization from '../components/visualizations/Breath';
import { spacing, colors } from '../theme';
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
            React.createElement(View, { style: styles.visualizationContainer },
                React.createElement(BreathVisualization, { ratio: [duration, duration], size: ((width - (spacing.four * 2)) / 100) * 100 })),
            React.createElement(View, { style: styles.secondsChooserContainer },
                React.createElement(View, { style: styles.pickerContainer },
                    React.createElement(Picker, { style: styles.secondsPicker, itemStyle: styles.secondsPickerItem, selectedValue: this.state.duration, onValueChange: this.onSecondsChange }, range(1, 60).map((num) => React.createElement(Picker.Item, { key: num, label: num.toString(), value: num })))),
                React.createElement(Text, { style: styles.durationText }, "seconds"))));
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
        alignItems: "flex-start"
    },
    secondsChooserContainer: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    pickerContainer: {
        flex: 2,
        justifyContent: "flex-end",
    },
    secondsPicker: {
        width: 800,
        height: 50,
        marginBottom: spacing.two,
        overflow: "hidden",
        justifyContent: 'center',
    },
    secondsPickerItem: {
        fontSize: 40,
        color: colors.blue
    },
    durationText: {
        flex: 1,
        color: colors.blue
    }
});
//# sourceMappingURL=Breath.js.map