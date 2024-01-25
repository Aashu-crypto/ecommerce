import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import {Color, FontFamily} from '../GlobalStyles';

const MyOrdersCart = ({orderNumber, trackingNumber, rate, status, index}) => {
  let message;

  if (status == 1) {
    message = 'Delivered';
  } else if (status == 2) {
    message = 'Processing';
  } else {
    message = 'Cancelled';
  }
  return (
    <>
      {index == status ? (
        <View style={styles.card}>
          <View>
            <Text style={styles.order}>Order Number: {orderNumber}</Text>
          </View>
          <View>
            <Text>
              Tracking Number : {index}
              <Text style={styles.trackingNumber}> {trackingNumber}</Text>
            </Text>
          </View>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text>
              Quantity :<Text style={styles.order}> 1 </Text>{' '}
            </Text>
            <Text>
              Total Amount : <Text style={styles.order}>{rate}</Text>
            </Text>
          </View>
          <View>
            <Text style={styles.status}>{message}</Text>
          </View>
        </View>
      ) : null}
    </>
  );
};

export default MyOrdersCart;

const styles = StyleSheet.create({
  card: {
    height: 164,
    backgroundColor: '#fff',
    margin: 5,
    elevation: 2,
    padding: 15,
    justifyContent: 'space-between',
  },
  order: {
    fontSize: 16,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.black,
    fontWeight: '400 ',
  },
  trackingNumber: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
  status: {
    color: '#2AA952',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    fontFamily: FontFamily.poppinsBold,
    justifyContent: 'flex-end',
    textAlign: 'right',
  },
});
