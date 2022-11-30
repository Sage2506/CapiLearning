/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import configureStore from './configureStore';

AppRegistry.registerComponent(appName, () => App);
