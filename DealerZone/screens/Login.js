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
  const [nicNo, setNicNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactNo, setContactNo] = useState('');

  const [isValid, setIsValid] = useState(true);

  const [title, setTitle] = useState('Login');
  const [btn1Label, setBtn1Label] = useState(title);
  const [btn2Label, setBtn2Label] = useState('Register');
  const [subText, setSubText] = useState('Not a Member?');
  const [isVisible, setIsVisible] = useState(false);

  return (
    <NativeBaseProvider>
      <View style={[{minHeight: Math.round(windowHeight)}]}>
        {/* Avatar */}
        <View style={styles.avatar_container}>
          <Image style={styles.avatar} source={Avatar} />
        </View>

        {/* Label */}
        <View style={styles.label_container}>
          <Text style={styles.label}>{title}</Text>
        </View>

        {/* Inputs */}
        <VStack
          space={title == 'Register' ? 4 : 8}
          mt={title == 'Register' ? 0 : -20}
          style={styles.input_container}>
          {isVisible && (
            <FormControl isInvalid={!isValid} w="80%" maxW="300px">
              <Input placeholder="NIC No" />
              <FormControl.ErrorMessage>
                Invalid NIC No
              </FormControl.ErrorMessage>
            </FormControl>
          )}
          <FormControl isInvalid={!isValid} w="80%" maxW="300px">
            <Input placeholder="Email" />
            <FormControl.ErrorMessage>Invalid Email</FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={!isValid} w="80%" maxW="300px">
            <Input placeholder="Password" type="password" />
            <FormControl.ErrorMessage>
              Must have atleast 8 charaters, use only letters and numbers
            </FormControl.ErrorMessage>
          </FormControl>
          {isVisible && (
            <FormControl isInvalid={!isValid} w="80%" maxW="300px">
              <Input placeholder="Contact No" />
              <FormControl.ErrorMessage>
                Invalid Contact
              </FormControl.ErrorMessage>
            </FormControl>
          )}
        </VStack>

        {/* Buttons */}
        <View style={styles.btn_container}>
          <TouchableOpacity
            style={styles.btn_register}
            onPress={() => {
              navigation.navigate('HomeScreen');
            }}>
            <Text style={styles.btn_label}>{btn1Label}</Text>
          </TouchableOpacity>
          <Text style={styles.sub_text}>{subText}</Text>
          <Button
            size="sm"
            variant="ghost"
            colorScheme="secondary"
            onPress={() => {
              if (title === 'Login') {
                setTitle('Register');
                setBtn1Label('Register');
                setSubText('Already Registered?');
                setBtn2Label('Login');
                setIsVisible(true);
              } else if (title === 'Register') {
                setTitle('Login');
                setBtn1Label('Login');
                setSubText('Not a Member?');
                setBtn2Label('Register');
                setIsVisible(false);
              }
            }}>
            {btn2Label}
          </Button>
        </View>
      </View>
    </NativeBaseProvider>
  );
};

// define your styles
const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },

  avatar_container: {
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 10,
    flex: 1.5,
  },

  avatar: {
    borderRadius: 50,
    width: 100,
    height: 100,
  },

  label_container: {
    // backgroundColor: 'yellow',
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  label: {
    color: 'black',
    fontSize: 30,
  },

  input_container: {
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
    // backgroundColor: 'green',
    flex: 2,
    alignItems: 'center',
  },

  btn_register: {
    width: '80%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#B53471',
    alignItems: 'center',
    marginBottom: 10,
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
