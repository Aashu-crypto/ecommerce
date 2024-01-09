import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import StarRating from 'react-native-star-rating';
import {Color, FontFamily} from '../GlobalStyles';
import {useNavigation} from '@react-navigation/native';
const Card = ({
  brandname,
  gadgettype,
  rate,
  discountedrate,
  starrating,
  imageurl,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.container}
      onPress={() => {
        navigation.navigate('Product', {
          brandname: brandname,
          gadgettype: gadgettype,
          rate: rate,
          discountedrate: discountedrate,
          starrating: starrating,
          imageurl: imageurl,
        });
      }}>
      <Image source={{uri: imageurl}} style={styles.image} />
      <View style={{width: 50}}>
        <StarRating
          starSize={15}
          disabled={false}
          maxStars={5}
          rating={starrating}
          emptyStarColor={'#FFBA49'}
          fullStarColor={'#FFBA49'}
        />
      </View>

      <Text style={styles.brandname}>{brandname}</Text>
      <Text style={styles.gadgettype}>{gadgettype}</Text>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.rate}>₹{rate}</Text>
        <Text style={styles.discountedrate}>₹{discountedrate}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    width: 180,
    height: 276,
    backgroundColor: '#fff',
    margin: 10,
    padding: 5,
    justifyContent: 'space-evenly',
  },
  image: {
    width: 170,
    height: 180,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: 5,
    borderRadius: 5,
  },
  brandname: {
    fontSize: 11,
    fontWeight: '400',
    fontFamily: FontFamily.poppinsRegular,
    color: '#9B9B9B',
  },
  gadgettype: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: FontFamily.poppinsRegular,
    color: '#222222',
  },
  rate: {
    textDecorationLine: 'line-through',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    fontFamily: FontFamily.poppinsRegular,
    color: '#9B9B9B',
  },
  discountedrate: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    fontFamily: FontFamily.poppinsRegular,
    color: '#DB3022',
    marginLeft: 7,
  },
});
