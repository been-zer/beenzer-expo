import { View, Text, TouchableOpacity, Image } from 'react-native'
import { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { atomProfile, atomFriendPubkey } from '../../services/globals'
import { atomSOCKET } from '../../services/socket'
import { socketGetFollowing } from '../../services/socket/function'
import { IProfile } from '../../Types'
import { atomDarkModeOn, atomLightMode } from '../../services/globals/darkmode'
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native'

const FollowBlock = ({ data, direction }: { data: IProfile[], direction: string | null }) => {

   const [profile, setProfile] = useAtom(atomProfile)
   const [friendPubkey, setFriendsPubkey] = useAtom(atomFriendPubkey)
   const [SOCKET] = useAtom(atomSOCKET)
   const [darkModeOn, setDarkModeOn] = useAtom(atomDarkModeOn);
   const [lightMode, setLightMode] = useAtom(atomLightMode);
   const navigation = useNavigation<NavigationProp<ParamListBase>>();

   const handlePress = (item: IProfile) => {
      if (direction) {
         navigation.navigate(direction)
         setFriendsPubkey(item)
         return
      }
      if (item.__pubkey__ === profile[0].__pubkey__) {
         navigation.navigate('Profile')
         return
      }
      else {
         console.log(direction)
         setFriendsPubkey(item)
         navigation.navigate('ProfileFriends')
      }
   }

   return (
      <>
         {data &&
            data.map((item: IProfile, index: number) => {
               return (
                  <View key={item.__pubkey__} >
                     <View className='mr-2 ml-2 flex-row justify-between' >
                        <TouchableOpacity onPress={() => { handlePress(item) }}>
                           <View className='flex flex-row items-center mt-2'>
                              <View className='flex-row'>
                                 <Image source={item._pfp ? { uri: item._pfp } : require('../../assets/newUser.png')} style={{ width: 50, height: 50, borderWidth: 1, borderColor: 'white', borderRadius: 50 }} />
                                 <Text className={`${darkModeOn ? `text-${lightMode}` : 'text-black'} font-bold text-lg ml-2 mb-1 self-center`}>{item._username_}</Text>
                              </View>
                           </View>
                        </TouchableOpacity>
                     </View>
                     <Text className={`${darkModeOn ? `text-${lightMode}` : 'text-black'} mb-2 ml-2`}>{item.__pubkey__}</Text>
                  </View>
               )
            })}
      </>
   )
}

export default FollowBlock