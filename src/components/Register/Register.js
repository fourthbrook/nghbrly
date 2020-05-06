import React, { useState } from 'react';
import { StyleSheet, ActivityIndicator, View, Text, Alert, TextInput, TouchableHighlight, Image, Dimensions } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import auth from '@react-native-firebase/auth';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

export default function Register({ navigation }) {

    const popAction = () => {
        navigation.dispatch(StackActions.pop(1));
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setcPassword] = useState('');
    const [showLoading, setShowLoading] = useState(false);

    const passCheck = () => {
        if ( cPassword != password) {
            Alert.alert(
                'Please make sure your passwords match!'
            );
        } else {
            register()
        }

    };

    const register = async() => {
        setShowLoading(true);
        try {
            const doRegister = await auth().createUserWithEmailAndPassword(email, password);
            setShowLoading(false);
            if(doRegister.user) {
                navigation.navigate('Home');
            }
        } catch (e) {
            setShowLoading(false);
            Alert.alert(
                e.message
            );
        }
    };

    return (
        <View style={styles.container}>
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
                <View style={styles.loginContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Your Email'
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder='Your Password'
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder='Confirm Password'
                        secureTextEntry={true}
                        value={cPassword}
                        onChangeText={setcPassword}
                    />


                    <TouchableHighlight style={styles.textInput}
                        activeOpacity={0.6}
                        underlayColor="#1ABC9C"
                        title="Register"
                        onPress = {passCheck}
                    >
                        <Text>
                            Register
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>








            {/* <View style={styles.formContainer}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 28, height: 50 }}>Register Here!</Text>
                </View>
                <View style={styles.subContainer}>
                    <Input
                        style={styles.textInput}
                        placeholder='Your Email'
                        leftIcon={
                            <Icon
                            name='mail'
                            size={24}
                            />
                        }
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <View style={styles.subContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Your Password'
                        leftIcon={
                            <Icon
                            name='lock'
                            size={24}
                            />
                        }
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
                <View style={styles.subContainer}>
                    <Button
                        style={styles.textInput}
                        icon={
                            <Icon
                                name="check-circle"
                                size={15}
                                color="white"
                            />
                        }
                        title="Register"
                        onPress={() => register()} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Already a user?</Text>
                </View>
                <View style={styles.subContainer}>
                    <Button
                        style={styles.textInput}
                        icon={
                            <Icon
                                name="input"
                                size={15}
                                color="white"
                            />
                        }
                        title="Login"
                        onPress={() => {
                            navigation.navigate('Login');
                        }} />
                </View>
                {showLoading &&
                    <View style={styles.activity}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                }
            </View> */}
        </View>
    );
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
        height: 2*(deviceHeight/10),
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText: {
        color: 'white',
        fontStyle: 'italic',
        fontWeight: '700',
        fontSize: 60
    },
    loginContainer: {
        height: 7*(deviceHeight/10),
        alignItems: 'center',
        justifyContent: 'space-around'

    }
});