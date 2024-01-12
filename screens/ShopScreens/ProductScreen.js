import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import {FontFamily, Color} from '../../GlobalStyles';
import StarRating from 'react-native-star-rating';
import {screen} from '../../redux/slice/ScreenNameSlice';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useNavigation } from '@react-navigation/native';
const ProductScreen = ({route}) => {
  const {
    brandname,
    gadgettype,
    rate,
    discountedrate,
    starrating,
    imageurl,
    description,
   
  } = route.params;
  const image = 'https://picsum.photos/275/413';
  const [isClicked, setIsClicked] = useState(false);
  const refRBSheet = useRef();
  const [selectedSize, setSelectedSize] = useState('M');
  const [btnClicked, setBtnClicked] = useState(0);
  const dispatch = useDispatch();
  const navigation = useNavigation()

  const [selectedColor, setSelectedColor] = useState('black');
  const size = ['XS', 'S', 'M', 'L', 'XL'];
  const color = ['black', 'blue', 'red'];
  return (
    <>
      <ScrollView style={styles.container}>
        <View>
          <ScrollView horizontal>
            <Image source={{uri: imageurl}} style={styles.image} />
            <Image source={{uri: imageurl}} style={styles.image} />
            <Image source={{uri: image}} style={styles.image} />
          </ScrollView>
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
            <Icon name="arrow-down" size={15} style={styles.selectBtnText} />
          </Pressable>

          <Pressable
            style={styles.selectBtn}
            onPress={() => {
              setBtnClicked(2), refRBSheet.current.open();
            }}>
            <Text style={styles.selectBtnText}>Color : {selectedColor}</Text>
            <Icon name="arrow-down" size={15} style={styles.selectBtnText} />
          </Pressable>
          <Pressable style={styles.selectBtnFav}>
            <Icon name="heart" size={15} style={styles.selectBtnText} />
          </Pressable>
        </View>
        <View style={{padding: 5}}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text style={styles.brandname}>{brandname}</Text>
            <Text style={styles.brandname}>{discountedrate}</Text>
          </View>
          <Text style={styles.gadgettype}>{gadgettype}</Text>

          <View style={{width: 50, marginVertical: 5}}>
            <StarRating
              starSize={15}
              disabled={false}
              maxStars={5}
              rating={starrating}
              emptyStarColor={'#FFBA49'}
              fullStarColor={'#FFBA49'}
            />
          </View>
          <Text style={styles.description}>{description}</Text>
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
        onPress={() => {
         navigation.navigate('Cart')
        }}>
        <Text
          style={{
            fontSize: 14,
            lineHeight: 20,
            color: '#fff',
            fontWeight: '500',
            fontFamily: FontFamily.poppinsRegular,
          }}>
          Add to Cart
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: 275,
    height: 413,
    margin: 1,
  },
  selectBtn: {
    flexDirection: 'row',
    width: 138,
    height: 40,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: Color.gray,
    shadowColor: '#000000', // This is a hex code for black color
    shadowOffset: {width: 0, height: 2}, // You can adjust width and height according to your requirement
    shadowOpacity: 0.25, // 0x40000000 translates to a 25% opacity
    shadowRadius: 3.84, // This can be adjusted to suit your design

    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectBtnFav: {
    borderWidth: 0.5,
    borderRadius: 30,
    alignSelf: 'center',
    borderColor: Color.gray,
  },
  selectBtnText: {
    padding: 10,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    fontFamily: FontFamily.poppinsRegular,
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
    fontFamily: 14,
    lineHeight: 21,
    fontWeight: '400',
    fontFamily: FontFamily.poppinsRegular,
    color: Color.black,
    marginVertical: 8,
    width: '95%',
  },
});
