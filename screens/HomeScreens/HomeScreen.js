import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  ImageBackground,
  StatusBar,
  ScrollView,
  FlatList,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Card from '../../components/Card';
import {FlashList} from '@shopify/flash-list';
import {useDispatch, useSelector} from 'react-redux';
import {product} from '../../redux/slice/ProductDataSlice';
import {Badge} from 'react-native-paper';
import {backendHost} from '../../components/apiConfig';
import useFetch from '../../customHooks/useFetch';
import ShopByCategory from './ShopByCategory';
import { SearchBar } from '@rneui/themed';
import SearchInput from '../../components/SearchInput';
const HomeScreen = () => {
  const dispatch = useDispatch();
  const reduxData = useSelector(state => state.product.data);

  const itemRefs = useRef([]);
  const {data, isLoading, error} = useFetch({url: '/products/details'});

  useEffect(() => {
    dispatch(product(data));
    console.log('Product data added to  redux baby');
  });

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
    <SafeAreaView style={{flex:1,paddingTop:20}}>
      <ScrollView style={styles.container}>
        <StatusBar translucent={true} backgroundColor="rgba(0, 0, 0, 0.5)" />
        <ImageBackground
          source={require('../../assets/img/MainScreenImage.jpg')}
          style={{
            height: 300,
            width: '100%',
            resizeMode: 'stretch',
          }}>
            <SearchInput/>
           
          <View style={{position: 'absolute', bottom: 15, left: 10}}>

            <Text
              style={{
                fontSize: 48,
                color: '#fff',
                fontFamily: 'Poppins-Bold',
                fontWeight: '900',
              }}>
              Digital
            </Text>
            <Text
              style={{
                fontSize: 48,
                color: '#fff',
                fontFamily: 'Poppins-Bold',
                fontWeight: '900',
              }}>
              Sale
            </Text>
          </View>
        </ImageBackground>
        <View style={{padding: 10}}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text style={{fontSize: 30, fontWeight: '700', color: '#000'}}>
              New
            </Text>
            <Text style={{fontSize: 12, color: '#000'}}>View All</Text>
          </View>
          <Text style={{}}>Never Seen Before!</Text>
        </View>

        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={data}
          renderItem={renderItem}
          estimatedItemSize={100}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <ShopByCategory />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
