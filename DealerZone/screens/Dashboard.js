//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

// create a component
const Dashboard = ({navigation}) => {
  const logOut = () => {};
  return (
    <View style={styles.container}>
      <Text>Dashboard</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          navigation.navigate('Login');
        }}>
        <Text style={{fontSize: 20}}>Logout</Text>
      </TouchableOpacity>
    </View>
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
export default Dashboard;
