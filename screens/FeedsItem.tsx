
import { Dimensions, StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import React from "react";
import { INFT } from "../Types";
import { atomDarkModeOn, atomDarkMode, atomLightMode } from "../services/globals/darkmode";
import { useAtom } from "jotai";

const FeedsItem = ({ feedItem }: { feedItem: INFT }) => {

   const [darkMode, setDarkMode] = useAtom(atomDarkMode);
   const [lightMode, setLightMode] = useAtom(atomLightMode);
   const [darkModeOn, setDarkModeOn] = useAtom(atomDarkModeOn);

   return (
      <View
         className={`${darkModeOn ? `bg-${darkMode}` : `bg-white`} flex-1 w-screen h-screen `}
      >
         <Image
            source={{ uri: feedItem._asset }}
            style={{ width: '100%', height: '100%' }}
            resizeMode="contain"
         />
      </View >
   );
};


export default FeedsItem;