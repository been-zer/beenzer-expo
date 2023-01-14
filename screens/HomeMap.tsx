import { View, Text, StyleSheet } from 'react-native'
import MapView from 'react-native-maps';
import { mapStyle, mapStyleLight } from '../services/globals/index';
import { useAtom } from 'jotai';
import { atomUserLocation } from '../services/globals';
import { atomDarkModeOn, atomDarkMode, atomLightMode } from '../services/globals/darkmode';


const HomeMap = ({ mapRef }: any) => {

   const [userLocation, setUserLocation] = useAtom(atomUserLocation);
   const [darkModeOn, setDarkModeOn] = useAtom(atomDarkModeOn);
   const [darkMode, setDarkMode] = useAtom(atomDarkMode);
   const [lightMode, setLightMode] = useAtom(atomLightMode);

   return (
      <View className='flex-1'>
         {
            userLocation && userLocation.coords ?
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
               /> :
               <MapView style={styles.map} customMapStyle={darkModeOn ? mapStyle : mapStyleLight} provider='google' />
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