import { useState, useLayoutEffect, useEffect } from 'react'
import {
   View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, StyleSheet,
   RefreshControl, ActivityIndicator, Alert
} from 'react-native'
import { mapStyle } from '../services/globals'
import { ArrowRightOnRectangleIcon, PencilSquareIcon } from "react-native-heroicons/solid"
import { useAtom } from 'jotai'
import { atomProfile, atomUserNFTs, atomActiveScreen, atomRefreshing, atomIsLogin } from '../services/globals'
import GradientText from "../components/GradientText"
import MapView from 'react-native-maps'
import ProfileTab from '../components/Profile.components/ProfileTab'
import ProfileCollection from '../components/Profile.components/ProfileCollection'
import ProfileMap from '../components/Profile.components/ProfileMap'
import Friends from '../components/Friends'
import Footer from './Footer'
import { NavigationProp, ParamListBase, useIsFocused, useNavigation } from '@react-navigation/native'
import { socketUserInfo, socketUserNFTs } from '../services/socket/function'
import { atomSOCKET } from '../services/socket'
import { LogBox } from 'react-native';
import { atomDarkModeOn, atomDarkMode, atomLightMode } from '../services/globals/darkmode'
import ProfilePic from '../components/Profile.components/ProfilePic'
import ProfileBio from '../components/Profile.components/ProfileBio'

const Profile = () => {

   const [profile, setProfile] = useAtom(atomProfile)
   const [showProfileTab, setShowProfileTab] = useState<string>('Collection')
   const [showDetails, setShowDetails] = useState(false);
   const navigation = useNavigation<NavigationProp<ParamListBase>>();
   const [active, setActive] = useAtom(atomActiveScreen)
   const isFocused = useIsFocused();
   const [SOCKET] = useAtom(atomSOCKET);
   const [userNFTs, setUserNFTs] = useAtom(atomUserNFTs);
   const [refreshing, setRefreshing] = useAtom(atomRefreshing);
   const [darkModeOn, setDarkModeOn] = useAtom(atomDarkModeOn);
   const [darkMode, setDarkMode] = useAtom(atomDarkMode);
   const [lightMode, setLightMode] = useAtom(atomLightMode);
   const [selectedTab, setSelectedTab] = useState<string>('Collection')
   const [onProfile, setOnProfile] = useState<boolean>(true)
   const [isLogin, setIsLogin] = useAtom(atomIsLogin);

   useEffect(() => {
      if (isFocused) {
         setActive('Profile')
         isLogin && getInfoUser();
         isLogin && getInfoNft();
         isLogin && setOnProfile(!onProfile)

      }
   }, [isFocused]);

   useEffect(() => {
      LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
   }, [])

   const onRefresh = () => {
      setRefreshing(true);
      setTimeout(() => {
         getInfoNft();
         getInfoUser();
         setRefreshing(false);
         console.log('refreshed')
      }, 1000);
   }

   const editProfile = () => {
      navigation.navigate<string>('EditProfile')
   }

   const getInfoUser = async () => {
      try {
         const receivedInfos = await socketUserInfo(SOCKET, profile.__pubkey__);
         setProfile(receivedInfos);
      } catch (e) {
         console.error(e);
      }
   }

   const getInfoNft = async () => {
      try {
         const profileNFTs = await socketUserNFTs(SOCKET, profile.__pubkey__);
         setUserNFTs(profileNFTs.reverse());
      } catch (e) {
         console.error(e);
      }
   }

   if (!isLogin) {
      return (
         <SafeAreaView className={`${darkModeOn ? `bg-${darkMode}` : `bg-white`} h-full flex-1 `}>
            <View className="flex justify-center items-center flex-1">
               <Text className={`${darkModeOn ? `text-white` : `text-${darkMode}`} text-2xl font-bold text-center`}>
                  Please login to phantom to use this functionality
               </Text>
            </View>
            <Footer />
         </SafeAreaView >
      )
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
               <ProfilePic img={profile._pfp} functionOnClick={editProfile} />
               <TouchableOpacity
                  className="  "
                  onPress={editProfile}
               >
                  <PencilSquareIcon size={18} color="#30a24f" />
               </TouchableOpacity>
            </View>
            <ProfileBio name={profile._username_} description={profile._description} />
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
                     <ProfileCollection setShowDetails={setShowDetails} showDetails={showDetails} dataNFT={userNFTs} setSelectedTab={setSelectedTab} />
                  </>
               )}
               {showProfileTab === 'ProfileMap' && (
                  <ProfileMap uniqueNFTs={null} dataNFT={userNFTs} viewMap={undefined} />
               )}
               {showProfileTab === 'Friends' && (
                  <Friends dataPubkey={profile.__pubkey__} showSearch={true} onProfile={onProfile} />
               )}
            </View>
         </ScrollView>
         <Footer />
      </SafeAreaView >
   )
}

export default Profile

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




