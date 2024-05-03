import { ActivityIndicator, FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import CardComponent from '../components/CardComponent';
import { moderateVerticalScale } from 'react-native-size-matters';
import { deviceWidth } from '../responsive/responsive';
import CustomButton from '../components/CustomButton';
import { showTest } from '../utils/ShowToast';
const Home = () => {
    const [imageList, setImageList] = useState([]);
    const [loading,setLoading] = useState(false);
    const [page,setPage] = useState(0);
    const insetScreen = useSafeAreaInsets();

    useEffect(() => {
        getImageData();
    }, []);

    const getImageData = async () => {
        try {
            setLoading(true);
            let formData = new FormData();
            formData.append("user_id", 108);
            formData.append("offset",page);
            formData.append("type", "popular");
            const response = await fetch("http://dev3.xicom.us/xttest/getdata.php", {
                method: "POST",
                body: formData,
            });
            if (!response.ok) {
                throw new Error(`Something went wrong`);
            }
            const result = await response.json();
            let imageListTemp = result.images;
            if (imageListTemp?.length > 0) {
                let concatData = [...imageList, ...imageListTemp];
                const uniqueData = concatData.reduce((acc, current) => {
                    if (!acc.find(item => item.id === current.id)) {
                        acc.push(current);
                    }
                    return acc;
                }, []);
                setImageList(uniqueData);
                setPage(prev => prev + 1)
            }
        } catch (error) {
            showTest(error?.message);
        }
        finally {
            setLoading(false);
        }
    }
    const _renderItem = useCallback(({ item, index }) => {
        return (
            <CardComponent
                cardData={item}
                cardIndex={index}
            />
        )
    }, [imageList]);

    const _renderHeader = useCallback(()=>{
        return(
                <Text style={styles.text1}>Image Gallery</Text>
        )
    },[])
    const emptyList = useCallback(() => {
        return (
            <>
                {
                    loading && imageList?.length > 0
                        ? <></>
                        : loading && imageList?.length == 0
                            ? <ActivityIndicator size={25} color={"#111111"} />
                            :null

                }
            </>
        )
    }, []);
    const keyExtractor=useCallback((item)=>`${item.id}`,[imageList]);
    const renderFooter = useCallback(() => {
        return (
                <CustomButton
                        buttonText={"Load more images"}
                        onButtonPress={getImageData}
                        isLoading={loading}
                    />
        )
    },[loading]);
  return (
    <SafeAreaView style={styles.main}>
          {
              loading && imageList?.length == 0
                  ?
                  <View style={styles.main}>
                      <ActivityIndicator size='large' color={"#111111"} />
                  </View>
                  
                  : <FlatList
                      showsVerticalScrollIndicator={false}
                      ListHeaderComponent={_renderHeader}
                      data={imageList?.length > 0 ? imageList : []}
                      renderItem={_renderItem}
                      keyExtractor={keyExtractor}
                      scrollEventThrottle={'16'}
                      contentContainerStyle={styles.container}
                      style={styles.list}
                      ListHeaderComponentStyle={styles.headerStyle}
                      stickyHeaderIndices={[0]}
                      ListEmptyComponent={emptyList}
                      ListFooterComponent={renderFooter}
                  />
          }
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
    main:{
        flex:1,
        backgroundColor:"#FFFFFF",
        justifyContent:"center",
        alignItems:"center"
    },
    list:{
        backgroundColor:"#FFFFFF",
       
    },
    container:{
        alignSelf:"center",
        rowGap:moderateVerticalScale(20),
        alignItems:"center",
        paddingBottom:moderateVerticalScale(10)
       
    },
    text:{
        fontSize:14,
        fontWeight:"bold",
        color:"#FFFFFF",
    },
    text1:{
        fontSize:16,
        fontWeight:"bold",
        color:"#111111",
    },
    button:{
        width:deviceWidth*0.90,
        height:moderateVerticalScale(40),
        backgroundColor:"#d67a26",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:10,
        marginVertical:moderateVerticalScale(10)

    },
    headerStyle:{
        width:deviceWidth*0.90,
        alignSelf:"center",
        backgroundColor:"#FFFFFF",
        paddingVertical:10
    }
})