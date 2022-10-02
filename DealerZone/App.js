//import liraries
import React, {Component, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {View, Text, StyleSheet} from 'react-native';
// import {AddIcon, AntDesign} from 'native-base';
// import Icon from 'react-native-vector-icons/Ionicons';

// imports all screens
import Login from './screens/Login';
import Home from './screens/Home';
import AddCarDetails from './screens/AddCarDetails';
import Cars from './screens/Cars';
import ManageCar from './screens/ManageCar';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

// Icon.loadFont();
const HomeTabs = ({navigation}) => {
  return (
    <Tab.Navigator
      // headderMode="float"
      screenOptions={{
        tabBarLabelStyle: {color: '#fff', fontSize: 9},
        tabBarStyle: {backgroundColor: '#6D214F'},
        tabBarIndicatorStyle: {
          backgroundColor: '#f8a5c2',
        },
        // tabBarShowIcon: true,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        // options={{tabBarLabel: 'Home'}}
        // options={{
        //   tabBarIcon: () => {
        //     <Icon name="add-circle-outline" color="#fff" />;
        //   },
        // }}
      />
      <Tab.Screen
        name="Add"
        component={AddCarDetails}
        // options={{
        // tabBarShowIcon: true,
        // tabBarIcon: ({tintColor}) => (
        //   <Icon name="down" /* size={30} */ color="#fff" />
        // ),
        // }}
      />
      <Tab.Screen name="Cars" component={Cars} />
      <Tab.Screen name="Manage" component={ManageCar} />
      <Tab.Screen
        name="Logout"
        component={Login}
        listeners={{
          tabPress: e => {
            // Prevent default action
            e.preventDefault();
            navigation.navigate('Login');
          },
        }}
      />
    </Tab.Navigator>
  );
};

// create a component
const App = ({navigation}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headderMode="float"
        screenOptions={{
          title: "Welcome To Dealer's Zone",
          headerStyle: {backgroundColor: '#B53471'},
          headerTintColor: '#fff',
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="HomeScreen" component={HomeTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//make this component available to the app
export default App;
