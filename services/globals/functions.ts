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

export const getDate = (unix_timestamp: number) => {
   // Create a new JavaScript Date object based on the timestamp
   // multiplied by 1000 so that the argument is in milliseconds, not seconds.
   var date = new Date(unix_timestamp * 1000);
   // Hours part from the timestamp
   var hours = date.getHours();
   // Minutes part from the timestamp
   var minutes = "0" + date.getMinutes();
   // Seconds part from the timestamp
   var seconds = "0" + date.getSeconds();

   // Will display time in 10:30:23 format
   var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

   return formattedTime;
}



