import { Image, TouchableOpacity, View, SafeAreaView, Text, Vibration, Animated } from "react-native";
import { useEffect, useLayoutEffect, useRef } from "react";
import { connect } from "../services/phantomLogin";
import * as Linking from "expo-linking";
import { useAtom } from "jotai";
import { atomDeepLink, atomDappKeyPair } from "../global";
import PhantomEffect from "../screens/PhantomEffect";
import { useNavigation } from "@react-navigation/native";
import { atomDarkmode, atomLightMode, useSwipe } from "../services/darkmode";
import { fadeIn } from "../services/Functions";

const Login = () => {

   const [deepLink, setDeepLink] = useAtom(atomDeepLink)
   const [dappKeyPair] = useAtom(atomDappKeyPair)
   const navigation = useNavigation();
   const [darkMode, setDarkMode] = useAtom(atomDarkmode);
   const [lightMode, setLightMode] = useAtom(atomLightMode);
   const fadeAnim = useRef(new Animated.Value(0)).current;
   const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6)

   function onSwipeLeft() {
      setDarkMode('bg-zinc-900')
      setLightMode('white')
      Vibration.vibrate(100);
   }
   function onSwipeRight() {
      setDarkMode('white')
      setLightMode('bg-zinc-900')
      Vibration.vibrate();
   }

   const handleLogin = () => {
      connect(dappKeyPair);
      Vibration.vibrate();
   };

   useLayoutEffect(() => {
      navigation.setOptions({
         headerShown: false,
      });
   }, [navigation]);

   useEffect(() => {
      (async () => {
         const initialUrl = await Linking.getInitialURL();
         if (initialUrl) {
            setDeepLink(initialUrl);
         }
      })();
      Linking.addEventListener("url", handleDeepLink);
      return () => {
         Linking.removeEventListener("url", handleDeepLink);
      };
   }, []);

   const handleDeepLink = ({ url }: Linking.EventType) => {
      setDeepLink(url);
   };

   fadeIn(fadeAnim)

   return (
      <>
         <SafeAreaView className={`flex-1 h-screen pt-8 ${darkMode}`}>
            <View onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
               <View className="bottom-24 left-2">
                  <Image
                     className="absolute shadow-md mt-32 h-96 w-96 shadow-green-500 "
                     source={require("../assets/New_Artwork_e.png")}
                  />
               </View>
               <Animated.View style={{ opacity: fadeAnim }}>
                  <Text
                     style={{ fontFamily: "Avenir-Black" }}
                     className="text-6xl uppercase top-72 text-green-500 font-extrabold text-center p-6"
                  >
                     Beenzer
                  </Text>
               </Animated.View>
               <View>
                  <Animated.View style={{ opacity: fadeAnim }}>
                     <TouchableOpacity
                        className={` border border-${lightMode} z-99 top-16 mx-16 mt-80 shadow-xl p-4 rounded-2xl`}
                        onPress={handleLogin}>
                        <Image
                           className="absolute w-8 h-8 left-4 top-2"
                           resizeMode="contain"
                           source={require("../assets/phantom.png")}
                        />

                        <Text className={`font-semibold text-center ml-8 text-${lightMode}`}>
                           {" "}
                           Login with Phantom{" "}
                        </Text>
                     </TouchableOpacity>
                  </Animated.View>
               </View>
               <Text
                  style={{ fontFamily: "Avenir-Black" }}
                  className="mt-12 mx-14 top-16 text-green-500 font-medium text-center"
               >
                  Welcome to BeenZer, the first fully decentralized social app where
                  you OWN your content. Drop your stories in the map forever minting
                  them and sell your NFTs in the marketplaces.
               </Text>
            </View>
         </SafeAreaView >
         <PhantomEffect deepLink={deepLink} />
      </>
   );
};

export default Login;
