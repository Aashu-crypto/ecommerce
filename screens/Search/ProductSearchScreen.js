import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import { Color } from '../../GlobalStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ProductSearchScreen = () => {
  const [searchText, setSearchText] = useState('');

  const handleClearSearch = () => {
    setSearchText('');
  };
  return (
    <View style={styles.container}>
      <View style={styles.textInputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Search Products"
          value={searchText}
          onChangeText={setSearchText}
          autoFocus={false} // Adjust as needed
          aria-label="Search input" // For accessibility
        />
        {searchText !== '' && (
          <TouchableOpacity
            onPress={handleClearSearch}
            style={styles.clearButton}>
            <FontAwesome name="close" size={19} color="gray" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ProductSearchScreen;

const styles = StyleSheet.create({
  container: {
    height: 100,
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
    margin: 5,
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
});
