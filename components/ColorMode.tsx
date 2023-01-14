import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { atomDarkMode, atomDarkModeOn, atomLightMode } from '../services/globals/darkmode';
import { useAtom } from 'jotai';

const ColorMode = () => {

   const [darkMode, setDarkMode] = useAtom(atomDarkMode);
   const [lightMode, setLightMode] = useAtom(atomLightMode);
   const [darkModeOn, setDarkModeOn] = useAtom(atomDarkModeOn);

   return (
      <>
         < View >
            <TouchableOpacity onPress={() => setDarkModeOn(!darkModeOn)
            }>
               {darkModeOn ? (
                  <Ionicons name="ios-moon" size={24} color={`${lightMode}`} />
               ) : (
                  <Ionicons name="ios-sunny" size={24} color="black" />
               )}
            </TouchableOpacity>
         </View >
      </>
   );
}

export default ColorMode