import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ScrollView,
  Animated,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {Color, FontFamily} from '../../GlobalStyles';
import UserAvatar from 'react-native-user-avatar';
import ProfileOptions from '../../components/ProfileOptions';
import {useSelector} from 'react-redux';
import {setUser} from '../../redux/slice/UserSlice';
import {screen} from '../../redux/slice/ScreenNameSlice';
import {useDispatch} from 'react-redux';
import {width} from '../../GlobalStyles';
import MaleAvater from '../../assets/img/maleAvatar.svg';
import Svg, {Circle, Polygon, Path, G} from 'react-native-svg';
import HeaderComponent from '../../components/HeaderComponent';
import {updateCart} from '../../redux/slice/CartSlice';
import Routes from '../../Routes';
const headerHeight = 280;
const headerFinalHeight = 70;
const imageSize = (headerHeight / 3) * 2;
const mySvg = ({}) => {};
const ProfileScreen = ({navigation}) => {
  const user = useSelector(state => state.user.data);

  console.log('user', user);
  const [textWidth, setTextWidth] = useState(0);
  const scrollY = useRef(new Animated.Value(0)).current;
  const offset = headerHeight - headerFinalHeight;
  const translateImageY = scrollY.interpolate({
    inputRange: [0, offset],
    outputRange: [0, -(headerFinalHeight - headerHeight) / 2],
    extrapolate: 'clamp',
  });
  const translateImageX = scrollY.interpolate({
    inputRange: [0, offset],
    outputRange: [
      0,
      -(width / 2) + (imageSize * headerFinalHeight) / headerHeight,
    ],
    extrapolate: 'clamp',
  });
  const translateHeader = scrollY.interpolate({
    inputRange: [0, offset],
    outputRange: [0, -offset],
    extrapolate: 'clamp',
  });
  const scaleImage = scrollY.interpolate({
    inputRange: [0, offset],
    outputRange: [1, headerFinalHeight / headerHeight],
    extrapolate: 'clamp',
  });
  const translateName = scrollY.interpolate({
    inputRange: [0, offset / 2, offset],
    outputRange: [0, 10, -width / 2 + textWidth / 2 + headerFinalHeight],
    extrapolate: 'clamp',
  });
  const scaleName = scrollY.interpolate({
    inputRange: [0, offset],
    outputRange: [1, 0.8],
    extrapolate: 'clamp',
  });

  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(setUser({}));
    dispatch(updateCart([]));
  };
  const profileOptionsData = [
    {
      title: 'My orders',
      subTitle: 'Already have 12 orders',
      route: Routes.ORDERS,
    },
    {title: 'Shipping Address', subTitle: '2 Addresses'},
    {title: 'Payment Method', subTitle: 'visa **32'},
    {title: 'Promo Code', subTitle: 'You have special PromoCode'},
    {title: 'My review', subTitle: 'Review for 4 items'},
    {title: 'Setting', subTitle: 'Notification, passwords'},
  ];
  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent title="My Profile" icon="user" />
      <Animated.View
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
      </Animated.View>

      <ScrollView
        style={{marginHorizontal: 10}}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}>
        <View>
          {profileOptionsData.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                console.log(option.route);
                navigation.navigate(option.route);
              }}>
              <ProfileOptions title={option.title} subTitle={option.subTitle} />
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          onPress={() => {
            console.log('kwn', user);
            if (Object.keys(user).length == 0) {
              dispatch(screen('USER'));
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 20,
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

  header: {
    height: headerHeight,
    marginTop: 60,
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingTop: headerHeight + 5,
  },
  image: {
    height: imageSize,
    width: imageSize,
    borderRadius: headerHeight,

    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    height: '100%',
    width: '100%',
  },
  name: {
    fontSize: 30,
    color: '#000',
    position: 'absolute',
    bottom: 0,
    height: headerFinalHeight,
    textAlignVertical: 'center',
    letterSpacing: 2,
  },
});
