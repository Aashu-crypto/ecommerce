import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {FontFamily, width} from '../../GlobalStyles';
import {useNavigation} from '@react-navigation/native';

const shopNow = id => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        console.log('id', id);
        navigation.navigate(Routes.PRODUCT, {
          productId: id,
        });
      }}>
      <Text style={styles.shopNow}>Shop Now</Text>
    </Pressable>
  );
};
const FeaturedProduct = () => {
  return (
    <View style={{backgroundColor: 'black'}}>
      <View style={{flexDirection: 'row'}}>
        <ImageBackground
          style={styles.image}
          source={require('../../assets/img/ps5.png')}>
          <View style={styles.textView}>
            <Text style={styles.productTitle}>Play Station 5 </Text>
            <Text style={styles.productSubTitle}>
              Black and white version is back
            </Text>
            {shopNow((id = '6634903b602598c5900e1488'))}
          </View>
        </ImageBackground>
        <ImageBackground
          style={styles.image}
          source={require('../../assets/img/attractiveWomen.png')}>
          <View style={styles.textView}>
            <Text style={styles.productTitle}>Black Hat </Text>
            <Text style={styles.productSubTitle}>
              Featured Hat that gives you another vibe
            </Text>
            {shopNow((id = '66349275602598c5900e1493'))}
          </View>
        </ImageBackground>
      </View>

      <View style={{flexDirection: 'row'}}>
        <ImageBackground
          style={styles.image}
          source={require('../../assets/img/echo.png')}>
          <View style={styles.textView}>
            <Text style={styles.productTitle}> Speakers</Text>
            <Text style={styles.productSubTitle}>Amazon Wireless Speakers</Text>
            {shopNow((id = '66349174602598c5900e148d'))}
          </View>
        </ImageBackground>
        <ImageBackground
          style={styles.image}
          source={require('../../assets/img/gucci.png')}>
          <View style={styles.textView}>
            <Text style={styles.productTitle}>Perfume</Text>
            <Text style={styles.productSubTitle}>Gucci intense OUD EDP</Text>
            {shopNow((id = '663491ec602598c5900e1491'))}
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default FeaturedProduct;

const styles = StyleSheet.create({
  image: {
    width: width / 2,
    height: 230,
    resizeMode: 'cover',
    backgroundColor: 'black',
  },
  productTitle: {
    color: '#fff',
    fontSize: 12,
    fontFamily: FontFamily.poppinsBold,
  },
  productSubTitle: {
    color: '#fff',
    fontSize: 10,
    fontFamily: FontFamily.poppinsRegular,
    width: 130,
  },
  textView: {
    flex: 1,
    justifyContent: 'flex-end',
    gap: 5,
    padding: 5,
  },
  shopNow: {
    color: '#fff',
    fontSize: 11,
    textDecorationLine: 'underline',
    fontFamily: FontFamily.poppinsRegular,
  },
});
