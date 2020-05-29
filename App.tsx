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
import {StatusBar, View, Text, StyleSheet} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import createModalTabNavigator from './heart-tab-navigator/createHeartTabNavigator';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {style} from 'd3';

const ModalTabNavigator = createModalTabNavigator({
  modalComponent: createStackNavigator({
    '/modal/1': ({navigation}: any) => (
      <View style={styles.screen}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('/modal/2')}>
          <Text>Go to next</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('/purchase')}>
          <Text>Open purchase flow</Text>
        </TouchableOpacity>
      </View>
    ),
    '/modal/2': ({navigation}: any) => (
      <View style={styles.screen}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}>
          <Text>Go back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('/tab/2')}>
          <Text>Go to tab 2</Text>
        </TouchableOpacity>
      </View>
    ),
  }),
  tabRoutes: {
    '/tab/1': {
      screen: () => (
        <View style={styles.tabScreen}>
          <Text style={styles.header}>Spil</Text>
        </View>
      ),
      tabIcon: ({isSelected}) => {
        const borderColor = isSelected ? '#3d05b5' : 'transparent';
        return <View style={[styles.tabItemIcon, {borderColor}]} />;
      },
      tabLabel: 'Spil',
    },
    '/tab/2': {
      screen: () => (
        <View style={styles.tabScreen}>
          <Text style={styles.header}>Mine Kuponer</Text>
        </View>
      ),
      tabIcon: ({isSelected}) => {
        const borderColor = isSelected ? '#3d05b5' : 'transparent';
        return <View style={[styles.tabItemIcon, {borderColor}]} />;
      },
      tabLabel: 'Mine Kuponer',
    },
    '/tab/3': {
      screen: () => (
        <View style={styles.tabScreen}>
          <Text style={styles.header}>Vindertal</Text>
        </View>
      ),
      tabIcon: ({isSelected}) => {
        const borderColor = isSelected ? '#3d05b5' : 'transparent';
        return <View style={[styles.tabItemIcon, {borderColor}]} />;
      },
      tabLabel: 'Vindertal',
    },
    '/tab/4': {
      screen: () => (
        <View style={styles.tabScreen}>
          <Text style={styles.header}>Scan Kupon</Text>
        </View>
      ),
      tabIcon: ({isSelected}) => {
        const borderColor = isSelected ? '#3d05b5' : 'transparent';
        return <View style={[styles.tabItemIcon, {borderColor}]} />;
      },
      tabLabel: 'Scan Kupon',
    },
  },
  modalKey: '/modal',
  tabKey: '/tab',
});

const StackNavigator = createStackNavigator(
  {
    '/home': ModalTabNavigator,
    '/purchase': createStackNavigator({
      '/purchase/step-1': ({navigation}) => (
        <View style={styles.screen}>
          <Text>Purchase</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('/tab/3')}>
            <Text>Tilbage til vindertal</Text>
          </TouchableOpacity>
        </View>
      ),
    }),
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

const AppContainer = createAppContainer(StackNavigator);

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <AppContainer />
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabScreen: {
    flex: 1,
    backgroundColor: '#3d05b5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 50,
    fontWeight: '700',
    color: '#FFF',
  },
  button: {
    borderColor: '#000',
    borderWidth: 2,
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  tabItemIcon: {
    height: 32,
    width: 32,
    borderRadius: 8,
    backgroundColor: '#ECECEC',
    borderWidth: 2,
  },
});

export default App;
