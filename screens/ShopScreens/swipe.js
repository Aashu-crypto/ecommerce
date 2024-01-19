import {
    Animated,
    Pressable,
    StatusBar,
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    Dimensions,
    findNodeHandle,
    TouchableOpacity,
  } from 'react-native';
  import React, {useEffect, useRef, useState} from 'react';
  import {useSelector} from 'react-redux';
  import {Color, FontFamily} from '../../GlobalStyles';
  import {SafeAreaView} from 'react-native-safe-area-context';
  import {width, height} from '../../GlobalStyles';
  
  const CartScreen = () => {
    const cart = useSelector(state => state.cart.cart);
    const scrollX = useRef(new Animated.Value(0)).current;
  
    const images = {
      man: 'https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
      women:
        'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
      kids: 'https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
      skullcandy:
        'https://images.pexels.com/photos/5602879/pexels-photo-5602879.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
      help: 'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    };
    const data = Object.keys(images).map(i => ({
      key: i,
      title: i,
      image: images[i],
      ref: React.createRef(),
    }));
    const Tab = React.forwardRef(({item}, ref) => {
      return (
        <TouchableOpacity onPress={onItemPress}>
          <View ref={ref}>
            <Text
              style={{
                color: '#fff',
                fontSize: 84 / data.length,
                fontWeight: '800',
                textTransform: 'uppercase',
              }}>
              {item.title}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });
    const Indicator = ({measures, scrollX}) => {
      const inputRange = data.map((_, i) => i * width);
      // const indicatorWidth = scrollX.interpolate({
      //   inputRange,
      //   outputRange: measures.map(measure => measure.width),
      // });
      // const translateX = scrollX.interpolate({
      //   inputRange,
      //   outputRange: measures.map(measure => measure.x),
      // });
  
      return (
        <Animated.View
          style={{
            position: 'absolute',
            height: 4,
            width: 100,
            backgroundColor: 'white',
            bottom: -10
            
          }}/>
      );
    };
    const Tabs = ({data, scrollX, onItemPress}) => {
      const containerRef = useRef();
      const [measures, setMeasures] = useState([]);
      useEffect(() => {
        const m = [];
        data.forEach(item => {
          item.ref.current.measureLayout(
            containerRef.current,
            (x, y, width, height) => {
              m.push({
                x,
                y,
                width,
                height,
              });
              console.log(m)
              setMeasures(m)
              
            },
          );
          
          console.log(measures)
          // if (m.length == data.length) {
          //   setMeasures(m);
          // }
        });
        
      }, []);
  
      useEffect(()=>{console.log("check",measures);
  
      },measures)
      console.log("m",measures);
      return (
        <View style={{position: 'absolute', top: 100, width: width}}>
          <View
            ref={containerRef}
            style={{
              justifyContent: 'space-evenly',
              flex: 1,
              flexDirection: 'row',
            }}>
            {data.map((item, index) => {
              return (
                <Tab
                  key={item.key}
                  item={item}
                  ref={item.ref}
                  onItemPress={() => onItemPress(index)}
                />
              );
            })}
          </View>
        
            <Indicator measures={measures} scrollX={scrollX} />
          
        </View>
      );
    };
  
    const renderItem = ({item}) => {
      return (
        <View>
          <Image
            source={{uri: item.image}}
            style={{width: width, height: height, resizeMode: 'cover'}}
          />
          <View
            style={[
              StyleSheet.absoluteFillObject,
              {backgroundColor: 'rgba(0,0,0,0.3)'},
            ]}></View>
          <Tabs scrollX={scrollX} data={data} onItemPress={onItemPress} />
        </View>
      );
    };
    const onItemPress = React.useCallback(itemIndex => {
      ref?.current?.scrollToOffset({
        offset: itemIndex * width,
      });
    });
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar hidden />
  
        <Animated.FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          bounces={false}
          renderItem={renderItem}
        />
      </SafeAreaView>
    );
  };
  
  export default CartScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    cartTitle: {
      fontSize: 34,
      fontWeight: '700',
      margin: 14,
    },
  });
  