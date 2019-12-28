import React, { Component } from 'react'
import { Image, View, StyleSheet,TouchableHighlight,StatusBar,FlatList } from 'react-native'
import { Container, Header, Left, Text,Item, Body, Right, Button, Icon, Title,Input, Fab  } from 'native-base';

export class Chati extends Component {
    render() {
        return (
            <>
      <Container style={{ backgroundColor: "#eeeeee" }}>
      <Header transparent>
         <StatusBar backgroundColor="#eeeeee" barStyle="dark-content"/>
         <Left>
         <View >
           <Image source={require('../../../Global/Asset/Image/sample.png')} style={style.avatar} />
            </View>
         </Left>
          <Right>
          
            {/* <Item transparent style={{paddingVertical:20, paddingHorizontal: 25,width:150}}>
            <Input />
              <Icon name='search' style={{ color: 'black', }} />
              </Item> */}
              
          </Right>
        </Header>
           <View style={style.bottomContent}>
          
                 <Text style={style.Text2}>chat</Text>
        
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
    marginTop: 30,
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
  }
})
      

export default Chati
