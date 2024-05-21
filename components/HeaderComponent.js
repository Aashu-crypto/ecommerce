import {StyleSheet, Text, View, StatusBar} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Color, FontFamily} from '../GlobalStyles';
import {Divider} from 'react-native-paper';

const HeaderComponent = ({title, icon}) => {
  return (
    <View>
      <StatusBar
        backgroundColor={Color.lightpurple}
        barStyle={'dark-content'}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 15,
          alignItems: 'center',
          backgroundColor: Color.lightpurple,
        }}>
        <Text style={styles.Text}>{title}</Text>
        <Icon name={icon} size={25} color={'#5E4DB0'} />
      </View>
      <Divider />
    </View>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  Text: {
    fontSize: 24,
    color: Color.black,

    textAlign: 'center',
    fontFamily: FontFamily.poppinsRegular,
    fontWeight:'400',
    letterSpacing:2
  },
});
