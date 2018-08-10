import React from 'react';
import { StyleSheet, View, Animated } from 'react-native';
export default class Breath extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ballScale: new Animated.Value(0)
        };
    }
    runAnimation() {
        const [inn, out] = this.props.ratio;
        const durationPerUnit = this.props.duration / (inn + out);
        const loop = () => {
            Animated.timing(this.state.ballScale, {
                toValue: 1,
                duration: inn * durationPerUnit
            }).start(() => {
                Animated.timing(this.state.ballScale, {
                    toValue: 0,
                    duration: out * durationPerUnit
                }).start(loop);
            });
        };
        loop();
    }
    componentDidMount() {
        this.runAnimation();
    }
    render() {
        var scale = this.state.ballScale.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 1],
            extrapolate: 'clamp'
        });
        return (React.createElement(View, { style: [styles.container, this.props.style] },
            React.createElement(View, { style: styles.ballBorder },
                React.createElement(Animated.View, { style: [
                        styles.ball,
                        {
                            transform: [
                                { scale: scale }
                            ]
                        }
                    ] }))));
    }
}
const ballSize = 200;
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
        backgroundColor: "rgba(0,0,0, 0.9)",
        borderRadius: ballSize,
        justifyContent: "center",
        alignItems: "center"
    }
});
//# sourceMappingURL=Breath.js.map