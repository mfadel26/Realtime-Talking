import React, { Component } from 'react'
import { Image, View, StyleSheet,TouchableHighlight,StatusBar,FlatList, ToastAndroid, TouchableOpacity } from 'react-native'
import { Container, Header, Left, Text,Item, Body, Right, Button, Icon, Title,Input, Fab  } from 'native-base';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconA from 'react-native-vector-icons/AntDesign';
import {firebase} from  "@react-native-firebase/auth"
import database from '@react-native-firebase/database';
import Material from 'react-native-vector-icons/MaterialCommunityIcons'

export class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      userList: [],
      refreshing: false,
      uid: '',
      id:'',
      email: '',
      displayName: '',
      active: false,
    }  
    this.Login = this.Login.bind(this);
    this.friends =this.friends.bind(this);
  }
  friends() {
    this.props.navigation.navigate('friends')
  }
  Login() {
    this.props.navigation.navigate('login')
  }

  componentDidMount(){
    const {email, displayName, uid} = firebase.auth().currentUser;
    this.setState({email, displayName, uid: uid});
    this.getDataUser(uid)
    console.log(uid)
  }

  async getDataUser(uid) {
    this.setState({uid: uid, refreshing: true});
    await database().ref('/user').on('child_added', data => {
      let person = data.val();
      if (person.id !== uid) {
        this.setState(prevData => {
          return {userList: [...prevData.userList, person]};
        });
        this.setState({
          refreshing: false,
          isLoading: false,
        });
      }
    });
  }

  signOutUser = async () => {
    try {
      database()
        .ref('user/' + this.state.uid)
        .update({status: 'Offline'});
      await AsyncStorage.clear();
      firebase.auth().signOut();
      ToastAndroid.show('Logout success', ToastAndroid.SHORT);
    } catch (error) {
      this.setState({errorMessage: error.message})
      ToastAndroid.show('Logout error', ToastAndroid.SHORT);
    }  
  };
  
  render() {
    console.log(this.state.userList)
    return (
    <>
      <Container style={{ backgroundColor: "#FFFFFF" }}>
      <Header transparent>
         <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content"/>
         <Left>
         <View >
           <Image source={require('../../../Global/Asset/Image/sample.png')} style={style.avatar} />
            </View>
         </Left>
          <Right/> 
        </Header>
        <View style={style.container}>
        <FlatList
          style={{flex:1}}
          data={this.state.userList}
          renderItem={({ item }) => 
            <TouchableOpacity onPress={() => this.props.navigation.navigate('chat', {item})}>      
            <View style={style.listItem}>
              <TouchableOpacity>
                <Image source={{uri: item.photo}} style={style.pic} />
              </TouchableOpacity>
             
              <View style={{flex:8, marginLeft:10,}}>
                <Text style={{fontWeight:"bold", fontSize:18, color:'black'}}>{item.name}</Text>
                <Text style={style.email}>{item.email}</Text>
              </View>
              <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                
                {item.status == 'Online' ? (
                  <Material name='circle-slice-8' size={20} color='#13e82f' />
                ) : (
                  <Material name='circle-slice-8' size={20} color='#ff1100' />
                )}
                
              </View>
            </View>
            </TouchableOpacity>
            
          }
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      </Container>
      </>
    )
  }
}
const style = StyleSheet.create({

  avatar: {
    width: 100,
    height: 100,
    resizeMode: "stretch",
    marginTop: 15,
    marginHorizontal:3
  },
  iconTogle: {
    display: 'none'
  },
  bottomContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
  img: {
      width: null,
      height: null,
      flex: 1,
      resizeMode: "contain"
  },
  imgContainer: {
      width: 400,
      height: 80,
      justifyContent: 'center',
  },
  btnLogin: {
      width: 300,
      backgroundColor: 'white',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center'
  },
  btnLogin2: {
      width: 200,
      backgroundColor: "red",
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20
  },
  Text2: {
      color: "black",
      fontFamily: 'Roboto-Bold'
  },
  container: {
    paddingVertical :30,
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop:0,
  },
  listItem:{
    padding:10,
    backgroundColor:"#FFFFFF",
    width:"100%",
    flex:1,
    borderBottomWidth: 1,
    borderColor: '#FFFFFF',
    alignSelf:"center",
    flexDirection:"row", 
  },
  divider: {
    marginVertical: 5,
    width: "99%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },
  fieldRow: {
    width:'100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#DCDCDC',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    padding: 10,
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 18,
    width: 170,
  },
  status: {
    fontWeight: '200',
    color: '#ccc',
    fontSize: 13,
  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  statusol: {
    fontWeight: '400',
    color: 'green',
    fontSize: 12,
    marginLeft: 15,
  },
  email: {
    fontWeight: '400',
    color: '#bbb',
    fontSize: 12,
  },
})
export default Home
