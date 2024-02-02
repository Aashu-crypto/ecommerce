import {Pressable, StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color, FontFamily} from '../../GlobalStyles';
import SignInput from '../../components/SignInput';
import {setUser} from '../../redux/slice/UserSlice';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {
  GoogleOneTapSignIn,
  statusCodes,
  GoogleSigninButton,
  GoogleSignin,
} from '@react-native-google-signin/google-signin';
import {screen} from '../../redux/slice/ScreenNameSlice';
const SignUp = ({navigation}) => {
  const [mail, setMail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();

  const [state, setState] = useState();
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '876889475765-a00b4jsbfdkqt31gdsvr5rq65lka9rkh.apps.googleusercontent.com',
    });
  }, []);

  async function onGoogleButtonPress() {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const {idToken, user} = await GoogleSignin.signIn();
      console.log(user);
      setState(user);
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log(error);
    }
  }

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
          <Text
            style={{textAlign: 'right', marginRight: 15}}
            onPress={() => {
              navigation.navigate('SignIn');
            }}>
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

        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          style={{alignSelf: 'center', marginTop: 15}}
          onPress={() => {
            onGoogleButtonPress();
          }}
        />
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
