//import liraries
import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {NativeBaseProvider, Center, Image} from 'native-base';

import image from '../assets/images/car.png';

// create a component
const Cars = ({navigation}) => {
  const [img, setImg] = useState(image);
  const [vehicles, setVehicles] = useState([
    {reg_no: 'PB-5951', brand: 'Suzuki', details: 'asassasasasas'},
    {reg_no: 'PB-5952', brand: 'Toyota', details: 'asassasasasas'},
    {reg_no: 'PB-5953', brand: 'Suzuki', details: 'asassasasasas'},
    {reg_no: 'PB-5954', brand: 'Toyota', details: 'asassasasasas'},
  ]);
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <FlatList
          data={vehicles}
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
                navigation.navigate('Manage', {obj: item});
              }}>
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

                  <Text style={styles.card_brand}>{item.brand}</Text>
                </View>
              </View>
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
