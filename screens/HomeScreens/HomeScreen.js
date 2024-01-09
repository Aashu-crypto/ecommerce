import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  ImageBackground,
  StatusBar,
  ScrollView,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Card from '../../components/Card';
import {FlashList} from '@shopify/flash-list';
const HomeScreen = () => {
  const data = [
    {
      brandname: 'TechGear',
      gadgettype: 'Smartphone',
      rate: 215.65,
      discountedrate: 135.86,
      starrating: 1.7,
      imageurl: 'https://picsum.photos/190/180',
    },
    {
      brandname: 'GizmoPro',
      gadgettype: 'Tablet',
      rate: 344.93,
      discountedrate: 251.8,
      starrating: 3.3,
      imageurl: 'https://picsum.photos/190/180',
    },
    {
      brandname: 'Electra',
      gadgettype: 'Laptop',
      rate: 140.98,
      discountedrate: 101.51,
      starrating: 1.5,
      imageurl: 'https://picsum.photos/190/180',
    },
    {
      brandname: 'PixelPlus',
      gadgettype: 'Smartwatch',
      rate: 338.96,
      discountedrate: 237.27,
      starrating: 3.8,
      imageurl: 'https://picsum.photos/190/180',
    },
    {
      brandname: 'Innovatech',
      gadgettype: 'Tablet',
      rate: 11.01,
      discountedrate: 9.8,
      starrating: 4.3,
      imageurl: 'https://picsum.photos/190/180',
    },
    {
      brandname: 'SoundWave',
      gadgettype: 'Headphones',
      rate: 196.57,
      discountedrate: 121.87,
      starrating: 2.3,
      imageurl: 'https://picsum.photos/190/180',
    },
    {
      brandname: 'Visionary',
      gadgettype: 'Laptop',
      rate: 239.21,
      discountedrate: 160.27,
      starrating: 4.4,
      imageurl: 'https://picsum.photos/190/180',
    },
    {
      brandname: 'SmartTech',
      gadgettype: 'Camera',
      rate: 405.13,
      discountedrate: 328.16,
      starrating: 4.7,
      imageurl: 'https://picsum.photos/190/180',
    },
    {
      brandname: 'GadgetGenius',
      gadgettype: 'Laptop',
      rate: 129.37,
      discountedrate: 107.38,
      starrating: 2.3,
      imageurl: 'https://picsum.photos/190/180',
    },
    {
      brandname: 'FutureTech',
      gadgettype: 'Laptop',
      rate: 121.01,
      discountedrate: 106.49,
      starrating: 4.5,
      imageurl: 'https://picsum.photos/190/180',
    },
  ];

  const renderItem = ({item}) => (
    <View>
      <Card
        brandname={item.brandname}
        gadgettype={item.gadgettype}
        rate={item.rate}
        discountedrate={item.discountedrate}
        starrating={item.starrating}
        imageurl={item.imageurl}
      />
    </View>
  );
  return (
    <ScrollView style={styles.container}>
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
              fontSize: 48,
              color: '#fff',
              fontFamily: 'Poppins-Bold',
              fontWeight: '900',
            }}>
            Digital
          </Text>
          <Text
            style={{
              fontSize: 48,
              color: '#fff',
              fontFamily: 'Poppins-Bold',
              fontWeight: '900',
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
      <FlashList
        data={data}
        renderItem={renderItem}
        estimatedItemSize={100}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
