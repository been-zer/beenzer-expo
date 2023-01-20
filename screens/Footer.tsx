import { View, Text, TouchableOpacity, Image } from 'react-native'
import { useEffect, useState } from 'react'
import { MapIcon, UserIcon, UsersIcon, ChatBubbleOvalLeftEllipsisIcon, PlusCircleIcon } from 'react-native-heroicons/outline'
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { atomActiveScreen } from '../services/globals'
import { useAtom } from 'jotai'
import { atomDarkModeOn, atomDarkMode, atomLightMode } from '../services/globals/darkmode';

export default function Footer() {
   const navigation = useNavigation<NavigationProp<ParamListBase>>();
   const [active, setActive] = useAtom(atomActiveScreen)
   const [darkModeOn, setDarkModeOn] = useAtom(atomDarkModeOn)
   const [darkMode, setDarkMode] = useAtom(atomDarkMode)
   const [lightMode, setLightMode] = useAtom(atomLightMode)

   const handleNavigation = (screen: string) => {
      navigation.navigate(screen)
      setActive(screen)
   }

   return (
      <View className={`flex-row justify-between items-center ${darkModeOn ? 'bg-zinc-900 /80' : `bg-${lightMode}`} `}>
         <TouchableOpacity className=' flex-col w-16 h-16  justify-center items-center '
            onPress={() => handleNavigation('Home')}         >
            <MapIcon size={35} color='#16a34a' />
            {active === 'Home' && <View className='bg-green-500 w-2 h-2 rounded-full' />}
         </TouchableOpacity>

         <TouchableOpacity className=' flex-col  w-16 h-16 justify-center items-center' onPress={() => handleNavigation('Feed')}>
            <UsersIcon size={35} color='#16a34a' />
            {active === 'Feed' && <View className='bg-green-500 w-2 h-2 rounded-full' />}
         </TouchableOpacity>

         <TouchableOpacity className=' flex-col w-24 h-16 justify-center items-center' onPress={() => handleNavigation('Picture')} onLongPress={() => handleNavigation('BeenzerMenu')}>
            <PlusCircleIcon size={35} color='#16a34a' />
            {active === 'BeenzerMenu' && <View className='bg-green-500 w-2 h-2 rounded-full' />}
         </TouchableOpacity>

         <TouchableOpacity className='flex-col w-20 h-16 justify-center items-center' onPress={() => handleNavigation('Messages')}>
            <ChatBubbleOvalLeftEllipsisIcon size={35} color='#16a34a' />
            {active === 'Messages' && <View className='bg-green-500 w-2 h-2 rounded-full' />}
         </TouchableOpacity>

         <TouchableOpacity className=' flex-col w-16 h-16 justify-center items-center' onPress={() => handleNavigation('Profile')}>
            <UserIcon size={35} color='#16a34a' />
            {active === 'Profile' && <View className='bg-green-500 w-2 h-2 rounded-full' />}
         </TouchableOpacity>
      </View >
   )
}