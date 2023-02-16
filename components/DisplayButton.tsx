import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Dispatch, SetStateAction } from 'react'
import { atomDarkMode, atomDarkModeOn, atomLightMode } from '../services/globals/darkmode';
import { useAtom } from 'jotai';

const DisplayButton = ({ title, setDisplay, display, setShowItem }:
   {
      title: string, setDisplay: Dispatch<SetStateAction<string>>, display: string, setShowItem: Dispatch<SetStateAction<boolean>> | undefined
   }) => {

   const changeDisplay = (display: string) => {
      setDisplay(display)
      if (title === 'Map' && setShowItem) {
         setShowItem(false)
      }
   }

   const [darkMode, setDarkMode] = useAtom(atomDarkMode);
   const [lightMode, setLightMode] = useAtom(atomLightMode);
   const [darkModeOn, setDarkModeOn] = useAtom(atomDarkModeOn);


   return (
      <TouchableOpacity className='justify-center items-center mb-2 mt-2' onPress={() => changeDisplay(title)}>
         <Text className={title === display ? 'text-green-500 underline font-extrabold text-2xl' : darkModeOn ? `text-${lightMode}` : `text-${darkMode}`}>{title}</Text>
      </TouchableOpacity>
   )
}

const styles = StyleSheet.create({
   underlineText: {
      textDecorationLine: 'underline',
      textDecorationStyle: 'solid',
      textDecorationColor: 'white',
      color: 'white',
      fontWeight: 'bold'
   },
   normalText: {
      color: 'white',
      fontWeight: 'bold'
   }
})

export default DisplayButton