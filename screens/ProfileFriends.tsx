import { View, Text, SafeAreaView, ScrollView, RefreshControl, Alert, StyleSheet } from 'react-native'
import { useState } from 'react'
import { useAtom } from 'jotai'
import { atomDarkModeOn, atomDarkMode, atomLightMode } from '../services/globals/darkmode'
import ProfilePic from '../components/Profile.components/ProfilePic'
import ProfileBio from '../components/Profile.components/ProfileBio'
import ProfileTab from '../components/Profile.components/ProfileTab'
import ProfileCollection from '../components/Profile.components/ProfileCollection'
import ProfileMap from '../components/Profile.components/ProfileMap'
import { INFT, IProfile } from '../Types'
import Footer from './Footer'
import Friends from '../components/Friends'
import { atomRefreshing } from '../services/globals'

const ProfileFriends = ({ friendPubkey }: { friendPubkey: IProfile }) => {

   const [showProfileTab, setShowProfileTab] = useState<string>('Collection')
   const [showDetails, setShowDetails] = useState(false);
   const [darkModeOn, setDarkModeOn] = useAtom(atomDarkModeOn);
   const [darkMode, setDarkMode] = useAtom(atomDarkMode);
   const [lightMode, setLightMode] = useAtom(atomLightMode);
   const [refreshing, setRefreshing] = useAtom(atomRefreshing);


   return (

      <SafeAreaView className={`flex flex-col h-full ${darkModeOn ? `bg-${darkMode}` : `bg-${lightMode}`}
      `}>
         <ScrollView
            contentContainerStyle={styles.contentContainer}
            refreshControl={
               <RefreshControl refreshing={refreshing} onRefresh={() => console.log('refreshing')}
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
               <ProfileTab title='📷' component={'Collection'} setShowProfileTab={setShowProfileTab} setShowDetails={setShowDetails} />
               <ProfileTab title='🗺️' component={'ProfileMap'} setShowProfileTab={setShowProfileTab} setShowDetails={setShowDetails} />
               <ProfileTab title='👥' component={'Friends'} setShowProfileTab={setShowProfileTab} setShowDetails={setShowDetails} />
            </View>
            <View className='flex flex-col'>
               {showProfileTab === 'Collection' && (
                  <>
                     <ProfileCollection setShowDetails={setShowDetails} showDetails={showDetails} dataNFT={[]} />
                  </>
               )}
               {showProfileTab === 'ProfileMap' && (
                  <ProfileMap uniqueNFTs={null} dataNFT={null} />
               )}
               {showProfileTab === 'Friends' && (
                  <Friends dataPubkey={friendPubkey.__pubkey__} showSearch={false} />
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


