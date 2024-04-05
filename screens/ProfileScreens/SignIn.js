import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {Color, FontFamily} from '../../GlobalStyles';
import {useDispatch} from 'react-redux';
import SignInput from '../../components/SignInput';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import LoginSvg from '../../assets/img/loginSvg.svg';
import {useNavigation} from '@react-navigation/native';
import {screen} from '../../redux/slice/ScreenNameSlice';
import {backendHost} from '../../components/apiConfig';
import Routes from '../../Routes';
import {setUser} from '../../redux/slice/UserSlice';
const SignIn = () => {
  const dispatch = useDispatch();
  const [mail, setMail] = useState();
  const [password, setPassword] = useState();
  const loginUser = async () => {
    console.log('Pressed');
    const data = {username: mail, password: password};
    console.log('bod', data);
    try {
      const response = await fetch(`${backendHost}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      console.log(json);
      if (json.userId) {
        dispatch(setUser(json));
        dispatch(screen(Routes.MAIN));
      }
      else {
        Alert.alert('Wrong Id or Password')
      }

     
    } catch (error) {
      console.log(error);
    }
  };
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.goBack}
        onPress={() => {
          console.log('Pressed');
          dispatch(screen('MAIN'));
        }}>
        <Icon name="close" color={Color.appDefaultColor} size={30} />
      </Pressable>
      <View style={styles.upperView}>
        <LoginSvg height="120" width="150" />
        <Text style={styles.title}>Create Your Account</Text>
      </View>
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
            loginUser();
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
  goBack: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 15,
  },
  upperView: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    fontFamily: FontFamily.poppinsBold,
    color: Color.black,
  },
  textinput: {
    padding: 10,
    height: 64,
    backgroundColor: Color.lightpurple,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Color.appDefaultColor,
  },
  containerText: {
    margin: 5,
    padding: 5,
  },
});
