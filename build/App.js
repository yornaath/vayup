import React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import Breath from './containers/Breath';
import { LinearGradient } from 'expo';
const screen = Dimensions.get("screen");
export default class App extends React.Component {
    render() {
        return (React.createElement(LinearGradient, { start: [0.1, 0.1], end: [1, 1], colors: ["rgb(255,255,255)", "rgb(235,235,235)"], style: styles.container },
            React.createElement(Image, { source: require("../assets/title_logo.png"), style: styles.logoTitle, resizeMode: "contain" }),
            React.createElement(View, { style: styles.contentContainer },
                React.createElement(Breath, null))));
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    logoTitle: {
        position: "absolute",
        top: 40,
        width: 200,
        height: 40,
        left: (screen.width / 2) - 100
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
//# sourceMappingURL=App.js.map