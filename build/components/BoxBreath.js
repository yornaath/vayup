import React from 'react';
import { StyleSheet, Text, View, Animated, Easing } from 'react-native';
export default class BoxBreath extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            ballLocation: new Animated.ValueXY({ x: 0, y: 0 }),
            ballScale: new Animated.Value(0)
        };
    }
    runAnimation() {
        const [inn, innHold, out, outHold] = this.props.ratio;
        const durationPerUnit = this.props.duration / (inn + innHold + out + outHold);
        const loop = () => {
            this.setState({ text: "in" });
            Animated.parallel([
                Animated.timing(this.state.ballLocation.y, {
                    toValue: 1,
                    duration: inn * durationPerUnit
                }),
                Animated.timing(this.state.ballScale, {
                    toValue: 1,
                    duration: inn * durationPerUnit
                }),
            ]).start(() => {
                this.setState({ text: "hold" });
                Animated.timing(this.state.ballLocation.x, {
                    toValue: 1,
                    easing: Easing.linear,
                    duration: innHold * durationPerUnit
                }).start(() => {
                    this.setState({ text: "out" });
                    Animated.parallel([
                        Animated.timing(this.state.ballScale, {
                            toValue: 0,
                            duration: out * durationPerUnit
                        }),
                        Animated.timing(this.state.ballLocation.y, {
                            toValue: 0,
                            duration: out * durationPerUnit
                        })
                    ]).start(() => {
                        this.setState({ text: "hold" });
                        Animated.timing(this.state.ballLocation.x, {
                            toValue: 0,
                            easing: Easing.linear,
                            duration: outHold * durationPerUnit
                        }).start(() => loop());
                    });
                });
            });
        };
        loop();
    }
    componentDidMount() {
        this.runAnimation();
    }
    render() {
        var x = this.state.ballLocation.x.interpolate({
            inputRange: [0, 1],
            outputRange: [0, this.props.size - borderWidth],
            extrapolate: 'clamp'
        });
        var y = this.state.ballLocation.y.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -(this.props.size - borderWidth)],
            extrapolate: 'clamp'
        });
        var scale = this.state.ballScale.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 2],
            extrapolate: 'clamp'
        });
        return (React.createElement(View, { style: [styles.box, this.props.style] },
            React.createElement(Animated.View, { style: [
                    styles.ball,
                    {
                        transform: [
                            { translateX: x },
                            { translateY: y },
                            { scale: scale }
                        ]
                    }
                ] }),
            React.createElement(Text, { style: styles.text }, this.state.text)));
    }
}
const borderWidth = 5;
const ballSize = 20;
const ballOffset = (borderWidth / 2) + (ballSize / 2);
const styles = StyleSheet.create({
    box: {
        borderWidth: borderWidth,
        borderColor: "rgba(0,0,0,0.7)",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center"
    },
    ball: {
        width: ballSize,
        height: ballSize,
        backgroundColor: "rgba(0,0,0, 0.9)",
        position: "absolute",
        bottom: -ballOffset,
        left: -ballOffset,
        borderRadius: ballSize
    },
    text: {
        fontSize: 20
    }
});
//# sourceMappingURL=BoxBreath.js.map