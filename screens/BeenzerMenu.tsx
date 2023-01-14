import { View, TouchableOpacity, Text, StyleSheet, Alert, SafeAreaView, ScrollView, } from "react-native"
import { NavigationProp, ParamListBase, useIsFocused, useNavigation } from "@react-navigation/native";
import Footer from "./Footer";
import BeenzerMedia from "./BeenzerMedia";
import { useAtom } from "jotai";
import { atomActiveScreen } from '../services/globals';
import { useEffect, useLayoutEffect } from 'react';
import { atomDarkMode, atomDarkModeOn, atomLightMode } from '../services/globals/darkmode';

const BeenzerMenu = () => {

   const [active, setActive] = useAtom(atomActiveScreen)
   const isFocused = useIsFocused();
   const [darkMode, setDarkMode] = useAtom(atomDarkMode);
   const [lightMode, setLightMode] = useAtom(atomLightMode);
   const [darkModeOn, setDarkModeOn] = useAtom(atomDarkModeOn);

   useEffect(() => {
      if (isFocused) {
         setActive('BeenzerMenu')
      }
   }, [isFocused]);

   return (
      <SafeAreaView className={`h-full flex-1 ${darkModeOn ? `bg-${darkMode}` : `bg-${lightMode}`}`} style={StyleSheet.absoluteFillObject}>
         <ScrollView >
            <View className="flex-1 justify-evenly items-center my-20">
               <BeenzerMedia title='New Beenzer 🎤' menu="audio" />
               <BeenzerMedia title='New Beenzer 📷' menu="photo" />
               <BeenzerMedia title='New Beenzer 🎥' menu="video" />
            </View>
         </ScrollView>
         <Footer />
      </SafeAreaView >
   )
};

export default BeenzerMenu;