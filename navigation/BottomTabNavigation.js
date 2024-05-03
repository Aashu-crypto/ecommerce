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
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import Routes from '../Routes';
const Tab = createBottomTabNavigator();

export default function BottomTabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={({route, navigation}) => {
        return {
          headerShown: false,

          tabBarStyle: {
            justifyContent: 'center',
            alignItems: 'center',
            height: Platform.OS === 'android' ? 60 : 80,

            display:
              getFocusedRouteNameFromRoute(route) === Routes.SEARCH
                ? 'none'
                : 'flex',
          },
          tabBarInactiveTintColor: 'grey',
          tabBarActiveBackgroundColor: 'aliceblue',
        };
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
          tabBarActiveBackgroundColor: Color.lightpurple,
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

          tabBarActiveBackgroundColor: Color.lightpurple,
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
