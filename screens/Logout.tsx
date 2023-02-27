import {
   Text,
   View,
   TouchableOpacity,
} from "react-native"; import React from 'react'
import { ArrowRightOnRectangleIcon } from "react-native-heroicons/solid";
import { disconnect } from "../services/phantom/disconnect";
import { atomSession, atomDappKeyPair, atomSharedSecret, atomIsLogin } from "../services/globals";
import { useAtom } from "jotai";
import { atomDarkModeOn, atomLightMode } from "../services/globals/darkmode";
import { NavigationHelpersContext, NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";

const Logout = () => {

   const [session, setSession] = useAtom(atomSession)
   const [dappKeyPair, setDappKeyPair] = useAtom(atomDappKeyPair)
   const [sharedSecret, setSharedSecret] = useAtom(atomSharedSecret)
   const [darkModeOn, setDarkModeOn] = useAtom(atomDarkModeOn);
   const [lightMode, setLightMode] = useAtom(atomLightMode);
   const [isLogin, setIsLogin] = useAtom(atomIsLogin);
   const navigation = useNavigation<NavigationProp<ParamListBase>>();

   const logout = () => {
      setIsLogin(false)
      navigation.navigate("Login");
      disconnect(session, dappKeyPair, sharedSecret);
   }

   return (
      <TouchableOpacity
         onPress={logout}
         className="mt-4 mr-4 items-center"
      >
         <ArrowRightOnRectangleIcon
            size={25}
            color={darkModeOn ? `${lightMode}` : 'black'}
            className="bg-sky-500/50 "
         />
      </TouchableOpacity>
   )
}


export default Logout