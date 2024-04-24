import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Button,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import HeaderComponent from '../../components/HeaderComponent';
import {Color, FontFamily, width} from '../../GlobalStyles';
import {SegmentedButtons} from 'react-native-paper';
import RazorpayCheckout from 'react-native-razorpay';
import {backendHost} from '../../components/apiConfig';
import {useSelector} from 'react-redux';
const AddAddress = () => {
  const [street, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZipCode] = useState('');
  const [country, setCountry] = useState('India');
  const [addressType, setAddressType] = useState('Home');
  const Id = useSelector(state => state.user.data);
  const handleSubmission = async () => {
    const userId = Id.userId
    const addressData =  {
      street,
      city,
      state,
      zip,
      country,
      addressType,
      userId,
    };
    // Do something with the address data (e.g., save to a database, send it to a server)
    console.log('Address Submitted:', addressData);
    const response = await fetch(`${backendHost}/user/addUserAddress`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addressData),
    });
    const res = await response.json();
    console.log(res);
    handlePayment();
  };

  const KEY_ID = 'rzp_test_iJ36ueg9QGZdkY';
  const SECRET_KEY = 'iFp3t7GbBbyrxz660CjPvnxe';

  const handlePayment = () => {
    var options = {
      description: 'Full on Shopping',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: KEY_ID, // Your api key
      amount: 150 * 100,
      name: 'Buyer',
      prefill: {
        email: 'void@razorpay.com',
        contact: '9191919191',
        name: 'Razorpay Software',
      },
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch(error => {
        // handle failure
        alert(`Error: ${error.code} | ${error.description}`);
      });
  };

  return (
    <View style={styles.container}>
      <HeaderComponent title={'Address'} icon={'location-arrow'} />
      <View style={styles.address}>
        <Text style={styles.addressTitle}> Enter Your Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Street Address (If not found above)"
          value={street}
          onChangeText={setStreetAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={city}
          onChangeText={setCity}
        />
        <TextInput
          style={styles.input}
          placeholder="State"
          value={state}
          onChangeText={setState}
        />
        <TextInput
          style={styles.input}
          placeholder="Zip Code"
          value={zip}
          onChangeText={setZipCode}
        />
        <TextInput
          style={styles.input}
          placeholder="Country"
          value={country}
          onChangeText={setCountry}
        />
        <SegmentedButtons
          value={addressType}
          onValueChange={setAddressType}
          buttons={[
            {
              value: 'Home',
              label: 'Home',
            },
            {
              value: 'Work',
              label: 'Work',
            },
            {value: 'Other', label: 'Other'},
          ]}
          style={{marginBottom: 20}}
        />

        <Pressable style={styles.submitBtn} onPress={handleSubmission}>
          <Text style={styles.submitBtnText}>Submit</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AddAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: Color.appDefaultColor,
    padding: 10,

    borderRadius: 5,
    backgroundColor: Color.lightpurple,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: '500',
  },
  address: {
    padding: 20,
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
  },
  addressTitle: {
    fontSize: 18,
    color: Color.black,
    fontFamily: FontFamily.poppinsBold,
  },
  submitBtn: {
    backgroundColor: Color.appDefaultColor,
    width: width / 1.2,
    alignSelf: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 18,
    letterSpacing: 10,
    fontFamily: FontFamily.poppinsRegular,
    fontWeight: '600',
  },
});
