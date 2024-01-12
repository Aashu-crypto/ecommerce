import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  ImageBackground,
  StatusBar,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Card from '../../components/Card';
import {FlashList} from '@shopify/flash-list';
import {useDispatch,useSelector} from 'react-redux';
import {product} from '../../redux/slice/ProductDataSlice';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const reduxData = useSelector(state=>state.product.data)
  useEffect(async () => {
    dispatch(product(data));
  }, []);
  const data = [
    {
      brandname: 'TechGear',
      gadgettype: 'Smartphone',
      rate: '₹215.65',
      discountedrate: '₹135.86',
      starrating: 1.7,
      imageurl: 'https://picsum.photos/200/300?random=1',
      description:
        'The TechGear Smartphone is a compact and user-friendly device, offering essential smartphone features at an affordable price. Ideal for users who prioritize ease of use and basic functionality, this phone is equipped with a reliable battery life and a user-friendly interface, making it a great choice for everyday communication and light media consumption.',
    },
    {
      brandname: 'GizmoPro',
      gadgettype: 'Tablet',
      rate: '₹344.93',
      discountedrate: '₹251.8',
      starrating: 3.3,
      imageurl: 'https://picsum.photos/200/300?random=2',
      description:
        "GizmoPro's latest tablet is a fusion of sleek design and efficient performance. This device is perfect for users seeking a balance between work and play. With its high-resolution screen and responsive interface, it's great for streaming media, while its robust processing power and business-friendly apps make it suitable for professional use as well.",
    },
    {
      brandname: 'Electra',
      gadgettype: 'Laptop',
      rate: '₹140.98',
      discountedrate: '₹101.51',
      starrating: 1.5,
      imageurl: 'https://picsum.photos/200/300?random=3',
      description:
        "Electra's Laptop is designed for users seeking a straightforward, no-frills computing experience. It's well-suited for everyday tasks like web browsing, checking email, and basic document editing. The laptop boasts a simple design, decent battery life, and sufficient storage for everyday use, making it a solid choice for students and casual users.",
    },
    {
      brandname: 'PixelPlus',
      gadgettype: 'Smartwatch',
      rate: '₹338.96',
      discountedrate: '₹237.27',
      starrating: 3.8,
      imageurl: 'https://picsum.photos/200/300?random=4',
      description:
        'The PixelPlus Smartwatch is an innovative device that keeps you connected and healthy. This smartwatch not only seamlessly syncs with your smartphone for notifications but also includes features like fitness tracking, heart rate monitoring, and GPS. Its stylish design and durable build make it suitable for both everyday wear and sports activities.',
    },
    {
      brandname: 'Innovatech',
      gadgettype: 'Tablet',
      rate: '₹11.01',
      discountedrate: '₹9.8',
      starrating: 4.3,
      imageurl: 'https://picsum.photos/200/300?random=5',
      description:
        "Innovatech Tablet offers a remarkable combination of affordability and efficiency. With a user-friendly interface and a long-lasting battery, it's perfect for reading e-books, browsing the internet, and watching videos. Its lightweight design and portable size make it an excellent choice for on-the-go users who need a reliable device for media consumption and light work.",
    },
    {
      brandname: 'SoundWave',
      gadgettype: 'Headphones',
      rate: '₹196.57',
      discountedrate: '₹121.87',
      starrating: 2.3,
      imageurl: 'https://picsum.photos/200/300?random=6',
      description:
        'SoundWave Headphones are designed for audiophiles who appreciate deep, rich sound and comfort. These headphones offer an immersive audio experience, perfect for enjoying music, podcasts, and movies. With features like noise cancellation and a comfortable over-ear design, they provide a premium listening experience for extended periods.',
    },
    {
      brandname: 'Visionary',
      gadgettype: 'Laptop',
      rate: '₹239.21',
      discountedrate: '₹160.27',
      starrating: 4.4,
      imageurl: 'https://picsum.photos/200/300?random=7',
      description:
        'The Visionary Laptop is a powerhouse of performance and versatility, catering to both gamers and professionals. It boasts a high-definition display, top-tier graphics, and a fast processor, making it perfect for demanding applications and gaming. Additionally, its sturdy build and advanced cooling system ensure durability and optimal performance during extended use.',
    },
    {
      brandname: 'SmartTech',
      gadgettype: 'Camera',
      rate: '₹405.13',
      discountedrate: '₹328.16',
      starrating: 4.7,
      imageurl: 'https://picsum.photos/200/300?random=8',
      description:
        'Capture moments in stunning detail with the SmartTech Camera. It features advanced optics and user-friendly controls, ideal for both amateur and professional photographers. With its high-resolution image capture and versatile shooting modes, this camera is perfect for capturing everything from everyday moments to special events.',
    },
  ];
  
  const renderItem = ({item, index}) => (
    <View>
      <Card
        brandname={item.brandname}
        gadgettype={item.gadgettype}
        rate={item.rate}
        discountedrate={item.discountedrate}
        starrating={item.starrating}
        imageurl={item.imageurl}
        description={item.description}
        index={index}
      />
    </View>
  );
  return (
    <ScrollView style={styles.container}>
      <StatusBar translucent={true} backgroundColor="rgba(0, 0, 0, 0.5)" />
      <ImageBackground
        source={require('../../assets/img/MainScreenImage.jpg')}
        style={{
          height: 300,
          width: '100%',
          resizeMode: 'stretch',
        }}>
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
      <View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            padding: 10,
          }}>
          <Text style={{fontSize: 30, fontWeight: '700', color: '#000'}}>
            New
          </Text>
          <Text style={{fontSize: 12, color: '#000'}}>View All</Text>
        </View>
        <Text style={{paddingLeft: 10}}>Never Seen Before!</Text>
      </View>
    
      <FlashList
        keyExtractor={(item, index) => index.toString()}
        data={data}
        renderItem={renderItem}
        estimatedItemSize={100}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
