//import liraries
import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {
  NativeBaseProvider,
  TextArea,
  Center,
  Circle,
  Image,
  Input,
} from 'native-base';

import {MaterialIcons} from 'react-native-vector-icons';
import {Icon} from 'react-native-elements';

import image from '../assets/images/car.png';

// create a component
const CarForm = props => {
  const windowHeight = useWindowDimensions().height;
  const [regNo, setRegNo] = useState('');
  const [img, setImg] = useState(image);
  const [details, setDetails] = useState('');

  useEffect(() => {
    if (props.title === 'Update') {
      const data = props.data;
      setRegNo(data.regNo);
      setDetails(data.details);
    }
  });
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <View style={styles.regNo_container}>
          <Input
            style={styles.regNo_container}
            variant="filled"
            placeholder="Registration No"
            size="sm"
            textAlign="center"
          />
        </View>
        <View style={styles.img_container}>
          {/* <Center> */}
          <Image
            style={{backgroundColor: 'pink'}}
            source={img}
            alt="car"
            size="2xl"
          />
          {/* </Center> */}
        </View>

        <View style={styles.detail_container}>
          <TextArea h={40} placeholder="Enter Details" w="72%" maxW="300">
            {details}
          </TextArea>
        </View>

        {props.btnTitle == 'Update' ? (
          <View style={styles.btn_container_update}>
            <View
              style={{
                flex: 6,
                // backgroundColor: 'yellow',
                alignItems: 'flex-start',
              }}>
              <TouchableOpacity style={styles.btn_delete}>
                <Text style={styles.btn_label}>Delete</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 6,
                // backgroundColor: 'brown',
                alignItems: 'flex-end',
              }}>
              <TouchableOpacity style={styles.btn_update}>
                <Text style={styles.btn_label}>{props.btnTitle}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.btn_container_save}>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btn_label}>{props.btnTitle}</Text>
              {/* <Icon name="rowing" /> */}
            </TouchableOpacity>
          </View>
        )}
      </View>
    </NativeBaseProvider>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  regNo_container: {
    // backgroundColor: 'blue',
    flex: 1,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#B53471',
    // marginTop: 10,
  },
  img_container: {
    // backgroundColor: 'yellow',
    flex: 3,
    // marginTop: 10,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  detail_container: {
    // backgroundColor: 'pink',
    flex: 2.5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 30,
  },
  btn_container_save: {
    // backgroundColor: 'green',
    flex: 2.5,
    width: '100%',
    alignItems: 'center',
  },
  btn_container_update: {
    // backgroundColor: 'green',
    flex: 2.5,
    flexDirection: 'row',
    // height: '10%',
    width: '70%',
    // justifyContent: 're',
    // alignItems: 'center',
    // alignContent: 'center',
  },
  btn: {
    width: '30%',
    padding: 8,
    borderRadius: 10,
    backgroundColor: '#B53471',
    alignItems: 'center',
  },
  btn_delete: {
    width: '90%',
    padding: 8,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: '#fc5c65',
    alignItems: 'center',
  },
  btn_update: {
    width: '90%',
    padding: 8,
    // marginRight: 40,
    borderRadius: 10,
    backgroundColor: '#B53471',
    alignItems: 'center',
  },
  btn_label: {
    color: '#fff',
    fontSize: 20,
  },
});

//make this component available to the app
export default CarForm;
