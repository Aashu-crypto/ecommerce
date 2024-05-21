import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import StarRating from 'react-native-star-rating';
import {Color, FontFamily} from '../GlobalStyles';
import {useNavigation} from '@react-navigation/native';
import Routes from '../Routes';
const Card = ({
  productId,
  brandname,
  gadgettype,
  rate,
  discountedrate,
  starrating,
  imageurl,
  description,
  index,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.container}
      onPress={() => {
        navigation.navigate(Routes.PRODUCT, {
          productId: productId,
          title: gadgettype,
        });
      }}>
      <Image source={{uri: imageurl}} style={styles.image} />
      <View style={{width: 50,}}>
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

      <Text style={styles.discountedrate}>Rs {discountedrate}</Text>
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
    gap: 5,
  },
  image: {
    width: 170,
    height: 200,
    resizeMode: 'stretch',
    alignSelf: 'center',
    marginVertical: 5,
    borderRadius: 5,
  },
  brandname: {
    fontSize: 11,
    fontWeight: '400',
    fontFamily: FontFamily.poppinsRegular,
    color: Color.gray,
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
    color: Color.gray,
  },
  discountedrate: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    fontFamily: FontFamily.poppinsRegular,
    color: Color.colorDarkslategray,
  },
});
