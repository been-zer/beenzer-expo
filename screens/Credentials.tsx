import { View, Text, TextInput, SafeAreaView, TouchableOpacity, Alert, Animated } from 'react-native'
import { useState, useRef } from 'react'
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import OpenURLButton from '../components/OpenURLButton'
import { fadeIn } from '../services/globals/functions';
import { useAtom } from 'jotai'
import { atomDarkModeOn, atomDarkMode, atomLightMode } from '../services/globals/darkmode'
import { atomPhantomWalletPublicKey, atomRegex } from '../services/globals/index'
import { PublicKey } from '@solana/web3.js'
import { checkUsernameAvailability, handleNewUserCreated } from '../services/socket/function'
import { CheckCircleIcon, XCircleIcon } from 'react-native-heroicons/outline'
import { atomSOCKET } from '../services/socket';


const Credentials = () => {
   const [darkModeOn, setDarkModeOn] = useAtom(atomDarkModeOn);
   const [darkMode, setDarkMode] = useAtom(atomDarkMode);
   const [lightMode, setLightMode] = useAtom(atomLightMode);
   const navigation = useNavigation<NavigationProp<ParamListBase>>()
   const [buttonInactive, setButtonInactive] = useState(true)
   const [username, setUsername] = useState('')
   const [errorText, setErrorText] = useState('')
   const [regex] = useAtom(atomRegex)
   const phantomURL = 'https://phantom.app/ul/'
   const fadeAnim = useRef(new Animated.Value(0)).current;
   const [usernameAvailable, setUsernameAvailable] = useState(false)
   const [SOCKET] = useAtom(atomSOCKET);
   const [phantomWalletPublicKey, setPhantomWalletPublicKey] = useAtom(atomPhantomWalletPublicKey);

   const handleUsername = (text: string) => {
      text.toLowerCase();
      if (text.includes(' ')) {
         setErrorText("No spaces allowed 🥲");
         setButtonInactive(true);
         setUsernameAvailable(false);
      } else if (text.match(regex)) {
         Alert.alert('No SQL injection please 🤓');
         setButtonInactive(true);
         setUsernameAvailable(false);
      } else if (text.length < 3) {
         setErrorText("Minimum 3 letters please 🥲");
         setButtonInactive(true);
         setUsernameAvailable(false);
      } else {
         setErrorText("");
         setUsername(text);
         const check = async () => {
            const availability: boolean = await checkUsernameAvailability(text, SOCKET)
            setUsernameAvailable(availability);
            if (availability) {
               setButtonInactive(false);
            } else {
               setButtonInactive(true);
               setErrorText("Username already taken 🥲");
            }
         }
         check();
      }
   }

   const handleLogin = async (username: string) => {
      username = username.toLowerCase();
      const usernameAvailable = await checkUsernameAvailability(username, SOCKET);
      if (usernameAvailable) {
         const userCreated = await handleNewUserCreated(SOCKET, phantomWalletPublicKey, username, true);
         if (userCreated) {
            navigation.navigate("Home");
         }
      }
   };

   fadeIn(fadeAnim)

   return (
      <SafeAreaView className={`h-full bg-${darkModeOn ? darkMode : lightMode} flex-1 items-center`}  >
         <Animated.View style={{ opacity: fadeAnim }}>
            <View>
               <Text className="text-center my-5 text-green-600 font-bold text-4xl">Welcome </Text>
               <Text className="text-center my-2 text-green-600 font-bold text-4xl"> to Beenzer</Text>
            </View>
         </Animated.View>
         <View className={`border-2 justify-between border-green-600 flex-row rounded-lg w-80 h-18 my-4 p-3`}>
            <TextInput
               className={`text-${darkModeOn ? lightMode : darkMode} flex-1`}
               placeholder="Username"
               placeholderTextColor="gray"
               onChangeText={handleUsername}
               keyboardAppearance={darkModeOn ? 'dark' : 'light'}
               returnKeyType='previous'
            />
            <View>
               {usernameAvailable ? (<CheckCircleIcon color='green' />) : (<XCircleIcon color='red' />)}
            </View>
         </View>
         {
            errorText &&
            <Text className='text-red-600 my-2'>
               {errorText}
            </Text>
         }
         {
            username && !errorText && usernameAvailable &&
            <View className='flex justify-center w-80'>
               < Text className='text-green-600 text-center'>
                  This looks good! Welcome to the community {username} 🥳
               </Text>
            </View>
         }
         <TouchableOpacity
            className={buttonInactive ? "bg-green-600 rounded-lg w-80 h-10 my-4 p-3 opacity-50" : "bg-green-600 rounded-lg w-80 h-10 my-4 p-3"}
            onPress={() => handleLogin(username)}
            disabled={buttonInactive}
         >
            <Text className="font-semibold text-center text-white">
               🚀 Let's go 🚀
            </Text>
         </TouchableOpacity>
         <View>
            <Text className={`text-${darkModeOn ? lightMode : darkMode} text-center my-4`}>
               Or
            </Text>
         </View>
         <OpenURLButton url={phantomURL}>
            Change my wallet
         </OpenURLButton>
      </SafeAreaView >
   );
}

export default Credentials;