import { View, TouchableOpacity, Text, StyleSheet, Alert, SafeAreaView, ScrollView, } from "react-native"
import { NavigationProp, ParamListBase, useIsFocused, useNavigation } from "@react-navigation/native";
import Footer from "./Footer";
import BeenzerMedia from "./BeenzerMedia";
import { useAtom } from "jotai";
import { atomActiveScreen } from '../services/globals';
import { useEffect, useLayoutEffect } from 'react';

const BeenzerMenu = () => {

   const [active, setActive] = useAtom(atomActiveScreen)
   const isFocused = useIsFocused();

   useEffect(() => {
      if (isFocused) {
         setActive('BeenzerMenu')
      }
   }, [isFocused]);

   return (
      <SafeAreaView className='h-full bg-zinc-900 flex-1 ' style={StyleSheet.absoluteFillObject}>
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