import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Color, FontFamily, height, width} from '../GlobalStyles';
import {backendHost} from './apiConfig';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Routes from '../Routes';
const ProductCard = ({
  brandname,
  gadgettype,
  rate,
  discountedrate,
  starrating,
  imageurl,
  status,
  quantity,
  productId,
  description,
}) => {
  const [quantityItem, setQuantity] = useState(quantity);
  const [price, setPrice] = useState(discountedrate);
  const [totalCost, setTotalCost] = useState(0);
  useEffect(() => {
    setTotalCost(price * quantityItem);
  }, [price, quantityItem]);
  const user = useSelector(state => state.user.data);
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.container}
      onPress={() => {
        navigation.navigate(Routes.PRODUCT, {
          productId: productId,
          brandname: brandname,
          title: gadgettype,
        
        });
      }}>
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
              <Text style={styles.brandText}>{gadgettype}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    width: '90%',
    height: height / 7,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: '#fff',
    
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
  statusText: {
    fontSize: 11,
    fontWeight: '400',
    fontFamily: FontFamily.poppinsRegular,
    color: Color.gray,
  },
  status: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
