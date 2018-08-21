var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React from 'react';
import Promise from 'bluebird';
import { StyleSheet, View, TouchableOpacity, Animated } from 'react-native';
import isEqual from 'lodash/isEqual';
import { colors } from '../../theme';
export default class Breath extends React.Component {
    constructor(props) {
        super(props);
        this.animationRunning = false;
        this.state = {
            breath: new Animated.Value(0)
        };
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            this.startAnimation();
        });
    }
    animateToValue(value, duration) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                this.animation = Animated.timing(this.state.breath, {
                    toValue: value,
                    useNativeDriver: true,
                    duration: duration
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
        if (!isEqual(this.props.ratio, nextProps.ratio)) {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.restartAnimation();
            }, 500);
        }
    }
    restartAnimation() {
        return __awaiter(this, void 0, void 0, function* () {
            this.stopAnimation();
            this.state.breath.setValue(0);
            yield Promise.delay(200);
            setImmediate(() => this.startAnimation());
        });
    }
    startAnimation() {
        return __awaiter(this, void 0, void 0, function* () {
            let animation = () => __awaiter(this, void 0, void 0, function* () {
                if (!this.animationRunning)
                    return;
                yield this.animateToValue(1, this.props.ratio[0]);
                if (!this.animationRunning)
                    return;
                yield this.animateToValue(0, this.props.ratio[1]);
                if (!this.animationRunning)
                    return;
                animation();
            });
            this.animationRunning = true;
            return animation();
        });
    }
    render() {
        const { size } = this.props;
        var scale = this.state.breath.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 1],
            extrapolate: 'clamp'
        });
        return (React.createElement(TouchableOpacity, { style: [styles.container, this.props.style], onPress: this.restartAnimation.bind(this) },
            React.createElement(View, { style: [styles.ballBorder, { borderRadius: size }] },
                React.createElement(Animated.View, { style: [
                        styles.ball,
                        {
                            width: size,
                            height: size,
                            borderRadius: size,
                            transform: [
                                { scale: scale }
                            ]
                        }
                    ] }))));
    }
}
const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    ballBorder: {
        borderWidth: 5,
        borderColor: "black",
    },
    ball: {
        backgroundColor: colors.blue,
        justifyContent: "center",
        alignItems: "center"
    }
});
//# sourceMappingURL=Breath.js.map