import React from 'react'
import Color from 'color'
import { StyleSheet, View, Text } from 'react-native'
import {colors, heading, spacing } from '../theme'
import isPad from '../lib/isPad'

interface Props {
  title: string|React.Component;
  subTitle: string|React.Component
}

export default (props:Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleHeader}>
          {props.title}
        </Text>
        <Text style={styles.titleSubHeader}>
          {props.subTitle}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: isPad() ? 0 : spacing.four,
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
    color: Color(colors.highlight).desaturate(0.5).darken(0.2).toString(),
    marginBottom: spacing.one,
    fontFamily: 'main-bold',
    textAlign: isPad() ? "center" : "left"
  },
  titleSubHeader: {
    fontSize: heading.three,
    fontFamily: 'main-regular',
    color: Color(colors.highlight).desaturate(0.75).darken(0.1).toString(),
    textAlign: isPad() ? "center" : "left"
  },
})
