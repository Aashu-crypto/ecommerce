import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Color, FontFamily, width} from '../GlobalStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
const ProfileOptions = ({title, subTitle}) => {
  return (
    <View style={{width: '100%', height: 72}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 25,
        }}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text>{subTitle}</Text>
        </View>
        <Icon name="keyboard-arrow-right" size={24} />
      </View>
    </View>
  );
};

export default ProfileOptions;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '400',
    color: Color.black,
    fontFamily: FontFamily.poppinsRegular,
  },
  subTitle: {
    fontSize: 11,
    fontWeight: '400',
    color: Color.gray,
  },
});
