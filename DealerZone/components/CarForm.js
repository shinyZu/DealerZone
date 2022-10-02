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
  IconButton,
} from 'native-base';

import {MaterialIcons} from 'react-native-vector-icons';
import {Icon} from 'react-native-elements';

import image from '../assets/images/car.png';

// create a component
const CarForm = props => {
  const windowHeight = useWindowDimensions().height;
  const [regNo, setRegNo] = useState('TT-5951');
  const [img, setImg] = useState(image);
  const [details, setDetails] = useState('ASASAS');

  useEffect(() => {
    if (props.btnTitle === 'Update') {
      const data = props.data;
      setRegNo(data.reg_no);
      setDetails(data.details);
      console.log(regNo);
      console.log(details);
    }
  });
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <View style={styles.regNo_container}>
          {props.btnTitle === 'Update' ? (
            <Input
              style={styles.regNo_container}
              variant="filled"
              placeholder={props.btnTitle === 'Update' ? regNo : ''}
              placeholderTextColor="#fff"
              size="xl"
              textAlign="center"
              backgroundColor="#1e272e"
              borderWidth="0"
              color="#fff"
              //   _readOnly={true}
              //   editable={false}
            />
          ) : (
            <Input
              style={styles.regNo_container}
              variant="filled"
              placeholder="Enter Reg No"
              placeholderTextColor="#ccc"
              size="xl"
              textAlign="center"
              backgroundColor="#1e272e"
              borderWidth="0"
              color="#fff"
            />
          )}
        </View>
        <View style={styles.img_container}>
          {/* <Center> */}
          <Image style={{borderRadius: 10}} source={img} alt="car" size="2xl" />
          {/* </Center> */}
        </View>

        <View style={styles.detail_container}>
          <TextArea
            h={40}
            placeholder="Enter Details"
            placeholderTextColor="#ccc"
            w="72%"
            maxW="300"
            color="#fff">
            {props.btnTitle === 'Update' ? details : ''}
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

              {/* <IconButton
              size="xs"
              color="black"
              variant="outline"
              _icon={{
                as: MaterialIcons,
                name: 'add',
              }}
            /> */}
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
    backgroundColor: '#1e272e',
  },
  regNo_container: {
    // backgroundColor: 'blue',
    flex: 1,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    // color: '#B53471',
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
    width: '72%',
    padding: 8,
    borderRadius: 10,
    // flexDirection: 'row',
    backgroundColor: '#16a085',
    alignItems: 'center',
  },
  btn_delete: {
    width: '95%',
    padding: 8,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: '#ee5253',
    alignItems: 'center',
  },
  btn_update: {
    width: '95%',
    padding: 8,
    // marginRight: 40,
    borderRadius: 10,
    backgroundColor: '#16a085',
    alignItems: 'center',
  },
  btn_label: {
    color: '#fff',
    fontSize: 15,
  },
});

//make this component available to the app
export default CarForm;
