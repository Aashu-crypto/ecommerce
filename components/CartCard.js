import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Color, FontFamily} from '../GlobalStyles';
const CartCard = ({
  brandname,
  gadgettype,
  rate,
  discountedrate,
  starrating,
  imageurl,
  description,
  selectedColor,
  selectedSize,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(discountedrate);
  const [totalCost, setTotalCost] = useState(price * quantity);
  return (
    <View style={styles.card}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={{uri: imageurl}}
          style={{
            height: 104,
            width: 105,
            overflow: 'hidden',
            borderBottomLeftRadius: 5,
            borderTopLeftRadius: 5,
          }}
        />
        <View style={{padding: 5, flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.brandText}>{brandname}</Text>
            <Pressable>
              <Icon name="dots-vertical" size={20} />
            </Pressable>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.sizeColorText}>
              {' '}
              Color: <Text style={{color: Color.black}}>{selectedColor}</Text>
            </Text>
            <Text style={[styles.sizeColorText, {marginLeft: 10}]}>
              Size :<Text style={{color: Color.black}}>{selectedSize}</Text>
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}>
              <Icon
                name="minus-circle"
                size={24}
                onPress={() => {
                  setQuantity(quantity - 1);
                }}
              />
              <Text> {quantity} </Text>
              <Icon
                name="plus-circle"
                size={24}
                onPress={() => {
                  setQuantity(quantity + 1);
                }}
              />
            </View>
            <View>
              <Text>{discountedrate}</Text>
              <Text style={{textAlign: 'right'}}>
                *{quantity} ={totalCost}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartCard;

const styles = StyleSheet.create({
  card: {
    width: 343,
    height: 104,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 5,
  },
  brandText: {
    fontSize: 16,
    fontWeight: '400',
    color: Color.black,
    fontFamily: FontFamily.poppinsBold,
  },
  sizeColorText: {
    fontSize: 11,
    fontWeight: '400',
    fontFamily: FontFamily.poppinsRegular,
    color: Color.gray,
  },
});
