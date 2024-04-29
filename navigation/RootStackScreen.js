import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreens/HomeScreen';
import ProductScreen from '../screens/ShopScreens/ProductScreen';
import {useSelector} from 'react-redux';
import CartScreen from '../screens/ShopScreens/CartScreen';
import BottomTabNavigation from './BottomTabNavigation';
import ProfileScreen from '../screens/ProfileScreens/ProfileScreen';
import MyOrders from '../screens/ProfileScreens/MyOrders';
import {Color} from '../GlobalStyles';
import SignUp from '../screens/ProfileScreens/SignUp';
import SignIn from '../screens/ProfileScreens/SignIn';
import Routes from '../Routes';
import ShopByCategory from '../screens/HomeScreens/ShopByCategory';
import AllProductByCatergory from '../screens/HomeScreens/AllProductByCatergory';
import Address from '../screens/PaymentScreens/Address';
import AddAddress from '../screens/PaymentScreens/AddAddress';
import ProductSearchScreen from '../screens/Search/ProductSearchScreen';

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
      <Stack.Screen
        name={Routes.PRODUCTBYCATEGORY}
        component={AllProductByCatergory}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name={Routes.SEARCH}
        component={ProductSearchScreen}
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
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={Routes.MYORDERS}
        component={MyOrders}
        options={{
          screenOptions: true,
          title: '',
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          screenOptions: false,
          title: 'Profile Screen',
          headerTitleStyle: {
            fontSize: 35,
            fontVariant: '700',
            color: Color.black,
          },
        }}
      />
    </Stack.Navigator>
  );
};
const UserProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          screenOptions: true,
          title: '',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          screenOptions: true,
          title: '',
        }}
      />
    </Stack.Navigator>
  );
};

const PaymentStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={Routes.ADDRESS} component={Address} />
      <Stack.Screen name={Routes.ADDADDRESS} component={AddAddress} />
    </Stack.Navigator>
  );
};

const Navigator = () => {
  const navigation = useSelector(state => state.screen.screen);
  switch (navigation) {
    case Routes.MAIN:
      return <BottomTabNavigation />;
    case 'USER':
      return <UserProfileStack />;
    case Routes.CARTSUBMIT:
      return <PaymentStack />;
    default:
      return <BottomTabNavigation />;
  }
};
export {HomeStack, Navigator, CartStack, ProfileStack, UserProfileStack};
