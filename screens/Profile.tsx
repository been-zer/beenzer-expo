import { useState, useLayoutEffect, useEffect } from 'react'
import {
   View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, StyleSheet,
   RefreshControl, ActivityIndicator, Alert
} from 'react-native'
import { mapStyle } from '../services/globals'
import { ArrowRightOnRectangleIcon, PencilSquareIcon } from "react-native-heroicons/solid"
import { useAtom } from 'jotai'
import { atomProfile, atomUserNFTs, atomActiveScreen, atomRefreshing } from '../services/globals'
import GradientText from "../components/GradientText"
import MapView from 'react-native-maps'
import ProfileTab from '../components/ProfileTab'
import ProfileCollection from '../components/ProfileCollection'
import ProfileMap from '../components/ProfileMap'
import ProfileFriends from '../components/ProfileFriends'
import Footer from './Footer'
import { NavigationProp, ParamListBase, useIsFocused, useNavigation } from '@react-navigation/native'
import { socketUserInfo, socketUserNFTs } from '../services/socket/function'
import { atomSOCKET } from '../services/socket'
import { LogBox } from 'react-native';

const Profile = () => {

   const [profile, setProfile] = useAtom(atomProfile)
   const [showProfileTab, setShowProfileTab] = useState<string>('Profile')
   const [showDetails, setShowDetails] = useState(false);
   const navigation = useNavigation<NavigationProp<ParamListBase>>();
   const [active, setActive] = useAtom(atomActiveScreen)
   const isFocused = useIsFocused();
   const [SOCKET] = useAtom(atomSOCKET);
   const [userNFTs, setUserNFTs] = useAtom(atomUserNFTs);
   const [refreshing, setRefreshing] = useAtom(atomRefreshing);

   useEffect(() => {
      if (isFocused) {
         setActive('Profile')
         getInfoUser();
         getInfoNft();
      }
   }, [isFocused]);

   useEffect(() => {
      LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
   }, [])

   const onRefresh = () => {
      setRefreshing(true);
      getInfoUser();
      getInfoNft();
      setTimeout(() => {
         setRefreshing(false);
         console.log('refreshed')
      }, 1000);
   }

   const editProfile = () => {
      navigation.navigate<string>('EditProfile')
   }

   const getInfoUser = async () => {
      try {
         const receivedInfos = await socketUserInfo(SOCKET);
         setProfile(receivedInfos);
      } catch (e) {
         console.error(e);
      }
   }

   const getInfoNft = async () => {
      try {
         const profileNFTs = await socketUserNFTs(SOCKET);
         setUserNFTs(profileNFTs);
      } catch (e) {
         console.error(e);
      }
   }

   return (
      <SafeAreaView className="flex flex-col h-full bg-zinc-900">
         <ScrollView
            contentContainerStyle={styles.contentContainer}
            refreshControl={
               <RefreshControl refreshing={refreshing} onRefresh={onRefresh}
                  tintColor="white"
                  progressBackgroundColor="white"
               />
            }>
            <View className='flex flex-row justify-center items-end'>
               <View className="'flex flex-row justify-center items-end'">
                  <TouchableOpacity onPress={editProfile}><Image className=" h-28 w-28 rounded-full mb-2" source={
                     profile[0]._pfp ?
                        { uri: profile[0]._pfp } :
                        require("../assets/newUser.png")
                  }
                  />
                  </TouchableOpacity>
               </View>
               <TouchableOpacity
                  className="  "
                  onPress={editProfile}
               >
                  <PencilSquareIcon size={18} color="#30a24f" />
               </TouchableOpacity>
            </View>
            <View className="flex flex-col items-center mb-3">
               <Text className=" text-white text-6xl uppercase font-extrabold p-4">
                  {profile[0]._username_}
               </Text>
               <GradientText text={profile[0]._description || "No description yet :("} className="uppercase font-extrabold mb-2" />
            </View>
            <View className='flex flex-row flex-wrap'>
            </View>
            <View className='flex flex-row justify-evenly'>
               <ProfileTab title='📷' component={'Collection'} setShowProfileTab={setShowProfileTab} setShowDetails={setShowDetails} />
               <ProfileTab title='🗺️' component={'ProfileMap'} setShowProfileTab={setShowProfileTab} setShowDetails={setShowDetails} />
               <ProfileTab title='👥' component={'ProfileFriends'} setShowProfileTab={setShowProfileTab} setShowDetails={setShowDetails} />
            </View>
            <View className='flex flex-col'>
               {showProfileTab === 'Collection' && (
                  <>
                     <ProfileCollection setShowDetails={setShowDetails} showDetails={showDetails} />
                  </>
               )}
               {showProfileTab === 'ProfileMap' && (
                  <ProfileMap uniqueNFTs={null} />
               )}
               {showProfileTab === 'ProfileFriends' && (
                  <ProfileFriends />
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




