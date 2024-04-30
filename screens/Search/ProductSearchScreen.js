import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Color} from '../../GlobalStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {backendHost} from '../../components/apiConfig';
import Routes from '../../Routes';
const ProductSearchScreen = () => {
  const navigation = useNavigation();

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const searchProducts = async () => {
    try {
      const response = await fetch(
        `${backendHost}/products/searchProduct?text=${searchTerm}`,
      );
      const json = await response.json();

      console.log('search Items', json);
      setSearchResults(json.product);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (searchTerm.length > 1) {
      // Adjust threshold as needed
      searchProducts();
    }
  }, [searchTerm]);
  const onSubmit = item => {
    navigation.push(Routes.SEARCHRESULT, {
      text: item,
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textInputView}>
        <TextInput
          placeholder="Search"
          value={searchTerm}
          onChangeText={setSearchTerm}
          style={styles.textInput}
          onSubmitEditing={() => {
            onSubmit(searchTerm);
          }}
        />
      </View>
      <FlatList
        data={searchResults}
        keyExtractor={item => item._id} // Assuming _id in your product data
        renderItem={({item}) => (
          <View style={styles.itemView}>
            <Text style={styles.itemText}>{item.name}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default ProductSearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    paddingTop: 10,
  },
  textInput: {
    backgroundColor: Color.lightpurple,
    padding: 5,

    borderColor: Color.gray, // Adjust color as desired
    borderRadius: 5, // Soften the edges

    height: 60,
    width: '90%',
  },
  textInputView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.lightpurple,
    borderWidth: 2,

    shadowColor: '#000', // Example shadow (optional)
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 10,
    borderColor: Color.appDefaultColor,
  },
  clearButton: {
    padding: 15,
  },
  itemView: {
    borderBottomWidth: 0.8,
    borderBottomColor: 'rgba(76, 78, 100, 0.6)',
    height: 80,
    width: 380,
    justifyContent: 'center',
    padding: 5,
    zIndex: 999,
  },
  itemText: {
    color: 'rgba(76, 78, 100, 0.6)',
    paddingHorizontal: 10,
    fontSize: 13,
    marginLeft: -5,
  },
});
