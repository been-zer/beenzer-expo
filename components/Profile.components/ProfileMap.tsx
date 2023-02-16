import { View, Text, ActivityIndicator, StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import MapView, { Marker, Callout } from 'react-native-maps'
import { mapStyle, mapStyleLight } from '../../services/globals'
import { atomUserLocation, atomUserNFTs } from '../../services/globals'
import { useAtom } from 'jotai'
import { INFT, UserNFT } from '../../Types'
import { atomDarkModeOn, atomDarkMode, atomLightMode } from '../../services/globals/darkmode'

const ProfileMap = ({ uniqueNFTs, dataNFT, viewMap }: { uniqueNFTs: UserNFT | null | INFT, dataNFT: UserNFT[] | null | INFT[], viewMap: number | undefined }) => {
   const [userLocation, setUserLocation] = useAtom(atomUserLocation);
   const [darkModeOn, setDarkModeOn] = useAtom(atomDarkModeOn);
   const [darkMode, setDarkMode] = useAtom(atomDarkMode);
   const [lightMode, setLightMode] = useAtom(atomLightMode);

   function isINFT(nft: INFT | UserNFT): nft is INFT {
      return '_latitude' in nft;
   }

   console.log('uniqueNFTs', uniqueNFTs)
   console.log('dataNFT', uniqueNFTs && isINFT(uniqueNFTs))

   return (
      <View className='items-center'>
         {!uniqueNFTs && userLocation.coords ? (
            <MapView
               customMapStyle={darkModeOn ? mapStyle : mapStyleLight}
               style={styles.map}
               showsUserLocation={true}
               provider="google"
               initialRegion={{
                  latitude: userLocation.coords.latitude as number,
                  longitude: userLocation.coords.longitude as number,
                  latitudeDelta: viewMap || 0.05,
                  longitudeDelta: viewMap || 0.05,

               }}>
               <>
                  {dataNFT && dataNFT.map((nft, index) => {
                     const NFT = isINFT(nft) ? {
                        lat: nft._latitude,
                        lon: nft._longitude,
                        description: nft._description,
                        asset: nft._image
                     } : {
                        lat: nft.lat,
                        lon: nft.lon,
                        description: nft.description,
                        asset: nft.image_uri
                     }
                     return <Marker coordinate={{ latitude: NFT.lat, longitude: NFT.lon }} pinColor="green"
                        key={index} title={NFT.description}>
                        <ImageBackground
                           className='w-10 h-10'
                           imageStyle={{ borderRadius: 50 }}
                           source={{ uri: NFT.asset }} />
                     </Marker>
                  })}
               </>
            </MapView>) : (!uniqueNFTs && <ActivityIndicator className="mt-5" size="large" color="green" />
         )
         }
         {uniqueNFTs && userLocation.coords ? (
            <MapView
               customMapStyle={darkModeOn ? mapStyle : mapStyleLight}
               style={styles.map}
               showsUserLocation={true}
               provider="google"
               initialRegion={{
                  latitude: isINFT(uniqueNFTs) ? uniqueNFTs._latitude as number : uniqueNFTs.lat as number,
                  longitude: isINFT(uniqueNFTs) ? uniqueNFTs._longitude as number : uniqueNFTs.lon as number,
                  latitudeDelta: viewMap || 0.05,
                  longitudeDelta: viewMap || 0.05,

               }}>
               <>
                  <Marker coordinate={{
                     latitude: isINFT(uniqueNFTs) ? uniqueNFTs._latitude as number : uniqueNFTs.lat as number,
                     longitude: isINFT(uniqueNFTs) ? uniqueNFTs._longitude as number : uniqueNFTs.lon as number,
                  }} pinColor="green"
                     title={isINFT(uniqueNFTs) ? uniqueNFTs._description : uniqueNFTs.description}>
                     <ImageBackground
                        className='w-10 h-10'
                        imageStyle={{ borderRadius: 50 }}
                        source={{ uri: isINFT(uniqueNFTs) ? uniqueNFTs._image : uniqueNFTs.image_uri }} />
                  </Marker>
               </>
            </MapView>) : (uniqueNFTs && <ActivityIndicator className="mt-5" size="large" color="green" />)
         }
      </View >
   )
}


export default ProfileMap

const styles = StyleSheet.create({
   map: {
      width: '90%',
      height: 300,
      borderRadius: 10,
      marginTop: 10,
   },
   picture: {
      width: 100,
      height: 100,
      resizeMode: "cover"
   },
})