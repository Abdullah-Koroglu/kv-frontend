import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LevelScreen from './pages/Level';
import HomeScreen from './pages/Home';
import QuestionScreen from './pages/Question';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initalRouteName='Home'>
        <Stack.Screen name="Ana Sayfa" component={HomeScreen}/>
        <Stack.Screen name="Seviye" component={LevelScreen}/>
        <Stack.Screen name="Soru" component={QuestionScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;