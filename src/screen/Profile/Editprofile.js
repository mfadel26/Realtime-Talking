import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, StatusBar, PermissionsAndroid, TouchableHighlight, ToastAndroid, ActivityIndicator } from 'react-native'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import IconAnt from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';
import { Header, Container, Button, Item, Input, Label, Form, Left, Right } from 'native-base';
import uuid from 'uuid/v4';
import { firebase } from '@react-native-firebase/storage';

export class Editprofile extends Component {
        constructor(props) {
        super(props)
        this.state = {
            displayName: '',
            email: '',
            password: '',
            photoURL: 'https://i.imgur.com/JFXyanO.png',
            imgSource: '',
            uid: ''
    }
}

    componentDidMount() {
        const { displayName, email, photoURL, uid } = auth().currentUser
        this.setState({ displayName, email, photoURL, uid })
    }

    goBack = () => {
        const { goBack } = this.props.navigation;
        goBack();
    }

    uploadImage = async () => {
        console.log(this.state)
        if (!this.state.imgSource) { return }
        this.setState({ loding: true })
        const ext = this.state.imgSource.path.split('.').pop();
        const filename = `${uuid()}.${ext}`;
        this.setState({ uploading: true });
        const dataRef = firebase.storage().ref(`userImages/${filename}`)
        dataRef.putFile(this.state.imgSource.path)
            .then(async () => {
                const url = await dataRef.getDownloadURL()
                await auth().currentUser.updateProfile({ displayName: this.state.displayName, photoURL: url })
                await database()
                    .ref('user/' + this.state.uid)
                    .update({ photo: url, name: this.state.displayName });

                this.goBack()
            })
    };

    selectImage = async () => {
        console.log('masuk')
        try {
            const Camera = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
            if (Camera === PermissionsAndroid.RESULTS.GRANTED) {
                ImagePicker.openPicker({
                    width: 200,
                    height: 200,
                    cropping: true
                }).then(image => {
                    console.log(image.path);
                    this.setState({ imgSource: image, photoURL: image.path })
                }).catch(eror => {
                    ToastAndroid.show('eror', Toast.length)
                });
            }
        } catch (error) {
            console.log(error)
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
            <>
                <Container style={{ backgroundColor: "#FFFFFF" }}>
                    <Header transparent>
                        <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
                        <Left>
                            <Text style={{ paddingHorizontal: 20, color: 'black', fontSize: 20, fontWeight: 'bold' }}>Edit</Text>
                        </Left>
                        <Right>
                        </Right>
                    </Header>
                    <View style={style.container}>
                        <View style={style.topContent}>
                            <TouchableOpacity style={style.AvatarContainer} onPress={this.selectImage}>
                                <Image style={style.Avatar} source={{ uri: this.state.photoURL }} />
                            </TouchableOpacity>
                        </View>
                        <View style={style.dataUser}>
                            <Form style={style.form}>
                                <Item style={{ marginBottom: 9 }}>
                                    <Label >Full Name :</Label>
                                    <Input style={{ marginTop: 4 }} onChangeText={displayName => this.setState({ displayName })} value={this.state.displayName} />
                                </Item>
                            </Form>
                            <View style={{ flexDirection: 'row', marginLeft: 15 }}>
                                <Button style={style.btnLogin} onPress={this.uploadImage}>
                                    <Text style={{ color: 'black', fontFamily: 'Roboto-Bold' }}>Submits</Text>
                                </Button>
                            </View>
                            <View style={{ flexDirection: 'row', marginLeft: 15, marginBottom: 10, paddingTop: 20, }}>
                                <Button style={style.btnLogin} onPress={this.goBack}>
                                    <Text style={{ color: 'black', fontFamily: 'Roboto-Bold' }}>Backs</Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                </Container>
            </>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    btnLogin: {
        width: 200,
        height: 50,
        backgroundColor: "yellow",
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Avatar: {
        width: null,
        height: null,
        resizeMode: "cover",
        flex: 1,
        borderRadius: 110
    },
    topContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    AvatarContainer: {
        width: 150,
        height: 150,
    },
    dataUser: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    form: {
        width: '80%',
        marginBottom: 50,
    },
    Header: {
        backgroundColor: "#FFFFFF",
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 20
    },
    HeaderText: {
        color: "red",
        fontFamily: 'Roboto-Bold',
        fontSize: 20
    },
    Icon: {
        marginRight: 20
    },

})

export default Editprofile