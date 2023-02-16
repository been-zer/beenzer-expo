import { View, Text, ScrollView, SafeAreaView, ActivityIndicator, Linking, TouchableOpacity, Vibration, Platform } from 'react-native'
import { useState } from 'react'
import { atomSOCKET } from '../services/socket';
import { atomMintLogs, atomMintingOver, atomPic, atomVideo, atomVideoBuffer, atomDescription } from '../services/globals';
import { useAtom } from 'jotai'
import OpenURLButton from '../components/OpenURLButton'
import { atomDarkModeOn, atomDarkMode, atomLightMode } from '../services/globals/darkmode';

const Logs = () => {

   const [mintLogs, setMintLogs] = useAtom(atomMintLogs)
   const [mintingOver, setMintingOver] = useAtom(atomMintingOver)
   const [SOCKET] = useAtom(atomSOCKET)
   const [pic, setPic] = useAtom(atomPic)
   const phantomURL = 'https://phantom.app/ul/'
   const [darkModeOn, setDarkModeOn] = useAtom(atomDarkModeOn)
   const [darkMode, setDarkMode] = useAtom(atomDarkMode)
   const [lightMode, setLightMode] = useAtom(atomLightMode)
   const [video, setVideo] = useAtom(atomVideo)
   const [videoBuffer, setVideoBuffer] = useAtom(atomVideoBuffer)
   const [description, setDescription] = useAtom(atomDescription)

   SOCKET.on('mintLogs', (data: string) => {
      setMintingOver(false);
      if (data === 'false') {
         setMintLogs(prev => [...prev, 'Minting failed, something went wrong. Please try again.'])
         setMintingOver(true);
      }
      else if (data !== 'true') {
         setPic('')
         setDescription('')
         setVideoBuffer(null)
         setVideo(null)
         setMintLogs((prev) => [...prev, data])
      } else if (data === 'true') {
         setMintingOver(true);
         Vibration.vibrate(1000);
         setMintLogs(prev => [...prev, 'Minting complete. Go to your profile or to phantom to view your NFT'])
         // setMintLogs([]);
      }
      console.log(data)
   })

   return (
      <SafeAreaView className={`${darkModeOn ? `bg-${darkMode}` : `bg-${lightMode}`} flex-1`}>
         <View className='border border-white  rounded-xl flex-1 ml-5 mr-5'>
            <ScrollView className=' bg-zinc-800 rounded-xl' contentContainerStyle={{ flexGrow: 1 }}>
               {mintLogs.map((log, index) => {
                  return (
                     <View className='p-3 mt-1 text-[#3f6212]' key={index}>
                        <View>
                           <Text className='mt-1 text-lg text-white text-center px-4'>✅ {log}</Text>
                        </View>
                     </View>
                  )
               })}
            </ScrollView >
         </View >
         {!mintingOver && <ActivityIndicator className='mt-2' size="large" color="green" />}
         {mintingOver && Platform.OS === 'ios' &&
            <OpenURLButton url={phantomURL}>
               Go to phantom
            </OpenURLButton>}
      </SafeAreaView >
   );
};

export default Logs