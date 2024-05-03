import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import useFetch from '../../customHooks/useFetch';
import Card from '../../components/Card';
import axios from 'axios';
import {backendHost} from '../../components/apiConfig';
const EarlyDeals = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const controller = new AbortController(); // For request cancellation

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${backendHost}/products/earlyDeals`, {
          signal: controller.signal,
        });
        setProducts(response.data);
      } catch (error) {
        if (!axios.isCancel(error)) {
          setError(error); // Only if it's not a canceled request
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => controller.abort(); // Cleanup function
  }, []);
  const renderItem = ({item, index}) => {
    return (
      <View>
        <Card
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
      </View>
    );
  };
  return (
    <View>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={products}
        renderItem={renderItem}
        estimatedItemSize={100}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default EarlyDeals;

const styles = StyleSheet.create({});
