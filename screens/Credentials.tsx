import { View, Text, TextInput, SafeAreaView, TouchableOpacity, Alert, Animated } from 'react-native'
import { useState, useRef } from 'react'
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import OpenURLButton from '../components/OpenURLButton'
import { fadeIn } from '../services/Functions';


const Credentials = () => {

   const navigation = useNavigation<NavigationProp<ParamListBase>>()
   const [buttonActive, setButtonActive] = useState(true)
   const [username, setUsername] = useState('')
   const [errorText, setErrorText] = useState('')
   const regex = new RegExp(/(\s*([\0\b\'\"\n\r\t\%\_\\]*\s*(((select\s*.+\s*from\s*.+)|(insert\s*.+\s*into\s*.+)|(update\s*.+\s*set\s*.+)|(delete\s*.+\s*from\s*.+)|(drop\s*.+)|(truncate\s*.+)|(alter\s*.+)|(exec\s*.+)|(\s*(all|any|not|and|between|in|like|or|some|contains|containsall|containskey)\s*.+[\=\>\<=\!\~]+.+)|(let\s+.+[\=]\s*.*)|(begin\s*.*\s*end)|(\s*[\/\*]+\s*.*\s*[\*\/]+)|(\s*(\-\-)\s*.*\s+)|(\s*(contains|containsall|containskey)\s+.*)))(\s*[\;]\s*)*)+)/i)
   const phantomURL = 'https://phantom.app/ul/'
   const fadeAnim = useRef(new Animated.Value(0)).current;



   const handleUsername = (text: string) => {
      if (text.includes(' ')) {
         setErrorText("No spaces allowed 🥲")
         setButtonActive(true)
         return
      }
      if (text.match(regex)) {
         Alert.alert('No SQL injection please 🤓')
         setButtonActive(true)
         return
      }
      setErrorText("")
      if (text.length < 3) {
         setErrorText("Minimum 3 letters please 🥲")
         setButtonActive(true)
      } else {
         setButtonActive(false)
      }
      setUsername(text)
   }

   const login = (username: string) => {
      if (errorText) {
         return
      } else {
         navigation.navigate('Home')
      }
   }

   fadeIn(fadeAnim)


   return (
      <SafeAreaView className="h-full bg-zinc-900 flex-1 items-center"  >
         <Animated.View style={{ opacity: fadeAnim }}>
            <View>
               <Text className="text-center my-5 text-green-600 font-bold text-4xl">Welcome </Text>
               <Text className="text-center my-2 text-green-600 font-bold text-4xl"> to Beenzer</Text>
            </View>
         </Animated.View>
         <TextInput
            className="border-2  border-green-600 text-white rounded-lg w-80 h-18 my-4 p-3"
            placeholder="Username"
            placeholderTextColor="white"
            onChangeText={handleUsername}
            value={username}
            keyboardAppearance='dark'
            returnKeyType='previous'
         />
         {errorText &&
            <Text className='text-red-600 my-2'>
               {errorText}
            </Text>
         }
         {username && !errorText &&
            <View className='flex justify-center w-80'>
               < Text className='text-green-600 text-center'>
                  This looks good! Welcome to the community {username} 🥳
               </Text>
            </View>}
         <TouchableOpacity
            className={buttonActive ? "bg-green-600 rounded-lg w-80 h-10 my-4 p-3 opacity-50" : "bg-green-600 rounded-lg w-80 h-10 my-4 p-3"}
            onPress={() => login(username)}
            disabled={buttonActive}
         >
            <Text className="font-semibold text-center text-white">
               🚀 Let's go 🚀
            </Text>
         </TouchableOpacity>
         <View>
            <Text className="text-white text-center my-4">
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



