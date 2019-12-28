import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, StatusBar ,
    ToastAndroid,
    Platform,
    PermissionsAndroid, } from "react-native";
import {firebase}from "@react-native-firebase/auth"
import Geolocation from 'react-native-geolocation-service';
import database from '@react-native-firebase/database';

export class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isVisible: false,
            latitude: '',
            longitude: '',
            name: '',
            email: '',
            password: '',
            errorMessage: null,
            visible: false,
            avatar: 'https://i.imgur.com/JFXyanO.png',
            
        }
        this.Login = this.Login.bind(this);
        this.submitRegis = this.submitRegis.bind(this);
      }
      Login() {
        this.props.navigation.navigate('login')
      }

      async componentDidMount() {
        try {
            const Location = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
            const Storage = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
            if (Location === PermissionsAndroid.RESULTS.GRANTED) {
                Geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords
                        this.setState({ latitude, longitude })
                    },
                    (error) => {
                        this.setState({
                            errorMessage: "Check youre GPS",
                            visible: true
                        }, () => {
                            this.hideToast()
                        })
                        return
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                );
            } else {
                this.setState({
                    errorMessage: "location denied",
                    visible: true
                }, () => {
                    this.hideToast()
                })
                return
            }

        } catch (error) {
            this.setState({
                errorMessage: "SomeThing Worng",
                visible: true
            }, () => {
                this.hideToast()
            })
        }
    }

    hideToast = () => {
        this.setState({
            visible: false,
        });
    };

    submitRegis() {
        const { name, email, password } = this.state
        const ImageUser = this.state.avatar

        if (!name || !email || !password) {
            this.setState({
                errorMessage: "name, email and password isEmpty",
                visible: true
            }, () => {
                this.hideToast()
            })
            return
        }
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(res => {
                console.log(res)
                database().ref('/user/' + res.user.uid)
                    .set({
                        name: this.state.name,
                        status: 'Online',
                        email: this.state.email,
                        photo: ImageUser,
                        latitude: this.state.latitude || null,
                        longitude: this.state.longitude || null,
                        id: res.user.uid,
                    })
                res.user.updateProfile({
                    displayName: this.state.name,
                    photoURL: ImageUser
                })
                firebase.auth().onAuthStateChanged(user => {
                    this.props.navigation.navigate(user ? 'LoadScreen' : 'Auth')
                })
            })
            .catch(err => {
                this.setState({
                    errorMessage: err.message,
                    visible: true
                }, () => {
                    this.hideToast()
                })
            })
    }

    render() {
        return (
            <View style={styles.container}>
            <StatusBar backgroundColor="#eeeeee" barStyle="dark-content"></StatusBar>
            <View >
                <Image source={require('../../../Global/Asset/Image/sample.png')} style={styles.avatar} />
            </View>
            <View style={styles.form }>
            <Toast visible={this.state.visible} message={this.state.errorMessage}/>
                <View>
                    <Text style={styles.inputTitle}>Your Name</Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none" onChangeText={name => this.setState({ name })} >
                    </TextInput>
                </View>
                <View>
                    <Text style={styles.inputTitle}>Email Address</Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none" onChangeText={email => this.setState({ email })} >
                    </TextInput>
                </View>
                <View style={{ marginTop: 32 }}>
                    <Text style={styles.inputTitle}>Password</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                        autoCapitalize="none" onChangeText={password => this.setState({ password })}>
                    </TextInput>
                </View>
            </View>
            <TouchableOpacity style={styles.button}  onPress={this.submitRegis}>
                <Text style={{ color: "black", fontWeight: "500" }}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{ alignSelf: "center", marginTop: 32 }} onPress={this.Login}>
                <Text style={{ color: "#414959", fontSize: 13 }}>
                Have an account? <Text style={{ fontWeight: "500", color: "blue" }}>Log In</Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
}
}
const Toast = (props) => {
  if (props.visible) {
      ToastAndroid.showWithGravityAndOffset(
          props.message,
          ToastAndroid.LONG,
          ToastAndroid.TOP,
          1,
          800,
      );
      return null;
  }
  return null;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#eeeeee"
    },
    avatar: {
        width: 250,
        height: 250,
        resizeMode: "stretch",
        alignSelf: 'center',
        marginTop: 90,
        justifyContent: "center",
        marginHorizontal: 60
    },
    error: {
        color: "#E9446A",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center"
    },
    Icon: {
        height: 30,
        width: 30,
        marginRight: 10
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30
    },
    inputTitle: {
        color: "#8A8F9E",
        fontSize: 10,
        textTransform: "uppercase"
    },
    input: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F3D"
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: '#FEE100',
        borderRadius: 110,
        height: 40,
        alignItems: "center",
        justifyContent: "center"
    }
});
export default Register