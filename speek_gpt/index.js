/**
 * @format
 */
import 'react-native-get-random-values';
import {AppRegistry} from 'react-native';
import App from './App';
import aws_exports from './src/aws-exports';
import {name as appName} from './app.json';

aws_exports();
AppRegistry.registerComponent(appName, () => App);
