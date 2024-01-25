import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import {Color} from '../GlobalStyles';

const SignInput = ({placeholder, secureTextEntry}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textinput}
        placeholder={placeholder}
        keyboardType="default"
        placeholderTextColor={Color.gray}
        secureTextEntry={true}
      />
    </View>
  );
};

export default SignInput;

const styles = StyleSheet.create({
  textinput: {
    elevation: 2,
    padding: 15,
    height: 64,
  },
  container: {
    margin: 5,
    padding: 5,
  },
});
