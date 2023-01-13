import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native"
import Footer from './Footer';
import HomeMap from './HomeMap';
import { ActivityIndicator } from 'react-native-paper';
import { ArrowPathIcon } from 'react-native-heroicons/outline'
import { atomUserNFTs, atomProfile } from '../services/globals';
import { useAtom } from 'jotai';
import { socketUserNFTs, socketUserInfo } from "../services/socket/function";
import { atomUserLocation, atomRefreshLoc } from '../services/globals/index';
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

   useEffect(() => {
      if (isFocused) {
         setActive('Home')
      }
   }, [isFocused]);

   useEffect(() => {
      fetchData();
      getInfoUser();
      getInfoNft();
   }, []);

   const fetchData = async () => {
      const location: any = await getUserLocation();
      setUserLocation(location);
      setRefreshLoc(true);
      if (mapRef.current) {
         mapRef.current.animateToRegion({
            latitude: location?.coords.latitude as number,
            longitude: location?.coords.longitude as number,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
         });
      };
   };

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
      <SafeAreaView className='h-full bg-zinc-900 flex-1 ' style={StyleSheet.absoluteFillObject}>
         {/* {title} */}
         <View className='flex-row justify-around'>
            <TouchableOpacity className='justify-center items-center' onPress={() => navigation.navigate('Notifications')}>
               <Ionicons name="notifications" size={24} color="white" />
            </TouchableOpacity>
            <Text style={{ alignSelf: 'flex-start' }} className='text-green-600 text-3xl font-bold'>Beenzer</Text>
            <View style={{ alignSelf: 'flex-end' }} >
               <ColorMode />
            </View>
         </View>
         <TouchableOpacity className='justify-center items-center' onPress={() => (fetchData(), setRefreshLoc(false))}>
            {userLocation && refreshLoc ? <View className='flex-row items-center justify-center mb-2'><Text className='text-gray-100 '>{userLocation.city}&nbsp;</Text>
               <ArrowPathIcon size={10} color='white' /></View > :
               <ActivityIndicator className=' bottom-1' color="white" />
            }
         </TouchableOpacity>
         {/* {tab bar} */}
         <View className='flex-row justify-around'>
            <DisplayButton title="Map" display={display} setDisplay={setDisplay} />
            <DisplayButton title="Feeds" display={display} setDisplay={setDisplay} />

         </View>
         {
            display === 'Feeds' &&
            <Feed />
         }
         {
            display === 'Map' &&
            <HomeMap mapRef={mapRef} />
         }
         <Footer />
      </SafeAreaView >
   )
}


export default Home
