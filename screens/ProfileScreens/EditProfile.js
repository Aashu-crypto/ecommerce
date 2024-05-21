import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HeaderComponent from '../../components/HeaderComponent';
import {Button, TextInput} from 'react-native-paper';
import {useSelector} from 'react-redux';

const EditProfile = () => {
  const [text, setText] = React.useState('');
  const user = useSelector(state => state.user.data);
  console.log(user);
  const handleSubmit = () => {};
  return (
    <View style={styles.container}>
      <HeaderComponent title={'Edit Profile'} icon={'user-o'} />
      <View style={styles.view}>
        <TextInput
          mode="outlined"
          label="Username"
          value={user.name}
          onChangeText={text => setText(text)}
        />
        <TextInput mode="outlined" label="Enter old Password" secureTextEntry />
        <TextInput
          mode="outlined"
          label="Enter new Password"
          secureTextEntry
          right={<TextInput.Icon icon="eye" />}
        />
        <Button onPress={handleSubmit}>Submit</Button>
      </View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  view: {
    flex: 1/2.5 ,
    padding: 5,
    justifyContent: 'space-around',

  },
});
