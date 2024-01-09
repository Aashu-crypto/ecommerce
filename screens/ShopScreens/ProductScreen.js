import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
const ProductScreen = ({route}) => {
  const {brandname, gadgettype, rate, discountedrate, starrating, imageurl} =
    route.params;
  const image = 'https://picsum.photos/275/413';
  return (
    <View style={styles.container}>
      <View>
        <ScrollView horizontal>
          <Image source={{uri: image}} style={styles.image} />
          <Image source={{uri: image}} style={styles.image} />
          <Image source={{uri: image}} style={styles.image} />
        </ScrollView>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginVertical: 12,
        }}>
        <Pressable style={styles.selectBtn}>
          <Text style={styles.selectBtnText}>Size</Text>
          <Icon name="arrow-down" size={15} style={styles.selectBtnText} />
        </Pressable>
        <Pressable style={styles.selectBtn}>
          <Text style={styles.selectBtnText}>Color</Text>
          <Icon name="arrow-down" size={15} style={styles.selectBtnText} />
        </Pressable>
        <Pressable style={styles.selectBtnFav}>
          <Icon name="heart" size={15} style={styles.selectBtnText} />
        </Pressable>
      </View>
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: 275,
    height: 413,
    margin: 1,
  },
  selectBtn: {
    flexDirection: 'row',
    width: 100,
    height: 40,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#F01F0E',
    shadowColor: '#000000', // This is a hex code for black color
    shadowOffset: {width: 0, height: 2}, // You can adjust width and height according to your requirement
    shadowOpacity: 0.25, // 0x40000000 translates to a 25% opacity
    shadowRadius: 3.84, // This can be adjusted to suit your design

    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectBtnFav: {
    borderWidth: 0.5,
    borderRadius: 30,
    alignSelf: 'center',
    borderColor: '#F01F0E',
  },
  selectBtnText: {
    padding: 10,
  },
});
