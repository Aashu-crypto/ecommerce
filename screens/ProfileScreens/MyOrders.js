import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import {Color, FontFamily, width} from '../../GlobalStyles';
import {useSelector} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';
const MyOrders = () => {
  const data = [
    {
      id: 1,
      tabName: 'Delivered',
    },
    {
      id: 2,
      tabName: 'Processing',
    },
    {
      id: 3,
      tabName: 'Cancelled',
    },
  ];
  const reduxData = useSelector(state => state.product.cart);
  console.log(reduxData.flat());

  const renderItem = ({item}) => (
    <View style={styles.subHeader}>
      <Text style={styles.subHeadertext}>{item.tabName}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Orders</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        horizontal
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
};

export default MyOrders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 14,
  },
  header: {
    fontSize: 34,
    fontWeight: '700',
    color: Color.black,
    fontFamily: FontFamily.poppinsRegular,
  },
  subHeader: {
    width: width/3.7,
    height: 30,
    backgroundColor: Color.black,
   borderRadius:10,
    alignItems:'center',
    justifyContent:'center',
    margin:5
  },
  subHeadertext: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: FontFamily.poppinsRegular,padding:1,
 
  },
});
