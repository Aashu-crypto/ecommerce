import {StyleSheet, Text, View, FlatList,} from 'react-native';
import React, {useEffect, useState} from 'react';
import {backendHost} from '../../components/apiConfig';
import {FlashList} from '@shopify/flash-list';
import ProductCard from '../../components/ProductCard';
import HeaderComponent from '../../components/HeaderComponent';

const SearchResult = ({route}) => {
  const text = route.params.text;
  const [product, setProduct] = useState();
  useEffect(() => {
    console.log('useEffect start');
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${backendHost}/products/filteredProduct?text=${text}`,
        );
        const data = await response.json();
        console.log(data);
        setProduct(data.productDetail);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const renderItem = ({item}) => {
    return (
      <>
        <ProductCard
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
    <View>
      <HeaderComponent title={"Products Found"}/>
      <FlatList data={product} renderItem={renderItem} />
    </View>
  );
};

export default SearchResult;

const styles = StyleSheet.create({});
