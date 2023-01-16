import { View, Text, ActivityIndicator, StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import MapView, { Marker, Callout } from 'react-native-maps'
import { mapStyle, mapStyleLight } from '../../services/globals'
import { atomUserLocation, atomUserNFTs } from '../../services/globals'
import { useAtom } from 'jotai'
import { INFT } from '../../Types'
import { atomDarkModeOn, atomDarkMode, atomLightMode } from '../../services/globals/darkmode'

const ProfileMap = ({ uniqueNFTs, dataNFT }: { uniqueNFTs: INFT | null, dataNFT: INFT[] | null }) => {
   const [userLocation, setUserLocation] = useAtom(atomUserLocation);
   const [darkModeOn, setDarkModeOn] = useAtom(atomDarkModeOn);
   const [darkMode, setDarkMode] = useAtom(atomDarkMode);
   const [lightMode, setLightMode] = useAtom(atomLightMode);

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
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,

               }}>
               <>
                  {dataNFT && dataNFT.map((nft, index) => {
                     return <Marker coordinate={{ latitude: nft._latitude, longitude: nft._longitude }} pinColor="green"
                        key={index} title={nft._description}
                     >
                        <ImageBackground
                           className='w-10 h-10'
                           imageStyle={{ borderRadius: 50 }}
                           source={{ uri: nft._asset }}

                        />
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
                  latitude: uniqueNFTs._latitude as number,
                  longitude: uniqueNFTs._longitude as number,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,

               }}>
               <>
                  <Marker coordinate={{ latitude: uniqueNFTs._latitude, longitude: uniqueNFTs._longitude }} pinColor="green"
                     title={uniqueNFTs._description}
                  >
                     <ImageBackground
                        className='w-10 h-10'
                        imageStyle={{ borderRadius: 50 }}
                        source={{ uri: uniqueNFTs._asset }}
                     />
                  </Marker>
               </>
            </MapView>) : (uniqueNFTs && <ActivityIndicator className="mt-5" size="large" color="green" />
         )
         }
      </View>
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