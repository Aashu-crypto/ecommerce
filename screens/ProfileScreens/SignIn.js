import {Pressable, StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState} from 'react';
import {Color, FontFamily} from '../../GlobalStyles';
import {useDispatch} from 'react-redux';
import SignInput from '../../components/SignInput';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {screen} from '../../redux/slice/ScreenNameSlice';
const SignIn = () => {
  const dispatch = useDispatch();
  const [mail, setMail] = useState();
  const [password, setPassword] = useState();
  const loginUser = async (email, password) => {
    try {
      let response = await auth().signInWithEmailAndPassword(email, password);
      if (response && response.user) {
        console.log('Login Success', response.user);
        dispatch(screen('MAIN'));
        // Perform any operations after successful login here
      }
    } catch (e) {
      console.error('Login Error', e.message);
      // Handle errors here, like incorrect password or no user found
    }
  };
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <View style={{flex: 1, justifyContent: 'center', alignItem: 'center'}}>
        <View style={styles.containerText}>
          <TextInput
            style={styles.textinput}
            placeholder={'Email'}
            keyboardType="email-address"
            placeholderTextColor={Color.gray}
            onChangeText={i => {
              setMail(i);
            }}
          />
        </View>

        <View style={styles.containerText}>
          <TextInput
            style={styles.textinput}
            placeholder={'Password'}
            keyboardType="default"
            placeholderTextColor={Color.gray}
            secureTextEntry={true}
            onChangeText={i => {
              setPassword(i);
            }}
          />
        </View>
        <Pressable>
          <Text
            style={{textAlign: 'right', marginRight: 15}}
            onPress={() => {
              navigation.navigate('SignIn');
            }}>
            Forget Your Password?
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
            loginUser(mail, password);
          }}>
          <Text
            style={{
              fontSize: 14,
              lineHeight: 20,
              color: '#fff',
              fontWeight: '500',
              fontFamily: FontFamily.poppinsRegular,
            }}>
            Login In
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
  textinput: {
    elevation: 2,
    padding: 15,
    height: 64,
  },
  containerText: {
    margin: 5,
    padding: 5,
  },
});
