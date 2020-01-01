import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import React from 'react';

import Feather from 'react-native-vector-icons/Feather';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Home from '../../src/screen/Home/Home';
import Friends from '../../src/screen/Friends/Friends';
import Profile from '../../src/screen/Profile/Profile';
import Maps from '../components/Maps/Maps'

const Navigator = createMaterialTopTabNavigator({

    home: {
        screen: Home,
        navigationOptions: () => ({
            tabBarLabel: 'Chat',
            tabBarIcon: ({ tintColor }) => (
                <IconFontisto name='hipchat' color={tintColor} size={20} />
            )
        })
    },
    friends: {
        screen: Friends,
        navigationOptions: () => ({
            tabBarLabel: 'Friends',
            tabBarIcon: ({ tintColor }) => (
                <Feather name='user-plus' color={tintColor} size={20} />
            )
        })
    },
    maps: {
        screen: Maps,
        navigationOptions: () => ({
            tabBarLabel: 'Location',
            tabBarIcon: ({ tintColor }) => (
                <Feather name='map-pin' color={tintColor} size={20} />
            )
        })
    },
   profile: {
        screen: Profile,
        navigationOptions: () => ({
            tabBarLabel: 'Profile',
            tabBarIcon: ({ tintColor }) => (
                <IconFontAwesome5 name='user-circle' color={tintColor} size={20} />
            )

        })
    },
}, {
    initialRouteName: 'home',
    tabBarOptions: {
        pressColor: '#D8D8D8',
        labelStyle: {
            margin: 0,
            fontSize: 8,
        },
        iconStyle: {
            margin: 0,
            alignItems: 'center'
        },
        tabStyle: {
            margin: 0,
        },

        activeTintColor: 'black',
        inactiveTintColor: 'black',
        showIcon: true,
        style: { backgroundColor: '#eeeeee', height: 50, },
        indicatorStyle: {
            backgroundColor: 'black',
        }
    },
    tabBarPosition: 'bottom'
})


const AppNavigator = createAppContainer(Navigator)

export default AppNavigator