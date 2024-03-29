import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  Pressable,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {FlashList} from '@shopify/flash-list';
import {Color, FontFamily} from '../../GlobalStyles';
import CartCard from '../../components/CartCard';
import RazorpayCheckout from 'react-native-razorpay';
import {backendHost} from '../../components/apiConfig';

const CartScreen = () => {
  const data = useSelector(state => state.cart.cart);
  const latestScreen = useSelector(state => state.screen.screen);
  console.log('data =>', data);
  const user = useSelector(state => state.user.data);
  const [totalRate, setTotalRate] = useState(0);
  const KEY_ID = 'rzp_test_iJ36ueg9QGZdkY';
  const SECRET_KEY = 'iFp3t7GbBbyrxz660CjPvnxe';
  useEffect(() => {
    // Calculate the total rate when the component mounts or when data changes
    const newTotalRate = data.reduce(
      (accumulator, item) =>
        accumulator + parseFloat(item.rate.replace('₹', '')),
      0,
    );
    setTotalRate(newTotalRate);
  }, [data]);
  const [cartItems, setCartItems] = useState();
  useEffect(() => {
    console.log('useEffeevt');
    const fetchData = async () => {
      console.log(user.userId);
      try {
        const response = await fetch(
          `${backendHost}/products/cartItems/${user.userId}`,
        );

        const json = await response.json();
        setCartItems(json[0].item);
        console.log('json', json[0].item);
      } catch (error) {
        Alert.alert('Some error Occured');
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const handlePayment = () => {
    var options = {
      description: 'Full on Shopping',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: KEY_ID, // Your api key
      amount: totalRate * 100,
      name: 'Buyer',
      prefill: {
        email: 'void@razorpay.com',
        contact: '9191919191',
        name: 'Razorpay Software',
      },
      theme: {color: Color.appDefaultColor},
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch(error => {
        // handle failure
        alert(`Error: ${error.code} | ${error.description}`);
      });
  };

  return (
    <SafeAreaView style={{marginTop: 20, flex: 1, backgroundColor: '#fff'}}>
      <Text style={styles.cartTitle}>My Bag</Text>
      {cartItems?.map(i => {
        return (
          <CartCard
            brandname={i.name}
            gadgettype={i.gadgettype}
            rate={i.price}
            discountedrate={i.price}
            starrating={i.starrating}
            imageurl={i.imageUrl}
            description={i.description}
            selectedColor={i.selectedColor}
            selectedSize={i.selectedSize}
          />
        );
      })}
      <View style={styles.textView}>
        <Text style={styles.totalText}>Total Amount: </Text>
        <Text
          style={{
            color: Color.black,
            fontSize: 18,
            lineHeight: 22,
            fontWeight: '400',
            fontFamily: FontFamily.poppinsBold,
          }}>
          {' '}
          ₹{totalRate.toFixed(2)}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: Color.appDefaultColor,
          height: 48,
          width: 343,
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
          borderRadius: 25,
          margin: 5,
          position: 'absolute',
          bottom: 0,
        }}
        onPress={handlePayment}>
        <Text
          style={{
            fontSize: 14,
            lineHeight: 20,
            color: '#fff',
            fontWeight: '500',
            fontFamily: FontFamily.poppinsRegular,
          }}>
          Check Out
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  cartTitle: {
    fontSize: 34,
    fontWeight: '700',
    margin: 14,
    color: Color.black,
  },
  totalText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    color: Color.gray,
    fontFamily: FontFamily.poppinsRegular,
  },
  textView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 8,
  },
});
