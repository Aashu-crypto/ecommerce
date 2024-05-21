import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import {FontFamily, Color} from '../../GlobalStyles';
import StarRating from 'react-native-star-rating';
import {screen} from '../../redux/slice/ScreenNameSlice';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import {updateCart} from '../../redux/slice/CartSlice';
import {backendHost} from '../../components/apiConfig';
import {width, height} from '../../GlobalStyles';
import Routes from '../../Routes';
import {ActivityIndicator} from 'react-native-paper';
import ContentLoader from '../../components/ContentLoader';
export default ProductScreen = ({route}) => {
  const {
    productId,
    brandname,
    gadgettype,
    rate,
    discountedrate,
    starrating,
    imageurl,
    description,
    index,
    title,
  } = route.params;
  const image = 'https://picsum.photos/275/413';
  const [isClicked, setIsClicked] = useState(false);
  const refRBSheet = useRef();
  const [selectedSize, setSelectedSize] = useState('M');
  const [btnClicked, setBtnClicked] = useState(0);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [selectedColor, setSelectedColor] = useState('black');
  const size = ['XS', 'S', 'M', 'L', 'XL'];
  const color = ['black', 'blue', 'red'];
  const user = useSelector(state => state.user.data);
  const data = [{url: imageurl}, {url: imageurl}, {url: imageurl}];
  const mainScrollValue = useRef(new Animated.Value(0).current);
  const scrollValue = useRef(new Animated.Value(0)).current;
  const translateX = scrollValue.interpolate({
    inputRange: [0, width],
    outputRange: [0, 20],
  });
  const inputRange = [0];
  const scaleOutputRange = [1];
  data.forEach(
    (_, i) =>
      i != 0 && inputRange.push(...[(width * (2 * i - 1)) / 2, width * i]),
  );
  data.forEach((_, i) => i != 0 && scaleOutputRange.push(...[0, 1]));
  const scaleX = scrollValue.interpolate({
    inputRange,
    outputRange: scaleOutputRange,
  });

  useEffect(() => {
    // Dynamically set the title based on the current article
    // Replace with your dynamic title logic
    navigation.setOptions({
      title: title,
    });
  }, [productData]);
  const handleAddToCart = async () => {
    console.log(user);
    if (user.length == 0) {
      Alert.alert('Please Log in', 'To add product user should be logged in', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Login', onPress: () => dispatch(screen(Routes.SIGNUP))},
      ]);
    } else {
      const body = {
        userId: user.userId,
        productId: productId,
        quantity: 1,
      };
      try {
        const res = await fetch(`${backendHost}/products/addCart`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
        const json = await res.json();
        Alert.alert('Added to Cart', 'Product has been added.', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Cart',
            onPress: () => {
              navigation.navigate('CartStack');
            },
          },
          {
            text: 'CheckOut',
            onPress: () => dispatch(screen(Routes.CARTSUBMIT)),
          },
        ]);

        console.log(json);
      } catch (error) {
        Alert.alert('Error');
        console.log(error);
      }
    }
  };

  useEffect(() => {
    console.log('main', mainScrollValue.value);
  }, [mainScrollValue]);
  const [productData, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(
          `${backendHost}/products/getProduct/${productId}`,
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const res = await response.json();
        setProduct(res);
        console.log('data of product', res);
      } catch (error) {
        console.log(error);
        // ... (Improved error handling as mentioned above)
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {!isLoading ? (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}>
            <View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                decelerationRate="fast"
                pagingEnabled
                onScroll={Animated.event(
                  [{nativeEvent: {contentOffset: {x: scrollValue}}}],
                  {useNativeDriver: false},
                )}>
                {data.map((item, index) => (
                  <Image
                    key={index}
                    source={{
                      uri: productData.imageUrl ? productData.imageUrl : '',
                    }}
                    style={styles.image}
                  />
                ))}
              </ScrollView>
              <View style={styles.indicatorConatiner} pointerEvents="none">
                {data.map((item, index) => (
                  <Indicator key={index} />
                ))}
                <Animated.View
                  style={[
                    styles.activeIndicator,
                    {
                      position: 'absolute',
                      transform: [{translateX}, {scaleX}],
                    },
                  ]}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginVertical: 12,
              }}>
              <Pressable
                style={styles.selectBtn}
                onPress={() => {
                  setBtnClicked(1), refRBSheet.current.open();
                }}>
                <Text style={styles.selectBtnText}>Size : {selectedSize}</Text>
                <Icon
                  name="arrow-down"
                  size={15}
                  style={styles.selectBtnText}
                />
              </Pressable>

              <Pressable
                style={styles.selectBtn}
                onPress={() => {
                  setBtnClicked(2), refRBSheet.current.open();
                }}>
                <Text style={styles.selectBtnText}>
                  Color : {selectedColor}
                </Text>
                <Icon
                  name="arrow-down"
                  size={15}
                  style={styles.selectBtnText}
                />
              </Pressable>
              <Pressable style={styles.selectBtnFav}>
                <Icon name="heart" size={10} style={styles.selectBtnText} />
              </Pressable>
            </View>
            <View style={{padding: 5}}>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Text style={styles.brandname}>{productData?.brandName}</Text>
                <Text style={styles.rate}>
                  {' '}
                  Rs {productData?.price}
                </Text>
              </View>
              <Text style={styles.gadgettype}>{productData?.name}</Text>

              <View style={{width: 50, marginVertical: 5}}>
                <StarRating
                  starSize={15}
                  disabled={false}
                  maxStars={5}
                  rating={productData?.starrating}
                  emptyStarColor={'#FFBA49'}
                  fullStarColor={'#FFBA49'}
                />
              </View>
              <Text
                style={{
                  color: Color.black,
                  fontFamily: FontFamily.poppinsBold,
                }}>
                About Product:
              </Text>
              <Text style={styles.description}>{productData?.description}</Text>
            </View>

            <RBSheet
              ref={refRBSheet}
              closeOnDragDown={true}
              closeOnPressMask={false}
              animationType="fade"
              customStyles={{
                wrapper: {
                  backgroundColor: 'transparent',
                },
                draggableIcon: {
                  backgroundColor: '#000',
                },
              }}>
              <Text style={styles.bottomSheetTitle}>
                {btnClicked == 1 ? 'Select Size' : 'Select Color'}
              </Text>
              <View style={styles.bottomSheet}>
                {(btnClicked == 1 ? size : color).map(item => (
                  <TouchableOpacity
                    style={styles.bottomSheetBtn}
                    onPress={() => {
                      {
                        btnClicked == 1
                          ? setSelectedSize(item)
                          : setSelectedColor(item);
                      }
                      refRBSheet.current.close();
                    }}>
                    <Text style={styles.bottomSheetBtnText}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </RBSheet>
          </ScrollView>
          <TouchableOpacity
            style={styles.addToCart}
            onPress={() => {
              handleAddToCart();
            }}>
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ContentLoader />
      )}
    </>
  );
};
function Indicator() {
  return <View style={styles.indicator} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: width,
    height: 413,
  },
  selectBtn: {
    flexDirection: 'row',
    width: 138,
    height: 40,
    borderRadius: 8,
    borderWidth: 0.5,

    shadowColor: '#000000', // This is a hex code for black color
    shadowOffset: {width: 0, height: 2}, // You can adjust width and height according to your requirement
    shadowOpacity: 0.25,
    shadowRadius: 3.84, // This can be adjusted to suit your design

    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectBtnFav: {
    borderWidth: 0.5,
    borderRadius: 45,
    alignSelf: 'center',
  },
  selectBtnText: {
    padding: 10,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    fontFamily: FontFamily.poppinsBold,
    color: Color.black,
  },
  brandname: {
    fontSize: 24,
    lineHeight: 28.8,
    fontWeight: '400',
    color: Color.black,
    fontFamily: FontFamily.poppinsBold,
  },
  bottomSheet: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSheetTitle: {
    alignSelf: 'center',
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '400',
    textAlign: 'center',
    color: Color.black,
    fontFamily: FontFamily.poppinsRegular,
  },
  bottomSheetBtn: {
    borderWidth: 0.4,
    width: 100,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
    borderColor: Color.gray,
    backgroundColor: '#fff',
  },
  bottomSheetBtnText: {
    alignSelf: 'center',
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '400',
    textAlign: 'center',
    color: Color.black,
    fontFamily: FontFamily.poppinsRegular,
  },
  gadgettype: {
    fontSize: 11,
    fontWeight: '400',
    color: Color.gray,
    fontFamily: FontFamily.poppinsRegular,
  },
  description: {
    fontSize: 14,
    lineHeight: 25,
    fontWeight: '400',
    fontFamily: FontFamily.poppinsRegular,
    color: Color.black,
    marginVertical: 8,
    width: '90%',
    alignSelf: 'center',
  },
  addToCart: {
    backgroundColor: Color.appDefaultColor,
    height: 48,
    width: 343,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    margin: 5,
  },
  addToCartText: {
    fontSize: 16,
    lineHeight: 20,
    color: '#fff',
    fontWeight: '500',
    fontFamily: FontFamily.poppinsRegular,
    letterSpacing: 2,
  },
  indicator: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#00000044',
    marginHorizontal: 5,
  },
  indicatorConatiner: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
  },
  activeIndicator: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginHorizontal: 5,
  },
  rate:{
    fontSize: 18,
    lineHeight: 20,
    fontWeight: '500',
    fontFamily: FontFamily.poppinsRegular,
    color: Color.colorDarkslategray,
    lineHeight: 28.8,
  },
});
