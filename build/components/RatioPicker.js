import React from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';
import range from 'lodash/range';
import { spacing, colors } from '../theme';
export default class RatioPicker extends React.Component {
    render() {
        const { style } = this.props;
        return (React.createElement(View, { style: [styles.container, style] },
            React.createElement(View, { style: styles.ratioContainer },
                React.createElement(View, { style: styles.pickerContainer },
                    React.createElement(Picker, { style: styles.secondsPicker, itemStyle: styles.secondsPickerItem, selectedValue: 4 }, range(1, 60).map((num) => React.createElement(Picker.Item, { key: num, label: num.toString(), value: num })))),
                React.createElement(Text, { style: styles.labelText }, "inhale")),
            React.createElement(View, { style: styles.ratioContainer },
                React.createElement(View, { style: styles.pickerContainer },
                    React.createElement(Picker, { style: styles.secondsPicker, itemStyle: styles.secondsPickerItem, selectedValue: 4 }, range(1, 60).map((num) => React.createElement(Picker.Item, { key: num, label: num.toString(), value: num })))),
                React.createElement(Text, { style: styles.labelText }, "exhale"))));
    }
}
const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    ratioContainer: {
        width: 80,
    },
    secondsChooserContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    pickerContainer: {
        flex: 2,
        justifyContent: "center",
    },
    secondsPicker: {
        width: 80,
        height: 50,
        marginBottom: spacing.two,
        overflow: "hidden",
        justifyContent: 'center',
    },
    secondsPickerItem: {
        fontSize: 40,
        color: colors.blue,
    },
    labelText: {
        flex: 1,
        textAlign: "center",
        color: colors.blue
    }
});
//# sourceMappingURL=RatioPicker.js.map