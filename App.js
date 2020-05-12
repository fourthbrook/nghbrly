

import React, { Component } from 'react';
import ScreenManager from './src/components/ScreenManager/ScreenManager';
import SafeAreaView from './src/components/SafeViewAndroid/SafeViewAndroid'
import SafeViewAndroid from './src/components/SafeViewAndroid/SafeViewAndroid';

export default class nghbrly extends Component {
  render() {
    return(
      <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
        <ScreenManager/>
      </SafeAreaView>
      
    )
  }
}