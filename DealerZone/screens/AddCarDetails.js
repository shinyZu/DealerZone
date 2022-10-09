//import liraries
import React, {Component, useState} from 'react';
import {NativeBaseProvider} from 'native-base';
import {useWindowDimensions, StyleSheet, View} from 'react-native';

import CarForm from '../components/CarForm';

// create a component
const AddCarDetails = ({navigation, route}) => {
  const windowHeight = useWindowDimensions().height;
  return (
    <NativeBaseProvider>
      {/* <View style={styles.container}> */}
      <View style={[{minHeight: Math.round(windowHeight)}]}>
        <CarForm btnTitle="Save Car" data={null} userId={route.params.userId} />
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
});

//make this component available to the app
export default AddCarDetails;
