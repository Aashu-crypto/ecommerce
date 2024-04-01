import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import AllProductsCart from '../../components/AllProductsCart';

const AllProductByCatergory = ({route}) => {
  const name = route.params.name;
  const reduxData = useSelector(state => state.product.data);
  console.log(reduxData);

  return (
    <View style={{flex:1,backgroundColor:'#fff'}}>
      {reduxData
        .filter(item => item.categories == name)
        .map((item, index) => (
          <AllProductsCart
            productId={item._id}
            brandname={item.brandName}
            gadgettype={item.name}
            rate={item.rate}
            discountedrate={item.price}
            starrating={item.starrating}
            imageurl={item.imageUrl}
            description={item.description}
            index={index}
          />
        ))}
    </View>
  );
};

export default AllProductByCatergory;

const styles = StyleSheet.create({});
