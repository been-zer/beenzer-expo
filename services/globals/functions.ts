import * as Location from "expo-location";
import { useRef } from "react";
import { Alert, Animated } from "react-native";

export const getUserLocation = async () => {
   const { status } = await Location.requestForegroundPermissionsAsync();
   if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
      return;
   }
   const userLocation = await Location.getCurrentPositionAsync({});
   const coordinates = {
      latitude: userLocation.coords.latitude,
      longitude: userLocation.coords.longitude,
   };
   const city = await getCity(coordinates);
   return { ...userLocation, city };
};

export const getCity = async (coordinates: {
   latitude: number,
   longitude: number,
}) => {
   const cityObj = await Location.reverseGeocodeAsync(coordinates);
   return cityObj[0].city;
};

export const fadeIn = (fadeAnim: any) => {
   Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true
   }).start();
};

export const getHoursFromTimestamp = (timestamp: number): string => {
   let date = new Date(timestamp / 1000);
   return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}


