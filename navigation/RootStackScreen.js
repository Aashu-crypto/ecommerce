import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreens/HomeScreen';
import ProductScreen from '../screens/ShopScreens/ProductScreen';
import {useSelector} from 'react-redux';
import CartScreen from '../screens/ShopScreens/CartScreen';
import BottomTabNavigation from './BottomTabNavigation';
import ProfileScreen from '../screens/ProfileScreens/ProfileScreen';
import MyOrders from '../screens/ProfileScreens/MyOrders';
import { Color } from '../GlobalStyles';
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Product" component={ProductScreen} />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
const CartStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          screenOptions: false,
          title: 'My Profile',
          headerTitleStyle: {
            fontSize: 35,
            fontVariant:'700',
            color:Color.black
          },
        }}
      />
      <Stack.Screen
        name="Order"
        component={MyOrders}
        options={{
          screenOptions: true,
          title:""
        }}
      />
    </Stack.Navigator>
  );
};

const Navigator = () => {
  const navigation = useSelector(state => state.screen.screen);
  switch (navigation) {
    case 'MAIN':
      return <BottomTabNavigation />;
    case 'CART':
      return <CartStack />;
    default:
      return <BottomTabNavigation />;
  }
};
export {HomeStack, Navigator, CartStack, ProfileStack};
