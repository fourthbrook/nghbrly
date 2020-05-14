import React, { useState } from 'react';
import { StyleSheet, ActivityIndicator, View, Text, Alert, Dimensions, TouchableHighlight, Image, TextInput, KeyboardAvoidingView } from 'react-native';
import auth from '@react-native-firebase/auth';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

export default function Reset({ navigation }) {

    const [email, setEmail] = useState('');
    const [showLoading, setShowLoading] = useState(false);

    const reset = async() => {
        setShowLoading(true);
        try {
            await auth().sendPasswordResetEmail(email);
            Alert.alert(
                'A password reset email has been sent.'
            );
            setShowLoading(false);
            navigation.navigate('Login');
        } catch (e) {
            setShowLoading(false);
            Alert.alert(
                e.message
            );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.topMenu}>
                <TouchableHighlight style={styles.back}
                    activeOpacity={0.6}
                    underlayColor="#1ABC9C"
                    onPress={() => {navigation.navigate('Login')}}
                >
                    <Image style={styles.back}
                        source={require('../../images/icons/back.png')}
                    />
                </TouchableHighlight>
            </View>
            <KeyboardAvoidingView behavior={'height'}>
                <View style={styles.logo}>
                    <Text style={styles.logoText}>
                        reset password
                    </Text>
                </View>
                <View style={styles.formContainer}>
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
                    <TouchableHighlight style={styles.resetButton}
                        activeOpacity={0.6}
                        underlayColor="#1ABC9C"
                        title="Login"
                        onPress={() => reset()}
                    >
                        <View style={styles.restButton}>
                            <Text style={{ color: '#1ABC9C', fontStyle: 'italic', fontWeight: '700', fontSize: 20 }}>
                                Reset Password
                            </Text>
                        </View>
                        
                    </TouchableHighlight>
                    {showLoading &&
                        <View style={styles.activity}>
                            <ActivityIndicator size="large" color="#0000ff" />
                        </View>
                    }
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

Reset.navigationOptions = ({ navigation }) => ({
    title: 'Reset',
    headerShown: false,
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1ABC9C',
        justifyContent: 'center',
    },
    topMenu: {
        height: deviceHeight/10,
        marginLeft: deviceWidth/30,
        marginRight: deviceWidth/30,
        justifyContent: 'center'
    },
    back: {
        height: deviceHeight/20,
        width: deviceHeight/20,
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
        fontSize: 40
    },
    formContainer: {
        height: 3*(deviceHeight/10),
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
    resetButton: {
        flexDirection: 'row',
        height: deviceHeight/20,
        width: deviceWidth/1.5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        fontSize: 18,
        borderRadius: 50,
    },
    activity: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
})