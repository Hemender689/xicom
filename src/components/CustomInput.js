import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { deviceWidth, scaleToDeviceWidth } from '../responsive/responsive'
import { moderateVerticalScale } from 'react-native-size-matters'

const CustomInput = (props) => {
const {placeholderText,value,title,customStyle,changeValue,keyboardType,maxLength} =  props
  return (
      <View style={[styles.container,customStyle]}>
          <Text style={styles.titleText}>{title}</Text>
          <View style={styles.main}>
              <TextInput
                  placeholder={placeholderText}
                  placeholderTextColor={"#999"}
                  style={styles.inputStyle}
                  value={value}
                  onChangeText={changeValue}
                  keyboardType={keyboardType ? keyboardType : 'default'}
                  maxLength={maxLength}
              />
          </View>
      </View>
  )
}

export default CustomInput

const styles = StyleSheet.create({
    container:{
        width:deviceWidth*0.90,
        alignSelf:"center",
        rowGap:moderateVerticalScale(10),
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
    },
    main:{
        width:"60%",
        borderWidth:1,
        borderColor:"#999",
        borderRadius:10,
        alignSelf:"center"

    },
    inputStyle:{
        paddingVertical:0,
        height:moderateVerticalScale(45),
        paddingHorizontal:"5%",
        borderRadius:10,
        fontWeight:"400",
        color:"#111111"
    },
    titleText:{
        fontSize:scaleToDeviceWidth(14),
        fontWeight:"500",
        color:"#111111"
    }
})