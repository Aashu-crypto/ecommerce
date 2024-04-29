import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {backendHost} from '../../components/apiConfig';
import {useSelector} from 'react-redux';
import HeaderComponent from '../../components/HeaderComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Color, FontFamily, width} from '../../GlobalStyles';
import {useNavigation} from '@react-navigation/native';
import Routes from '../../Routes';
import {RadioButton} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import RazorpayCheckout from 'react-native-razorpay';
import {screen} from '../../redux/slice/ScreenNameSlice';
const Address = () => {
  const [address, setAddress] = useState();
  const [checked, setChecked] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentData, setPaymentData] = useState();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.data);
  const userId = user.userId;
  const KEY_ID = 'rzp_test_iJ36ueg9QGZdkY';
  const SECRET_KEY = 'iFp3t7GbBbyrxz660CjPvnxe';
  const data = useSelector(state => state.cart.cart);
  console.log('Cart Data for order', data);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${backendHost}/user/getUserAddress/${userId}`,
        );
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
        setAddress(json);
      } catch (error) {
        Alert.alert(error);
        console.log(error);
      } finally {
        setIsLoading(true);
      }
    };
    fetchData();
  }, []);
  const successPayment = async () => {
    let items = [];
    data.map(i => {
      items.push({
        productId: i.productId,
        quantity: i.quantity,
        userId: user.userId,
      });
    });

    const response = await fetch(`${backendHost}/products/orderedItems`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(items),
    });
    const json = await response.json();
    console.log('response', json);
  };
  const handlePayment = () => {
    var options = {
      description: 'Full on Shopping',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: KEY_ID, // Your api key
      amount: 300 * 100,
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
        console.log('Payment Data', data);
        setPaymentData(data);
        successPayment();
        alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch(error => {
        // handle failure
        console.log(error);
        alert(`Error: ${error.code} | ${error.description}`);
      });
  };
  function showAddress() {
    const item = address[0];
    return (
      <View>
        <View style={styles.address}>
          <RadioButton
            value="first"
            status={checked === 'first' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('first')}
          />
          <View>
            <Text style={styles.addressText}>
              <Text style={{fontWeight: '800'}}>Address Type: </Text>{' '}
              {item?.addressType}
            </Text>
            <View style={styles.textView}>
              <Text style={styles.addressText}>{item?.street}</Text>
              <Text style={styles.addressText}>{item?.city}</Text>
            </View>

            <Text style={styles.addressText}>
              {' '}
              <Text style={{fontWeight: '800'}}>Pin Code: </Text> {item?.zip}
            </Text>
            <View style={styles.textView}>
              <Text style={styles.addressText}>{item?.state}</Text>
              <Text style={styles.addressText}>{item?.country}</Text>
            </View>
          </View>
        </View>
        <Pressable style={styles.deliver} onPress={successPayment}>
          <Text style={styles.deliverText}>Deliver to this Address</Text>
        </Pressable>

        <Pressable style={[styles.deliver, {marginTop: 10}]}>
          <Text style={styles.deliverText}>Edit Address</Text>
        </Pressable>
      </View>
    );
  }
  function addAddress() {
    return (
      <Pressable
        style={styles.addAddress}
        onPress={() => {
          navigation.navigate(Routes.ADDADDRESS);
        }}>
        <Icon
          name="plus"
          color={Color.appDefaultColor}
          size={28}
          style={styles.icon}
        />
        <Text style={styles.addAddressText}>Add Address</Text>
      </Pressable>
    );
  }
  return (
    <>
      <HeaderComponent title={'Address'} />
      <View style={styles.container}>
        {isLoading ? (
          address?.length === 0 ? (
            addAddress()
          ) : (
            showAddress()
          )
        ) : (
          <ActivityIndicator />
        )}
        <Pressable
          style={styles.back}
          onPress={() => {
            dispatch(screen(Routes.MAIN));
          }}>
          <Text style={styles.backText}>Back to Cart </Text>
        </Pressable>
      </View>
    </>
  );
};

export default Address;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addAddress: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 100,
  },
  addAddressText: {
    fontSize: 20,
    textAlign: 'center',
    flex: 1,
    color: Color.appDefaultColor,
    fontFamily: FontFamily.poppinsBold,
  },
  icon: {
    marginLeft: 15,
    backgroundColor: Color.lightpurple,
    padding: 8,
    borderRadius: 22,
  },
  address: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    padding: 15,
  },
  addressText: {
    color: Color.black,
    fontSize: 14,
    lineHeight: 18,
    fontFamily: FontFamily.poppinsRegular,
  },
  textView: {
    flexDirection: 'row',
    gap: 15,
  },
  deliver: {
    backgroundColor: Color.appDefaultColor,
    width: width,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  deliverText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: FontFamily.poppinsRegular,
    letterSpacing: 2,
  },
  back: {
    flex: 1 / 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  backText: {
    fontSize: 13,
    color: Color.black,
  },
});
