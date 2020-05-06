import React, { Component } from 'react';
import { 
    StyleSheet,
    View,
    Image,
    Text,
    Dimensions,
    TouchableHighlight
} from 'react-native';
import { StackActions } from 'react-navigation';
import auth from '@react-native-firebase/auth';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

export default function Profile({ navigation }) {

    const popAction = () => {
        navigation.dispatch(StackActions.pop(1));
    }

    const signOut = () => {
       auth().signOut();
       navigation.navigate('Login');
    }

    return(
        <View style={styles.container}>
            <View style={styles.topMenu}>
                <TouchableHighlight style={styles.back}
                    activeOpacity={0.6}
                    underlayColor="#1ABC9C"
                    onPress={popAction}
                >
                    <Image style={styles.back}
                        source={require('../../images/icons/back.png')}
                    />
                </TouchableHighlight>
            </View>
            <View style={styles.logo}>
                <Text style={styles.logoText}>
                    profile
                </Text>
            </View>
            <View style={styles.buttons}>
                
                <TouchableHighlight style={styles.button}
                    onPress={signOut}
                >
                    <Text style={styles.buttonText}>
                        Sign Out
                    </Text>
                </TouchableHighlight>
            </View>
        </View>
    )  
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#1ABC9C'
    },
    topMenu: {
        height: deviceHeight/10,
        marginLeft: deviceWidth/30,
        marginRight: deviceWidth/30,
        justifyContent: 'center'
    },
    back: {
        height: deviceHeight/15,
        width: deviceHeight/15,
    },
    logo: {
        height: 6*(deviceHeight/10),
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText: {
        color: 'white',
        fontStyle: 'italic',
        fontWeight: '700',
        fontSize: 60
    },
    buttons: {
        height: 3*(deviceHeight/10),
        paddingLeft: deviceWidth/20,
        paddingRight: deviceWidth/20,
        paddingTop: deviceWidth/20,
        paddingBottom: deviceWidth/20,
        justifyContent: 'space-around',
    },
    button:{
        height: deviceHeight/12,
        backgroundColor: 'white',
        borderRadius: 50,
        
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText:{
        color: '#1ABC9C',
        fontStyle: 'italic',
        fontWeight: '700',
        fontSize: 30
    }
});