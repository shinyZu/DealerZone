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

import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

import {
  launchCamera,
  launchImageLibrary,
  showImagePicker,
} from 'react-native-image-picker';

import image from '../assets/images/car.png';

// create a component
const CarForm = props => {
  const windowHeight = useWindowDimensions().height;
  const [regNo, setRegNo] = useState('TT-5951');
  const [img, setImg] = useState(image);
  const [details, setDetails] = useState('ASASAS');

  const [fileUri, setFileUri] = useState('');

  useEffect(() => {
    if (props.btnTitle === 'Update') {
      const data = props.data;
      setRegNo(data.reg_no);
      setDetails(data.details);
      // console.log(regNo);
      // console.log(details);
    }
  });

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
        setFileUri(response.assets[0].uri);
      }
    });
  };

  const renderFileUri = () => {
    if (fileUri) {
      return (
        <Image
          style={{borderRadius: 10}}
          source={{uri: fileUri}}
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
            />
          )}
        </View>
        <View style={styles.img_container}>
          {/* <Center> */}
          {props.btnTitle == 'Update' ? (
            <Image
              style={{borderRadius: 10}}
              source={require('../assets/images/car.png')}
              alt="car"
              size="200"
              mb={3}
            />
          ) : (
            renderFileUri()
          )}
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
                // backgroundColor: 'brown',
                alignItems: 'flex-end',
              }}>
              <TouchableOpacity style={styles.btn_update}>
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
            <TouchableOpacity style={styles.btn}>
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

//make this component available to the app
export default CarForm;
