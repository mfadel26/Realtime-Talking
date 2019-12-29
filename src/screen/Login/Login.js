import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, StatusBar,ToastAndroid,ActivityIndicator,TouchableHighlight } from "react-native";
import { firebase } from '@react-native-firebase/auth';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-community/google-signin';
  import database from '@react-native-firebase/database'
export class Login extends Component {
    constructor(props) {
        super(props)
      
        this.state = {
            email: '',
            password: '',
            visible: false,
            errorMessage: null,
            Onprosess: false
        }
        this.regis = this.regis.bind(this);
        this.loginSubmit = this.loginSubmit.bind(this)
      }  
      regis() {
        this.props.navigation.navigate('regis')
      }

      hideToast = () => {
        this.setState({
            visible: false,
        });
    };



    loginSubmit = () => {
        this.setState({ Onprosess: true })
        const { email, password } = this.state
        if (!email || !password) {
            this.setState({
                errorMessage: "Email Or Password isEmpty",
                visible: true
            }, () => {
                this.hideToast()
            })
            return
        }
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(res => {
                this.setState({ Onprosess: false })
            })
            .catch(err => {
                this.setState({
                    errorMessage: err.message,
                    visible: true
                }, () => this.hideToast())
            })
    }

    loginGoole = async () => {
        this.setState({ Onprosess: true })
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const { idToken, accessToken } = userInfo
            const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken)
            await firebase.auth().signInWithCredential(credential)
                .then(res => {
                    const data = database().ref(`/user/${res.user.uid}`)
                    if (data) {
                        database().ref('/user/' + res.user.uid)
                            .update({
                                name: userInfo.user.name,
                                status: 'Online',
                                email: userInfo.user.email,
                                photo: userInfo.user.photo,
                                latitude: this.state.latitude || null,
                                longitude: this.state.longitude || null,
                                id: res.user.uid,
                            })
                    } else {
                        database().ref('/user/' + res.user.uid)
                            .set({
                                name: userInfo.user.name,
                                status: 'Online',
                                email: userInfo.user.email,
                                photo: userInfo.user.photo,
                                latitude: this.state.latitude || null,
                                longitude: this.state.longitude || null,
                                id: res.user.uid,
                            })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            this.setState({ Onprosess: false })

        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                this.setState({ Onprosess: false })
                return
            } else if (error.code === statusCodes.IN_PROGRESS) {
                this.setState({
                    errorMessage: "In Progress..",
                    visible: true,
                    Onprosess: false
                }, () => this.hideToast())
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                this.setState({
                    errorMessage: "Please Install Google Play Services",
                    visible: true,
                    Onprosess: false
                }, () => this.hideToast())
            } else {
                this.setState({
                    errorMessage: error.code || error.message,
                    visible: true,
                    Onprosess: false
                }, () => this.hideToast())
            }
        }


    }

    render() {
        if (this.state.loding) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#eeeeee" barStyle="dark-content"></StatusBar>
                <View >
                    <Image source={require('../../../Global/Asset/Image/sample.png')} style={styles.avatar} />
                </View>
                <View style={styles.form}>
                <Toast visible={this.state.visible} message={this.state.errorMessage}/>
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
                            onChangeText={password => this.setState({ password })}
                            style={styles.input}
                            secureTextEntry
                            autoCapitalize="none">
                        </TextInput>
                    </View>
                </View>
                <TouchableHighlight style={styles.button} onPress={this.loginSubmit}>
                    <Text style={{ color: "black", fontWeight: "500" }}>Log In</Text>
                </TouchableHighlight>
                <View style={{ alignItems: "center",justifyContent: "center", marginBottom:10,marginTop:10}}>
                </View>
             <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <GoogleSigninButton
              style={{height: 52, width: '90%',borderRadius:40,}}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.light}
              onPress={this.loginGoole}
              disabled={this.state.isSigninInProgress}
            />
          </View>
                <TouchableOpacity 
                    style={{ alignSelf: "center", marginTop: 32 }} onPress={this.regis}>
                    <Text style={{ color: "#414959", fontSize: 13 }}>
                    Don't have an account? <Text style={{ fontWeight: "500", color: "blue" }}>Sign Up</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    webClientId:
      '561010878659-2rvliv7rqupqdf6eip9uus5tajnmbvum.apps.googleusercontent.com',
  });
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
        marginTop: 50,
        justifyContent: "center",
        marginHorizontal: 60
    },
    Icon: {
        height: 30,
        width: 30,
        marginRight: 10
    },
    error: {
        color: "#E9446A",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center"
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
        marginHorizontal: 20,
        backgroundColor: '#FEE100',
        borderRadius: 10,
        height: 40,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default Login