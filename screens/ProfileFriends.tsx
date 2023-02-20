import { View, Text, SafeAreaView, ScrollView, RefreshControl, Alert, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'
import { useAtom } from 'jotai'
import { atomDarkModeOn, atomDarkMode, atomLightMode } from '../services/globals/darkmode'
import ProfilePic from '../components/Profile.components/ProfilePic'
import ProfileBio from '../components/Profile.components/ProfileBio'
import ProfileTab from '../components/Profile.components/ProfileTab'
import ProfileCollection from '../components/Profile.components/ProfileCollection'
import ProfileMap from '../components/Profile.components/ProfileMap'
import { INFT, IProfile, UserNFT } from '../Types'
import Footer from './Footer'
import Friends from '../components/Friends'
import { atomActiveScreen, atomRefreshing } from '../services/globals'
import { socketUserNFTs } from '../services/socket/function'
import { atomSOCKET } from '../services/socket'
import { useIsFocused } from '@react-navigation/native'

const ProfileFriends = ({ friendPubkey }: { friendPubkey: IProfile }) => {

   const [showProfileTab, setShowProfileTab] = useState<string>('Collection')
   const [showDetails, setShowDetails] = useState(false);
   const [darkModeOn, setDarkModeOn] = useAtom(atomDarkModeOn);
   const [darkMode, setDarkMode] = useAtom(atomDarkMode);
   const [lightMode, setLightMode] = useAtom(atomLightMode);
   const [refreshing, setRefreshing] = useAtom(atomRefreshing);
   const [friendsNFTs, setFriendsNFTs] = useState<UserNFT[]>([]);
   const [SOCKET] = useAtom(atomSOCKET);
   const isFocused = useIsFocused();
   const [active, setActive] = useAtom(atomActiveScreen)
   const [selectedTab, setSelectedTab] = useState<string>('')
   const [onProfile, setOnProfile] = useState<boolean>(true)



   const getFriendsNFT = async () => {
      try {
         const friendsNFTs = await socketUserNFTs(SOCKET, friendPubkey.__pubkey__);
         setFriendsNFTs(friendsNFTs.reverse());
      } catch (e) {
         console.error(e);
      }
   }

   useEffect(() => {
      if (isFocused) {
         setActive('Profile')
         getFriendsNFT();
      }
   }, [isFocused]);

   const onRefresh = () => {
      setRefreshing(true);
      getFriendsNFT();
      setTimeout(() => {
         setRefreshing(false);
         console.log('refreshed')
      }, 1000);
   }

   return (

      <SafeAreaView className={`flex flex-col h-full ${darkModeOn ? `bg-${darkMode}` : `bg-${lightMode}`}
      `}>
         <ScrollView
            contentContainerStyle={styles.contentContainer}
            refreshControl={
               <RefreshControl refreshing={refreshing} onRefresh={onRefresh}
                  tintColor="white"
                  progressBackgroundColor="white"
               />
            }>
            <View className='flex flex-row justify-center items-end'>
               <ProfilePic img={friendPubkey._pfp} functionOnClick={() => Alert.alert('Nothing to show here ;)}')} />
            </View>
            <ProfileBio name={friendPubkey._username_} description={friendPubkey._description} />
            <View className='flex flex-row flex-wrap'>
            </View>
            <View className='flex flex-row justify-evenly'>
               <ProfileTab title='📷' component={'Collection'} selectedTab={selectedTab} setSelectedTab={setSelectedTab} setShowProfileTab={setShowProfileTab} setShowDetails={setShowDetails} />
               <ProfileTab title='🗺️' component={'ProfileMap'} selectedTab={selectedTab} setSelectedTab={setSelectedTab} setShowProfileTab={setShowProfileTab} setShowDetails={setShowDetails} />
               <ProfileTab title='👥' component={'Friends'} selectedTab={selectedTab} setSelectedTab={setSelectedTab} setShowProfileTab={setShowProfileTab} setShowDetails={setShowDetails} />
            </View>
            <View className='flex flex-col'>
               {showProfileTab === 'Collection' && (
                  <>
                     <ProfileCollection setShowDetails={setShowDetails} showDetails={showDetails} dataNFT={friendsNFTs} setSelectedTab={setSelectedTab} />
                  </>
               )}
               {showProfileTab === 'ProfileMap' && (
                  <ProfileMap uniqueNFTs={null} dataNFT={friendsNFTs} viewMap={undefined} />
               )}
               {showProfileTab === 'Friends' && (
                  <Friends dataPubkey={friendPubkey.__pubkey__} showSearch={false} onProfile={onProfile} />
               )}
            </View>
         </ScrollView>
         <Footer />
      </SafeAreaView >
   )
}

export default ProfileFriends


const styles = StyleSheet.create({
   picture: {
      width: 100,
      height: 100,
      resizeMode: "cover"
   },
   contentContainer: {
      flexGrow: 1,
   },
});


