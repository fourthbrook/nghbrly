import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, View, Text, Alert, TextInput, TouchableHighlight, Image, Dimensions, KeyboardAvoidingView, Modal} from 'react-native';
import {Picker} from '@react-native-community/picker';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

export default function Settings({ navigation }) {
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
                <View style={styles.menuBufferWide}>
                    <Text style={styles.logoText}>
                        settings
                    </Text>
                </View>
                <View style={styles.menuBuffer}>
                    
                </View>  
            </View>
            <View style={styles.settings}>

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
    menuBufferWide: {
        flex: 2,
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
    settings: {
        height: 9*(deviceHeight/10),
        justifyContent: 'center',
        alignItems: 'center',
    },
})