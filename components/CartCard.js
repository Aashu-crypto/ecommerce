import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Color, FontFamily, height, width} from '../GlobalStyles';
import {backendHost} from './apiConfig';
import {useSelector} from 'react-redux';

import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
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
  quantity,
  productId,
  deleteItem,
}) => {
  const [quantityItem, setQuantity] = useState(quantity);
  const [price, setPrice] = useState(discountedrate);
  const [totalCost, setTotalCost] = useState(0);
  useEffect(() => {
    setTotalCost(price * quantityItem);
  }, [price, quantityItem]);
  const user = useSelector(state => state.user.data);

  const handleDecrease = async () => {
    const body = {
      userId: user.userId,
      productId: productId,
      quantity: -1,
    };
    setQuantity(quantityItem - 1);
    console.log('Body', body);
    try {
      const res = await fetch(`${backendHost}/products/addCart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      console.log(json);
    } catch (error) {
      Alert.alert('Error');
      console.log(error);
    }
  };
  const handleIncrease = async () => {
    const body = {
      userId: user.userId,
      productId: productId,
      quantity: 1,
    };
    setQuantity(quantityItem + 1);
    console.log('Body', body);
    try {
      const res = await fetch(`${backendHost}/products/addCart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      console.log(json);
    } catch (error) {
      Alert.alert('Error');
      console.log(error);
    }
  };

  return (
    <View style={styles.card}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={{uri: imageurl}}
          style={{
            height: height / 7,
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
            <Pressable
              onPress={() => {
                deleteItem();
              }}>
              <Icon name="delete-outline" size={20} />
            </Pressable>
          </View>
          {/* <View style={{flexDirection: 'row'}}>
            <Text style={styles.sizeColorText}>
              {' '}
              Color: <Text style={{color: Color.black}}>{selectedColor}</Text>
            </Text>
            <Text style={[styles.sizeColorText, {marginLeft: 10}]}>
              Size :<Text style={{color: Color.black}}>{selectedSize}</Text>
            </Text>
          </View> */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              position: 'absolute',
              bottom: 0,
              gap: 25,
            }}>
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
                  handleDecrease();
                }}
              />
              <Text> {quantityItem} </Text>
              <Icon
                name="plus-circle"
                size={24}
                onPress={() => {
                  handleIncrease();
                }}
              />
            </View>
            <View>
              <Text
                style={{textAlign: 'right', width: 130}}>
                Rs {discountedrate} * {quantityItem} =Rs {totalCost}
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
    width: '90%',
    height: height / 7,
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
    width: 180,
  },
  sizeColorText: {
    fontSize: 11,
    fontWeight: '400',
    fontFamily: FontFamily.poppinsRegular,
    color: Color.gray,
  },
});
