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
import { colors } from '../../theme';
import Promise from 'bluebird';
export default class BoxBreath extends React.Component {
    constructor(props) {
        super(props);
        this.animationRunning = false;
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
    animateToValue(value) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                this.animation = Animated.timing(this.state.breath, {
                    toValue: value,
                    useNativeDriver: true,
                    duration: this.props.duration
                });
                this.animation.start(resolve);
            });
        });
    }
    stopAnimation() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.animation) {
                this.animationRunning = false;
                this.animation.stop();
            }
        });
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.duration !== nextProps.duration) {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                this.stopAnimation();
                this.state.breath.setValue({ x: 0, y: 0 });
                yield Promise.delay(200);
                setImmediate(() => this.startAnimation());
            }), 500);
        }
    }
    startAnimation() {
        return __awaiter(this, void 0, void 0, function* () {
            let animation = () => __awaiter(this, void 0, void 0, function* () {
                if (!this.animationRunning)
                    return;
                this.setState({ text: "Innhale" });
                yield this.animateToValue({ x: 0, y: 1 });
                if (!this.animationRunning)
                    return;
                this.setState({ text: "Hold" });
                yield this.animateToValue({ x: 1, y: 1 });
                if (!this.animationRunning)
                    return;
                this.setState({ text: "Exhale" });
                yield this.animateToValue({ x: 1, y: 0 });
                if (!this.animationRunning)
                    return;
                this.setState({ text: "Hold" });
                yield this.animateToValue({ x: 0, y: 0 });
                if (!this.animationRunning)
                    return;
                animation();
            });
            this.animationRunning = true;
            return animation();
        });
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
        return (React.createElement(View, { style: [styles.box, { height: this.props.size, width: this.props.size }] },
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
const borderWidth = 4;
const ballSize = 20;
const ballOffset = (borderWidth / 2) + (ballSize / 2);
const styles = StyleSheet.create({
    box: {
        borderWidth: borderWidth,
        borderColor: "rgb(50,50,50)",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    animationContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    ball: {
        width: ballSize,
        height: ballSize,
        backgroundColor: colors.blue,
        shadowColor: colors.blue,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 0.5,
        position: "absolute",
        bottom: -ballOffset,
        left: -ballOffset,
        borderRadius: ballSize
    },
    text: {
        fontSize: 25,
        fontWeight: "normal",
        color: colors.blue
    }
});
//# sourceMappingURL=BoxBreath.js.map