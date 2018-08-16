var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
export default class BoxBreath extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            breath: new Animated.ValueXY({ x: 0, y: 0 })
        };
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            this.startAnimation();
        });
    }
    startAnimation() {
        let animation = () => {
            this.setState({ text: "inhale" });
            Animated.timing(this.state.breath, {
                toValue: { x: 0, y: 1 },
                useNativeDriver: true,
                duration: this.props.duration
            }).start(() => {
                this.setState({ text: "hold" });
                Animated.timing(this.state.breath, {
                    toValue: { x: 1, y: 1 },
                    useNativeDriver: true,
                    duration: this.props.duration
                }).start(() => {
                    this.setState({ text: "exhale" });
                    Animated.timing(this.state.breath, {
                        toValue: { x: 1, y: 0 },
                        useNativeDriver: true,
                        duration: this.props.duration
                    }).start(() => {
                        this.setState({ text: "hold" });
                        Animated.timing(this.state.breath, {
                            toValue: { x: 0, y: 0 },
                            useNativeDriver: true,
                            duration: this.props.duration
                        }).start(() => {
                            animation();
                        });
                    });
                });
            });
        };
        return animation();
    }
    render() {
        var x = this.state.breath.x.interpolate({
            inputRange: [0, 1],
            outputRange: [0, this.props.size - borderWidth],
            extrapolate: 'clamp'
        });
        var y = this.state.breath.y.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -(this.props.size - borderWidth)],
            extrapolate: 'clamp'
        });
        var scale = this.state.breath.y.interpolate({
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
        borderColor: "rgba(0,0,0,1)",
        borderRadius: 0,
        justifyContent: "center",
        alignItems: "center"
    },
    ball: {
        width: ballSize,
        height: ballSize,
        backgroundColor: "rgba(0,0,0, 1)",
        // shadowColor: 'white',
        // shadowOffset: { width: 0, height: 0 },
        // shadowOpacity: 0.5,
        // shadowRadius: 5,
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