import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { deviceWidth } from '../responsive/responsive'
import { moderateVerticalScale } from 'react-native-size-matters'

const CustomButton = (props) => {
    const {
        buttonText,
        onButtonPress,
        customStyle,
        isLoading
    } = props
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onButtonPress} style={[styles.main,customStyle]}>
          {
              isLoading
                  ?
                  <ActivityIndicator size={25} color={"#FFFFFF"} />
                  :
                  <Text style={styles.buttonText}>{buttonText}</Text>
          }
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    main:{
        width:deviceWidth*0.90,
        height:moderateVerticalScale(40),
        borderRadius:10,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#d67a26",
    },
    buttonText:{
        fontSize:14,
        fontWeight:"bold",
        color:"#FFFFFF",
    }
})