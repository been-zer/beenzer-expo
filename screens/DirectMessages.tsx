import { View, Text, SafeAreaView } from 'react-native'
import { atomDarkMode, atomDarkModeOn } from '../services/globals/darkmode'
import { useAtom } from 'jotai'
import React, { useEffect } from 'react'
import { socketGetMessages } from '../services/socket/function'
import { atomProfile } from '../services/globals'
import { atomSOCKET } from '../services/socket/index'
import { IProfile } from '../Types'

const DirectMessages = ({ friendPubkey }: { friendPubkey: IProfile }) => {

   const [darkMode, setDarkMode] = useAtom(atomDarkMode);
   const [darkModeOn, setDarkModeOn] = useAtom(atomDarkModeOn);
   const [profile, setProfile] = useAtom(atomProfile);
   const [SOCKET] = useAtom(atomSOCKET);

   useEffect(() => {
      const getMessages = async () => {
         const messages = await socketGetMessages(SOCKET, profile[0].__pubkey__, friendPubkey.__pubkey__)
         console.log(messages)
      }
      getMessages()
   }, [])

   return (
      <SafeAreaView className={`${darkModeOn ? `bg-${darkMode}` : `bg-white`} h-full flex-1 `}  >
         <Text>DirectMessages</Text>
      </SafeAreaView>
   )
}

export default DirectMessages