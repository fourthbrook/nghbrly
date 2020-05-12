import React, { useState } from 'react';
import { StyleSheet, ActivityIndicator, View, Text, Alert, TextInput, TouchableHighlight, Image, Dimensions, KeyboardAvoidingView, Picker,} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ModalFilterPicker from 'react-native-modal-filter-picker'


let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

export default function Register({ navigation }) {

    const popAction = () => {
        navigation.dispatch(StackActions.pop(1));
    }

    const db = firestore()

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setcPassword] = useState('');

    const [showLoading, setShowLoading] = useState(false);

    const passCheck = () => {
        if((cPassword != password) && (neighborhood == neighborhood.valueOf('neighborhood'))) {
            Alert.alert(
                'Please make sure your passwords match and select a neighborhood!'
            );
        } else if(cPassword != password) {
            Alert.alert(
                'Please make sure your passwords match!'
            ); 
        } else if (neighborhood === 'neighborhod'){
            Alert.alert(
                'Please select a neighborhood!'
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
            if(doRegister.user.uid) {
                const user = {
                    uid: doRegister.user.uid,
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    neighborhod: neighborhood

                }

                db.collection('users')
                    .doc(doRegister.user.uid)
                    .set(user)
                
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
            <KeyboardAvoidingView style={styles.container} behavior={'height'}>
                <View style={styles.logo}>
                    <Text style={styles.logoText}>
                        register
                    </Text>
                </View>
                <View style={styles.register}>
                    <View style={styles.form}>
                        <Image
                            style={{ width: 25, height: 25, marginRight: 10}}
                            source={require('../../images/icons/email.png')}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='First Name'
                            placeholderTextColor='white'
                            value={firstName}
                            onChangeText={setFirstName}
                        />
                    </View>
                    <View style={styles.form}>
                        <Image
                            style={{ width: 25, height: 25, marginRight: 10}}
                            source={require('../../images/icons/email.png')}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='Last Name'
                            placeholderTextColor='white'
                            value={lastName}
                            onChangeText={setLastName}
                        />
                    </View>
                    <View style={styles.form}>
                        <Image
                            style={{ width: 25, height: 25, marginRight: 10}}
                            source={require('../../images/icons/email.png')}
                        />
                        <Picker
                            selectedValue={neighborhood}
                            style={styles.input}
                            placeholder='Last Name'
                            placeholderTextColor='white'
                            onValueChange={(itemValue, itemIndex) => setNeighborhood(itemValue)}
                        >
                            <Picker.Item label="Neighborhood" value="neighborhood" />
                            <Picker.Item label="Brooklyn" value="brooklyn" />
                            <Picker.Item label="Bushwick" value="bushwick" />
                            <Picker.Item label="Bedstuy" value="bedstuy" />
                            <Picker.Item label="Williamsburg" value="williamsburg" />
                            <Picker.Item label="East Williamsburg" value="east williamsburg" />
                            <Picker.Item label="Ridgewood" value="ridgewood" />
                            <Picker.Item label="Lower East Side" value="lower east side" />


                        </Picker>
                    </View>
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
                    <View style={styles.form}>
                        <Image
                            style={{ width: 25, height: 25, marginRight: 10}}
                            source={require('../../images/icons/key.png')}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='Confirm Password'
                            placeholderTextColor='white'
                            secureTextEntry={true}
                            value={cPassword}
                            onChangeText={setcPassword}
                        />
                    </View>
                    <TouchableHighlight style={styles.loginButton}
                        activeOpacity={0.6}
                        underlayColor="#1ABC9C"
                        title="Register"
                        onPress = {passCheck}
                    >
                        <View style={styles.loginButton}>
                            <Image
                                style={{ width: 20, height: 20, marginRight: 8}}
                                source={require('../../images/icons/lock.png')}
                            />
                            <Text style={{ color: '#1ABC9C', fontStyle: 'italic', fontWeight: '700', fontSize: 20 }}>
                                Register
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </KeyboardAvoidingView>
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
        justifyContent: 'center',
        backgroundColor: '#1ABC9C'
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
    register: {
        height: 7*(deviceHeight/10),
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
});