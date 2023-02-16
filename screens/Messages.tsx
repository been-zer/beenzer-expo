import { View, Text, SafeAreaView, Button } from 'react-native'
import { useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { atomActiveScreen } from '../services/globals'
import { useAtom } from 'jotai'
import Footer from './Footer'
import { atomDarkMode, atomDarkModeOn } from '../services/globals/darkmode'
import FriendSearch from '../components/FriendSearch'
import { atomFriendsChanged, atomUserFriends, atomProfile } from '../services/globals'
import FollowBlock from '../components/Profile.components/FollowBlock'
import { Searchbar } from 'react-native-paper';
import { atomSOCKET } from '../services/socket/index'
import { socketSeachFriends, socketGetFriends } from '../services/socket/function'
import { useState } from 'react'
import { IProfile } from '../Types'

const Messages = () => {

   const isFocused = useIsFocused();
   const [active, setActive] = useAtom(atomActiveScreen)
   const [darkMode, setDarkMode] = useAtom(atomDarkMode);
   const [darkModeOn, setDarkModeOn] = useAtom(atomDarkModeOn);
   const [friendsChanged, setFriendsChanged] = useAtom(atomFriendsChanged);
   const [userFriends, setUserFriends] = useAtom(atomUserFriends);
   const [SOCKET] = useAtom(atomSOCKET);
   const [searchQuery, setSearchQuery] = useState('');
   const [usersFound, setUsersFound] = useState<IProfile[]>([]);
   const [profile, setProfile] = useAtom(atomProfile)


   useEffect(() => {
      if (isFocused) {
         setActive('Messages')
      }
   }, [isFocused]);

   useEffect(() => {
      const getFriends = async (pubkey: string) => {
         const res = await socketGetFriends(SOCKET, pubkey)
         setUserFriends(res)
      }
      getFriends(profile.__pubkey__)
   }, [friendsChanged])

   useEffect(() => {
      const searchFriends = async (search: string) => {
         const res = await socketSeachFriends(SOCKET, search)
         //eliminitate the user from the search results
         const filtered = res.filter((user: IProfile) => user.__pubkey__ !== profile.__pubkey__)
         setUsersFound(filtered)
      }
      searchFriends(searchQuery)
   }, [searchQuery])

   const onChangeSearch = (query: string) => setSearchQuery(query.toLowerCase());

   const hideSearch = () => {
      setSearchQuery('')
      setUsersFound([])
   }

   return (
      <SafeAreaView className={`${darkModeOn ? `bg-${darkMode}` : `bg-white`} h-full flex-1 `}  >
         <Searchbar
            className='mb-2'
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
         />
         {usersFound && searchQuery && <Button title='Hide results' onPress={hideSearch} />}
         <View className='flex-1'>
            {usersFound.length > 0 && searchQuery &&
               <FollowBlock data={usersFound} direction={'DirectMessages'} />
            }
            {!searchQuery && userFriends && userFriends.length > 0 &&
               <FollowBlock data={userFriends} direction={'DirectMessages'} />}
         </View>
         <Footer />
      </SafeAreaView>
   )
}

export default Messages