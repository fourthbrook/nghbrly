import React, { useState } from 'react';
import { StyleSheet, ActivityIndicator, View, Text, Alert, TextInput, TouchableHighlight, Image, Dimensions, KeyboardAvoidingView} from 'react-native';
import auth from '@react-native-firebase/auth';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

export default function Login({ navigation }) {

    const homeHandler = () => {
        navigation.navigate('Home');
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showLoading, setShowLoading] = useState(false);

    const login = async() => {
        setShowLoading(true);
        try {
            const doLogin = await auth().signInWithEmailAndPassword(email, password);
            setShowLoading(false);
            if(doLogin.user) {
                homeHandler
            }
        } catch (e) {
            setShowLoading(false);
            Alert.alert(
                e.message
            );
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={'height'}>
            <View style={styles.logo}>
                <Text style={styles.logoText}>
                    nghbrly
                </Text>
            </View>
            <View style={styles.login}>
                <View style={styles.form}>
                    <Image
                        style={{ width: 25, height: 25, marginRight: 10}}
                        source={require('../../images/icons/email.png')}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Your Email'
                        placeholderTextColor='white'
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <View style={styles.form}>
                    <Image
                        style={{ width: 25, height: 25, marginRight: 10}}
                        source={require('../../images/icons/key.png')}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Your Password'
                        placeholderTextColor='white'
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>

                
                <TouchableHighlight style={styles.loginButton}
                    activeOpacity={0.6}
                    underlayColor="#1ABC9C"
                    title="Login"
                    onPress={() => login()}
                >
                    <View style={styles.loginButton}>
                        <Image
                            style={{ width: 20, height: 20, marginRight: 8}}
                            source={require('../../images/icons/lock.png')}
                        />
                        <Text style={{ color: '#1ABC9C', fontStyle: 'italic', fontWeight: '700', fontSize: 20 }}>
                            Login
                        </Text>
                    </View>
                    
                </TouchableHighlight>
                <View style={styles.row}>
                    <TouchableHighlight
                        style={styles.links}
                        activeOpacity={0.6}
                        underlayColor="#1ABC9C"
                        title="Reset Password"
                        onPress={() => {
                            navigation.navigate('Reset');
                        }}
                    >
                        <Text style={styles.links}>
                            Forgot Password?
                        </Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.links}
                        activeOpacity={0.6}
                        underlayColor="#1ABC9C"
                        title="Register"
                        onPress={() => {
                            navigation.navigate('Register');
                        }}
                    >
                        <Text style={styles.links}>
                            Not a user?
                        </Text>
                    </TouchableHighlight>
                </View>
                {showLoading &&
                    <View style={styles.activity}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                }
            </View>
        </KeyboardAvoidingView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1ABC9C',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        height: 6*(deviceHeight/10),
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 40,
        padding: 40
    },
    logoText: {
        color: 'white',
        fontStyle: 'italic',
        fontWeight: '700',
        fontSize: 60
    },
    login: {
        height: 4*(deviceHeight/10),
        alignItems: 'center',
        justifyContent: 'space-around',
        marginLeft: deviceWidth/10,
        marginRight: deviceWidth/10,
        paddingBottom: deviceHeight/15
    },
    form: {
        flexDirection: 'row',
        height: deviceHeight/20,
        width: 8*(deviceWidth/10),
        alignItems: 'center',
        fontSize: 18,
        alignSelf: 'stretch',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
    },
    input: {
        color: 'white',
        width: 7*(deviceWidth/10),
    },
    loginButton: {
        flexDirection: 'row',
        height: deviceHeight/20,
        width: deviceWidth/1.5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        fontSize: 18,
        borderRadius: 50,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        alignSelf: 'stretch'
    },
    links: {
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 14,
    },
    activity: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
})