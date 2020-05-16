import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert, TextInput, TouchableHighlight, Image, Dimensions, KeyboardAvoidingView} from 'react-native';
import {Picker} from '@react-native-community/picker';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


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
        if((cPassword != password) && (neighborhood === 'neighborhod')) {
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
                    neighborhood: neighborhood

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
                <View style={styles.menuBuffer}>
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
                <View style={styles.menuBuffer2}>
                    <Text style={styles.logoText}>
                        register
                    </Text>
                </View>
                <View style={styles.menuBuffer}>
                    
                </View>  
            </View>
            <KeyboardAvoidingView behavior={'padding'}>
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
                            <Picker.Item label="Brooklyn" value="Brooklyn" />
                            <Picker.Item label="Bushwick" value="Bushwick" />
                            <Picker.Item label="Bedstuy" value="Bedstuy" />
                            <Picker.Item label="Williamsburg" value="Williamsburg" />
                            <Picker.Item label="East Williamsburg" value="East Williamsburg" />
                            <Picker.Item label="Ridgewood" value="Ridgewood" />
                            <Picker.Item label="Lower East Side" value="Lower East Side" />


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
                    
                </View>
            </KeyboardAvoidingView>
            <View style={styles.buttons}>

                <TouchableHighlight style={styles.button}
                    activeOpacity={0.6}
                    underlayColor="#1ABC9C"
                    title="Register"
                    onPress = {passCheck}
                >
                    <Text style={styles.buttonText}>
                        register
                    </Text>
                </TouchableHighlight>
            </View>
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
        flexDirection: 'row',
        height: deviceHeight/10,
        paddingLeft: deviceWidth/30,
        paddingRight: deviceWidth/30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1ABC9C'
    },
    menuBuffer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    },
    menuBuffer2: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'

    },
    back: {
        height: deviceHeight/20,
        width: deviceHeight/20,
        alignSelf: 'flex-start',
        justifyContent: 'center'
    },
    logoText: {
        color: 'white',
        fontStyle: 'italic',
        fontWeight: '700',
        fontSize: 40
    },
    register: {
        height: 5*(deviceHeight/10),
        alignItems: 'center',
        justifyContent: 'space-around',
        marginLeft: deviceWidth/10,
        marginRight: deviceWidth/10,
        marginTop: deviceHeight/5
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
    buttons: {
        height:2*(deviceHeight/10),
        paddingLeft: deviceWidth/20,
        paddingRight: deviceWidth/20,
        paddingTop: deviceWidth/20,
        paddingBottom: deviceWidth/20,
        justifyContent: 'center',
    },

    button:{
        height: deviceHeight/20,
        backgroundColor: 'white',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText:{
        color: '#1ABC9C',
        fontStyle: 'italic',
        fontWeight: '700',
        fontSize: 18
    }
    
});