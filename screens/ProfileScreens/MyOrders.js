import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Pressable,
  ScrollView,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {Color, FontFamily, width} from '../../GlobalStyles';
import {useSelector} from 'react-redux';
import MyOrdersCart from '../../components/MyOrdersCart';

const MyOrders = () => {
  const myRef = useRef();
  const [indexTab, setIndex] = useState();
  const [focused, setFocused] = useState(0);
  const data = [
    {
      id: 1,
      tabName: 'Delivered',
      ref: React.createRef(),
    },
    {
      id: 2,
      tabName: 'Processing',
      ref: React.createRef(),
    },
    {
      id: 3,
      tabName: 'Cancelled',
      ref: React.createRef(),
    },
  ];
  const reduxData = useSelector(state => state.product.cart);
  const product = reduxData.flat();
  console.log(reduxData);

  const renderItem = ({item, index}) => {
    const buttonColor = focused === index ? 'black' : '#F8F4EC';

    return (
      <Pressable
        style={[styles.subHeader, {backgroundColor: buttonColor}]}
        onPress={() => {
          setFocused(index);
          console.log(index);
          setIndex(index + 1);
        }}>
        <Text
          style={[
            styles.subHeadertext,
            {color: focused === index ? '#fff' : '#000'},
          ]}>
          {item.tabName}
        </Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Orders</Text>
      <View>
        <FlatList
          data={data}
          renderItem={renderItem}
          horizontal
          keyExtractor={item => item.id.toString()}
        />
      </View>
      <ScrollView>
        {product &&
          product.length > 0 &&
          product.map((item, index) => (
            <View key={index}>
              <MyOrdersCart
                orderNumber={item.orderNumber}
                trackingNumber={item.trackingNumber}
                rate={item.discountedrate}
                status={item.status}
                index={indexTab }
              />
            </View>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyOrders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 14,
  },
  header: {
    fontSize: 34,
    fontWeight: '700',
    color: Color.black,
    fontFamily: FontFamily.poppinsRegular,
  },
  subHeader: {
    width: width / 3.7,
    height: 30,

    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  subHeadertext: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: FontFamily.poppinsRegular,
    padding: 1,
  },
});
