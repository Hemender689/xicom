import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { deviceWidth, scaleToDeviceWidth } from '../responsive/responsive'
import { useNavigation } from '@react-navigation/native';

const CustomHeader = (props) => {
    const { title ,custom} = props;
    const navigation = useNavigation();
    return (
        <View style={[styles.main,custom]}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.touch} activeOpacity={1}>
                <Image
                    resizeMethod='contain'
                    style={styles.img}
                    source={require("../assets/images/back.png")}
                />
            </TouchableOpacity>
            <Text style={styles.titleText}>{title}</Text>
        </View>
    )
}

export default CustomHeader

const styles = StyleSheet.create({
    main:{
        width:deviceWidth*0.93,
        alignSelf:"center",
        flexDirection:"row",
        alignItems:"center",
        overflow:"hidden"
    },
    touch:{
        alignSelf:"flex-start",
        padding:scaleToDeviceWidth(7),
        width:"10%"
    },
    img:{
        width:20,
        height:20
    },
    titleText:{
        fontSize:scaleToDeviceWidth(14),
        fontWeight:'500',
        color:"#111111",
        position:"absolute",
        left: deviceWidth/2.9
    }
})