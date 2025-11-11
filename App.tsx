import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, StatusBar, View, Text } from 'react-native';
import Login from './screens/Login';
import Home from './screens/Home';
import Credentials from './screens/Credentials';
import BeenzerMenu from './screens/BeenzerMenu';
import PostBeenzer from './screens/PostBeenzer';
import { atomDarkModeOn, atomDarkMode, atomLightMode } from './services/globals/darkmode';
import { atomFriendPubkey, atomFriendsNFT } from './services/globals';
import { useAtom } from 'jotai';
import Picture from './screens/Picture';
import Logs from './screens/Logs';
import Profile from './screens/Profile';
import Logout from './screens/Logout';
import EditProfile from './screens/EditProfile';
import Notifications from './screens/Notifications';
import ColorMode from './components/ColorMode';
import ProfileFriends from './screens/ProfileFriends';
import Messages from './screens/Messages';
import DirectMessages from './screens/DirectMessages';
import Feed from './screens/Feed';
// import { Logs as ConsoleLog } from 'expo'

// ConsoleLog.enableExpoCliLogging()

const Stack = createNativeStackNavigator();

const headerHide = {
  headerShown: false,
  // presentation: 'modal',
  // animationTypeForReplace: 'push',
  // animation: 'slide_from_right',
};

export default function App() {

  const [darkModeOn, setDarkModeOn] = useAtom(atomDarkModeOn);
  const [darkMode, setDarkMode] = useAtom(atomDarkMode);
  const [lightMode, setLightMode] = useAtom(atomLightMode);
  const [friendPubkey, setFriendPubkey] = useAtom(atomFriendPubkey);
  const changeDarkMode = `${darkModeOn ? `${lightMode}` : "black"}`;
  const [friendsNFTs, setFriendsNFTs] = useAtom(atomFriendsNFT);

  return (
    <View className={`${darkModeOn ? `bg-${darkMode}` : `bg-${lightMode}`} flex-1`}>
      <StatusBar barStyle={darkModeOn ? 'light-content' : 'dark-content'} />
      < NavigationContainer >
        <Stack.Navigator
        >
          <Stack.Screen name="Login" component={Login} options={{
            headerShown: false,
            animation: 'none',
          }} />
          <Stack.Screen
            name="Credentials"
            component={Credentials}
            options={{
              headerShown: true,
              headerTitle: 'Sign Up',
              headerTransparent: true,
              headerTintColor: changeDarkMode,
              headerBackTitle: 'Back',
              headerBackTitleVisible: false,
              animation: 'none',
            }}
          />
          <Stack.Screen name="Home" component={Home} options={{
            headerShown: false,
            animation: 'none',
          }} />
          <Stack.Screen name="BeenzerMenu" component={BeenzerMenu} options={{
            headerTitleStyle: {
              color: changeDarkMode,
            },
            headerShown: true,
            headerTitle: 'New Beenzer',
            headerTransparent: true,
            headerTintColor: changeDarkMode,
            headerBackVisible: false,
            animation: 'none',

          }} />
          <Stack.Screen name="Picture" component={Picture} options={{
            headerTitle: '',
            headerTransparent: true,
            headerTintColor: changeDarkMode,
            headerBackTitle: '',
            headerBackVisible: true,
            headerBackButtonMenuEnabled: true,
            animation: 'none',
          }} />
          <Stack.Screen name="Logs" component={Logs} options={{
            headerTitle: 'Logs',
            headerTransparent: true,
            headerBackVisible: false,
            headerTintColor: changeDarkMode,
            animation: 'none',
          }} />
          <Stack.Screen name="Profile" component={Profile} options={{
            headerTitle: 'Profile',
            headerTransparent: true,
            headerBackVisible: false,
            headerTintColor: changeDarkMode,
            headerRight: () => (<Logout />),
            headerLeft: () => (<ColorMode />),
            animation: 'none',
          }} />
          <Stack.Screen name="EditProfile" component={EditProfile} options={{
            headerTitle: 'Edit Profile',
            headerTransparent: true,
            headerBackVisible: true,
            headerTintColor: changeDarkMode,
            animation: 'none',
          }} />
          <Stack.Screen name="ProfileFriends"
            options={{
              headerTitle: 'Friend Profile',
              headerTransparent: true,
              headerBackVisible: true,
              headerBackTitle: '',
              headerTintColor: changeDarkMode,
              animation: 'none',
            }}>
            {(props) => <ProfileFriends {...props} friendPubkey={friendPubkey} />}
          </Stack.Screen>
          <Stack.Screen name="PostBeenzer" component={PostBeenzer} options={{ animation: 'none', }} />
          <Stack.Screen name="Notifications" component={Notifications} options={{
            headerShown: false,
            animation: 'none',
          }} />
          <Stack.Screen name="Messages" component={Messages} options={{
            headerTitle: 'Messages',
            headerTransparent: true,
            headerBackVisible: false,
            headerBackTitle: '',
            headerTintColor: changeDarkMode,
            animation: 'none',
          }} />
          <Stack.Screen name="DirectMessages"
            options={{
              headerTransparent: true,
              headerTitle: '',
              headerBackVisible: true,
              headerBackTitle: '',
              headerTintColor: changeDarkMode,
              animation: 'none',
            }} >
            {(props) => <DirectMessages {...props} friendPubkey={friendPubkey} />}
          </Stack.Screen>
          <Stack.Screen name="Feed"
            options={{
              headerTransparent: true,
              headerTintColor: changeDarkMode,
              animation: 'none',
              headerTitle: 'Friends Feed',
              headerBackVisible: false,
            }} >
            {(props) => <Feed {...props} feedItems={friendsNFTs} setHideMenu={undefined} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer >
    </View >
  );
}
