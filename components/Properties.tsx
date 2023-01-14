import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { atomDarkMode, atomDarkModeOn, atomLightMode } from '../services/globals/darkmode';
import { useAtom } from 'jotai';

const Properties = ({ props, propsTitle }: { props: string | number | undefined, propsTitle: string }) => {

   const [darkMode, setDarkMode] = useAtom(atomDarkMode);
   const [lightMode, setLightMode] = useAtom(atomLightMode);
   const [darkModeOn, setDarkModeOn] = useAtom(atomDarkModeOn);

   return (
      <View style={styles.rectangle}>
         <Text className='text-green-800'>{propsTitle}</Text>
         <Text className={
            darkModeOn ? 'text-gray-300' : 'text-gray-800'
         }>{props}</Text>
      </View>
   )
}

export default Properties

const styles = StyleSheet.create({
   rectangle: {
      padding: 10,
      margin: 1,
   },
})