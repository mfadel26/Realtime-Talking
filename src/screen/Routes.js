import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import AppNavigator from '../../src/components/AppNavigator';
import Profile from './Profile/Profile';
import Chati from './Chati/Chati';
import Home from '../screen/Home/Home';
import Login from './Login/Login';
import Register from './Register/Register';
import Loading from '../components/Loading/Loading';
import Maps from '../components/Maps/Maps';
import Chat from '../components/Chat/Chat';
import Editprofile from '../screen/Profile/Editprofile'
const stackApp = createStackNavigator({
    
    home: {
        screen: Home,
        navigationOptions: {
            header: null
        }
    },
    chat: {
        screen: Chat,
        navigationOptions: {
            header: null
        }
    },
    chati: {
        screen: Chati,
        navigationOptions: {
            header: null
        }
    },
    maps: {
        screen: Maps,
        navigationOptions: {
            header: null
        }
    },
    edit: {
        screen: Editprofile,
        navigationOptions: {
            header: null
        }
    },
    profile: {
        screen: Profile,
        navigationOptions: {
            header: null
        }
    },
    navi: {
        screen: AppNavigator,
        navigationOptions: {
            header: null
        }
    }

}, {
    initialRouteName: 'navi',
    headerMode: 'none'
})
const AuthStack = createStackNavigator({

    login: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    },
    regis: {
        screen: Register,
        navigationOptions: {
            header: null
        }
    },
}, {
    initialRouteName: 'login'
})

const Routes = createAppContainer(createSwitchNavigator({
   
    Auth: {
        screen: AuthStack
    },
    App: {
        screen: stackApp
    },
    LoadScreen: {
    screen: Loading

},

}, {initialRouteName: 'LoadScreen'}))

export default Routes