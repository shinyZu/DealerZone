import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {NativeBaseProvider, Center, Image} from 'native-base';

import image from '../assets/images/car.png';
import LinearGradient from 'react-native-linear-gradient';
import CarService from '../services/CarService';
import home_bg from '../assets/images/black_car2.jpg';

const Cars = ({navigation, route}) => {
  const [carList, setCarList] = useState([]);
  const [imgUri, setImgUri] = useState(
    'https://letusstudy.in/clientside/images/no-image.png',
  );
  const baseURL = 'http://192.168.1.3:4000/dealer_zone/api/v1/car/file/';

  useEffect(() => {
    // if (route.params) {
    //   console.log('====================================');
    //   console.log(route);
    //   console.log(route.params.userId);
    //   console.log('====================================');
    // }
    getAllCars();
    // loadImage();
  });

  const getAllCars = async () => {
    let res = await CarService.getAllByUser(route.params.userId);
    if (res.status === 200) {
      try {
        if (res.data.length != 0) {
          console.log(res.data);
          setCarList(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error(res.response.data.message);
    }
  };

  const getCarImage = async filename => {
    let res = await CarService.getCarImage(filename);
    if (res.status === 200) {
      try {
        // console.log(res);
        setImg(res);
      } catch (error) {}
    } else {
      console.error(res.response.data.message);
    }
  };

  return (
    <NativeBaseProvider>
      {/* <ImageBackground source={home_bg} resizeMode="cover" style={styles.image}> */}
      <View style={styles.container}>
        <FlatList
          data={carList}
          renderItem={({item}) => (
            <TouchableOpacity
              style={{
                borderRadius: 12,
                borderColor: 'black',
                marginBottom: '3%',
                padding: 3,
                // borderWidth: 1,
                // backgroundColor: '#2c3e50',
                // shadowColor: 'rgb(0, 0, 0)',
                // shadowColor: 'black',
                // shadowOffset: {
                //   width: 15,
                //   height: 15,
                // },
                shadowOpacity: 0,
                shadowRadius: 15,
                elevation: 5,
              }}
              onPress={() => {
                // console.log(item);
                navigation.navigate('Manage', {
                  obj: {item: item, userId: route.params.userId},
                });
              }}>
              {/* <LinearGradient
                colors={['#2c3e50', '#34495e', '#2c3e50']}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 0.3}}
                style={{borderRadius: 10}}
              > */}
              <View style={styles.card_container}>
                <View style={styles.card_img}>
                  <Center>
                    <Image
                      style={{borderRadius: 10}}
                      source={
                        item.image == 'null'
                          ? {
                              uri: 'https://letusstudy.in/clientside/images/no-image.png',
                            }
                          : {
                              uri: baseURL + item.image.split('file/')[1],
                            }
                      }
                      alt="car"
                      size="lg"
                      mt={3}
                    />
                  </Center>
                </View>

                <View style={styles.text_container}>
                  <View style={styles.card_title}>
                    <Text
                      style={{
                        marginBottom: 10,
                        fontWeight: 'bold',
                        color: '#fff',
                        fontSize: 20,
                      }}>
                      {item.reg_no}
                    </Text>
                  </View>

                  <Text style={styles.card_brand}>
                    {/* {item.details.split('brand:')[1].split(',')[0].trim()} */}
                    {item.brand}
                  </Text>
                </View>
              </View>
              {/* </LinearGradient> */}
            </TouchableOpacity>
          )}
        />
      </View>
      {/* </ImageBackground> */}
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
    // opacity: 0.8,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#1e272e',
  },
  card_container: {
    flexDirection: 'row',
    padding: 8,
  },
  card_img: {
    // backgroundColor: 'pink',
    marginRight: 20,
  },
  text_container: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  card_title: {
    // backgroundColor: 'red',
  },
  card_brand: {
    // backgroundColor: 'green',
    color: '#d2dae2',
  },
});

//make this component available to the app
export default Cars;
