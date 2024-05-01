import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'
import { deviceHeight, deviceWidth } from '../responsive/responsive'
import CustomInput from '../components/CustomInput'
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view'
import CustomButton from '../components/CustomButton'
import { moderateVerticalScale } from 'react-native-size-matters'
import Validtor from '../utils/Validtor'
import { showTest } from '../utils/ShowToast'

const initialState = {
  firstName:"",
  lastName:"",
  phoneNumber:"",
  email:"",
  loader:false

}

const Details = () => {
  const [imageDimensions, setImageDimensions] = useState(null);
  const [aspectR, setAspectR] = useState(null);
  const [iState,updateState] = useState(initialState);
  const navigation = useNavigation();
  const {params} = useRoute();
  const {cartItem} = params;
  const {
    firstName,
    lastName,
    phoneNumber,
    email,
    loader
  } = iState;
  const insetScreen = useSafeAreaInsets();
  useEffect(() => {
      fetchImageDimensions()
  }, []);

  const fetchImageDimensions = () => {
      Image.getSize(cartItem?.xt_image, (width, height) => {
          setImageDimensions({ width, height });
          setAspectR(width/height);
      }, error => {
          console.error('Error getting image size:', error);
      })
  }
  const Validation = () => {
    Validtor.isEmpty(firstName)
      ? showTest("Please enter first name")
      : Validtor.isEmpty(lastName)
        ? showTest("Please enter last name")
        : Validtor.isEmpty(email)
          ? showTest("Please enter your email address")
          : !Validtor.isEmail(email)
            ? showTest("Please enter valid email")
            : Validtor.isEmpty(phoneNumber)
              ? showTest("Please enter mobile number")
              : Validtor.isphoneNumber(phoneNumber)
                ? showTest("Please enter valid phone number")
                : onSubmit();
  }


  const onSubmit = async () => {
    updateState((prev) => ({
      ...prev,
      loader:! prev.loader
    }))
    try {
      let filelink = cartItem?.xt_image;
      let formData = new FormData();
      let fileName  = filelink.trim().split("/").at(-1);
      let fileExt  =  fileName.trim().split(".").at(-1);
      console.log("fileName",fileName,fileExt);
      formData.append("first_name",firstName);
      formData.append("last_name", lastName);
      formData.append("email", email);
      formData.append("phone",phoneNumber);
      formData.append('user_image',{
        uri:filelink,
        name:fileName,
        type:'image/jpeg'
      })
      const response = await fetch("http://dev3.xicom.us/xttest/savedata.php", {
        method: "POST",
        headers: { 'Content-Type': 'multipart/form-data' },
        body: formData,
      });
      console.log("response",response);
      if (!response.ok) {
        throw new Error(`Something went wrong`);
      }
      const result = await response.json();
      showTest(result?.message);
      updateState(initialState)
    } catch (error) {
      console.log("error", error);
    }
    finally {
      updateState((prev) => ({
        ...prev,
        loader:false
      }))
    }
  }

  const onChangeHandler = (type, value) => {
    updateState((prev) => ({
      ...prev,
      [type]: value
  }))
}
console.log(cartItem);
  return (
    <View style={styles.main}>
      <View style={styles.main11}>
        <KeyboardAwareScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: moderateVerticalScale(50)
          }}
        >
          {
            !!imageDimensions &&
            <View style={{
              width: deviceWidth,
              height: null,
              aspectRatio: aspectR
            }}>
              <FastImage
                resizeMode={FastImage.resizeMode.contain}
                style={{
                  flex: 1,
                  aspectRatio: aspectR,
                  alignSelf: "center"
                }}
                source={{
                  uri: cartItem?.xt_image,
                  cache: FastImage.cacheControl.immutable,
                  priority: FastImage.priority.high
                }}
              />
            </View>
          }
          <CustomInput
            title={'First Name'}
            placeholderText={"Enter First Name"}
            value={firstName}
            changeValue={(text) => onChangeHandler('firstName', text)}
            customStyle={{
              marginTop: 15
            }}
          />
          <CustomInput
            title={'Last Name'}
            placeholder={"Enter Last Name"}
            value={lastName}
            onChangeText={(text) => onChangeHandler('lastName', text)}
            customStyle={{
              marginTop: 15
            }}
          />
          <CustomInput
            title={'Email'}
            placeholder={"Enter email address"}
            value={email}
            onChangeText={(text) => onChangeHandler('email', text)}
            customStyle={{
              marginTop: 15
            }}
          />
          <CustomInput
            title={'Mobile Number'}
            placeholder={"Enter mobile number"}
            onChangeText={(text) => onChangeHandler('phoneNumber', text)}
            value={phoneNumber}
            maxLength={10}
            keyboardType={'phone-pad'}
            customStyle={{
              marginTop: 15
            }}
          />
        </KeyboardAwareScrollView>
      </View>
      <View style={styles.main12}>
        <CustomButton
          buttonText={"Submit"}
          onButtonPress={Validation}
          isLoading={loader}
          customStyle={{
            position: "absolute",
            bottom: Platform.OS == "ios" ? insetScreen.bottom : moderateVerticalScale(15)
          }}
        />
      </View>
    </View>
  )
}

export default Details

const styles = StyleSheet.create({
  main:{
    flex:1,
    backgroundColor:"#FFFFFF"
  },
  main11:{
    flex:0.9,
  },
  main12:{
      flex: 0.1,
      alignItems: "center",
      backgroundColor: "#FFFFFF",
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 4,
      },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 8,
  
  },
})