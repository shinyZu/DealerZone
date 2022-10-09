//import liraries
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {NativeBaseProvider, Center, Image} from 'native-base';

import image from '../assets/images/car.png';
import LinearGradient from 'react-native-linear-gradient';
import CarService from '../services/CarService';

// create a component
const Cars = ({navigation}) => {
  const [img, setImg] = useState(image);
  const [vehicles, setVehicles] = useState([
    {reg_no: 'PB-5951', brand: 'Suzuki', details: 'asassasasasas'},
    {reg_no: 'PB-5952', brand: 'Toyota', details: 'asassasasasas'},
    {reg_no: 'PB-5953', brand: 'Suzuki', details: 'asassasasasas'},
    {reg_no: 'PB-5954', brand: 'Toyota', details: 'asassasasasas'},
  ]);

  const [carList, setCarList] = useState([]);
  const [brand, setBrand] = useState('');

  useEffect(() => {
    console.log('Carssss');
    getAllCars();
  }, []);

  const getAllCars = async () => {
    let res = await CarService.getAll();
    if (res.status === 200) {
      try {
        console.log('---------res.data---------');
        console.log(res.data);
        if (res.data.length != 0) {
          setCarList(res.data);
          setBrand(
            res.data[0].details
              .split('color:')[0]
              .split('brand:')[1]
              .split(',')[0],
          );
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error(res.response.data.message);
    }
  };

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <FlatList
          data={carList}
          renderItem={({item}) => (
            <TouchableOpacity
              style={{
                borderRadius: 10,
                marginBottom: '5%',
                padding: 3,
                // borderWidth: 1,
                // backgroundColor: '#2c3e50',
                // shadowColor: 'rgb(0, 0, 0)',
                // shadowColor: '#fff',
                // shadowOffset: {
                //   width: 15,
                //   height: 15,
                // },
                // shadowOpacity: 0.8,
                // shadowRadius: 15,
                elevation: 8,
              }}
              onPress={() => {
                console.log('===================item=================');
                console.log(item);
                console.log('====================================');
                navigation.navigate('Manage', {obj: item});
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
                      source={img}
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

                  <Text style={styles.card_brand}>{brand}</Text>
                </View>
              </View>
              {/* </LinearGradient> */}
            </TouchableOpacity>
          )}
        />
      </View>
    </NativeBaseProvider>
  );
};

// define your styles
const styles = StyleSheet.create({
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
