import { View, StyleSheet, ImageBackground, Modal, TouchableOpacity, Image, Text, SafeAreaView, ScrollView } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import { mapStyle, mapStyleLight } from '../services/globals/index';
import { useAtom } from 'jotai';
import { atomUserLocation } from '../services/globals';
import { atomDarkModeOn, atomDarkMode, atomLightMode } from '../services/globals/darkmode';
import { INFT, UserNFT } from '../Types';
import { useEffect, useState } from 'react';
import FeedsItem from './FeedsItem';
import Footer from './Footer';

const HomeMap = ({ mapRef, feedItems, showItem, setShowItem }: {
   mapRef: any, feedItems: INFT[], showItem: boolean,
   setShowItem: (showItem: boolean) => void
}) => {

   const [userLocation, setUserLocation] = useAtom(atomUserLocation);
   const [darkModeOn, setDarkModeOn] = useAtom(atomDarkModeOn);
   const [darkMode, setDarkMode] = useAtom(atomDarkMode);
   const [lightMode, setLightMode] = useAtom(atomLightMode);
   const [item, setItem] = useState<INFT>({} as INFT)

   useEffect(() => {
      setShowItem(false)
   }, [])


   if (showItem) {
      return (
         <FeedsItem feedItem={item} />
      )
   }

   const handlePress = (nft: INFT) => {
      setShowItem(!showItem)
      setItem(nft)
   }

   return (
      <>
         <View className='flex-1'>
            {userLocation && userLocation.coords ? (
               <MapView
                  ref={mapRef}
                  customMapStyle={darkModeOn ? mapStyle : mapStyleLight}
                  showsUserLocation={true}
                  provider='google'
                  initialRegion={{
                     latitude: userLocation.coords.latitude,
                     longitude: userLocation.coords.longitude,
                     latitudeDelta: 0.05,
                     longitudeDelta: 0.05,
                  }}
                  style={styles.map}
               >
                  {feedItems && feedItems.map((nft, index) => {
                     return (
                        <Marker tappable={true} onPress={() => handlePress(nft)}
                           coordinate={{ latitude: nft._latitude, longitude: nft._longitude }} pinColor="green"
                           key={index} title={nft._description}>
                           <ImageBackground
                              className='w-10 h-10'
                              imageStyle={{ borderRadius: 50 }}
                              source={{ uri: nft._image }} />
                        </Marker>
                     )
                  })}
               </MapView>
            ) : (
               <MapView style={styles.map} customMapStyle={darkModeOn ? mapStyle : mapStyleLight} provider='google' />)
            }
         </View>
         <Footer />
      </>
   )
}
const styles = StyleSheet.create({
   map: {
      ...StyleSheet.absoluteFillObject,
   }
});

export default HomeMap;