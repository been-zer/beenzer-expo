import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import Login from './screens/Login';
import Home from './screens/Home';
import Credentials from './screens/Credentials';
import BeenzerMenu from './screens/BeenzerMenu';

const Stack = createNativeStackNavigator();

const headerHide = {
  headerShown: false,
};

export default function App() {
  return (
    <View className={`flex-1 h-screen pt-8 bg-zinc-900`}>
      < NavigationContainer >
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={headerHide} />
          <Stack.Screen
            name="Credentials"
            component={Credentials}
            options={{
              headerShown: true,
              headerTitle: 'Sign Up',
              headerTransparent: true,
              headerTintColor: 'white',
              headerBackTitle: 'Back',
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen name="Home" component={Home} options={headerHide} />
          <Stack.Screen name="BeenzerMenu" component={BeenzerMenu} options={{
            headerShown: true,
            headerTitle: 'New Beenzer',
            headerTransparent: true,
            headerTintColor: 'white',
            headerBackVisible: false,
          }} />
        </Stack.Navigator>
      </NavigationContainer >
    </View>
  );
}
