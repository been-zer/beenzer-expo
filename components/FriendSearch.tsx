import { View, Text, Button, KeyboardAvoidingView, ScrollView, SafeAreaView, Platform, TouchableOpacity, FlatList, Image } from 'react-native'
import { Searchbar } from 'react-native-paper';
import React, { useState, useEffect } from 'react'
import { atomSOCKET } from '../services/socket';
import { useAtom } from 'jotai'
import { IProfile } from '../Types';
import { socketSeachFriends, socketAddFriend, socketDelFriend, socketGetFriends } from '../services/socket/function';
import { atomFollowing, atomProfile } from '../services/globals';
import { atomUserFriends, atomFriendsChanged } from '../services/globals';
import DisplayButton from './DisplayButton';
import { atomDarkModeOn, atomLightMode } from '../services/globals/darkmode';

const FriendSearch = () => {
   const [searchQuery, setSearchQuery] = useState('');
   const [usersFound, setUsersFound] = useState<IProfile[]>([]);
   const [SOCKET] = useAtom(atomSOCKET);
   const [profile, setProfile] = useAtom(atomProfile)
   const [userFriends, setUserFriends] = useAtom(atomUserFriends);
   const [display, setDisplay] = useState('Friends')
   const [darkModeOn, setDarkModeOn] = useAtom(atomDarkModeOn);
   const [lightMode, setLightMode] = useAtom(atomLightMode);
   const [following, setFollowing] = useAtom(atomFollowing)
   const [friendsChanged, setFriendsChanged] = useAtom(atomFriendsChanged);


   useEffect(() => {
      const searchFriends = async (search: string) => {
         const res = await socketSeachFriends(SOCKET, search)
         setUsersFound(res)
      }
      searchFriends(searchQuery)
   }, [searchQuery])

   useEffect(() => {
      const getFriends = async (pubkey: string) => {
         const res = await socketGetFriends(SOCKET, pubkey)
         setUserFriends(res)
      }
      getFriends(profile[0].__pubkey__)
   }, [friendsChanged])

   const onChangeSearch = (query: string) => setSearchQuery(query.toLowerCase());

   const addFriends = async (pubkeyFriends: string) => {
      const ans = await socketAddFriend(SOCKET, profile[0].__pubkey__, pubkeyFriends)
   }
   const deleteFriends = async (pubkeyFriends: string) => {
      const ans = await socketDelFriend(SOCKET, profile[0].__pubkey__, pubkeyFriends)
   }

   const handleFriendAction = (pubkeyFriends: string) => {
      if (!following) { addFriends(pubkeyFriends) }
      else {
         const isFriend = following.find((item) => item.__pubkey__ === pubkeyFriends)
         if (isFriend) {
            deleteFriends(pubkeyFriends)
         } else {
            addFriends(pubkeyFriends)
         }
      }
      setFriendsChanged(!friendsChanged)

   }

   const hideSearch = () => {
      setSearchQuery('')
      setUsersFound([])
   }

   return (
      <>
         <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
            className="mt-2 mr-2 ml-2"
         />
         {usersFound && searchQuery && <Button title='Hide results' onPress={hideSearch} />}
         {
            usersFound.length > 0 && searchQuery &&
            usersFound.map((item, index) => {
               return (
                  <View key={item.__pubkey__} >
                     <View className='mr-2 ml-2 flex-row justify-between' >
                        <TouchableOpacity onPress={() => console.log('navigate to friend profile')}>
                           <View className='flex flex-row items-center mt-2'>
                              <View className='flex-row'>
                                 <Image source={item._pfp ? { uri: item._pfp } : require('../assets/newUser.png')} style={{ width: 50, height: 50, borderWidth: 1, borderColor: 'white', borderRadius: 50 }} />
                                 <Text className={`${darkModeOn ? `text-${lightMode}` : 'text-black'} font-bold text-lg ml-2 mb-1 self-center`}>{item._username_}</Text>
                                 {userFriends && userFriends.find((friends) => friends.__pubkey__ === item.__pubkey__) &&
                                    <Text className='text-green-500 font-bold ml-2 mb-1 self-center'>🫂</Text>}
                              </View>
                           </View>
                        </TouchableOpacity>
                        {item.__pubkey__ !== profile[0].__pubkey__ &&
                           <TouchableOpacity onPress={() => handleFriendAction(item.__pubkey__)} className='self-center'>
                              {following && following.find((friends) => friends.__pubkey__ === item.__pubkey__) ? <View className='ml-2 flex items-center justify-center'>
                                 <Text className='text-blue-500  font-bold'>Unfollow</Text>
                              </View> :
                                 <Text className='text-green-500  font-bold'>Follow</Text>
                              }
                           </TouchableOpacity>}
                     </View>
                     <Text className={`${darkModeOn ? `text-${lightMode}` : 'text-black'} ml-2 mb-2`}>{item.__pubkey__}</Text>
                     <View
                        className='border-b-2 border-gray-300'
                     /></View>
               )
            })}
      </>
   )
}

export default FriendSearch