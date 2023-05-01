/**
 * @format
 */
import 'react-native-get-random-values';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Amplify } from 'aws-amplify';
import awsmobile from './src/aws-exports';
import { LogBox } from 'react-native'; // リスナーの警告無視

LogBox.ignoreLogs(['Sending `data` with no listeners registered.']); //リスナーの警告無視

Amplify.configure(awsmobile);
AppRegistry.registerComponent(appName, () => App);
