var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React from 'react';
import { Svg } from 'expo';
import { StyleSheet, View, Animated } from 'react-native';
export default class TriangleBreath extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            ballLocation: new Animated.ValueXY({ x: 0.5, y: 0 })
        };
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            this.startAnimation();
        });
    }
    startAnimation() {
        const [inn, innHold, out] = this.props.ratio;
        let animation = () => {
            this.setState({ text: "in" });
            Animated.timing(this.state.ballLocation, {
                toValue: { x: 0, y: 1 },
                useNativeDriver: true,
                duration: inn
            }).start(() => {
                this.setState({ text: "hold" });
                Animated.timing(this.state.ballLocation, {
                    toValue: { x: 1, y: 1 },
                    useNativeDriver: true,
                    duration: innHold
                }).start(() => {
                    this.setState({ text: "out" });
                    Animated.timing(this.state.ballLocation, {
                        toValue: { x: 0.5, y: 0 },
                        useNativeDriver: true,
                        duration: out
                    }).start(() => {
                        animation();
                    });
                });
            });
        };
        return animation();
    }
    render() {
        const { size } = this.props;
        var x = this.state.ballLocation.x.interpolate({
            inputRange: [0, 1],
            outputRange: [0, this.props.size - strokeWidth],
            extrapolate: 'clamp'
        });
        var y = this.state.ballLocation.y.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -(this.props.size - strokeWidth)],
            extrapolate: 'clamp'
        });
        var scale = this.state.ballLocation.y.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 2],
            extrapolate: 'clamp'
        });
        return (React.createElement(View, { style: [styles.container, this.props.style] },
            React.createElement(View, { style: styles.triangleContainer },
                React.createElement(Svg, { height: size, width: size },
                    React.createElement(Svg.Path, { strokeLineJoin: "round", stroke: "black", strokeWidth: strokeWidth, fill: "transparent", d: `M ${size / 2},${strokeWidth} ${size - (strokeWidth / 2)},${size - (strokeWidth / 2)} ${strokeWidth},${size - (strokeWidth / 2)} z` }))),
            React.createElement(Animated.View, { style: [
                    styles.ball,
                    {
                        transform: [
                            { translateX: x },
                            { translateY: y },
                            { scale: scale }
                        ]
                    }
                ] })));
    }
}
const ballSize = 20;
const strokeWidth = 5;
const ballOffset = (ballSize / 2);
const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    ballBorder: {
        borderWidth: 5,
        borderColor: "black",
        borderRadius: ballSize
    },
    ball: {
        width: ballSize,
        height: ballSize,
        backgroundColor: "rgba(0,0,0, 1)",
        position: "absolute",
        bottom: -(ballOffset - (strokeWidth / 2)),
        left: -(ballOffset - (strokeWidth / 2)),
        borderRadius: ballSize
    },
    triangleContainer: {
        transform: [
            { rotateZ: "180deg" }
        ],
        justifyContent: "center",
        alignItems: "center"
    },
});
//# sourceMappingURL=TriangleBreath.js.map