import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HeaderComponent from '../../components/HeaderComponent';

const Address = () => {
  return (
    <View style={styles.container}>
      <HeaderComponent title={'Address'} icon={'location-arrow'} />
      <Text>Address</Text>
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
