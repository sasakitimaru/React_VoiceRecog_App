/**
 * @format
 */
import 'react-native-get-random-values';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Amplify } from 'aws-amplify';
import awsmobile from './src/aws-exports';

Amplify.configure(awsmobile);
AppRegistry.registerComponent(appName, () => App);
