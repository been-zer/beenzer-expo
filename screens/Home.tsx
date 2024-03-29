import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Button } from "react-native"
import Footer from './Footer';
import HomeMap from './HomeMap';
import { ActivityIndicator } from 'react-native-paper';
import { ArrowPathIcon } from 'react-native-heroicons/outline'
import { atomUserNFTs, atomProfile, atomFriendsNFT, atomModalVisible } from '../services/globals';
import { useAtom } from 'jotai';
import { socketUserNFTs, socketUserInfo, socketGetMapNFTs, socketGetFriendsFeed } from "../services/socket/function";
import { atomUserLocation, atomRefreshLoc, atomFeedItems } from '../services/globals/index';
import { atomSOCKET } from '../services/socket';
import Feed from './Feed';
import { getUserLocation } from '../services/globals/functions';
import MapView from 'react-native-maps';
import ColorMode from '../components/ColorMode';
import { atomPhantomWalletPublicKey, atomActiveScreen } from '../services/globals';
import { NavigationProp, ParamListBase, useNavigation, useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import DisplayButton from '../components/DisplayButton';
import { } from "@react-navigation/native";
import { atomDarkMode, atomDarkModeOn, atomLightMode } from '../services/globals/darkmode';

const Home = () => {
   const [phantomWalletPublicKey] = useAtom(atomPhantomWalletPublicKey);
   const [profile, setProfile] = useAtom(atomProfile);
   const [userNFTs, setUserNFTs] = useAtom(atomUserNFTs);
   const [SOCKET] = useAtom(atomSOCKET);
   const [userLocation, setUserLocation] = useAtom(atomUserLocation);
   const [refreshLoc, setRefreshLoc] = useAtom(atomRefreshLoc);
   const mapRef = useRef<MapView>(null);
   const navigation = useNavigation<NavigationProp<ParamListBase>>();
   const [active, setActive] = useAtom(atomActiveScreen)
   const [display, setDisplay] = useState('Map')
   const isFocused = useIsFocused();
   const [darkMode, setDarkMode] = useAtom(atomDarkMode);
   const [lightMode, setLightMode] = useAtom(atomLightMode);
   const [darkModeOn, setDarkModeOn] = useAtom(atomDarkModeOn);
   const [feedItems, setFeedItems] = useAtom(atomFeedItems)
   const [hideMenu, setHideMenu] = useState(true);
   const [friendsNFT, setFriendsNFT] = useAtom(atomFriendsNFT)
   const [hideShowMenu, setHideShowMenu] = useAtom(atomModalVisible)
   const [showItem, setShowItem] = useState(false)


   useEffect(() => {
      if (isFocused) {
         setActive('Home')
         fetchData();
         getInfoUser();
      }
   }, [isFocused]);

   useEffect(() => {
      fetchData();
      getInfoUser();
      getInfoNft();

   }, []);


   const fetchData = async () => {
      const getLoc: any = await getUserLocation();
      setUserLocation(getLoc);
      setRefreshLoc(true);
      if (mapRef.current) {
         mapRef.current.animateToRegion({
            latitude: getLoc?.coords.latitude,
            longitude: getLoc?.coords.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
         });
      };
      getNFTmap(getLoc?.coords.latitude, getLoc?.coords.longitude);
      getFriendsNFT(phantomWalletPublicKey.toString(), getLoc?.coords.latitude, getLoc?.coords.longitude);
   };

   const getNFTmap = async (latitude: number, longitude: number) => {
      try {
         const mapNFTs = await socketGetMapNFTs(SOCKET, latitude, longitude);
         setFeedItems(mapNFTs);
      } catch (e) {
         console.error(e);
      }
   }

   const getInfoUser = async () => {
      try {
         const receivedInfos = await socketUserInfo(SOCKET, phantomWalletPublicKey.toString());
         setProfile(receivedInfos);
      } catch (e) {
         console.error(e);
      }
   }

   const getInfoNft = async () => {
      try {
         const profileNFTs = await socketUserNFTs(SOCKET, phantomWalletPublicKey.toString());
         setUserNFTs(profileNFTs.reverse());
      } catch (e) {
         console.error(e);
      }
   }

   const getFriendsNFT = async (pubkey: string, latitude: number, longitude: number) => {
      try {
         const friendsNFTsRes = await socketGetFriendsFeed(SOCKET, pubkey, latitude, longitude);
         setFriendsNFT(friendsNFTsRes)
      } catch (e) {
         console.error(e);
      }
   }

   return (
      <SafeAreaView className={`${darkModeOn ? `bg-${darkMode}` : `bg-white`} h-full flex-1 `} style={StyleSheet.absoluteFillObject} >
         {/* {title} */}
         {hideMenu && !hideShowMenu &&
            <>
               < View className='flex-row justify-around' >
                  <TouchableOpacity className='justify-center items-center' onPress={() => navigation.navigate('Notifications')}>
                     <Ionicons name="notifications" size={24} color={`${darkModeOn ? 'white' : 'black'}`} />
                  </TouchableOpacity>
                  <Text style={{ alignSelf: 'flex-start' }} className='text-green-600 text-3xl font-bold'>Beenzer</Text>
                  <View style={{ alignSelf: 'flex-end' }} >
                     <ColorMode />
                  </View>
               </View >
               <TouchableOpacity className='justify-center items-center' onPress={() => (fetchData(), setRefreshLoc(false))}>
                  {userLocation && refreshLoc ? <View className='flex-row items-center justify-center mb-2'>
                     <Text className={`${darkModeOn ? `text-${lightMode}` : `text-black`}`}>{userLocation.city}&nbsp;</Text>
                     <ArrowPathIcon size={10} color={`${darkModeOn ? lightMode : darkMode}`} /></View > :
                     <ActivityIndicator className=' bottom-1' color={`${darkModeOn ? lightMode : darkMode}`} />
                  }
               </TouchableOpacity>
               <View className='flex-row justify-around items-center'>
                  <DisplayButton title="Map" display={display} setDisplay={setDisplay} setShowItem={setShowItem} />
                  <DisplayButton title="Public feed" display={display} setDisplay={setDisplay} setShowItem={undefined} />
               </View>
            </>}
         <TouchableOpacity onPress={() => setHideMenu(!hideMenu)}>
            <Text className={`${darkModeOn ? `text-${lightMode}` : `text-black`} self-center mb-2`}>
               {hideShowMenu ? "" : hideMenu ? 'Hide menu' : 'Show menu'}
            </Text>
         </TouchableOpacity>
         {
            display === 'Public feed' &&
            <Feed feedItems={feedItems} setHideMenu={setHideMenu} />
         }
         {
            display === 'Map' &&
            <HomeMap mapRef={mapRef} feedItems={feedItems} showItem={showItem} setShowItem={setShowItem} />
         }
      </SafeAreaView >
   )
}

export default Home
