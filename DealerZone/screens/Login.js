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
  // Icon,
  FormControl,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

import Avatar from '../assets/images/avatar2.jpg';
import LoginService from '../services/LoginService';

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

  // const loginUser = async () => {
  //   let loginForm = {
  //     email: email,
  //     password: password,
  //   };
  // console.log(loginForm);

  // let res = await LoginService.loginUser(loginForm);
  // if (res.status === 200) {
  //   try {
  //     console.log(res);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // } else {
  //   console.error(res);
  // }

  // navigation.navigate('HomeScreen');

  // };

  const loginUser = async () => {
    var formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    console.log(formData._parts);

    console.log('1');
    let res = await fetch('http://192.168.1.2:4000/dealer_zone/api/v1/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({
      //   email: email,
      //   password: password,
      // }),
      body: formData,
    })
      .then(response => {
        console.log('2');
        console.log(response.json());
      })
      .catch(err => {
        console.log('3');
        console.error(err);
      });

    console.log(res);
  };

  const registerUser = () => {
    console.log('registered');
    navigation.navigate('HomeScreen');
  };

  return (
    <NativeBaseProvider>
      <View style={styles.main_container}>
        <View style={[{minHeight: Math.round(windowHeight)}]}>
          {/* Avatar */}
          <View style={styles.avatar_container}>
            <Image style={styles.avatar} source={Avatar} />
          </View>

          {/* Label */}
          <View style={styles.label_container}>
            {/* <Icon name="rocket" size={30} color="#900" />
            <Icon.Button
              name="facebook"
              backgroundColor="#3b5998"
              onPress={this.loginWithFacebook}>
              Login with Facebook
            </Icon.Button> */}
            {/* <Icon name="chevron-left" size={30} color="#fff" /> */}
            <Text style={styles.label}>{title}</Text>
          </View>

          {/* Inputs */}
          <VStack
            space={title == 'Register' ? 4 : 8}
            mt={title == 'Register' ? 0 : -20}
            style={styles.input_container}>
            {isVisible && (
              <FormControl isInvalid={!isValid} w="80%" maxW="300px">
                <Input
                  placeholder="NIC No"
                  style={{color: '#fff'}}
                  value={nicNo}
                  onChangeText={nic => {
                    setNicNo(nic);
                  }}
                />
                <FormControl.ErrorMessage>
                  Invalid NIC No
                </FormControl.ErrorMessage>
              </FormControl>
            )}
            <FormControl isInvalid={!isValid} w="80%" maxW="300px">
              <Input
                placeholder="Email"
                style={{color: '#fff'}}
                value={email}
                onChangeText={email => {
                  setEmail(email);
                }}
              />
              <FormControl.ErrorMessage>Invalid Email</FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={!isValid} w="80%" maxW="300px">
              <Input
                placeholder="Password"
                type="password"
                style={{color: '#fff'}}
                value={password}
                onChangeText={pwd => {
                  setPassword(pwd);
                }}
              />
              <FormControl.ErrorMessage>
                Must have atleast 8 charaters, use only letters and numbers
              </FormControl.ErrorMessage>
            </FormControl>
            {isVisible && (
              <FormControl isInvalid={!isValid} w="80%" maxW="300px">
                <Input
                  placeholder="Contact No"
                  style={{color: '#fff'}}
                  value={contactNo}
                  onChangeText={contNo => {
                    setContactNo(contNo);
                  }}
                />
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
              onPress={title === 'Login' ? loginUser : registerUser}>
              <Text style={styles.btn_label}>{btn1Label}</Text>
            </TouchableOpacity>
            <Text style={styles.sub_text}>{subText}</Text>
            <Button
              size="sm"
              variant="ghost"
              colorScheme="green"
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
      </View>
    </NativeBaseProvider>
  );
};

// define your styles
const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: '#1e272e',
  },

  avatar_container: {
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
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
    color: '#fff',
    fontSize: 30,
  },

  input_container: {
    // backgroundColor: 'red',
    color: '#fff',
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: '#16a085',
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
