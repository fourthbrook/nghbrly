import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Splash from '../Splash/Splash';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Home from '../Home/Home';
import Profile from '../Profile/Profile';
import Settings from '../Settings/Settings';
import Reset from '../Reset/Reset';

const ScreenManager = createStackNavigator({
    Splash: {
        screen: Splash
    },
    Login: {
        screen: Login
    },
    Register: {
        screen: Register
    },
    Home: {
        screen: Home
    },
    
    Profile: {
        screen: Profile
    },
    Settings: {
        screen: Settings
    },
    Reset: {
        screen: Reset
    },

}, {headerMode: 'none'});

export default createAppContainer(ScreenManager);