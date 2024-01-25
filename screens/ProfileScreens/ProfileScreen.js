import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import {Color, FontFamily} from '../../GlobalStyles';
import UserAvatar from 'react-native-user-avatar';
import ProfileOptions from '../../components/ProfileOptions';
import {useSelector} from 'react-redux';
import {setUser} from '../../redux/slice/UserSlice';
import { screen } from '../../redux/slice/ScreenNameSlice';
import {useDispatch} from 'react-redux';
const ProfileScreen = ({navigation}) => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(
      setUser({
        username: '',
        password: '',
        loggedIn: 0,
      }),
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{marginHorizontal: 10}}>
        <View style={{flexDirection: 'row', marginTop: 14}}>
          <UserAvatar size={80} name="Aashutosh Gandotra" />
          <View
            style={{
              justifyContent: 'center',
              padding: 5,
              marginLeft: 15,
            }}>
            <Text style={styles.name}>Aashutosh Gandotra</Text>
            <Text style={styles.email}>aashugandotra@gmail.com</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Order');
          }}>
          <ProfileOptions title="My Orders" subTitle="Already have 12 orders" />
          <Text>
            {user.username}
            {user.loggedIn}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <ProfileOptions title="Shipping Address" subTitle="2 Addresses" />
        </TouchableOpacity>
        <TouchableOpacity>
          <ProfileOptions title="Payment Method" subTitle="visa **32" />
        </TouchableOpacity>
        <TouchableOpacity>
          <ProfileOptions
            title="Promo Code"
            subTitle="You have special PromoCode"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <ProfileOptions title="My review" subTitle="Review for 4 items" />
        </TouchableOpacity>
        <TouchableOpacity>
          <ProfileOptions title="Setting" subTitle="Notification,passwords" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (user.loggedIn == 0) {
             dispatch(screen('USER'))
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
          />
        </TouchableOpacity>
      </View>
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
  },
  email: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.gray,
    fontWeight: '500',
  },
});
