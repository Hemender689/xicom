import {FlatList, SafeAreaView , StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react';
import { deviceWidth, scaleToDeviceWidth } from '../../dimensions/responsive';
import { moderateVerticalScale } from 'react-native-size-matters';
import { colorConstant } from '../../utils/constant';
import Animated, { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const OPTIONS =  ["UPCOMPING","COMPLETED","CANCELLED"];
const Dummy = () => {
  const  [selected,setSelected]= useState(0);
  const  ITEM_WIDTH = scaleToDeviceWidth(111);

  const rStyle = useAnimatedStyle(() => {
    return {
      left : withTiming(ITEM_WIDTH * selected,{
        duration:600,
        easing:Easing.elastic(1.2)
      })
    }
  }, [selected]);
  return (
    <SafeAreaView style={{
      flex:1,
      backgroundColor:colorConstant.white
    }}>
      <View style={{
        width: deviceWidth * 0.9,
        alignSelf: "center",
        backgroundColor: colorConstant.backgroundGray,
        height: moderateVerticalScale(50),
        borderRadius:30,
        marginTop: 50,
        flexDirection:'row',
        alignItems:"center",
        paddingLeft:6,
        borderWidth:3,
        borderColor:"gray"
      }}>
         <Animated.View style={[{
            position:"absolute",
             backgroundColor:colorConstant.white,
             height:"80%",
             top:"10%",
             alignSelf:"center",
             width:ITEM_WIDTH,
             borderRadius:20,
             marginLeft:5,
             shadowOpacity:0.3,
             shadowColor:'black',
             shadowOffset:{
               width:0,
               height:1,
             },
        },rStyle]}></Animated.View>
          {
            OPTIONS.map((item, index) => {
              return (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => setSelected(index)}
                  style={{
                    width: ITEM_WIDTH,
                    justifyContent: "center",
                    alignItems: "center"

                  }} key={`${item}+${index}`}><Text style={{
                    fontSize:12,
                    fontWeight:"600",
                    color:"black"
                  }}>{item}</Text></TouchableOpacity>
              )
            })
          }
      </View>
              
    </SafeAreaView>
  )
}

export default Dummy

const styles = StyleSheet.create({})