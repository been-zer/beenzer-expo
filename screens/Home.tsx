import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native"
import Footer from './Footer';
import MapView, { MapViewProps } from 'react-native-maps';
import { mapStyle } from '../global';
import { getUserLocation } from '../services/Functions';
import { ActivityIndicator } from 'react-native-paper';
import { ArrowPathIcon } from 'react-native-heroicons/outline'
import { ILocation } from '../Types';

const Home = () => {
   const [userLocation, setUserLocation] = useState<ILocation>();
   const [refreshLoc, setRefreshLoc] = useState<boolean>(false);
   const mapRef = useRef<MapView>(null);

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

   useEffect(() => {
      fetchData();
   }, []);

   return (
      <SafeAreaView className='h-full bg-zinc-900 flex-1 ' style={StyleSheet.absoluteFillObject}>
         <View className='justify-center'>
            {/* {title} */}
            <Text className='text-green-600 bottom-1 text-3xl font-bold text-center'>Beenzer</Text>
            <TouchableOpacity className='justify-center items-center' onPress={() => (fetchData(), setRefreshLoc(false))}>
               {userLocation && refreshLoc ? <View className='flex-row items-center justify-center mb-2'><Text className='text-gray-100 '>{userLocation.city}&nbsp;</Text>
                  <ArrowPathIcon size={10} color='white' /></View > :
                  <ActivityIndicator className=' bottom-1' color="white" />
               }
            </TouchableOpacity>
         </View>
         {/* map */}
         {userLocation ?
            <View className='flex-1'>
               <MapView
                  ref={mapRef}
                  customMapStyle={mapStyle}
                  showsUserLocation={true}
                  provider='google'
                  initialRegion={{
                     latitude: userLocation.coords.latitude,
                     longitude: userLocation.coords.longitude,
                     latitudeDelta: 0.05,
                     longitudeDelta: 0.05,
                  }}
                  style={styles.map}
               />
            </View> : <View className='flex-1'>
               <MapView style={styles.map} customMapStyle={mapStyle} provider='google' />
            </View>}
         {/* Footer */}
         <Footer />
      </SafeAreaView >
   )
}

const styles = StyleSheet.create({
   map: {
      ...StyleSheet.absoluteFillObject,
      height: '120%',
   },
   picture: {
      width: 100,
      height: 100,
      resizeMode: "cover"
   },
   callout: {
      backgroundColor: 'black',
      color: 'white'
   }
});

export default Home
