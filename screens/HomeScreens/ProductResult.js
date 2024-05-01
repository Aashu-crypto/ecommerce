import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
} from 'react-native';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import OrderCard from '../../components/OrderCard';
import ProductHorizontalCard from '../../components/HorizontalProductCard';
const ProductResult = () => {
  const data = useSelector(state => state.product.data);
  console.log(data);
  const renderItem = ({item}) => {
    return (
      <>
        <ProductHorizontalCard
          productId={item._id}
          brandname={item.brandName}
          gadgettype={item.name}
          rate={item.rate}
          discountedrate={item.price}
          starrating={item.starrating}
          imageurl={item.imageUrl}
          description={item.description}
        />
      </>
    );
  };
  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />

      <FlatList data={data} renderItem={renderItem} />
    </SafeAreaProvider>
  );
};

export default ProductResult;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure SafeAreaView fills the available space
  },
});
