import { StyleSheet, Text, Pressable, View } from 'react-native'
import React from 'react'

const Suggestion = (props) => {
  return (
    <View>
      <Pressable style={styles.container} onPress={props.onSuggestionPress}>
        <Text style={styles.text}>{props.address}</Text>
      </Pressable>
    </View>
  )
}

export default Suggestion

const styles = StyleSheet.create({
    container: {
        height: 40,
        //position: 'absolute',
        justifyContent: 'center',
        marginBottom: 5,
        zIndex: 5
    },
    text: {
        fontFamily: 'montserrat',
        color: 'white'
    }
})