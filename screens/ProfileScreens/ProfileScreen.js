import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ScrollView,
  Animated,
  Pressable
} from 'react-native';
import React, {useRef, useState} from 'react';
import {Color, FontFamily} from '../../GlobalStyles';
import ProfileOptions from '../../components/ProfileOptions';
import {useSelector} from 'react-redux';
import {setUser} from '../../redux/slice/UserSlice';
import {screen} from '../../redux/slice/ScreenNameSlice';
import {useDispatch} from 'react-redux';
import {width} from '../../GlobalStyles';
import MaleAvater from '../../assets/img/maleAvatar.svg';
import HeaderComponent from '../../components/HeaderComponent';
import {updateCart} from '../../redux/slice/CartSlice';
import Routes from '../../Routes';
import {User} from '../../components/UserPic';
const headerHeight = 280;

const ProfileScreen = ({navigation}) => {
  const user = useSelector(state => state.user.data);

  console.log('user', user);
  if(Object.keys(user).length == 0){
    dispatch(screen(Routes.SIGNUP))
  }

  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(updateCart([]));
    dispatch(setUser({}));
  };
  const profileOptionsData = [
    {
      title: 'Edit Profile',
      subTitle: 'Change name / Password',
      route: Routes.EDITPROFILE,
      icon: 'user-o',
    },
    {
      title: 'My orders',
      subTitle: 'Already have 12 orders',
      route: Routes.MYORDERS,
      icon: 'shopping-cart',
    },
    {title: 'Shipping Address', subTitle: '2 Addresses', icon: 'address-book'},
    {title: 'Payment Method', subTitle: 'visa **32'},

    {title: 'Setting', subTitle: 'Notification, passwords'},
  ];
  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent title="Profile" icon="user" />
      {/* <Animated.View
        pointerEvents="none"
        style={[styles.header, {transform: [{translateY: translateHeader}]}]}>
        <Animated.View
          style={[
            styles.image,
            {
              transform: [
                {translateY: translateImageY},
                {translateX: translateImageX},
                {scale: scaleImage},
              ],
            },
          ]}>
          <MaleAvater />
        </Animated.View>
        <Animated.Text
          onTextLayout={e => setTextWidth(e.nativeEvent.lines[0].width)}
          style={[
            styles.name,
            {transform: [{translateX: translateName}, {scale: scaleName}]},
          ]}>
          {user.name}
        </Animated.Text>
      </Animated.View> */}
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          gap: 10,
          marginTop:10
        }}>
        <User />
        <Pressable
          style={{
            backgroundColor: Color.lightpurple,
            borderRadius: 15,
            borderColor: Color.appDefaultColor,
            color: Color.colorDarkslategray,
            borderWidth: 1,
            padding: 15,
          }}
          onPress={() => {
            dispatch(screen(Routes.SIGNUP));
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '400',
              width: width / 1.8,
              textAlign: 'center',
              fontFamily: FontFamily.poppinsRegular,
              textDecorationLine: 'underline',
            }}>
            Sign In/Create Account
          </Text>
        </Pressable>
      </View>

      <ScrollView
        style={{marginHorizontal: 10}}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View>
          {profileOptionsData.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                console.log(option.route);
                navigation.navigate(option.route);
              }}>
              <ProfileOptions
                title={option.title}
                subTitle={option.subTitle}
                name={option.icon}
              />
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          onPress={() => {
            console.log('kwn', user);
            if (Object.keys(user).length == 0) {
              dispatch(screen(Routes.SIGNUP));
            } else {
              Alert.alert('Logout', 'Are you Sure You want to logOut', [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'Logout',
                  onPress: handleLogOut,
                },
              ]);
            }
          }}>
          <ProfileOptions
            title="Login In/Logout"
            subTitle=" Sign Up /Login In / Register"
            name="sign-in"
          />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '400',
    color: Color.black,
    fontFamily: FontFamily.poppinsRegular,
    marginTop: 10,
  },
  email: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.gray,
    fontWeight: '500',
  },

  header: {
    marginTop: 60,
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    backgroundColor: '#fff',
  },
});
