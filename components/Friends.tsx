import { View, Text, KeyboardAvoidingView, ScrollView, SafeAreaView, Platform, TouchableOpacity, FlatList, Image } from 'react-native'
import { Searchbar } from 'react-native-paper';
import React, { useState, useEffect } from 'react'
import { atomSOCKET } from '../services/socket';
import { useAtom } from 'jotai'
import { socketGetFriends, socketGetFollowing, socketGetFollower } from '../services/socket/function';
import { atomProfile, atomFollowing, atomFollower, atomFriendsChanged } from '../services/globals';
import { atomUserFriends } from '../services/globals';
import DisplayButton from './DisplayButton';
import FriendSearch from './FriendSearch';
import FollowBlock from './Profile.components/FollowBlock';

const Friends = ({ dataPubkey, showSearch }: { dataPubkey: string, showSearch: boolean }) => {
   const [SOCKET] = useAtom(atomSOCKET);
   const [profile, setProfile] = useAtom(atomProfile)
   const [userFriends, setUserFriends] = useAtom(atomUserFriends);
   const [friendsChanged, setFriendsChanged] = useAtom(atomFriendsChanged);
   const [display, setDisplay] = useState('Friends')
   const [following, setFollowing] = useAtom(atomFollowing)
   const [follower, setFollower] = useAtom(atomFollower)

   useEffect(() => {
      const getFriends = async (pubkey: string) => {
         const res = await socketGetFriends(SOCKET, pubkey)
         setUserFriends(res)
      }
      const getUserFollowing = async (pubkey: string) => {
         const res = await socketGetFollowing(SOCKET, pubkey)
         setFollowing(res)
      }
      const getUserFollowers = async (pubkey: string) => {
         const res = await socketGetFollower(SOCKET, pubkey)
         setFollower(res)
      }
      getFriends(dataPubkey)
      getUserFollowing(dataPubkey)
      getUserFollowers(dataPubkey)

   }, [friendsChanged])


   return (
      <>
         {showSearch && <FriendSearch />}
         <View className='flex-row justify-evenly mt-2'>
            <DisplayButton title='Friends' display={display} setDisplay={setDisplay} />
            <DisplayButton title='Followers' display={display} setDisplay={setDisplay} />
            <DisplayButton title='Following' display={display} setDisplay={setDisplay} />
         </View>
         {display === 'Friends' && <FollowBlock data={userFriends} direction={null} />}
         {display === 'Followers' && <FollowBlock data={follower} direction={null} />}
         {display === 'Following' && <FollowBlock data={following} direction={null} />}
         <View className='h-96'></View>
      </>

   )
}

export default Friends