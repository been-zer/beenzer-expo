import { StyleSheet, View, FlatList, Dimensions, Text, SafeAreaView } from "react-native";
import { useAtom } from 'jotai'
import FeedsItem from "./FeedsItem";
import { INFT } from "../Types";
import { useEffect } from "react";
import Footer from "./Footer";
import { atomDarkMode, atomDarkModeOn } from "../services/globals/darkmode";
import { atomIsLogin } from "../services/globals";

const Feed = ({ feedItems, setHideMenu }: {
   feedItems: INFT[], setHideMenu: React.Dispatch<React.SetStateAction<boolean>> | undefined,
}) => {

   const [darkMode, setDarkMode] = useAtom(atomDarkMode);
   const [darkModeOn, setDarkModeOn] = useAtom(atomDarkModeOn);
   const [isLogin, setIsLogin] = useAtom(atomIsLogin);

   useEffect(() => {
      if (setHideMenu) {
         setHideMenu(false)
      }
   }, [])

   if (!isLogin && setHideMenu == undefined) {
      return (
         <SafeAreaView className={`${darkModeOn ? `bg-${darkMode}` : `bg-white`} h-full flex-1 `}>
            <View className="flex justify-center items-center flex-1">
               <Text className={`${darkModeOn ? `text-white` : `text-${darkMode}`} text-2xl font-bold text-center`}>
                  Please login to phantom to use this functionality
               </Text>
            </View>
            <Footer />
         </SafeAreaView >
      )
   }

   return (
      <SafeAreaView className={`${darkModeOn ? `bg-${darkMode}` : `bg-white`} h-full flex-1 `}>
         {feedItems.length == 0 &&
            <View className="flex justify-center items-center flex-1">
               <Text className="text-2xl font-bold">No NFTs to show</Text>
            </View>}
         {feedItems.length > 0 &&
            <FlatList
               data={feedItems}
               renderItem={({ item }) => <FeedsItem feedItem={item} />}
               keyExtractor={(item) => item.__token__}
               snapToAlignment="start"
               decelerationRate={"fast"}
               snapToInterval={Dimensions.get("window").height}
            />}
         <Footer />
      </SafeAreaView >
   )
}


export default Feed