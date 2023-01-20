import {
   View, Text, ScrollView, SafeAreaView, ImageBackground, ActivityIndicator,
   StyleSheet, TextInput, TouchableOpacity
} from 'react-native'
import {
   atomPic, atomPin, atomUserLocation, atomPinCity, atomPhantomWalletPublicKey, atomProfile, mapStyle, mapStyleLight,
   atomSession, atomSharedSecret, atomDappKeyPair, atomTransacSuccess, atomDataPic,
   atomSupply, atomDescription
} from '../services/globals'
import { useAtom } from 'jotai'
import MapView, { Marker, Callout, Circle, Polyline } from 'react-native-maps'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { getCity } from '../services/globals/functions'
import { useNavigation } from '@react-navigation/native'
import { signAndSendTransaction } from '../services/phantom/sign'
import { socketMint } from '../services/socket/function'
import { atomSOCKET } from '../services/socket'
import Properties from '../components/Properties'
import { atomDarkModeOn, atomDarkMode, atomLightMode } from '../services/globals/darkmode'
import Slider from '@react-native-community/slider'

const PostBeenzer = () => {

   const [pic, setPic] = useAtom(atomPic)
   const [pin, setPin] = useAtom(atomPin)
   const [userLocation, setUserLocation] = useAtom(atomUserLocation)
   const [pinCity, setPinCity] = useAtom(atomPinCity)
   const [phantomWalletPublicKey, setPhantomWalletPublicKey] = useAtom(atomPhantomWalletPublicKey)
   const [profile, setProfile] = useAtom(atomProfile)
   const [description, setDescription] = useAtom(atomDescription)
   const scrollViewRef = useRef<any>(null)
   const navigation = useNavigation()
   const [session, setSession] = useAtom(atomSession)
   const [sharedSecret, setSharedSecret] = useAtom(atomSharedSecret)
   const [dappKeyPair, setDappKeyPair] = useAtom(atomDappKeyPair)
   const [transacSuccess, setTransacSuccess] = useAtom(atomTransacSuccess)
   const [dataPic, setDataPic] = useAtom(atomDataPic)
   const [SOCKET] = useAtom(atomSOCKET)
   const [darkModeOn, setDarkModeOn] = useAtom(atomDarkModeOn)
   const [darkMode, setDarkMode] = useAtom(atomDarkMode)
   const [lightMode, setLightMode] = useAtom(atomLightMode)
   const [distance, setDistance] = useState(1000)
   const [supply, setSupply] = useAtom(atomSupply)
   const [maxDistance, setMaxDistance] = useState(false)
   const [minLat, setMinLat] = useState((pin.latitude - 0.008983).toString())
   const [maxLat, setMaxLat] = useState((pin.latitude + 0.008983).toString())
   const [minLong, setMinLong] = useState((pin.longitude - 0.009009).toString())
   const [maxLong, setMaxLong] = useState((pin.longitude + 0.009009).toString())
   const NFTsGlobal = "GLOBALLY"

   useLayoutEffect(() => {
      navigation.setOptions({
         headerTitle: 'Drop Beenzer',
         headerTitleStyle: {
            color: `${darkModeOn ? `${lightMode}` : "black"}`,
         },
         headerTransparent: true,
         headerTintColor: `${darkModeOn ? `${lightMode}` : "black"}`,
      })
   }, [navigation])

   useEffect(() => {
      if (userLocation.coords) {
         setPin({ latitude: userLocation.coords.latitude, longitude: userLocation.coords.longitude })
      }
   }, [userLocation, pic])

   useEffect(() => {
      if (pin.latitude && pin.longitude) {
         const cityInfo = async () => {
            const city = await getCity(pin)
            setPinCity(city as any)
         }
         cityInfo()
      }
   }, [pin])

   useEffect(() => {
      if (transacSuccess) {
         socketMint(SOCKET,
            Buffer.from(dataPic.base64 as any, "base64"),
            "image/png",
            profile[0].__pubkey__,
            supply,
            profile[0]._username_,
            description,
            pinCity,
            pin.latitude,
            pin.longitude,
            `${maxDistance ? 0 : `${(distance / 1000)} km`}`,
            maxLat,
            minLat,
            maxLong,
            minLong,
         )
         setTransacSuccess(false)
      }
   }, [transacSuccess])

   useEffect(() => {
      if (distance === 3000000) {
         setMaxDistance(true)
         setMinLat('-')
         setMaxLat('-')
         setMinLong('-')
         setMaxLong('-')
      }
      else {
         setMaxDistance(false)
         setMinLat((pin.latitude - (distance / 1000) * 0.008983).toString())
         setMaxLat((pin.latitude + (distance / 1000) * 0.008983).toString())
         setMinLong((pin.longitude - (distance / 1000) * 0.009009).toString())
         setMaxLong((pin.longitude + (distance / 1000) * 0.009009).toString())
      }
   }, [distance, pin])

   const createBeenzer = () => {
      signAndSendTransaction(session, phantomWalletPublicKey, sharedSecret, dappKeyPair)
      setDescription('')
   }

   return (
      <>
         <SafeAreaView className={`${darkModeOn ? `bg-${darkMode}` : `bg-${lightMode}`}`} style={StyleSheet.absoluteFillObject} >
            {
               userLocation.coords && pin && pic ? (
                  <ScrollView className="flex-1 ml-5 mr-5" showsVerticalScrollIndicator={false}>
                     <MapView style={{ height: 300 }} provider='google'
                        customMapStyle={darkModeOn ? mapStyle : mapStyleLight}
                        initialRegion={{
                           latitude: userLocation.coords.latitude,
                           longitude: userLocation.coords.longitude,
                           latitudeDelta: 0.05,
                           longitudeDelta: 0.05,
                        }}

                     >
                        <Marker coordinate={pin} draggable={true} onDragEnd={(e) => setPin(e.nativeEvent.coordinate)}>
                           {description && <Text className={`${darkModeOn ? `bg-${lightMode}` : `bg-black`} p-2 `}>{description}</Text>}
                           {pic && <ImageBackground source={{ uri: pic }} style={{ width: 50, height: 50 }} imageStyle={{ borderRadius: 50 }} />}
                        </Marker>
                        {!maxDistance &&
                           <Circle center={pin} radius={distance} strokeColor={darkModeOn ? `${lightMode}` : "green"} strokeWidth={5} />}
                     </MapView>
                     <View className='mt-2 items-center'>
                        <Text className='text-green-800 text-xl'>DESCRIPTION</Text>
                     </View>
                     <View className="w-full items-center">
                        <TextInput
                           textAlign='center'
                           className={`text-${darkModeOn ? lightMode : darkMode} flex-1`}
                           style={styles.input}
                           blurOnSubmit={true}
                           multiline={true}
                           placeholder={description || "Insert a description.."}
                           onChangeText={(newText: string) => setDescription(newText)}
                           placeholderTextColor={darkModeOn ? `${lightMode}` : "black"}
                        />
                     </View>
                     <View className='mt-2 items-center'>
                        <Text className='text-green-800 text-xl'>DISTANCE : {maxDistance ? 'GLOBALLY' : `~${distance / 1000} km`}</Text>
                     </View>
                     <Slider
                        className="mt-2 "
                        minimumValue={1000}
                        maximumValue={3000000}
                        value={1000}
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#000000"
                        step={1000}
                        onValueChange={(value) => (
                           setDistance(value)
                        )
                        }
                     />
                     <View className='mt-2 items-center'>
                        <Text className='text-green-800 text-xl'>SUPPLY : {supply}</Text>
                     </View>
                     <Slider
                        className="mt-2"
                        minimumValue={1}
                        maximumValue={50}
                        onValueChange={(value) => setSupply(value)}
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#000000"
                        step={1}
                     />
                     <View className="w-full items-center mt3">
                        <TouchableOpacity className="mt-2 w-full bg-green-600  p-4 rounded-2xl" onPress={createBeenzer}>
                           <Text className="font-semibold text-center">Drop Beenzer 📍 Mint NFT </Text>
                        </TouchableOpacity>
                     </View>
                     <View className='mt-2 items-center'>
                        <Text className='text-green-800 text-xl '>PROPERTIES</Text>
                     </View>
                     <View className='flex-row flex-wrap mt-2'>
                        <Properties props={pin.latitude} propsTitle={'LATITUDE'} />
                        <Properties props={pin.longitude} propsTitle={'LONGITUDE'} />
                        <Properties props={pinCity} propsTitle={'CITY'} />
                        <Properties props={profile[0]._username_} propsTitle={'USERNAME'} />
                        <Properties props={profile[0].__pubkey__} propsTitle={'CREATOR'} />
                        <Properties props={`${maxDistance ? NFTsGlobal : `${(distance / 1000)} km`}`} propsTitle={'DISTANCE'} />
                        <Properties props={minLat} propsTitle={'MIN LAT'} />
                        <Properties props={maxLat} propsTitle={'MAX LAT'} />
                        <Properties props={minLong} propsTitle={'MIN LONG'} />
                        <Properties props={maxLong} propsTitle={'MAX LONG'} />
                     </View>
                  </ScrollView>
               ) : (
                  <SafeAreaView className="items-center justify-center content-center">
                     <ActivityIndicator className="self-center m-10" size="large" color="green" />
                  </SafeAreaView>)
            }
         </SafeAreaView>
      </>
   )
}

const styles = StyleSheet.create({
   input: {
      borderColor: "gray",
      width: "100%",
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
      marginBottom: 5,
      marginTop: 5,
      height: 100,
   },
});

export default PostBeenzer