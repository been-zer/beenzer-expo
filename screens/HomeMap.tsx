import { View, StyleSheet, ImageBackground, Modal, TouchableOpacity, Image, Text, SafeAreaView, ScrollView } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import { mapStyle, mapStyleLight } from '../services/globals/index';
import { useAtom } from 'jotai';
import { atomUserLocation } from '../services/globals';
import { atomDarkModeOn, atomDarkMode, atomLightMode } from '../services/globals/darkmode';
import { INFT } from '../Types';
import { useState } from 'react';
import FeedsItem from './FeedsItem';

const HomeMap = ({ mapRef, feedItems }: { mapRef: any, feedItems: INFT[] }) => {

   const [userLocation, setUserLocation] = useAtom(atomUserLocation);
   const [darkModeOn, setDarkModeOn] = useAtom(atomDarkModeOn);
   const [darkMode, setDarkMode] = useAtom(atomDarkMode);
   const [lightMode, setLightMode] = useAtom(atomLightMode);
   const [showItem, setShowItem] = useState(false)
   const [item, setItem] = useState<INFT>({} as INFT)

   if (showItem) {
      console.log(item._asset)
      return (
         <ScrollView style={{ width: '100% ', height: '100% ' }}
            className='flex-1 bg-gray-900'>
            <Text>Hey</Text>
            <Image source={{ uri: item._asset }} style={{ width: '100%', height: '100%' }}
               className='rounded-2xl' />
         </ScrollView >
      )
   }

   const handlePress = (nft: any) => {
      setShowItem(!showItem)
      setItem(nft)
   }

   return (
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
                           source={{ uri: nft._asset }} />
                     </Marker>
                  )
               })}
            </MapView>
         ) : (
            <MapView style={styles.map} customMapStyle={darkModeOn ? mapStyle : mapStyleLight} provider='google' />)
         }
      </View>
   )
}
const styles = StyleSheet.create({
   map: {
      ...StyleSheet.absoluteFillObject,
   }
});

export default HomeMap;