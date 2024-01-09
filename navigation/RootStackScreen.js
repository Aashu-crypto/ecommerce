import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreens/HomeScreen';
import ProductScreen from '../screens/ShopScreens/ProductScreen';
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen}  options={{headerShown:false}}/>
      <Stack.Screen name="Product" component={ProductScreen} />
    </Stack.Navigator>
  );
};
export {HomeStack};
