import { View, Text, SafeAreaView, KeyboardAvoidingView, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native'
import { atomDarkMode, atomDarkModeOn, atomLightMode } from '../services/globals/darkmode'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { socketGetMessages, socketSendMessages, socketLikeMessage, socketUnlikeMessage } from '../services/socket/function'
import { atomProfile } from '../services/globals'
import { atomSOCKET } from '../services/socket/index'
import { IMessage, IProfile } from '../Types'
import { getHoursFromTimestamp } from '../services/globals/functions'

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
      getMessages()
   }, [handleChanged])


   const getMessages = async () => {
      const ResMessages = await socketGetMessages(SOCKET, profile[0].__pubkey__, friendPubkey.__pubkey__)
      ResMessages.sort((a, b) => {
         return b._timestamp - a._timestamp
      })
      ResMessages.map((message) => {
         message.date = getMessageDetails(message._timestamp)
      })
      setMessages(ResMessages)
   }

   const handleSendMessage = async (e: any) => {
      const text = e.nativeEvent.text
      const sendMessage = async () => {
         const res = await socketSendMessages(SOCKET, profile[0].__pubkey__, friendPubkey.__pubkey__, text)
      }
      sendMessage()
      setMessage('')
      setHandleChanged(!handleChanged)
   }

   const getMessageDetails = (number: number) => {
      const date = getHoursFromTimestamp(number)
      return date
   }

   const handleLike = (item: IMessage) => {
      if (item._liked) {
         const unlikeMessage = async () => {
            const res = await socketUnlikeMessage(SOCKET, profile[0].__pubkey__, friendPubkey.__pubkey__, item._timestamp)
         };
         unlikeMessage()
         setHandleChanged(!handleChanged)
         return
      }
      const likeMessage = async () => {
         const res = await socketLikeMessage(SOCKET, profile[0].__pubkey__, friendPubkey.__pubkey__, item._timestamp)
      };
      likeMessage()
      setHandleChanged(!handleChanged)
   }

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
            className=' rounded-2xl bg-gray-200 p-3 h-10 ml-1 mt-2 mr-1'
            textAlign='center'
            placeholder="Type here"
            onSubmitEditing={handleSendMessage}

            value={message}
            onChange={(e) => setMessage(e.nativeEvent.text)}
         />
         <ScrollView className='flex-1  mt-2 mx-1'>
            {messages.map((item: IMessage, index) => {
               return (
                  <View key={index}>
                     {item._owner === profile[0].__pubkey__ &&
                        <View className='flex-col'>
                           <View className='flex-row justify-start flex-1 items-center mt-2'>
                              <Image source={{ uri: friendPubkey._pfp }} className='w-10 h-10 rounded-full  ml-2 mt-7 mr-2' />
                              <TouchableOpacity onLongPress={() => handleLike(item)}>
                                 <View className={`border ${darkModeOn ? `border-${lightMode}` : `border-green-500`} bg-white rounded-2xl rounded-bl-none p-2 w-[220px] `} >
                                    <Text className='text-black text-[16px]'>{item._message}</Text>
                                 </View>
                                 <Text className={`${darkModeOn ? `text-${lightMode}` : `text-black`} text-xs self-start`}>{item.date}</Text>
                              </TouchableOpacity>
                              {item._liked && <Text className='ml-1'>❤️</Text>}
                           </View>
                        </View>
                     }
                     {
                        item._owner !== profile[0].__pubkey__ &&
                        <View className='flex-col'>
                           <View className='flex-row justify-end flex-1 items-center mt-2'>
                              <View>
                                 <View className=' flex-1 items-center mt-1'>
                                    <View className={`bg-green-500 rounded-2xl rounded-br-none p-2 w-[220px] `} >
                                       <Text className='text-white text-[16px]'>{item._message}</Text>
                                    </View>
                                    <Text className={`${darkModeOn ? `text-${lightMode}` : `text-black`} text-xs self-end`}>{item.date}</Text>
                                 </View>
                              </View>
                              <Image source={{ uri: profile[0]._pfp }} className=' w-10 h-10 rounded-full ml-2 mt-7 mr-2' />
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