import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {Color, FontFamily} from '../../GlobalStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
const CartScreen = () => {
  const cart = useSelector(state => state.cart.cart);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.cartTitle}>My Bag</Text>
      </View>

      <Text>{cart}</Text>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cartTitle: {
    fontSize: 34,
    fontWeight: '700',
    color: Color.black,
    fontFamily: FontFamily.poppinsBold,
    margin: 14,
  },
});
