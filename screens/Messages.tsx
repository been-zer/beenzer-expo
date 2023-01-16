import { View, Text, SafeAreaView } from 'react-native'
import { useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { atomActiveScreen } from '../services/globals'
import { useAtom } from 'jotai'
import Footer from './Footer'
import { atomDarkMode, atomDarkModeOn } from '../services/globals/darkmode'
import FriendSearch from '../components/FriendSearch'
import { atomFriendsChanged, atomUserFriends } from '../services/globals'
import FollowBlock from '../components/Profile.components/FollowBlock'

const Messages = () => {

   const isFocused = useIsFocused();
   const [active, setActive] = useAtom(atomActiveScreen)
   const [darkMode, setDarkMode] = useAtom(atomDarkMode);
   const [darkModeOn, setDarkModeOn] = useAtom(atomDarkModeOn);
   const [friendsChanged, setFriendsChanged] = useAtom(atomFriendsChanged);
   const [userFriends, setUserFriends] = useAtom(atomUserFriends);


   useEffect(() => {
      if (isFocused) {
         setActive('Messages')
      }
   }, [isFocused]);

   return (
      <SafeAreaView className={`${darkModeOn ? `bg-${darkMode}` : `bg-white`} h-full flex-1 `}  >
         <FriendSearch />
         <View className='flex-1'>
            <FollowBlock data={userFriends} direction={'DirectMessages'} />
         </View>
         <Footer />
      </SafeAreaView>
   )
}

export default Messages