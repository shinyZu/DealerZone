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
  Alert,
  Center,
  Slide,
  FormControl,
} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import Avatar from '../assets/images/avatar2.jpg';
import LoginService from '../services/LoginService';
import UserService from '../services/UserService';

const Login = ({navigation}) => {
  const windowHeight = useWindowDimensions().height;
  const [nicNo, setNicNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactNo, setContactNo] = useState('');

  const [userId, setUserId] = useState('');

  const [isValid, setIsValid] = useState(true);

  const [title, setTitle] = useState('Login');
  const [btn1Label, setBtn1Label] = useState(title);
  const [btn2Label, setBtn2Label] = useState('Register');
  const [subText, setSubText] = useState('Not a Member?');
  const [isVisible, setIsVisible] = useState(false);

  const [isOpenTop, setIsOpenTop] = useState(false);
  const str = `${isOpenTop ? 'Hide' : 'Check Internet Connection'}`;

  const alert = (
    <Center h="32">
      <Slide in={isOpenTop} placement="top">
        <Alert justifyContent="center" status="error" safeAreaTop={8}>
          <Alert.Icon />
          <Text color="error.600" fontWeight="medium">
            No Internet Connection
          </Text>
        </Alert>
      </Slide>
      <Button
        onPress={() => setIsOpenTop(!isOpenTop)}
        variant="unstyled"
        bg="coolGray.700:alpha.30">
        {str}
      </Button>
    </Center>
  );

  const loginUser = async () => {
    let loginForm = {
      email: email,
      password: password,
    };
    // console.log(loginForm);

    let res = await LoginService.loginUser(loginForm);
    if (res.status === 200) {
      try {
        // console.log(res.data);
        setUserId(res.data);
        setIsOpenTop(!isOpenTop);
        navigation.navigate('HomeScreen', {obj: res.data});
        clearForm();
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error(res.response.data.message);
    }
  };

  const registerUser = async () => {
    console.log('registered');
    let formData = {
      nic_no: nicNo,
      email: email,
      password: password,
      contact_no: contactNo,
    };
    console.log(formData);

    let res = await UserService.registerUser(formData);
    if (res.status === 201) {
      try {
        console.log(res.data);
        setIsOpenTop(!isOpenTop);
        clearForm();
        navigation.navigate('HomeScreen');
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error(res.response.data.message);
    }
  };

  const clearForm = () => {
    setNicNo('');
    setEmail('');
    setPassword('');
    setContactNo('');
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
            {/* <TouchableOpacity
              style={styles.btn_register}
              onPress={title === 'Login' ? loginUser : registerUser}>
              <Text style={styles.btn_label}>{btn1Label}</Text>
            </TouchableOpacity> */}

            <TouchableOpacity
              onPress={title === 'Login' ? loginUser : registerUser}
              style={styles.btn_register}>
              <LinearGradient
                colors={['#1abc9c', '#00b894', '#16a085']}
                start={{x: 0, y: 0.1}}
                end={{x: 0, y: 0.5}}
                style={styles.btn_reg_grad}>
                <Text style={styles.btn_label}>{btn1Label}</Text>
              </LinearGradient>
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
    marginBottom: 10,
    // backgroundColor: '#16a085',
  },

  btn_reg_grad: {
    padding: 10,
    borderRadius: 10,
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
