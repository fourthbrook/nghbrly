import React, { useState } from 'react';
import { StyleSheet, ActivityIndicator, View, Text, Alert, TextInput, TouchableHighlight, Image, Dimensions, KeyboardAvoidingView, Picker, Modal} from 'react-native';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

export default function Profile({ navigation }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [password, setPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [cNewPassword, setCNewPassword] = useState('');

    const popAction = () => {
        navigation.dispatch(StackActions.pop(1));
    }

    const signOut = () => {
       auth().signOut();
       navigation.navigate('Login');
    }

    reauthenticate = (currentPassword) => {
        const user = firebase.auth().currentUser;
        const cred = firebase.auth.EmailAuthProvider.credential(
            user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
    }

    changePass = (currentPassword) => {
        reauthenticate(currentPassword).then(() => {
            const user = firebase.auth().currentUser;
            if (cNewPassword != password) {
                Alert.alert('Please make sure your passwords match')
            } else {
                user.updatePassword(password).then(() => {
                    Alert.alert("password has been changed");
                    cNewPassword = '';
                    password = '';
                    currentPassword = '';
                }).catch((error) => {
                    Alert.alert("pasword hasn't been updated")
                })
            }
        }).catch((error) => {
            Alert.alert(error.message)
        });
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
                <Text style={styles.logoText}>
                    profile
                </Text>
            </View>
            <View style={styles.profile}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Change Password</Text>
                            <View style={styles.modalForm}>
                                <Image
                                    style={{ width: 25, height: 25, marginRight: 10}}
                                    source={require('../../images/icons/blueKey.png')}
                                />
                                <TextInput
                                    style={styles.modalInput}
                                    placeholder='Current Password'
                                    placeholderTextColor='#1ABC9C'
                                    secureTextEntry={true}
                                    value={currentPassword}
                                    onChangeText={setCurrentPassword}
                                />
                            </View>
                            <View style={styles.modalForm}>
                                <Image
                                    style={{ width: 25, height: 25, marginRight: 10}}
                                    source={require('../../images/icons/blueKey.png')}
                                />
                                <TextInput
                                    style={styles.modalInput}
                                    placeholder='New Password'
                                    placeholderTextColor='#1ABC9C'
                                    secureTextEntry={true}
                                    value={password}
                                    onChangeText={setPassword}
                                />
                            </View>
                            <View style={styles.modalForm}>
                                <Image
                                    style={{ width: 25, height: 25, marginRight: 10}}
                                    source={require('../../images/icons/blueKey.png')}
                                />
                                <TextInput
                                    style={styles.modalInput}
                                    placeholder='Confirm New Password'
                                    placeholderTextColor='#1ABC9C'
                                    secureTextEntry={true}
                                    value={cNewPassword}
                                    onChangeText={setCNewPassword}
                                />
                            </View>

                            <TouchableHighlight 
                                activeOpacity={0.6}
                                underlayColor="#1ABC9C"
                                title="Register"
                                onPress ={ () => {
                                    changePass(currentPassword);
                                    setModalVisible(!modalVisible);
                                    setCurrentPassword('');
                                    setPassword('');
                                    setCNewPassword('')
                                }}
                            >
                                <View style={styles.modalButton}>
                                    <Image
                                        style={{ width: 20, height: 20, marginRight: 8}}
                                        source={require('../../images/icons/lock.png')}
                                    />
                                    <Text style={{ color: 'white', fontStyle: 'italic', fontWeight: '700', fontSize: 20 }}>
                                        Set New Password
                                    </Text>
                                </View>
                            </TouchableHighlight>

                            <TouchableHighlight
                                activeOpacity={0.6}
                                underlayColor="#1ABC9C"
                                title="Register"
                                onPress ={ () => {
                                    setModalVisible(!modalVisible);
                                    setCurrentPassword('');
                                    setPassword('');
                                    setCNewPassword('')
                                }}
                            >
                                <View style={styles.modalButton}>
                                    <Text style={{ color: 'white', fontStyle: 'italic', fontWeight: '700', fontSize: 20 }}>
                                        Cancel
                                    </Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
                <TouchableHighlight
                    style={styles.openButton}
                    onPress={() => {
                    setModalVisible(true);
                    }}
                >
                    <Text style={{ color: 'white', fontStyle: 'italic', fontWeight: '700', fontSize: 20 }}>
                        Set New Password
                    </Text>
                </TouchableHighlight>
            </View>
            <View style={styles.buttons}>

                <TouchableHighlight style={styles.button}
                    onPress={signOut}
                >
                    <Text style={{ color: '#1ABC9C', fontStyle: 'italic', fontWeight: '700', fontSize: 20 }}>
                        Cancel
                    </Text>
                </TouchableHighlight>
            </View>
        </View>
    )  
}


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        paddingTop: 25,
        paddingBottom: 5,
        paddingLeft: 25,
        paddingRight: 25,
        alignItems: "center",
        shadowColor: "#000",
        elevation: 50
    },
      openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },

    form: {
        flexDirection: 'row',
        height: deviceHeight/20,
        width: 8*(deviceWidth/10),
        alignItems: 'center',
        fontSize: 18,
        alignSelf: 'stretch',
        borderBottomColor: '#1ABC9C',
        borderBottomWidth: 1,
    },
    input: {
        color: '#1ABC9C',
        width: 7*(deviceWidth/10),
    },

    modalForm: {
        flexDirection: 'row',
        height: deviceHeight/20,
        width: 8*(deviceWidth/10),
        alignItems: 'center',
        fontSize: 18,
        alignSelf: 'stretch',
        borderBottomColor: '#1ABC9C',
        borderBottomWidth: 1,
        marginBottom: 20
    },
    modalInput: {
        color: '#1ABC9C',
        width: 7*(deviceWidth/10),
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        color: '#1ABC9C',
        fontStyle: 'italic',
        fontWeight: '700', 
        fontSize: 30 
    },
    modalButton: {
        flexDirection: 'row',
        height: deviceHeight/20,
        width: deviceWidth/1.5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1ABC9C',
        fontSize: 18,
        borderRadius: 50,
        marginBottom: 20
    },




    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white'
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
    back: {
        height: deviceHeight/20,
        width: deviceHeight/20,
    },
    profile: {
        height: 7*(deviceHeight/10),
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText: {
        color: 'white',
        fontStyle: 'italic',
        fontWeight: '700',
        fontSize: 40
    },
    buttons: {
        height:2*(deviceHeight/10),
        paddingLeft: deviceWidth/20,
        paddingRight: deviceWidth/20,
        paddingTop: deviceWidth/20,
        paddingBottom: deviceWidth/20,
        justifyContent: 'space-around',
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