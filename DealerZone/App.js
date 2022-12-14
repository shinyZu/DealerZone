//import liraries
import React, {Component, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// imports all screens
import Login from './screens/Login';
import Home from './screens/Home';
import AddCarDetails from './screens/AddCarDetails';
import Cars from './screens/Cars';
import ManageCar from './screens/ManageCar';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const HomeTabs = ({navigation, route}) => {
  // useEffect(() => {
  //   if (route.params) {
  //     console.log('====================================');
  //     console.log(route);
  //     console.log(route.params.obj);
  //     console.log('====================================');
  //   }
  // });
  return (
    <Tab.Navigator
      // headderMode="float"
      screenOptions={{
        tabBarLabelStyle: {color: '#fff', fontSize: 9.5},
        tabBarStyle: {backgroundColor: '#576574'},
        tabBarIndicatorStyle: {
          backgroundColor: '#1abc9c',
        },
        // tabBarShowIcon: true,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => <Icon name={'home'} size={25} />,
        }}
      />
      <Tab.Screen
        name="Cars"
        component={Cars}
        initialParams={{userId: route.params.obj}}
        options={{
          swipeEnabled: false,
          tabBarIcon: () => <Icon name={'directions-car'} size={25} />,
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddCarDetails}
        initialParams={{userId: route.params.obj}}
        options={{
          swipeEnabled: false,
          tabBarIcon: () => <Icon name={'library-add'} size={25} />,
        }}
      />
      <Tab.Screen
        name="Manage"
        component={ManageCar}
        listeners={{
          tabPress: e => {
            e.preventDefault();
          },
        }}
        options={{
          swipeEnabled: false,
          tabBarIcon: () => <Icon name={'edit'} size={25} />,
        }}
      />
      <Tab.Screen
        name="Logout"
        component={Login}
        listeners={{
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('Login');
          },
        }}
        options={{
          swipeEnabled: false,
          tabBarIcon: () => <Icon name={'logout'} size={25} />,
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
          // headerStyle: {backgroundColor: '#B53471'},
          headerStyle: {backgroundColor: '#1e272e'},
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
    backgroundColor: '#1e272e',
  },
});

//make this component available to the app
export default App;
