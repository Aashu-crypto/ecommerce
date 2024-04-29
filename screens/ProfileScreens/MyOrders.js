import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Pressable,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Color, FontFamily, width} from '../../GlobalStyles';
import {useSelector} from 'react-redux';
import MyOrdersCart from '../../components/MyOrdersCart';
import {backendHost} from '../../components/apiConfig';
import {useFocusEffect} from '@react-navigation/native';
import CartCard from '../../components/CartCard';
import OrderCard from '../../components/OrderCard';
import HeaderComponent from '../../components/HeaderComponent';
const MyOrders = () => {
  const myRef = useRef();
  const [indexTab, setIndex] = useState();
  const [focused, setFocused] = useState(0);
  const user = useSelector(state => state.user.data);
  const id = user.userId;
  console.log('user Data', user);
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
  useEffect(() => {
    fetch(`${backendHost}/products/getOrderedItems/`);
  });
  const reduxData = useSelector(state => state.product.cart);
  const product = reduxData;

  const [orderData, setOrderData] = useState();
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch(
          `${backendHost}/products/getOrderedItems/${id}`,
        );
        const json = await response.json();
        console.log('res', json.orderedItems[0].item);
        setOrderData(json.orderedItems[0].item);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const renderItem = ({item, index}) => {
    const buttonColor = focused === index ? 'black' : '#F8F4EC';
    console.log('new item', item);

    return (
      <>
        <OrderCard
          key={item.productId.productId}
          brandname={item.productId.name}
          rate={item.productId.price}
          status={item.status.toUpperCase()}
          imageurl={item.productId.imageUrl}
          quantity={item.productId.quantity}
          productId={item.productId.productId}
        />
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent title={'My Orders'} icon={'reorder'} />
      <View>
        <FlatList
          data={orderData}
          renderItem={renderItem}
          keyExtractor={item => item._id.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

export default MyOrders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

    marginTop: 20,
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
