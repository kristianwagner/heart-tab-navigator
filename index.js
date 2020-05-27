/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import * as d3 from 'd3-time-format';

AppRegistry.registerComponent(appName, () => App);
