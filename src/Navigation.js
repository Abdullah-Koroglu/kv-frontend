import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LevelScreen from './pages/Level';
import HomeScreen from './pages/Home';
import QuestionScreen from './pages/Question';
import { Button } from 'react-native';
import MuteButton from './components/MuteButton';

const Stack = createNativeStackNavigator();

function App({sound}) {
  const generalHeaderOption = {
    headerStyle: {
      backgroundColor: 'black',
    },
    headerTintColor: '#fff',
    headerRight: () => (
      <MuteButton
        sound={sound}
      />
    ),
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initalRouteName='Home'>
        <Stack.Screen options={generalHeaderOption} name="Ana Sayfa" component={HomeScreen}/>
        <Stack.Screen options={generalHeaderOption} name="Seviye" component={LevelScreen}/>
        <Stack.Screen options={generalHeaderOption} name="Soru" component={QuestionScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;