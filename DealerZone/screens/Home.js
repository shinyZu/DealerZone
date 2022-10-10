//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';

import home_bg from '../assets/images/black_car4.jpg';
// import home_bg from '../assets/images/black_car3.jpeg';
// import home_bg from '../assets/images/green_car1.png';
// import home_bg from '../assets/images/green_car2.jpg';

// create a component
const Dashboard = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={home_bg} resizeMode="cover" style={styles.image}>
        {/* <Text style={styles.text}>Deal Like Never Before....</Text> */}
      </ImageBackground>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 15,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 450,
    backgroundColor: '#3c3c3c8c',
  },
});

//make this component available to the app
export default Dashboard;
