import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {Color, width} from '../GlobalStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import Routes from '../Routes';
const SearchInput = () => {

  const navigation = useNavigation();

  
  return (
    <View style={styles.container}>
      <View style={styles.textInputView}>
        <Pressable style={styles.textInput} onPress={() => {navigation.navigate(Routes.SEARCH)}}>
          <Text style={styles.text}>Search Product</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    height: 100,
  },
  textInput: {
    backgroundColor: Color.lightpurple,
    padding: 5,

    borderColor: Color.gray, // Adjust color as desired
    borderRadius: 5, // Soften the edges

    height: 50,
    width: '90%',
    justifyContent: 'center',
  },
  textInputView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.lightpurple,
    borderWidth: 2,
    margin: 5,
    shadowColor: '#000', // Example shadow (optional)
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 10,
    borderColor: Color.appDefaultColor,
  },
  text: {},
});
