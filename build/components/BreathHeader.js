import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { heading, spacing } from '../theme';
export default (props) => {
    return (React.createElement(View, { style: styles.header },
        React.createElement(View, { style: styles.title },
            React.createElement(Text, { style: styles.titleHeader }, props.title),
            React.createElement(Text, { style: styles.titleSubHeader }, props.subTitle))));
};
const styles = StyleSheet.create({
    header: {
        flex: 1,
        paddingTop: spacing.four,
        paddingLeft: spacing.four,
        paddingRight: spacing.four,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end",
    },
    title: {
        flex: 1,
    },
    titleHeader: {
        fontSize: heading.one,
        color: "rgba(0,0,0,0.96)",
        marginBottom: spacing.one
    },
    titleSubHeader: {
        fontSize: heading.three,
        color: "rgba(0,0,0,0.7)",
    },
});
//# sourceMappingURL=BreathHeader.js.map