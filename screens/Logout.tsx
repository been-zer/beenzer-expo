import {
   Text,
   View,
   TouchableOpacity,
} from "react-native"; import React from 'react'
import { ArrowRightOnRectangleIcon } from "react-native-heroicons/solid";
import { disconnect } from "../services/phantom/disconnect";
import { atomSession, atomDappKeyPair, atomSharedSecret } from "../services/globals";
import { useAtom } from "jotai";
import { atomDarkModeOn, atomLightMode } from "../services/globals/darkmode";

const Logout = () => {

   const [session, setSession] = useAtom(atomSession)
   const [dappKeyPair, setDappKeyPair] = useAtom(atomDappKeyPair)
   const [sharedSecret, setSharedSecret] = useAtom(atomSharedSecret)
   const [darkModeOn, setDarkModeOn] = useAtom(atomDarkModeOn);
   const [lightMode, setLightMode] = useAtom(atomLightMode);

   const logout = () => {
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