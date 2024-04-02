import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreens/ProfileScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import CartScreen from '../screens/ShopScreens/CartScreen';
import {Color} from '../GlobalStyles';
import {TouchableRipple} from 'react-native-paper';
import {CartStack} from './RootStackScreen';
import {HomeStack} from './RootStackScreen';
import {Badge} from 'react-native-paper';
import {ProfileStack} from './RootStackScreen';
const Tab = createBottomTabNavigator();

export default function BottomTabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.icon}>
              <Icon
                name="home"
                color={focused && Color.appDefaultColor}
                size={30}
              />
            </View>
          ),
          tabBarButton: props => <TouchableRipple {...props} />,

          tabBarActiveTintColor: Color.appDefaultColor,
          tabBarLabel: 'Home',
          tabBarActiveBackgroundColor: Color.lightestAppColor,
        }}
      />
      <Tab.Screen
        name="CartStack"
        component={CartStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.icon}>
              <Icon
                name="shopping-cart"
                color={focused && Color.appDefaultColor}
                size={26}
              />
            </View>
          ),
          tabBarActiveTintColor: Color.appDefaultColor,
          tabBarButton: props => <TouchableRipple {...props} />,
          tabBarLabel: 'Cart',
          tabBarActiveBackgroundColor: Color.lightestAppColor,
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.icon}>
              <Icon
                name="user-circle-o"
                color={focused && Color.appDefaultColor}
                size={26}
              />
            </View>
          ),
          tabBarActiveTintColor: Color.appDefaultColor,
          tabBarButton: props => <TouchableRipple {...props} />,
          tabBarLabel: 'Profile',

          tabBarActiveBackgroundColor: Color.lightestAppColor,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    alignItems: 'center',
    justifyContent: 'center',

    padding: 3,
    borderRadius: 10,
  },
});
