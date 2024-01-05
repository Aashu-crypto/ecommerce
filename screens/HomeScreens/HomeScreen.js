import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  ImageBackground,
  StatusBar,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {FlashList} from '@shopify/flash-list';
const HomeScreen = () => {
  const data = [
    {
      Picture: 'Image_1',
      Brand: 'BlcfcpbnLG',
      Title: 'jzVWXnTYeyCsGbX',
      Price: 186.54,
    },
    {
      Picture: 'Image_2',
      Brand: 'hgCDecqlFJ',
      Title: 'vaqiTLSjkgEGXfm',
      Price: 143.63,
    },
    {
      Picture: 'Image_3',
      Brand: 'qCgFUJBBMd',
      Title: 'xXWaCxpYYnqUTXs',
      Price: 415.49,
    },
    {
      Picture: 'Image_4',
      Brand: 'zoEzUwXkoR',
      Title: 'jQDDLFbtjelGGmX',
      Price: 214.94,
    },
    {
      Picture: 'Image_5',
      Brand: 'HAUxsmEpyt',
      Title: 'QJmnzeboaXudmzB',
      Price: 13.36,
    },
    {
      Picture: 'Image_6',
      Brand: 'EadjChsDjI',
      Title: 'OETBcJDNOOwAhAp',
      Price: 402.55,
    },
    {
      Picture: 'Image_7',
      Brand: 'bmlHWGsgmP',
      Title: 'DJFXZFcZNIFAxFZ',
      Price: 29.83,
    },
    {
      Picture: 'Image_8',
      Brand: 'EdgCiaegCc',
      Title: 'DrdYEGwrVLpFvCV',
      Price: 441.39,
    },
    {
      Picture: 'Image_9',
      Brand: 'JbFWAFXmcr',
      Title: 'ycwiDqWZcKHIhcE',
      Price: 472.95,
    },
    {
      Picture: 'Image_10',
      Brand: 'CVhvModoJD',
      Title: 'YcRFfnBaBFhzrIJ',
      Price: 475.05,
    },
  ];
  const renderItem = ({item})=>(
    <View>
      <Text>
        {item.Brand}
      </Text>
    </View>
  )
  return (
    <View style={{flex:1}}>
      <StatusBar translucent={true} backgroundColor="rgba(0, 0, 0, 0.5)" />
      <ImageBackground
        source={require('../../assets/img/MainScreenImage.jpg')}
        style={{
          height: 300,
          width: '100%',
          resizeMode: 'stretch',
        }}>
        <View style={{position: 'absolute', bottom: 15, left: 10}}>
          <Text
            style={{
              fontSize: 40,
              color: '#000',
              fontFamily: 'Poppins-Bold',
              fontWeight: '600',
            }}>
            Digital
          </Text>
          <Text
            style={{
              fontSize: 40,
              color: '#000',
              fontFamily: 'Poppins-Bold',
              fontWeight: '600',
            }}>
            Sale
          </Text>
        </View>
      </ImageBackground>
      <View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            padding: 10,
          }}>
          <Text style={{fontSize: 30, fontWeight: '700', color: '#000'}}>
            New
          </Text>
          <Text style={{fontSize: 12, color: '#000'}}>View All</Text>
        </View>
        <Text style={{paddingLeft: 10}}>Never Seen Before!</Text>
      </View>
      <FlashList data={data} renderItem={renderItem} estimatedItemSize={100} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
