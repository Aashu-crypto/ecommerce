//build recently Viewed from frontend and backend
//fix looking for according to gender
//My oRder and Cart should open only when user is logged In
//add product ID to featured
//add for products
//add gender and new or Early to modal of prdouct
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
  Pressable,
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
import {SearchBar} from '@rneui/themed';
import SearchInput from '../../components/SearchInput';
import {useNavigation} from '@react-navigation/native';
import Routes from '../../Routes';
import EarlyDeals from './EarlyDeals';
import {Color, FontFamily, width} from '../../GlobalStyles';
import Boy from '../../assets/img/boy.svg';
import Girl from '../../assets/img/girl.svg';
import Ads from '../../assets/img/Ads.svg';
import FeaturedProduct from './FeaturedProduct';
import ContentLoader from '../../components/ContentLoader';
const HomeScreen = () => {
  const dispatch = useDispatch();
  const reduxData = useSelector(state => state.product.data);
  const navigation = useNavigation();
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState();
  const itemRefs = useRef([]);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoaded(true);

      try {
        const response = await fetch(`${backendHost}/products/details`, {});

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const res = await response.json();
        setData(res.products);
        console.log('data', data);
      } catch (error) {
        // ... (Improved error handling as mentioned above)
        console.error(error);
      } finally {
        setIsLoaded(false);
      }
    };
    fetchData();
  }, []);
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
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        backgroundColor={Color.lightpurple}
        barStyle={'dark-content'}
      />
      {!isLoaded ? (
        <ScrollView style={styles.container}>
          <ImageBackground
            source={require('../../assets/img/MainScreenImage.jpg')}
            style={{
              height: 300,
              width: '100%',
              resizeMode: 'stretch',
            }}>
            <SearchInput />

            <View style={{position: 'absolute', bottom: 15, left: 10}}>
              <Text
                style={{
                  fontSize: 56,
                  color: '#fff',
                  fontFamily: 'Poppins-Bold',
                  fontWeight: '900',
                }}>
                GenZ
              </Text>
              <Text
                style={{
                  fontSize: 44,
                  color: '#fff',
                  fontFamily: 'Poppins-Bold',
                  fontWeight: '900',
                }}>
                Express
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: '#fff',
                  fontFamily: 'Poppins-Bold',
                  fontWeight: '700',
                  letterSpacing: 2,
                }}>
                " Find Everything You want "
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
              <Text
                style={{fontSize: 12, color: '#000'}}
                onPress={() => {
                  navigation.navigate(Routes.PRODUCTRESULT);
                }}>
                View All
              </Text>
            </View>
            <Text style={{}}>Never Seen Before!</Text>
          </View>

          <FlatList
            keyExtractor={item => item._id}
            data={data}
            renderItem={renderItem}
            estimatedItemSize={100}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          <ShopByCategory />
          <Pressable
            onPress={() => {
              navigation.navigate(Routes.PRODUCT, {
                productId: '66348ad5602598c5900e138c',
              });
            }}>
            <Ads height={'190'} width={width} />
          </Pressable>
          <Text style={styles.title}>Early Deals</Text>
          <EarlyDeals />
          <Text style={styles.title}>Featured</Text>
          <FeaturedProduct />
          <View style={styles.looking}>
            <Text style={styles.title}>Looking For?</Text>
            <View style={styles.gender}>
              <Pressable
                onPress={() => {
                  navigation.navigate(Routes.PRODUCTRESULT);
                }}>
                <Boy height={'220'} width={width / 2} />
              </Pressable>
              <Pressable
                onPress={() => {
                  navigation.navigate(Routes.PRODUCTRESULT);
                }}>
                <Girl height={'220'} width={width / 2} />
              </Pressable>
            </View>
          </View>
          <View>
            <Text style={styles.title}>Recently Viewed</Text>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={data}
              renderItem={renderItem}
              estimatedItemSize={100}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <View
            style={{
              width: '100%',
              borderColor: '#e6f7ff',
              alignItems: 'center',

              justifyContent: 'center',
              padding: 8,
              borderRadius: 15,
            }}>
            <Text
              style={[styles.disclaimer, {fontFamily: FontFamily.poppinsBold}]}>
              Disclaimer:
            </Text>
            <Text style={styles.disclaimer}>
              We reserve the right to correct or update information and to
              rectify errors, inaccuracies, or omissions at any time without
              prior notice.
            </Text>
          </View>
        </ScrollView>
      ) : (
        <ContentLoader />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gender: {
    flexDirection: 'row',
  },
  image: {
    width: width / 2,
    height: 190,
    resizeMode: 'stretch',
    alignSelf: 'center',
    marginVertical: 5,
  },
  looking: {
    marginBottom: 10,
  },

  disclaimer: {
    color: Color.appDefaultColor,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: 9,
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: 2,
    fontFamily: FontFamily.poppinsBold,
    alignSelf: 'center',
    marginVertical: 10,
  },
});
