import { Image, TouchableOpacity, View, SafeAreaView, Text, Vibration, Animated } from "react-native";
import { useEffect, useLayoutEffect, useRef } from "react";
import { connect } from "../services/phantom/login"
import * as Linking from "expo-linking";
import { useAtom } from "jotai";
import { atomDeepLink, atomDappKeyPair } from "../services/globals";
import PhantomEffect from "./PhantomEffect";
import { useNavigation } from "@react-navigation/native";
import { atomDarkModeOn, atomDarkMode, atomLightMode, atomPinkMode, useSwipe } from "../services/globals/darkmode";
import { fadeIn } from "../services/globals/functions";
import ColorMode from "../components/ColorMode";

const Login = () => {

   const [deepLink, setDeepLink] = useAtom(atomDeepLink)
   const [dappKeyPair] = useAtom(atomDappKeyPair)
   const navigation = useNavigation();
   const [darkModeOn, setDarkModeOn] = useAtom(atomDarkModeOn);
   const [darkMode, setDarkMode] = useAtom(atomDarkMode);
   const [lightMode, setLightMode] = useAtom(atomLightMode);
   const fadeAnim = useRef(new Animated.Value(0)).current;
   const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6)


   function onSwipeLeft() {
      setDarkModeOn(!darkModeOn)
   }
   function onSwipeRight() {
      setDarkModeOn(!darkModeOn)
   }

   const handleLogin = () => {
      connect(dappKeyPair);
   };

   useEffect(() => {
      (async () => {
         const initialUrl = await Linking.getInitialURL();
         if (initialUrl) {
            setDeepLink(initialUrl);
         }
      })();
      const listener = Linking.addEventListener('url', handleDeepLink);
      return () => {
         listener.remove();
      };
   }, []);

   const handleDeepLink = ({ url }: Linking.EventType) => {
      setDeepLink(url);
   };

   fadeIn(fadeAnim)

   return (
      <>
         <View onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} className={`${darkModeOn ? `bg-${darkMode}` : `bg-white`} flex-auto justify-evenly`}>
            <View className=" flex-row ">
               <View className='flex-1 justify-center items-center'>
                  <ColorMode />
               </View>
            </View>
            <View className="self-center">
               <Image
                  style={{ tintColor: darkModeOn ? 'white' : 'black' }}
                  className="h-36 w-36 shadow-green-500 "
                  source={require("../assets/New_Artwork_e.png")}
               />
            </View>
            <Animated.View style={{
               opacity: fadeAnim,
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
            }}>
               <Text
                  className={`text-4xl font-extrabold text-green-500`}
               >
                  Beenzer
               </Text>
               <Text
                  className={` ${darkModeOn ? `text-white` : `text-${darkMode}`}`}
               >
                  Done that
               </Text>
            </Animated.View>
            <View className="items-center">
               <Animated.View style={{ opacity: fadeAnim }}>
                  <TouchableOpacity
                     className={`border ${darkModeOn ? 'border-white' : `border-${darkMode}`} w-52 shadow-xl rounded-2xl flex-row justify-center items-center p-2`}
                     onPress={handleLogin}>
                     <Image
                        className="h-10 w-10 "
                        style={{ tintColor: darkModeOn ? `${lightMode}` : "black" }}
                        resizeMode="contain"
                        source={require("../assets/phantom.png")}
                     />
                     <Text className={`font-semibold text-center text-${darkModeOn ? lightMode : darkMode}`}>
                        {'   '}Login with Phantom
                     </Text>
                  </TouchableOpacity>
               </Animated.View>
            </View>
            <Text
               style={{ fontFamily: "Avenir-Black" }}
               className={`${darkModeOn ? `text-${lightMode}` : `${darkMode}`} font-medium text-justify ml-5 mr-5`}
            >
               Beenzer - the ultimate social app for true digital ownership. Share and mint your stories on the map, monetize your creations with NFT marketplaces. Take control of your online legacy
            </Text>
         </View>
         <PhantomEffect deepLink={deepLink} />
      </>
   );
};

export default Login;
