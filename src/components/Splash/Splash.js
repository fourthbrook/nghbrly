import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import auth from '@react-native-firebase/auth';

export default function Splash({ navigation }) {

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }
     
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);
     
    if (initializing) return null;
     
    if (!user) {
        return navigation.navigate('Login');
    } else {
        return navigation.navigate('Home')
    }

    // return (
    //     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //         <Text>Welcome {user.email}</Text>
    //     </View>
    // );
}


