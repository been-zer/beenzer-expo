import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import Logs from './Logs'
import DisplayButton from '../components/DisplayButton'
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { useAtom } from 'jotai'
import { atomDisplay } from '../services/globals'
import { atomDarkMode, atomDarkModeOn, atomLightMode } from '../services/globals/darkmode';

const Notifications = () => {

   const [display, setDisplay] = useAtom(atomDisplay)
   const navigation = useNavigation<NavigationProp<ParamListBase>>();
   const [darkMode, setDarkMode] = useAtom(atomDarkMode);
   const [lightMode, setLightMode] = useAtom(atomLightMode);
   const [darkModeOn, setDarkModeOn] = useAtom(atomDarkModeOn);

   return (
      <SafeAreaView className={`${darkModeOn ? `bg-${darkMode}` : `bg-${lightMode}`} h-full flex-1`}>
         <View className='flex-row justify-around'>
            <DisplayButton title='Notifications' setDisplay={setDisplay} display={display} />
            <DisplayButton title='Logs' setDisplay={setDisplay} display={display} />
         </View>
         {display === 'Logs' && <Logs />}
         {display === 'Notifications' &&
            <View className='flex-1 justify-center items-center'>
               <Text className={`${darkModeOn ? `text-${lightMode}` : 'text-black'} text-2xl`}>No notifications yet</Text>
            </View>}
         <View className=' justify-center items-center'>
            <TouchableOpacity
               className="mt-2 w-1/2 bg-green-600  p-4 rounded-2xl "
               onPress={() => navigation.navigate('Home')}
            >
               <Text className="font-semibold text-center">Back to Home</Text>
            </TouchableOpacity>
         </View>
      </SafeAreaView>
   )
}

export default Notifications