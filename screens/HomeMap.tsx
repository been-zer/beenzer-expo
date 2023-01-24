import { View, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import { mapStyle, mapStyleLight } from '../services/globals/index';
import { useAtom } from 'jotai';
import { atomUserLocation } from '../services/globals';
import { atomDarkModeOn, atomDarkMode, atomLightMode } from '../services/globals/darkmode';
import { INFT } from '../Types';


const HomeMap = ({ mapRef, feedItems }: { mapRef: any, feedItems: INFT[] }) => {

   const [userLocation, setUserLocation] = useAtom(atomUserLocation);
   const [darkModeOn, setDarkModeOn] = useAtom(atomDarkModeOn);
   const [darkMode, setDarkMode] = useAtom(atomDarkMode);
   const [lightMode, setLightMode] = useAtom(atomLightMode);

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
                     <TouchableOpacity key={nft.__token__} onPress={() => console.log('hey')}>
                        <Marker coordinate={{ latitude: nft._latitude, longitude: nft._longitude }} pinColor="green"
                           key={index} title={nft._description}>
                           <ImageBackground
                              className='w-10 h-10'
                              imageStyle={{ borderRadius: 50 }}
                              source={{ uri: nft._asset }} />
                        </Marker>
                     </TouchableOpacity>)
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