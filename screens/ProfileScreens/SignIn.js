import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Color, FontFamily} from '../../GlobalStyles';
import {useDispatch} from 'react-redux';
import SignInput from '../../components/SignInput';
const SignIn = () => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <View style={{flex: 1, justifyContent: 'center', alignItem: 'center'}}>
        <SignInput placeholder={'Email'} />
        <SignInput placeholder={'Password'} secureTextEntry={'true'} />
        <Pressable>
          <Text style={{textAlign: 'right', marginRight: 15}}>
            Forget your Password -----?
          </Text>
        </Pressable>

        <Pressable
          style={{
            backgroundColor: Color.appDefaultColor,
            height: 48,
            width: 343,
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            borderRadius: 25,
            margin: 5,
            marginTop: 15,
          }}
          onPress={() => {
            // navigation.navigate('SignIn');
          }}>
          <Text
            style={{
              fontSize: 14,
              lineHeight: 20,
              color: '#fff',
              fontWeight: '500',
              fontFamily: FontFamily.poppinsRegular,
            }}>
            Sign In
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignIn;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    fontFamily: FontFamily.poppinsBold,
    color: Color.black,
  },
});
