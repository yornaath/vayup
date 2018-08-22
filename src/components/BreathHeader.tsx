import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import {heading, spacing} from '../theme'

interface Props {
  title: string|React.Component;
  subTitle: string|React.Component
}

export default (props:Props) => {
  return (
    <View style={styles.header}>
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
})
