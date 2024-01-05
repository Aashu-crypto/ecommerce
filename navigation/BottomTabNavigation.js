import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreens/ProfileScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import CartScreen from '../screens/ShopScreens/CartScreen';
import {Color} from '../GlobalStyles';
import {TouchableRipple} from 'react-native-paper';
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown:false
    }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Icon
                name="home"
                color={focused && Color.appDefaultColor}
                size={30}
              />
            </View>
          ),
          tabBarButton: props => <TouchableRipple {...props} />,

          tabBarActiveTintColor: Color.appDefaultColor,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Icon
                name="shopping-cart"
                color={focused && Color.appDefaultColor}
                size={26}
              />
            </View>
          ),
          tabBarActiveTintColor: Color.appDefaultColor,
          tabBarButton: props => <TouchableRipple {...props} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Icon
                name="user-circle-o"
                color={focused && Color.appDefaultColor}
                size={26}
              />
            </View>
          ),
          tabBarActiveTintColor: Color.appDefaultColor,
          tabBarButton: props => <TouchableRipple {...props} />,
        }}
      />
    </Tab.Navigator>
  );
}
