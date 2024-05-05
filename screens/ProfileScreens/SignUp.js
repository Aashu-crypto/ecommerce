import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
} from 'react-native';
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
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import LoginSvg from '../../assets/img/loginSvg.svg';
import useFetch from '../../customHooks/useFetch';
import {backendHost} from '../../components/apiConfig';
import {ScrollView} from 'react-native-gesture-handler';
import Routes from '../../Routes';
const SignUp = ({navigation}) => {
  const [mail, setMail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
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
  const [res, setRes] = useState();

  const handleSignIn = async () => {
    const data = {username: mail, name: name, password: password};

    try {
      const res = await fetch(`${backendHost}/user/createUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error('Email already Exists');
      }

      const json = await res.json();
      setRes(json);

      if (json.message === 'User Created Successfully') {
        dispatch(screen(Routes.MAIN))
      } else {
        // Handle potential errors from the backend (e.g., display json.error)
      }
    } catch (error) {
      Alert.alert('Email already exists');
      console.error('Error creating user:', error);
      // Handle general errors (e.g., display a generic error message)
    }
  };
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Pressable
        style={styles.goBack}
        onPress={() => {
          console.log('Pressed');
          dispatch(screen(Routes.MAIN));
        }}>
        <Icon name="close" color={Color.appDefaultColor} size={30} />
      </Pressable>
      <View style={styles.upperView}>
        <LoginSvg height="120" width="150" />
        <Text style={styles.title}>Create Your Account</Text>
      </View>
      <View style={styles.lowerView}>
        <View style={styles.containerText}>
          <TextInput
            style={styles.textinput}
            placeholder={'enter your name'}
            keyboardType="default"
            placeholderTextColor={Color.gray}
            onChangeText={i => {
              setName(i);
            }}
          />
          <TextInput
            style={styles.textinput}
            placeholder={'enter your email'}
            keyboardType="email-address"
            placeholderTextColor={Color.gray}
            onChangeText={i => {
              setMail(i);
            }}
          />

          <TextInput
            style={styles.textinput}
            placeholder={'enter your password'}
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
            style={{
              textAlign: 'right',
              marginRight: 15,
              textDecorationLine: 'underline',
              color: Color.colorDarkslategray,
            }}
            onPress={() => {
              navigation.navigate('SignIn');
            }}>
            Already Have a account ?
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
              fontSize: 17,
              lineHeight: 20,
              color: '#fff',
              fontWeight: '500',
              fontFamily: FontFamily.poppinsRegular,
              letterSpacing: 10,
            }}>
            Create Account
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
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  goBack: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 15,
  },
  upperView: {
    alignItems: 'center',
    justifyContent: 'center',
    gap:15,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    fontFamily: FontFamily.poppinsBold,
    color: Color.black,
  },
  lowerView: {
    flex: 1,

    alignItem: 'center',
    gap: 15,
  },
  textinput: {
    padding: 15,
    height: 50,
    backgroundColor: Color.lightpurple,
    borderRadius: 28,
    borderWidth: 0.5,
    borderColor: Color.appDefaultColor,
   
  },
  containerText: {
    margin: 5,
    padding: 5,
    gap: 15,
  },
});
