import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Color, FontFamily, width} from '../GlobalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
const ProfileOptions = ({title, subTitle, name = 'star'}) => {
  return (
    <View style={{width: '100%', height: 100}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 25,
          alignItems: 'center',
        }}>
        <Icon name={name} size={24} color={Color.appDefaultColor} />
        <View>
          <Text>{title}</Text>
          <Text>{subTitle}</Text>
        </View>
        <Icon name="caret-right" size={24} color={Color.lightpurple} />
      </View>
    </View>
  );
};

export default ProfileOptions;
