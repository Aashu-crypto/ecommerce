import {StyleSheet, Text, View, FlatList, Pressable} from 'react-native';
import React from 'react';
import {Color, FontFamily} from '../../GlobalStyles';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import Routes from '../../Routes';

const ShopByCategory = () => {
  const navigation = useNavigation();
  const categories = [
    {name: 'laptop', title: 'Computers'},
    {name: 'phone', title: 'Phone'},
    {name: 'watch', title: 'Smart Watch'},
    {name: 'headphones', title: 'Headphone'},
    {name: 'youtube-gaming', title: 'Gaming'},
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shop By Category</Text>
      <FlatList
        data={categories}
        horizontal
        renderItem={({item}) => (
          <View style={styles.categoryView}>
            <Pressable
              style={styles.category}
              onPress={() => {
                navigation.navigate(Routes.PRODUCTBYCATEGORY, {
                  name: item.title,
                });
              }}>
              <Icons name={item.name} size={35} />
            </Pressable>
            <Text style={styles.categoryText}>{item.title}</Text>
          </View>
        )}
        keyExtractor={item => item.name}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default ShopByCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: 2,
    fontFamily: FontFamily.poppinsBold,
  },
  categoryView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  category: {
    borderWidth: 1,
    margin: 15,
    padding: 25,
  },
  categoryText: {
    fontSize: 10,
    color: Color.gray,
    fontFamily: FontFamily.poppinsRegular,
  },
});
