import { View, Text, SafeAreaView, KeyboardAvoidingView, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native'
import { atomDarkMode, atomDarkModeOn, atomLightMode } from '../services/globals/darkmode'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { socketGetMessages, socketSendMessages } from '../services/socket/function'
import { atomProfile } from '../services/globals'
import { atomSOCKET } from '../services/socket/index'
import { IMessage, IProfile } from '../Types'
import { Socket } from 'socket.io-client'
import { getDate } from '../services/globals/functions'

const DirectMessages = ({ friendPubkey }: { friendPubkey: IProfile }) => {

   const [darkMode, setDarkMode] = useAtom(atomDarkMode);
   const [darkModeOn, setDarkModeOn] = useAtom(atomDarkModeOn);
   const [lightMode, setLightMode] = useAtom(atomLightMode);
   const [profile, setProfile] = useAtom(atomProfile);
   const [SOCKET] = useAtom(atomSOCKET);
   const [messages, setMessages] = useState<IMessage[]>([])
   const [message, setMessage] = useState('')
   const [handleChanged, setHandleChanged] = useState(false)


   useEffect(() => {
      const getMessages = async () => {
         const messages = await socketGetMessages(SOCKET, profile[0].__pubkey__, friendPubkey.__pubkey__)
         setMessages(messages)
      }
      getMessages()
   }, [handleChanged])

   const handleSendMessage = async (e: any) => {
      const message = e.nativeEvent.text
      const sendMessage = async () => {
         const res = await socketSendMessages(SOCKET, profile[0].__pubkey__, friendPubkey.__pubkey__, message)
      }
      sendMessage()
      setMessage('')
      setHandleChanged(!handleChanged)
   }
   const number = 1673960196550
   const getMessageDetails = (number: number) => {
      const date = getDate(number)
      return date
   }

   const handleLike = () => {
      console.log('like')
   };

   return (
      <SafeAreaView className={`${darkModeOn ? `bg-${darkMode}` : `bg-white`} h-full flex-1 `}  >
         <View className='flex-row justify-center items-center'>
            <Image
               source={{ uri: friendPubkey._pfp }}
               className='w-10 h-10 rounded-full ml-2 mt-2 mr-2'
            />
            <Text
               className={`${darkModeOn ? `text-${lightMode}` : `text-black`} text-2xl font-bold`}>
               {friendPubkey._username_}</Text>
         </View>
         <TextInput
            className=' rounded-2xl bg-gray-200 p-5 h-20 ml-1 mt-2 mr-1'
            textAlign='center'
            placeholder="Type here"
            onSubmitEditing={handleSendMessage}
            value={message}
            onChange={(e) => setMessage(e.nativeEvent.text)}
         />
         <ScrollView className='flex-1  mt-2 mx-1'>
            {messages.reverse().map((item: IMessage, index) => {
               return (
                  <View key={index}>
                     {item._owner === profile[0].__pubkey__ &&
                        <View className='flex-col'>
                           <View className='flex-row justify-start flex-1 items-center mt-1'>
                              <Image source={{ uri: friendPubkey._pfp }} className='w-10 h-10 rounded-full ml-2 mt-2 mr-2' />
                              <TouchableOpacity onPress={handleLike}>
                                 <View className={`border${darkModeOn ? `border-${lightMode}` : `border-black`} bg-white rounded-2xl p-3 `} >
                                    <Text className='text-black text-xl'>{item._message}</Text>
                                    <Text className='text-black text-xs self-end'>{getMessageDetails(item._timestamp)}</Text>
                                 </View>
                              </TouchableOpacity>
                           </View>
                        </View>
                     }
                     {
                        item._owner !== profile[0].__pubkey__ &&
                        <View className='flex-col'>
                           <View className='flex-row justify-end flex-1 items-center mt-1'>
                              <View className='bg-green-500 rounded-2xl p-3 ' >
                                 <Text className='text-white text-xl'>{item._message}</Text>
                                 <Text className='text-white text-xs self-end'>{getMessageDetails(item._timestamp)}</Text>
                              </View>
                              <Image source={{ uri: profile[0]._pfp }} className='w-10 h-10 rounded-full ml-2 mt-2 mr-2' />
                           </View>
                        </View>
                     }
                  </View>
               )
            })}
         </ScrollView>
      </SafeAreaView >
   )
}

export default DirectMessages