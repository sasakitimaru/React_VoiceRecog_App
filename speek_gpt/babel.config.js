module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['react-native-iconify/plugin',
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@env': './src/config',
        },
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
      },
    ],
    'react-native-config',
  ],
};