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
  HStack,
} from 'native-base';

import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

import {
  launchCamera,
  launchImageLibrary,
  showImagePicker,
} from 'react-native-image-picker';

import image from '../assets/images/car.png';
import CarService from '../services/CarService';
// import url from 'url';
var url = require('url');

const CarForm = props => {
  const windowHeight = useWindowDimensions().height;
  const [regNo, setRegNo] = useState('TT-5951');

  const [fileUri, setFileUri] = useState('');

  const [brand, setBrand] = useState('');
  const [color, setColor] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [mileage, setMileage] = useState('');

  const [imgUri, setImgUri] = useState(
    'https://letusstudy.in/clientside/images/no-image.png',
  );

  const [imgResponse, setImgResponse] = useState(null);

  const baseURL = 'http://192.168.1.3:4000/dealer_zone/api/v1/car/file/';

  useEffect(() => {
    if (props.btnTitle === 'Save Car') {
      console.log('Save Car');
    } else if (props.btnTitle === 'Update') {
      console.log('Update Car');
      if (props.data) {
        setCarDetails(props.data);
        // setImgUri(baseURL + props.data.image.split('file/')[1]);
      }
    }
  });

  const setCarDetails = data => {
    // setRegNo(props.data.reg_no);
    // setBrand(data.details.split('brand:')[1].split(',')[0].trim());
    // setColor(data.details.split('color:')[1].split(',')[0]);
    // setFuelType(data.details.split('fuel:')[1].split(',')[0]);
    // setMileage(data.details.split('mileage:')[1].split(',')[0]);
    // setImgUri(baseURL + props.data.image.split('file/')[1]);

    setRegNo(props.data.reg_no);
    setBrand(props.data.brand);
    setColor(props.data.color);
    setFuelType(props.data.fuel);
    setMileage(props.data.mileage);
    setImgUri(baseURL + props.data.image.split('file/')[1]);
  };

  const clearDetails = () => {
    setRegNo('reg-no');
    setBrand('');
    setColor('');
    setFuelType('');
    setMileage('');
  };

  const updateCar = async () => {
    if (imgUri.split(':')[0] === 'http') {
      console.log('matches');
      setFileUri(null);
    } else {
      console.log('doesnt match');
      setFileUri(imgUri);
    }

    // let data = {
    //   reg_no: regNo,
    //   image: fileUri,
    //   details: 'Updated',
    // };

    // let formData = new FormData();
    // formData.append('reg_no', regNo);
    // formData.append('image', {
    //   uri: fileUri,
    //   type: 'image/jpeg',
    //   name: 'imagename.jpg',
    // });
    // formData.append('details', 'updated');
    // formData.append(
    //   'details',
    //   `brand: ${brand}, color: ${color}, fuel: ${fuelType}, mileage: ${mileage}`,
    // );

    // console.log(formData);
    // // console.log(JSON.stringify(formData));
    // let res = await CarService.updateCar(props.data._id, formData);
    // if (res.status === 200) {
    //   try {
    //     console.log(res);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // } else {
    //   console.error(res.response);
    // }
  };

  const saveCar = async () => {
    console.log('to save');

    // console.log(imgResponse);

    let file = {
      uri: imgResponse.assets[0].uri,
      type: imgResponse.assets[0].type,
      name: imgResponse.assets[0].fileName,
    };

    console.log(file);

    const formData = new FormData();
    formData.append('reg_no', regNo);
    formData.append('image', file);
    formData.append('brand', brand);
    formData.append('color', color);
    formData.append('fuel', fuelType);
    formData.append('mileage', mileage);
    console.log(formData);

    let res = await CarService.saveCar(formData);
    if (res.status === 201) {
      try {
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error(res.response);
    }
  };

  const openCamera = () => {
    // console.log('Inside Launch Camera');
    let options = {
      storageOptions: {
        // skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        // const source = {uri: response.assets[0].uri};
        // console.log(source);
        // image from camera --> "file:///data/user/0/com.dealerzone/cache/rn_image_picker_lib_temp_9d171869-e3f0-47cc-b7ba-584b2481cef6.jpg"
        setFileUri(response.assets[0].uri);
      }
    });
  };

  const launchGallery = () => {
    let options = {
      storageOptions: {
        // skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        // console.log(response);
        // console.log(options);
        setImgResponse(response);
        setFileUri(response.assets[0].uri);
        setImgUri(response.assets[0].uri);
      }
    });
  };

  const renderFileUri = () => {
    if (imgUri) {
      return (
        <Image
          style={{borderRadius: 10}}
          // source={{uri: fileUri}}
          source={{uri: imgUri}}
          alt="car"
          size="200"
          mb={3}
        />
      );
    } else {
      return (
        <Image
          style={{borderRadius: 10}}
          source={require('../assets/images/dummy.png')}
          alt="car"
          size="200"
          mb={3}
        />
      );
    }
  };

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
              value={regNo}
              onChangeText={no => {
                console.log(no);
                setRegNo(no);
              }}
            />
          )}
        </View>
        <View style={styles.img_container}>
          {/* <Center> */}
          {props.btnTitle == 'Update' ? (
            <Image
              style={{borderRadius: 10}}
              source={{uri: imgUri}}
              alt="car"
              size="200"
              mb={3}
            />
          ) : (
            renderFileUri()
          )}
          {/* {renderFileUri()} */}
          <View style={styles.btn_container}>
            <TouchableOpacity
              onPress={launchGallery}
              style={styles.btn_chooseFile}>
              <LinearGradient
                colors={['#95a5a6', '#7f8c8d', '#95a5a6']}
                start={{x: 0, y: 0.1}}
                end={{x: 0, y: 0.5}}
                style={{borderRadius: 5, padding: 3}}>
                <Icon
                  name={'add-photo-alternate'}
                  style={styles.img_btn}
                  size={30}
                />
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={openCamera}
              style={styles.btn_chooseFile}>
              <LinearGradient
                colors={['#95a5a6', '#7f8c8d', '#95a5a6']}
                start={{x: 0, y: 0.1}}
                end={{x: 0, y: 0.5}}
                style={{borderRadius: 5, padding: 3}}>
                <Icon name={'add-a-photo'} style={styles.img_btn} size={30} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.detail_container}>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 5,
              width: '70%',
              flexDirection: 'column',
              paddingLeft: 8,
            }}>
            <HStack
              space={3}
              justifyContent="space-between"
              // style={{
              //   borderWidth: 1,
              // }}
            >
              <Text style={{marginTop: '5%'}}>Brand:</Text>
              <Input
                placeholder={
                  props.btnTitle === 'Update' ? brand : 'Enter Brand'
                }
                style={{
                  color: '#fff',
                  paddingBottom: 0,
                  // borderWidth: 1,
                }}
                variant="unstyled"
                size="xs"
                width="70%"
                value={brand}
                onChangeText={value => {
                  console.log(value);
                  setBrand('');
                  setBrand(value);
                }}
              />
            </HStack>
            <HStack
              space={3}
              justifyContent="space-between"
              // style={{
              //   borderWidth: 1,
              // }}
            >
              <Text style={{marginTop: '5%'}}>Color:</Text>
              <Input
                placeholder={
                  props.btnTitle === 'Update' ? color : 'Enter Color'
                }
                style={{
                  color: '#fff',
                  paddingBottom: 0,
                  // borderWidth: 1,
                }}
                variant="unstyled"
                size="xs"
                width="70%"
                value={color}
                onChangeText={value => {
                  console.log(value);
                  setColor('');
                  setColor(value);
                }}
              />
            </HStack>
            <HStack
              space={3}
              justifyContent="space-between"
              // style={{
              //   borderWidth: 1,
              // }}
            >
              <Text style={{marginTop: '5%'}}>Fuel Type:</Text>
              <Input
                placeholder={
                  props.btnTitle === 'Update' ? fuelType : 'Enter Fuel Type'
                }
                style={{
                  color: '#fff',
                  paddingBottom: 0,
                  // borderWidth: 1,
                }}
                variant="unstyled"
                size="xs"
                width="70%"
                value={fuelType}
                onChangeText={value => {
                  console.log(value);
                  setFuelType('');
                  setFuelType(value);
                }}
              />
            </HStack>
            <HStack
              space={3}
              justifyContent="space-between"
              // style={{
              //   borderWidth: 1,
              // }}
            >
              <Text style={{marginTop: '5%'}}>Mileage:</Text>
              <Input
                placeholder={
                  props.btnTitle === 'Update' ? mileage : 'Enter Mileage'
                }
                style={{
                  color: '#fff',
                  paddingBottom: 0,
                  // borderWidth: 1,
                }}
                variant="unstyled"
                size="xs"
                width="70%"
                value={mileage}
                onChangeText={value => {
                  console.log(value);
                  setMileage('');
                  setMileage(value);
                }}
              />
            </HStack>
          </View>
        </View>

        {props.btnTitle == 'Update' ? (
          <View style={styles.btn_container_update}>
            <View
              style={{
                flex: 6,
                alignItems: 'flex-end',
              }}>
              <TouchableOpacity style={styles.btn_delete}>
                <LinearGradient
                  colors={['#c0392b', '#e74c3c', '#c0392b']}
                  start={{x: 0, y: 0.1}}
                  end={{x: 0, y: 0.5}}
                  style={styles.btn_delete}>
                  <Icon name={'delete'} style={styles.icon_delete} size={30} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 6,
                alignItems: 'flex-end',
              }}>
              <TouchableOpacity style={styles.btn_update} onPress={updateCar}>
                <LinearGradient
                  colors={['#16a085', '#00b894', '#16a085']}
                  start={{x: 0, y: 0.1}}
                  end={{x: 0, y: 0.5}}
                  style={styles.btn_update}>
                  <Text style={styles.btn_label}>{props.btnTitle}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.btn_container_save}>
            <TouchableOpacity style={styles.btn} onPress={saveCar}>
              <LinearGradient
                colors={['#16a085', '#00b894', '#16a085']}
                start={{x: 0, y: 0.1}}
                end={{x: 0, y: 0.5}}
                style={styles.btn}>
                <Text style={styles.btn_label}>{props.btnTitle}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </NativeBaseProvider>
  );
};

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
  btn_container: {
    // backgroundColor: 'yellow',
    // flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  img_btn: {
    color: '#fff',
    padding: 2,
    paddingHorizontal: 30,
    // width: '10%',
  },
  btn_chooseFile: {
    // backgroundColor: '#a5b1c2',
    // backgroundColor: '#7f8c8d',
    marginBottom: 5,
    alignItems: 'center',
    borderRadius: 5,
    padding: 3,
    // width: '80%',
  },
  detail_container: {
    // backgroundColor: 'pink',
    flex: 2.5,
    // flexDirection: 'row',
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
    width: '75%',
    justifyContent: 'space-between',
  },
  btn: {
    width: '87%',
    padding: 8,
    borderRadius: 10,
    alignItems: 'center',
  },
  btn_delete: {
    width: '80%',
    marginRight: 20,
    borderRadius: 10,
    alignItems: 'center',
    // backgroundColor: '#ee5253',
  },
  icon_delete: {
    color: '#fff',
    padding: 4,
  },
  btn_update: {
    width: '110%',
    padding: 8,
    marginTop: -4,
    borderRadius: 10,
    alignItems: 'center',
    // backgroundColor: '#16a085',
  },
  btn_label: {
    color: '#fff',
    fontSize: 15,
  },
  btnText: {
    // marginBottom: 4,
    // textAlign: 'center',
    // color: 'gray',
    // fontSize: 14,
    // fontWeight: 'bold',
  },
});

export default CarForm;
