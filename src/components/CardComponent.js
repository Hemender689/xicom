import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { deviceHeight, deviceWidth, scaleToDeviceWidth } from '../responsive/responsive'
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';

const CardComponent = ({cardData,cardIndex}) => {
    const [imageDimensions, setImageDimensions] = useState(null);
    const [aspectR, setAspectR] = useState(null);
    const navigation = useNavigation();
    useEffect(() => {
        fetchImageDimensions()
    }, []);

    const fetchImageDimensions = () => {
        Image.getSize(cardData?.xt_image, (width, height) => {
            setImageDimensions({ width, height });
            setAspectR(width/height);
        }, error => {
            console.error('Error getting image size:', error);
        })
    }
  return (
      !!imageDimensions && <TouchableOpacity
      activeOpacity={0.9}
      style={{
        width: deviceWidth*0.9,
        height:null,
        aspectRatio:aspectR
      }}
      onPress={()=>navigation.navigate("Details",{
        cartItem:cardData
      })}
      ><FastImage
          resizeMode={FastImage.resizeMode.contain}
          source={{
              uri: cardData?.xt_image,
              cache: FastImage.cacheControl.immutable,
              priority: FastImage.priority.high
          }}
          style={{
            flex:1,
            aspectRatio: aspectR,
            alignSelf: "center"
          }}
      />
      </TouchableOpacity>
  )
}

export default CardComponent