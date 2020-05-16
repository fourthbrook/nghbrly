import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    Dimensions,
    TouchableHighlight,
} from 'react-native';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

export default function Home({ navigation }) {
 
    const profileHandler = () => {
        navigation.navigate('Profile');
    }

    const settingsHandler = () => {
        navigation.navigate('Settings');
    }

    return(
        <View style={styles.container}>
            <View style={styles.topMenu}>
                <TouchableHighlight style={styles.profile}
                    activeOpacity={0.6}
                    underlayColor="#1ABC9C"
                    onPress={profileHandler}
                >
                    <Image style={styles.profile}
                        source={require('../../images/icons/user.png')}
                    />
                </TouchableHighlight>
                <TouchableHighlight style={styles.settings}
                    activeOpacity={0.6}
                    underlayColor="#1ABC9C"
                    onPress={settingsHandler}
                >
                    <Image style={styles.settings}
                        source={require('../../images/icons/settings.png')}
                    />
                </TouchableHighlight>
            </View>
            <View style={styles.logo}>
                <Text style={styles.logoText}>
                    nghbrly
                </Text>
            </View>
            <View style={styles.buttons}>
                <TouchableHighlight style={styles.button}
                    onPress={() => {
                        alert('Feature not yet implamented')
                    }}
                >
                    <Text style={styles.buttonText}>
                        LEND A HAND
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.button}
                    onPress={() => {
                        alert('Feature not yet implamented')
                    }}
                >
                    <Text style={styles.buttonText}>
                        REQUEST A HAND
                    </Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1ABC9C'
    },
    topMenu: {
        flexDirection: 'row',
        marginLeft: deviceWidth/30,
        marginRight: deviceWidth/30,
        height: deviceHeight/10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    profile: {
        height: deviceHeight/15,
        width: deviceHeight/15,
    },
    settings: {
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
        paddingBottom: deviceWidth/15,
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