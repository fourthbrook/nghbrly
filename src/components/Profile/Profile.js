import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, View, Text, Alert, TextInput, TouchableHighlight, Image, Dimensions, KeyboardAvoidingView, Modal} from 'react-native';
import {Picker} from '@react-native-community/picker';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

export default function Profile({ navigation }) {

    const users = firestore().collection('users');

    const [passModal, setPassModal] = useState(false);
    const [emailModal, setEmailModal] = useState(false);
    const [firstModal, setFirstModal] = useState(false);
    const [lastModal, setLastModal] = useState(false);
    const [neighModal, setNeighModal] = useState(false);
    const [newFirst, setNewFirst] = useState('');
    const [newLast, setNewLast] = useState('');
    const [newNeigh, setNewNeigh] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [password, setPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [cNewPassword, setCNewPassword] = useState('');
    
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [neigh, setNeigh] = useState('');

    const user = firebase.auth().currentUser;
    const userEmail = firebase.auth().currentUser.email;
    const signOut = () => {
       auth().signOut();
       navigation.navigate('Login');
    }

    useEffect(() => {
        
        users.doc(user.uid).get()
            .then((doc)=>{  
                    setFirst(doc.data().firstName)
                    setLast(doc.data().lastName)
                    setNeigh(doc.data().neighborhood)
                    
            })
            .catch(e => console.log(e));
    })
    
    changeFirst = () => {
        users.doc(user.uid).update({
            firstName: newFirst,
        }).then(() => {
            Alert.alert('First name has been updated!')
        });
    }

    changeLast = () => {
        users.doc(user.uid).update({
            lastName: newLast,
        }).then(() => {
            Alert.alert('Last name has been updated!')
        });
    }

    changeNeigh = () => {
        users.doc(user.uid).update({
            neighborhood: newNeigh,
        }).then(() => {
            Alert.alert('Neighborhood has been updated!')
        });
    }

    reauthenticate = (currentPassword) => {
        
        const cred = firebase.auth.EmailAuthProvider.credential(
            user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
    }

    changeEmail = (currentPassword) => {
        reauthenticate(currentPassword).then(() => {
            
            user.updateEmail(newEmail).then(() => {
                Alert.alert("Email has been updated!");
            })
        }).catch((error) => {
            Alert.alert(error.message)
        });
    }

    changePass = (currentPassword) => {
        reauthenticate(currentPassword).then(() => {
            
            if (cNewPassword != password) {
                Alert.alert('Please make sure your passwords match!')
            } else {
                user.updatePassword(password).then(() => {
                    Alert.alert("Password has been updated");
                    
                }).catch((error) => {
                    Alert.alert("Password failed to update!")
                })
            }
        }).catch((error) => {
            Alert.alert(error.message)
        });
    }
    
    return(
        <View style={styles.container}>
            <View style={styles.topMenu}>
                <View style={styles.menuBuffer}>
                    <TouchableHighlight style={styles.back}
                        activeOpacity={0.6}
                        underlayColor="#1ABC9C"
                        onPress={() => {navigation.navigate('Home')}}
                    >
                        <Image style={styles.back}
                            source={require('../../images/icons/back.png')}
                        />
                    </TouchableHighlight>
                </View>
                <View style={styles.menuBuffer}>
                    <Text style={styles.logoText}>
                        profile
                    </Text>
                </View>
                <View style={styles.menuBuffer}>
                    
                </View>  
            </View>
            <View style={styles.profile}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={firstModal}
                    onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Change First Name</Text>
                            <View style={styles.modalForm}>
                                <Image
                                    style={{ width: 25, height: 25, marginRight: 10}}
                                    source={require('../../images/icons/blueUser.png')}
                                />
                                <TextInput
                                    style={styles.modalInput}
                                    placeholder={''}
                                    placeholderTextColor='#1ABC9C'
                                    value={newFirst}
                                    onChangeText={setNewFirst}
                                />
                            </View>
            
                            <TouchableHighlight 
                                activeOpacity={0.6}
                                underlayColor="white"
                                title="Change First"
                                onPress ={ () => {
                                    changeFirst(newFirst);
                                    setFirstModal(!firstModal);
                                    setNewFirst('');
                                }}
                            >
                                <View style={styles.modalButton}>
                                    <Text style={{ color: 'white', fontStyle: 'italic', fontWeight: '700', fontSize: 20 }}>
                                        Save
                                    </Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight
                                activeOpacity={0.6}
                                underlayColor="white"
                                title="Cancel"
                                onPress ={ () => {
                                    setFirstModal(!firstModal);
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
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={lastModal}
                    onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Change Last Name</Text>
                            <View style={styles.modalForm}>
                                <Image
                                    style={{ width: 25, height: 25, marginRight: 10}}
                                    source={require('../../images/icons/blueUser.png')}
                                />
                                <TextInput
                                    style={styles.modalInput}
                                    placeholder={''}
                                    placeholderTextColor='#1ABC9C'
                                    value={newLast}
                                    onChangeText={setNewLast}
                                />
                            </View>
            
                            <TouchableHighlight 
                                activeOpacity={0.6}
                                underlayColor="white"
                                title="Change Last"
                                onPress ={ () => {
                                    changeLast(newLast);
                                    setLastModal(!lastModal);
                                    setNewLast('');
                                }}
                            >
                                <View style={styles.modalButton}>
                                    <Text style={{ color: 'white', fontStyle: 'italic', fontWeight: '700', fontSize: 20 }}>
                                        Save
                                    </Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight
                                activeOpacity={0.6}
                                underlayColor="white"
                                title="Cancel"
                                onPress ={ () => {
                                    setLastModal(!lastModal);
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
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={neighModal}
                    onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Change Neighborhood</Text>
                            <View style={styles.modalForm}>
                                <Image
                                    style={{ width: 25, height: 25, marginRight: 10}}
                                    source={require('../../images/icons/blueHome.png')}
                                />
                                <Picker
                                    selectedValue={newNeigh}
                                    style={styles.modalInput}
                                    placeholder='Neighborhood'
                                    placeholderTextColor='white'
                                    onValueChange={(itemValue, itemIndex) => setNewNeigh(itemValue)}
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
                            <TouchableHighlight 
                                activeOpacity={0.6}
                                underlayColor="white"
                                title="Save"
                                onPress ={ () => {
                                    changeNeigh();
                                    setNeighModal(!neighModal);
                                }}
                            >
                                <View style={styles.modalButton}>
                                    <Text style={{ color: 'white', fontStyle: 'italic', fontWeight: '700', fontSize: 20 }}>
                                        Save
                                    </Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight
                                activeOpacity={0.6}
                                underlayColor="white"
                                title="Cancel"
                                onPress ={ () => {
                                    setNeighModal(!neighModal);
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
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={emailModal}
                    onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Change Email</Text>
                            <View style={styles.modalForm}>
                                <Image
                                    style={{ width: 25, height: 25, marginRight: 10}}
                                    source={require('../../images/icons/blueMail.png')}
                                />
                                <TextInput
                                    style={styles.modalInput}
                                    placeholder={userEmail}
                                    placeholderTextColor='#1ABC9C'
                                    value={newEmail}
                                    onChangeText={setNewEmail}
                                />
                            </View>
                            <Text style={styles.modalSmallText}>Please re-enter your password to update your email address.</Text>
                            <View style={styles.modalForm}>
                                <Image
                                    style={{ width: 25, height: 25, marginRight: 10}}
                                    source={require('../../images/icons/blueKey.png')}
                                />
                                <TextInput
                                    style={styles.modalInput}
                                    placeholder={'Current Password'}
                                    placeholderTextColor='#1ABC9C'
                                    secureTextEntry={true}
                                    value={currentPassword}
                                    onChangeText={setCurrentPassword}
                                />
                            </View>
                            

                            <TouchableHighlight 
                                activeOpacity={0.6}
                                underlayColor="white"
                                title="Change Password"
                                onPress ={ () => {
                                    changeEmail(currentPassword);
                                    setEmailModal(!emailModal);
                                    setCurrentPassword('');
                                }}
                            >
                                <View style={styles.modalButton}>
                                    <Image
                                        style={{ width: 20, height: 20, marginRight: 8}}
                                        source={require('../../images/icons/lock.png')}
                                    />
                                    <Text style={{ color: 'white', fontStyle: 'italic', fontWeight: '700', fontSize: 20 }}>
                                        Set New Email
                                    </Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight
                                activeOpacity={0.6}
                                underlayColor="white"
                                title="Cancel"
                                onPress ={ () => {
                                    setEmailModal(!emailModal);
                                    setCurrentPassword('');
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
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={passModal}
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
                                    placeholder={'Current Password'}
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
                                underlayColor="white"
                                title="Change Password"
                                onPress ={ () => {
                                    changePass(currentPassword);
                                    setPassModal(!passModal);
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
                                underlayColor="white"
                                title="Cancel"
                                onPress ={ () => {
                                    setPassModal(!passModal);
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
                    activeOpacity={0.6}
                    underlayColor="white"
                    onPress={() => {
                    setFirstModal(true);
                    }}
                >
                    <View style={styles.form}>
                        <Image
                            style={{ width: 25, height: 25, marginRight: 10}}
                            source={require('../../images/icons/blueUser.png')}
                        />
                        <View style={styles.buffer}>
                            <Text style={styles.inputButtonText}>
                                {first}
                            </Text>
                            <Text style={styles.inputButtonText}>
                                Change First Name
                            </Text>
                        </View>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    activeOpacity={0.6}
                    underlayColor="white"
                    onPress={() => {
                    setLastModal(true);
                    }}
                >
                    <View style={styles.form}>
                        <Image
                            style={{ width: 25, height: 25, marginRight: 10}}
                            source={require('../../images/icons/blueUser.png')}
                        />
                        <View style={styles.buffer}>
                            <Text style={styles.inputButtonText}>
                                {last}
                            </Text>
                            <Text style={styles.inputButtonText}>
                                Change Last Name
                            </Text>
                        </View>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    activeOpacity={0.6}
                    underlayColor="white"
                    onPress={() => {
                    setNeighModal(true);
                    }}
                >
                    <View style={styles.form}>
                        <Image
                            style={{ width: 25, height: 25, marginRight: 10}}
                            source={require('../../images/icons/blueHome.png')}
                        />
                        <View style={styles.buffer}>
                            <Text style={styles.inputButtonText}>
                                {neigh}
                            </Text>
                            <Text style={styles.inputButtonText}>
                                Change Neighborhood
                            </Text>
                        </View>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    activeOpacity={0.6}
                    underlayColor="white"
                    onPress={() => {
                    setEmailModal(true);
                    }}
                >
                    <View style={styles.form}>
                        <Image
                            style={{ width: 25, height: 25, marginRight: 10}}
                            source={require('../../images/icons/blueMail.png')}
                        />
                        <View style={styles.buffer}>
                            <Text style={styles.inputButtonText}>
                                {userEmail}
                            </Text>
                            <Text style={styles.inputButtonText}>
                                Change Email
                            </Text>
                        </View>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    activeOpacity={0.6}
                    underlayColor="white"
                    onPress={() => {
                    setPassModal(true);
                    }}
                >
                    <View style={styles.form}>
                        <Image
                            style={{ width: 25, height: 25, marginRight: 10}}
                            source={require('../../images/icons/blueKey.png')}
                        />
                        <View style={styles.buffer}>
                            <Text style={styles.input}>
                                {'\u2B24 \u2B24 \u2B24 \u2B24 \u2B24 \u2B24 \u2B24 \u2B24'}
                            </Text>
                            <Text style={styles.inputButtonText}>
                                Change Password
                            </Text>
                        </View>
                        
                    </View>
                </TouchableHighlight>
            </View>
            <View style={styles.buttons}>

                <TouchableHighlight style={styles.button}
                    onPress={signOut}
                >
                    <Text style={{ color: 'white', fontStyle: 'italic', fontWeight: '700', fontSize: 20 }}>
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
    menuBuffer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    back: {
        height: deviceHeight/20,
        width: deviceHeight/20,
        justifyContent: 'center',
        alignSelf: "flex-start"
    },
    logoText: {
        color: 'white',
        fontStyle: 'italic',
        fontWeight: '700',
        fontSize: 40
    },
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
        marginBottom: 30,
        textAlign: "center",
        color: '#1ABC9C',
        fontStyle: 'italic',
        fontWeight: '700', 
        fontSize: 30 
    },
    modalSmallText: {
        marginBottom: 30,
        color: '#1ABC9C', 
        fontSize: 15
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
    profile: {
        height: 7.5*(deviceHeight/10),
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        flexDirection: 'row',
        height: deviceHeight/20,
        width: 8*(deviceWidth/10),
        alignItems: 'center',
        fontSize: 18,
        borderBottomColor: '#1ABC9C',
        borderBottomWidth: 1,
        marginBottom: 20
    },
    buffer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    input: {
        color: '#1ABC9C',
        justifyContent: 'center',
        fontSize: 10,
    },
    inputButtonText: {
        color: '#1ABC9C',
        justifyContent: 'center',
        fontSize: 15,
    },
    buttons: {
        height:1.5*(deviceHeight/10),
        paddingLeft: deviceWidth/20,
        paddingRight: deviceWidth/20,
        paddingTop: deviceWidth/20,
        paddingBottom: deviceWidth/20,
        justifyContent: 'space-around',
    },
    button:{
        height: deviceHeight/20,
        backgroundColor: '#1ABC9C',
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