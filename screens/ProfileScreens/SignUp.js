import {Pressable, StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState} from 'react';
import {Color, FontFamily} from '../../GlobalStyles';
import SignInput from '../../components/SignInput';
import {setUser} from '../../redux/slice/UserSlice';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {screen} from '../../redux/slice/ScreenNameSlice';
const SignUp = ({navigation}) => {
  const [mail, setMail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();

  const handleSignIn = () => {
    auth()
      .createUserWithEmailAndPassword(mail, password)
      .then(() => {
        dispatch(setUser({username: mail, password: password, loggedIn: 1}));
        dispatch(screen('MAIN'));
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SignUp</Text>
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

        <Text
          onPress={() => {
            dispatch(screen('MAIN'));
          }}>
          Go back
        </Text>
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
          <Text>{mail}</Text>
          <Text style={{textAlign: 'right', marginRight: 15}}>
            Already Have a account -----
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
            handleSignIn();
          }}>
          <Text
            style={{
              fontSize: 14,
              lineHeight: 20,
              color: '#fff',
              fontWeight: '500',
              fontFamily: FontFamily.poppinsRegular,
            }}>
            Sign Up
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignUp;

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
