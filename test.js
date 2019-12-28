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
    
    
        <TouchableHighlight onPress={this.selectImage}>
            <Image source={{ uri: this.state.photoURL }}  style={style.avatar} />
        </TouchableHighlight>
        <View style={style.dataUser}>
        <Form style={style.form}>
            <Item floatingLabel style={{ marginBottom: 10 }}>
                <Label >Full Name</Label>
                <Input style={{ marginTop: 10 }} onChangeText={displayName => this.setState({ displayName })} value={this.state.displayName} />
            </Item>
            <Item floatingLabel style={{ marginBottom: 10 }}>
                <Label >Email</Label>
                <Input style={{ marginTop: 10 }} onChangeText={email => this.setState({ email })} value={this.state.email} />
            </Item>
        </Form>
        <TouchableOpacity onPress={this.uploadImage}  style={style.btnLogin}>
            <Text style={{  fontFamily: 'Roboto-Bold' }} >save</Text>
        </TouchableOpacity>
    </View>
</Container>
</>