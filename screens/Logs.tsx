import { View, Text, ScrollView, SafeAreaView, ActivityIndicator, Linking, TouchableOpacity, Vibration, Platform } from 'react-native'
import { useState, useEffect } from 'react'
import { atomSOCKET } from '../services/socket';
import { atomMintLogs, atomMintingOver, atomPic, atomVideo, atomVideoBuffer, atomDescription, atomProfile } from '../services/globals';
import { useAtom } from 'jotai'
import OpenURLButton from '../components/OpenURLButton'
import { atomDarkModeOn, atomDarkMode, atomLightMode } from '../services/globals/darkmode';
import { socketGetLogs } from '../services/socket/function';
import { getHoursFromTimestamp } from '../services/globals/functions'



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
   const [profile, setProfile] = useAtom(atomProfile)

   useEffect(() => {
      const interval = setInterval(() => {
         const getLogs = async () => {
            try {
               const logs = await socketGetLogs(SOCKET, profile.__pubkey__);
               setMintLogs(logs);
            } catch (e) {
               console.error(e);
            }
         }
         getLogs();
      }, 5000);
      return () => clearInterval(interval);
   }, []);


   return (
      <SafeAreaView className={`${darkModeOn ? `bg-${darkMode}` : `bg-${lightMode}`} flex-1`}>
         <View className='border border-white  rounded-xl flex-1 ml-5 mr-5'>
            <ScrollView className=' bg-zinc-800 rounded-xl' contentContainerStyle={{ flexGrow: 1 }}>
               <View className='p-3 text-[#3f6212]'>
                  <View>
                     {mintLogs ? (
                        mintLogs.map((el, i) => (
                           <View key={i}>
                              {el._timestamp ? <Text className=' text-white text-center'> {getHoursFromTimestamp(parseInt(el._timestamp))}</Text> : null}
                              {el._logs ? <Text className='text-xl text-white text-center px-4'> {el._logs}</Text> : null}
                              <Text className='mb-5 text-white text-center'> _________________________________</Text>
                           </View>
                        ))
                     ) : (
                        <Text className='mt-1 text-lg text-white text-center px-4'>- No logs yet</Text>
                     )}
                  </View>
               </View>

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