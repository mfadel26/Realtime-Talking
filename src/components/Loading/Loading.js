import React, { Component } from 'react'
import { View, StyleSheet, ActivityIndicator, Text,Image } from 'react-native'
import { firebase } from '@react-native-firebase/auth';

export class Loading extends Component {
    
    componentDidMount() {
        setTimeout(() => {
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'App' : 'Auth')
        }, 20000)
    })}

    render() {
        return (
            <>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:"#F8E900" }}>
                <Image source={require('../../../Global/Asset/Image/sample.png')} style={{ width: '100%', height: '200%', resizeMode: 'contain', }} />
            </View>
            </>
        )
    }
}



export default Loading