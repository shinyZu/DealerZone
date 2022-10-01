//import liraries
import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Button, NativeBaseProvider} from 'native-base';

// create a component
const Login = ({navigation}) => {
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Text style={{color: 'black'}}>Login</Text>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            navigation.navigate('HomeScreen');
          }}>
          <Text style={{fontSize: 20}}>Login</Text>
        </TouchableOpacity>
        <Button size="sm" variant="outline" colorScheme="secondary">
          SECONDARY
        </Button>
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
  btn: {
    width: '60%',
    padding: 10,
    borderRadius: 10,
    // backgroundColor: '#16a085',
    backgroundColor: '#841584',
    alignItems: 'center',
  },
});

//make this component available to the app
export default Login;
