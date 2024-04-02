import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Color, FontFamily, height} from '../GlobalStyles';
import {Image} from '@rneui/base';
import StarRating from 'react-native-star-rating';
const AllProductsCart = ({
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
  return (
    <Pressable style={styles.container}>
      <View style={{flexDirection: 'row', gap: 15, flex: 1}}>
        <Image source={{uri: imageurl}} style={styles.img} />
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          <Text style={styles.title}>{gadgettype}</Text>
          <Text style={styles.brandname}>{brandname}</Text>
          <View style={styles.rating}>
            <StarRating
              starSize={15}
              disabled={false}
              maxStars={5}
              rating={starrating}
              emptyStarColor={'#FFBA49'}
              fullStarColor={'#FFBA49'}
            />
            <Text style={styles.rate}>Rs {discountedrate}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default AllProductsCart;

const styles = StyleSheet.create({
  container: {
    height: height / 9,
    width: '90%',

    alignSelf: 'center',
    margin: 10,
    borderRadius: 10,
   

  },
  img: {
    height: height / 9,
    width: 120,
    resizeMode: 'stretch',
    overflow: 'hidden',
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: FontFamily.poppinsRegular,
    maxWidth: 200,
    color: Color.black,
  },
  brandname: {
    fontSize: 12,
  },

  rating: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'baseline',
  },
  rate: {
    color: Color.black,
    fontSize: 16,
    fontWeight: '600',
    marginRight: 10,
  },
});
