import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    ToastAndroid,
    
} from 'react-native'
import {
    Header,
    Content,
    Item,
    Button,
    Icon,
    Container,
    Left,
    Right,
    Fab,
    Body
} from 'native-base';
import IconHe from 'react-native-vector-icons/AntDesign';
import Iconaa from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/FontAwesome5';
import auth from "@react-native-firebase/auth"
import database from '@react-native-firebase/database';

export class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            avatar: 'https://i.imgur.com/JFXyanO.png',
            uid: ''
        }

    }

    edit = () => {
        this.props.navigation.navigate('edit')
    }

    componentDidMount() {
        const { displayName, email, photoURL, uid } = auth().currentUser
        this.setState({ name: displayName, email, avatar: photoURL, uid })
    }


    signOutUser = async () => {
        console.log(this.state)
        try {
            database()
                .ref('user/' + this.state.uid)
                .update({ status: 'Offline' });
            auth().signOut();
            ToastAndroid.show('Logout success', ToastAndroid.SHORT);
        } catch (error) {
            this.setState({ errorMessage: error.message })
            ToastAndroid.show('Logout error', ToastAndroid.SHORT);
        }

    };

    render() {
        return (
            <>
                <Container style={{ backgroundColor: "#FFFFFF" }}>
                    <Header transparent>
                        <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
                        <Left> 
                          <Text style={{ paddingHorizontal: 20, color: 'black', fontSize: 20, fontWeight: 'bold' }}>Profile</Text>
                        </Left>
                        <Right>
                    </Right>
                    </Header>
                    <View >
                        <Image source={{ uri: this.state.avatar }} style={styles.avatar} />
                    </View>
                    <TouchableOpacity style={{ marginTop: 300, marginLeft: 29, flexDirection: 'row' }}>
                        <Icons name="user" size={15} style={{ width: 20, height: 20, color: "black" }} />
                        <Text style={{ fontSize: 16, marginLeft: 6 }}> Nama </Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', marginLeft: 50 }}>
                        <Text style={{ color: '#888' }}> {this.state.name} </Text>
                    </View>
                    <TouchableOpacity style={{ marginTop: 40, marginLeft: 29, flexDirection: 'row' }}>
                        <Iconaa name="email-box" size={20} style={{ width: 20, height: 20, color: "black" }} />
                        <Text style={{ fontSize: 16, marginLeft: 6 }}> Email</Text>
                        
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', marginLeft: 50 }}>
                        <Text style={{ color: '#888' }}> {this.state.email} </Text>
                    </View>
                    <View style={{ paddingHorizontal: 30, paddingVertical: 60, position: 'absolute', right: 0 }}>
                        <Fab
                            active={this.state.active}
                            direction="down"
                            containerStyle={{}}
                            style={{ backgroundColor: "#FFFFFF" }}
                            onPress={() => this.setState({ active: !this.state.active })}>
                            <Icon name="more" style={{ color: "black", }} />
                            <Button style={{ backgroundColor: '#FFFFFF', }} onPress={this.edit}>
                                <Iconaa name="pencil" size={20} />
                            </Button>
                            <Button style={{ backgroundColor: '#EA4335', }} onPress={this.signOutUser}>
                                <IconHe name="logout" color={"white"} />
                            </Button>
                            
                        </Fab>
                    </View>
                </Container>
            </>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#eeeeee"
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 120,
        borderWidth: 1,
        borderColor: "black",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 20,
    },
    shado: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2
    }

});
export default Profile
