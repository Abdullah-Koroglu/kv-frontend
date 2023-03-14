import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { StateProvider } from './src/context/StateContext';
import { ToastProvider } from 'react-native-toast-notifications'
import Drawer from './src/Navigation'
import axios from 'axios';
import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL //'http://10.10.1.144:1337/api/'
// axios.defaults.headers.common.Authorization = `Bearer ${process.env.REACT_APP_API_TOKEN}`

axios.interceptors.request.use(function (config) {

  // Do something before request is sent
  console.log (JSON.stringify(config,null,'\t') )
  // console.log (process.env.REACT_APP_BASE_URL)
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

export default function App () {
  const [sound, setSound] = useState ();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(require('./assets/musics/2004.mp3'), {isLooping: true, isMuted: true /* WILL DELETE */});
    setSound(sound);
    await sound.playAsync();
  }

  useEffect (() => {
    playSound ()
  }, [])

  useEffect(() => {
    // playSound ()
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);



  return (
    <ToastProvider>
      <StateProvider>
          <Drawer sound={sound}/>
          <StatusBar style="auto" />
      </StateProvider>
    </ToastProvider>
  );
};