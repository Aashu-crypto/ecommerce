import {StyleSheet, Text, View,FlatList} from 'react-native';
import React from 'react';
import useFetch from '../../customHooks/useFetch';
import Card from '../../components/Card';

const EarlyDeals = () => {
    const {data, isLoading, error} = useFetch({url: '/products/details'});
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
          data={data}
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
