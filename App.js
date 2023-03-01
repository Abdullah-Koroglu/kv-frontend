import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { StateProvider } from './src/context/StateContext';
import { ToastProvider } from 'react-native-toast-notifications'
import Drawer from './src/Navigation'
import axios from 'axios';

axios.defaults.baseURL = 'http://10.10.1.144:1337/api/' //process.env.REACT_APP_BASE_URL
// axios.defaults.headers.common.Authorization = `Bearer ${process.env.REACT_APP_API_TOKEN}`

axios.interceptors.request.use(function (config) {

  // Do something before request is sent
  // console.log (JSON.stringify(config,null,'\t') )
  console.log (process.env.REACT_APP_BASE_URL)
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

export default function App () {
  return (
    <ToastProvider>
      <StateProvider>
          <Drawer />
          <StatusBar style="auto" />
      </StateProvider>
    </ToastProvider>
  );
};