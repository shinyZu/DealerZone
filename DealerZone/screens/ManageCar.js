//import liraries
import React, {Component} from 'react';
import {useWindowDimensions, StyleSheet, View} from 'react-native';
import {NativeBaseProvider} from 'native-base';
import CarForm from '../components/CarForm';

// create a component
const ManageCar = ({navigation, route}) => {
  const windowHeight = useWindowDimensions().height;
  return (
    <NativeBaseProvider>
      <View style={[{minHeight: Math.round(windowHeight)}]}>
        <CarForm btnTitle="Update" /*  data={route.params.obj} */ />
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
