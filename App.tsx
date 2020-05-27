/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {StatusBar, Button, View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import createHeartTabNavigator from './heart-tab-navigator/createHeartTabNavigator';

const TabStackNavigator = createStackNavigator({
  '/tab/stack-1': ({navigation}) => (
    <View style={{flex: 1, backgroundColor: '#3d05b5'}}>
      <Button
        title="go to next"
        onPress={() => navigation.navigate('/tab/stack-2')}
      />
    </View>
  ),
  '/tab/stack-2': ({navigation}) => (
    <View style={{flex: 1, backgroundColor: '#3d05b5'}}>
      <Button title="go back" onPress={() => navigation.goBack()} />
    </View>
  ),
});

const HeartStackNavigator = createStackNavigator({
  '/heart/stack-1': ({navigation}) => (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <Button
        title="go to next"
        onPress={() => navigation.navigate('/heart/stack-2')}
      />
    </View>
  ),
  '/heart/stack-2': ({navigation}) => (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <Button title="go back" onPress={() => navigation.goBack()} />
      <Button
        title="go to tab"
        onPress={() => navigation.navigate('/tab/stack-2')}
      />
    </View>
  ),
});

const HeartTabNavigator = createHeartTabNavigator(
  {
    '/tab': TabStackNavigator,
    '/heart': HeartStackNavigator,
  },
  {
    mode: 'modal',
  },
);

const AppContainer = createAppContainer(HeartTabNavigator);

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <AppContainer />
    </>
  );
};

export default App;
