import React from 'react';
import { StyleSheet, Text, View, Picker, Animated } from 'react-native';
import range from 'lodash/range';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import { spacing, colors, heading } from '../theme';
export default class RatioPicker extends React.Component {
    constructor(props, ctx) {
        super(props, ctx);
        this.active = false;
        this.activityHandler = () => {
            this.activate();
        };
        this.createValueChangeHandler = (key) => (value) => {
            const newValue = Object.assign({}, this.state.value, { [key]: value });
            this.setState({ value: newValue });
            this.props.onChange && this.props.onChange(newValue);
        };
        this.state = {
            active: false,
            activeValue: new Animated.Value(0),
            value: props.value || reduce(props.ratios, (value, ratio, key) => (Object.assign({}, value, { [key]: ratio.default })), {})
        };
    }
    activate() {
        this.setState({ active: true });
        Animated.spring(this.state.activeValue, {
            toValue: 1
        }).start();
        clearTimeout(this.timer);
        this.timer = setTimeout(() => { this.deactivate(); }, 3000);
    }
    deactivate() {
        this.setState({ active: false });
        Animated.spring(this.state.activeValue, {
            toValue: 0
        }).start();
    }
    render() {
        const { style, ratios } = this.props;
        const { value, activeValue, active } = this.state;
        const scale = activeValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0.6, 1]
        });
        const labelOpacity = activeValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        });
        return (React.createElement(Animated.View, { style: [styles.container, style, { transform: [{ scale }] }] },
            React.createElement(Text, { style: styles.header }, "ratio"),
            React.createElement(View, { style: styles.pickersContainer }, map(ratios, (ratio, key) => (React.createElement(View, { key: key, style: styles.ratioContainer, onTouchStart: this.activityHandler },
                React.createElement(View, { style: styles.pickerContainer },
                    React.createElement(Picker, { style: styles.secondsPicker, itemStyle: styles.secondsPickerItem, selectedValue: value[key], onValueChange: this.createValueChangeHandler(key) }, range(1, 60).map((num) => React.createElement(Picker.Item, { key: num, label: num.toString(), value: num })))),
                React.createElement(Animated.Text, { style: [styles.labelText, { opacity: labelOpacity }] }, ratio.label)))))));
    }
}
const styles = StyleSheet.create({
    container: {},
    header: {
        flex: 1,
        textAlign: "center",
        color: colors.blue,
        fontSize: heading.two
    },
    pickersContainer: {
        flex: 3,
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
        height: 45,
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
    },
    activitySurface: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
});
//# sourceMappingURL=RatioPicker.js.map