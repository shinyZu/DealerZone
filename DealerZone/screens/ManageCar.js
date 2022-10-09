import React, {Component, useEffect, useState} from 'react';
import {useWindowDimensions, StyleSheet, View} from 'react-native';
import {NativeBaseProvider} from 'native-base';
import CarForm from '../components/CarForm';

const ManageCar = ({navigation, route}) => {
  const windowHeight = useWindowDimensions().height;
  const [data, setData] = useState(null);

  useEffect(() => {
    if (route.params) {
      setData(route.params.obj);
    }
  });
  return (
    <NativeBaseProvider>
      <View style={[{minHeight: Math.round(windowHeight)}]}>
        <CarForm btnTitle="Update" data={data ? data : null} />
      </View>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#2c3e50',
  },
});

export default ManageCar;
