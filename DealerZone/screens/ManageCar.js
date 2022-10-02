//import liraries
import React, {Component, useEffect, useState} from 'react';
import {useWindowDimensions, StyleSheet, View} from 'react-native';
import {NativeBaseProvider} from 'native-base';
import CarForm from '../components/CarForm';

// create a component
const ManageCar = ({navigation, route}) => {
  const windowHeight = useWindowDimensions().height;
  //   console.log(route.params);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (route.params != undefined) {
      setData(route.params.obj);
    }
  });
  return (
    <NativeBaseProvider>
      <View style={[{minHeight: Math.round(windowHeight)}]}>
        <CarForm btnTitle="Update" data={data} />
      </View>
    </NativeBaseProvider>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default ManageCar;
