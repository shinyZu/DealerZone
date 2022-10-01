//import liraries
import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  useWindowDimensions,
} from 'react-native';
import {
  Button,
  NativeBaseProvider,
  VStack,
  Input,
  Icon,
  FormControl,
} from 'native-base';
import {MaterialIcons} from 'react-native-vector-icons';

import Avatar from '../assets/images/avatar1.jpg';

// create a component
const Login = ({navigation}) => {
  const windowHeight = useWindowDimensions().height;
  const [nicNo, setNicNo] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [contactNo, setContactNo] = React.useState('');
  return (
    <NativeBaseProvider>
      <View style={[{minHeight: Math.round(windowHeight)}]}>
        <View style={styles.avatar_container}>
          <Image style={styles.avatar} source={Avatar} />
        </View>
        <View style={styles.label_container}>
          <Text style={styles.label}>Login</Text>
        </View>
        {/* <View > */}
        <VStack space={4} style={styles.input_container}>
          {/* <Input
            variant="outline"
            placeholder="NIC No"
            placeholderTextColor="#95a5a6"
            size="md"
            w="80%"
            color="black"
            value={nicNo}
            onChangeText={e => {
              setNicNo(e);
            }}
          /> */}
          <FormControl isInvalid w="75%" maxW="300px">
            <Input placeholder="NIC No" />
            <FormControl.ErrorMessage>Invalid NIC No</FormControl.ErrorMessage>
          </FormControl>
          <Input
            variant="outline"
            placeholder="Email"
            placeholderTextColor="#95a5a6"
            size="md"
            w="80%"
            color="black"
            value={email}
            onChangeText={e => {
              setEmail(e);
            }}
          />
          <Input
            variant="outline"
            placeholder="Password"
            placeholderTextColor="#95a5a6"
            size="md"
            w="80%"
            color="black"
            value={password}
            onChangeText={e => {
              setPassword(e);
            }}
          />
          <Input
            variant="outline"
            placeholder="Contact No"
            placeholderTextColor="#95a5a6"
            size="md"
            w="80%"
            color="black"
            value={contactNo}
            onChangeText={e => {
              setContactNo(e);
            }}
          />
        </VStack>
        {/* </View> */}
        <View style={styles.btn_container}>
          <TouchableOpacity
            style={styles.btn}
            // onPress={() => {
            //   navigation.navigate('HomeScreen');
            // }}
          >
            <Text style={styles.btn_label}>Register</Text>
          </TouchableOpacity>
          <Button size="sm" variant="outline" colorScheme="secondary">
            Login
          </Button>
          <Text style={styles.sub_text}>Already Registered?</Text>
        </View>
      </View>
    </NativeBaseProvider>
  );
};

// define your styles
const styles = StyleSheet.create({
  main_container: {
    // borderWidth: 1,
    // borderColor: 'red',
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#2c3e50',
  },

  avatar_container: {
    // borderWidth: 1,
    // borderColor: 'red',
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 20,
    // marginBottom: 10,
    flex: 2,
  },

  avatar: {
    borderRadius: 50,
    width: 100,
    height: 100,
    // marginBottom: 10,
  },

  label_container: {
    // borderWidth: 1,
    // borderColor: 'red',
    // backgroundColor: 'yellow',
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },

  label: {
    color: 'black',
    fontSize: 30,
  },

  input_container: {
    // borderWidth: 1,
    // borderColor: 'blue',
    // backgroundColor: 'red',
    color: 'black',
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },

  input: {
    borderWidth: 1,
    borderColor: '#95a5a6',
    width: '80%',
    margin: 12,
    borderRadius: 5,
    color: 'black',
  },

  btn_container: {
    // borderWidth: 1,
    // borderColor: 'green',
    // backgroundColor: 'green',
    flex: 2,
    // marginTop: 10,
    // justifyContent: 'center',
    alignItems: 'center',
  },

  btn: {
    width: '80%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#B53471',
    alignItems: 'center',
  },

  btn_label: {
    color: '#fff',
    fontSize: 20,
  },

  btn_Login: {},

  sub_text: {
    fontSize: 9,
    color: '#95a5a6',
  },
});

//make this component available to the app
export default Login;

{
  /* <Text style={{color: 'black'}}>Login</Text>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            navigation.navigate('HomeScreen');
          }}>
          <Text style={{fontSize: 20}}>Login</Text>
        </TouchableOpacity>
        <Button size="sm" variant="outline" colorScheme="secondary">
          SECONDARY
        </Button> */
}

/* 
<View
        style={[{minHeight: Math.round(windowHeight)}]}>
        <View style={styles.avatar_container}>
          <Image style={styles.avatar} source={Avatar} />
        </View>

        <View style={styles.label_container}>
          <Text style={styles.label}>Login</Text>
        </View>

        <View style={styles.input_container}>
          <TextInput
            style={styles.input}
            value={nicNo}
            onChangeText={nic => {
              setNicNo(nic);
            }}
            placeholder="NIC No"
            placeholderTextColor="#95a5a6"
          />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={email => {
              setEmail(email);
            }}
            placeholder="Email"
            placeholderTextColor="#95a5a6"
          />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={pwd => {
              setPassword(pwd);
            }}
            secureTextEntry={true}
            placeholder="Password"
            placeholderTextColor="#95a5a6"
          />
          <TextInput
            style={styles.input}
            value={contactNo}
            onChangeText={contact => {
              setContactNo(contact);
            }}
            placeholder="Contact No"
            placeholderTextColor="#95a5a6"
          />
        </View>
        <View style={styles.btn_container}>
          <TouchableOpacity
            style={styles.btn}
            // onPress={() => {
            //   navigation.navigate('HomeScreen');
            // }}
          >
            <Text style={styles.btn_label}>Register</Text>
          </TouchableOpacity>
          <Text style={styles.sub_text}>Already Registered?</Text>
          <Button size="sm" variant="outline" colorScheme="secondary">
            Login
          </Button>
        </View>
      </View>
*/
