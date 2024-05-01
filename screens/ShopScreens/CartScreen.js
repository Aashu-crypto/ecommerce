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
  StatusBar,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {FlashList} from '@shopify/flash-list';
import {Color, FontFamily} from '../../GlobalStyles';
import CartCard from '../../components/CartCard';

import {useFocusEffect} from '@react-navigation/native';
import {backendHost} from '../../components/apiConfig';
import HeaderComponent from '../../components/HeaderComponent';
import {useDispatch} from 'react-redux';
import {screen} from '../../redux/slice/ScreenNameSlice';
import Routes from '../../Routes';
import {updateCart} from '../../redux/slice/CartSlice';
const CartScreen = () => {
  const data = useSelector(state => state.cart.cart);
  const latestScreen = useSelector(state => state.screen.screen);
  console.log('data =>', data);
  const user = useSelector(state => state.user.data);

  const dispatch = useDispatch();

  const [cartItems, setCartItems] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      console.log('useEffeevt');
      const fetchData = async () => {
        console.log(user.userId);
        try {
          const response = await fetch(
            `${backendHost}/products/cartItems/${user.userId}`,
          );

          const json = await response.json();
          if (json.message == 'Cart is Empty') {
            console.log('cart');
            setCartItems([]);
          } else {
            setCartItems(json[0].item);
            console.log('json', json[0]);
            dispatch(updateCart(json[0].item));
          }
        } catch (error) {
          Alert.alert('Some error Occured');
          console.log(error);
        }
      };
      fetchData();
    }, [cartItems.length]),
  );
  const [totalRate, setTotalRate] = useState(0);

  useEffect(() => {
    console.log('use Effect is running');
    if (cartItems.length !== 0) {
      const newTotalRate =
        cartItems.reduce(
          (accumulator, item) => accumulator + item.price * item.quantity,
          0,
        ) + 0; // Add 1000 as the initial value
      setTotalRate(newTotalRate);
    }
  }, [cartItems]);

  const handleCheckout = () => {
    dispatch(screen(Routes.CARTSUBMIT));
  };
  return (
    <SafeAreaView style={{marginTop: 20, flex: 1, backgroundColor: '#fff'}}>
      <HeaderComponent title="My Express Cart" icon="shopping-bag" />
      {data.length != 0 ? (
        <View style={{flex: 1}}>
          {data?.map(i => {
            const deleteCartItem = async () => {
              const body = {
                userId: user.userId,
                productId: i.productId,
              };
              console.log('delete cart');
              try {
                const response = await fetch(
                  `${backendHost}/products/deleteCartItem`,
                  {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                  },
                );
                const json = response.json();
                console.log(json);
              } catch (error) {
                console.log(error);
              }
            };
            return (
              <CartCard
                key={i.productId}
                brandname={i.name}
                gadgettype={i.gadgettype}
                rate={i.price}
                discountedrate={i.price}
                starrating={i.starrating}
                imageurl={i.imageUrl}
                description={i.description}
                selectedColor={i.selectedColor}
                selectedSize={i.selectedSize}
                quantity={i.quantity}
                productId={i.productId}
                deleteItem={deleteCartItem}
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
          <TouchableOpacity style={styles.checkOutBtn} onPress={handleCheckout}>
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
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.emptyCart}>Cart is empty</Text>
        </View>
      )}
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
    alignItems: 'flex-end',
    marginHorizontal: 16,
    marginVertical: 8,

    flex: 1,
  },
  emptyCart: {
    fontSize: 25,
    fontWeight: '600',
    color: Color.black,
    fontFamily: FontFamily.poppinsBold,
  },
  checkOutBtn: {
    backgroundColor: Color.appDefaultColor,
    height: 48,
    width: 343,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    margin: 5,
  },
});
