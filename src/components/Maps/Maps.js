import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ToastAndroid,
  Platform,
  PermissionsAndroid,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import MapView, {Marker , PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import styles from '../../../Global/styles/styles'
import database from '@react-native-firebase/database';
import SafeAreaView from 'react-native-safe-area-view';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export class Maps extends Component {

  state = {
    initial: 'state',
    mapRegion: null,
    latitude: 0,
    longitude: 0,
    userList: [],
    uid: null,
  };

  componentDidMount = async () => {
    await this.getDataUser();
    await this.getLocation();
  };

  async getDataUser(uid) {
    this.setState({uid: uid, refreshing: true});
    await database().ref('/user').on('child_added', data => {
      let person = data.val();
      console.log('ui',person)
      if (person.id !== uid) {
        this.setState(prevData => {
          return {userList: [...prevData.userList, person]};
        console.log(prevData)
        });

        this.setState({
          refreshing: false,
          isLoading: false,
        });
      }
    });
  }

  hasLocationPermission = async () => {
    if (
      Platform.OS === 'ios' ||
      (Platform.OS === 'android' && Platform.Version < 23)
    ) {
      return true;
    }
    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (hasPermission) {
      return true;
    }
    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }
    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location Permission Denied By User.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location Permission Revoked By User.',
        ToastAndroid.LONG,
      );
    }
    return false;
  };

  getLocation = async () => {
    const hasLocationPermission = await this.hasLocationPermission();

    if (!hasLocationPermission) {
      return;
    }

    this.setState({loading: true}, () => {
      Geolocation.getCurrentPosition(
        position => {
          let region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00421 * 1.5,
          };
          this.setState({
            mapRegion: region,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            loading: false,
          });
        },
        error => {
          this.setState({errorMessage: error});
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
          distanceFilter: 50,
          forceRequestLocation: true,
        },
      );
    });
  };

  render() {
    // console.warn(this.state.userList);
    return (
      <SafeAreaView style={{flex: 1}}>
        {/* <Header /> */}
        <View
          style={[
            styles.container,
            {
              justifyContent: 'flex-start',
              paddingHorizontal: 20,
              paddingTop: 20,
            },
          ]}>
          <MapView
            style={{width: '110%', height: '90%'}}
            showsMyLocationButton={true}
            provider={PROVIDER_GOOGLE}
            showsIndoorLevelPicker={true}
            showsUserLocation={true}
            zoomControlEnabled={true}
            showsCompass={true}
            showsTraffic={true}
            region={this.state.mapRegion}
            initialRegion={{
              latitude: -7.755322,
              longitude: 110.381174,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}>
            {this.state.userList.map(item => {
              return (
                <Marker
                  key={item.id}
                  title={item.name}
                  description={item.status}
                  draggable
                  coordinate={{
                    latitude: item.latitude || 0,
                    longitude: item.longitude || 0,
                  }}
                  onCalloutPress={() => {
                    this.props.navigation.navigate('Profile', {
                      item,
                    });
                  }}>
                  <View>
                    <Image
                      source={{uri: item.photo}}
                      style={{width: 40, height: 40, borderRadius: 50}} />
                    <Text>{item.name}</Text>
                  </View>
                </Marker>
              );
            })}
          </MapView>
          <View style={styles.menuBottom}>
            <TouchableOpacity>
              <Text
                style={styles.buttonText}
                onPress={() => this.getLocation()}>
                My Location
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
export default Maps