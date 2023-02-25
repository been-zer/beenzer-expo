import {
   View, Text, ScrollView, SafeAreaView, ImageBackground, ActivityIndicator,
   StyleSheet, TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingViewBase
} from 'react-native'
import { Video } from 'expo-av';
import {
   atomPic, atomPin, atomUserLocation, atomPinCity, atomPhantomWalletPublicKey, atomProfile, mapStyle, mapStyleLight,
   atomSession, atomSharedSecret, atomDappKeyPair, atomTransacSuccess, atomDataPic,
   atomSupply, atomDescription, atomVideo, atomVideoBuffer, atomIsLogin
} from '../services/globals'
import { useAtom } from 'jotai'
import MapView, { Marker, Callout, Circle, Polyline } from 'react-native-maps'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { getCity } from '../services/globals/functions'
import { useNavigation } from '@react-navigation/native'
import { signAndSendTransaction } from '../services/phantom/sign'
import { socketMint, videoToGifSocket } from '../services/socket/function'
import { atomSOCKET } from '../services/socket'
import Properties from '../components/Properties'
import { atomDarkModeOn, atomDarkMode, atomLightMode } from '../services/globals/darkmode'
import Slider from '@react-native-community/slider'
import Footer from './Footer';

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
   const [video, setVideo] = useAtom(atomVideo)
   const NFTsGlobal = "GLOBALLY"
   const [type, setType] = useState('')
   const [videoBuffer, setVideoBuffer] = useAtom(atomVideoBuffer)
   const [isLogin, setIsLogin] = useAtom(atomIsLogin)

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
      setSupply(1)
      if (video) {
         setType('video/mp4')
         console.log('video : ', video)
      }
      if (pic) {
         setType('image/png')
         console.log('pic : ', pic)
      }
   }, [video, pic])


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
            type === 'video/mp4' ? videoBuffer as Buffer : type === 'image/png' ? Buffer.from(dataPic.base64 as string, "base64") : Buffer.from("", "base64"),
            type,
            profile.__pubkey__,
            supply,
            0.1,
            profile._username_,
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
      console.log('clicked')
      // videoToGifSocket(SOCKET, videoBuffer as Buffer)
   }

   if (!isLogin) {
      return (
         <SafeAreaView className={`${darkModeOn ? `bg-${darkMode}` : `bg-white`} h-full flex-1 `}>
            <View className="flex justify-center items-center flex-1">
               <Text className={`${darkModeOn ? `text-white` : `text-${darkMode}`} text-2xl font-bold text-center`}>Please login to phantom to use this functionality</Text>
            </View>
            <Footer />
         </SafeAreaView >
      )
   }

   return (
      <>
         <SafeAreaView className={`${darkModeOn ? `bg-${darkMode}` : `bg-${lightMode}`}`} style={StyleSheet.absoluteFillObject} >
            {
               userLocation.coords && pin && pinCity && (pic || videoBuffer) ? (
                  <ScrollView className="flex-1 ml-5 mr-5" showsVerticalScrollIndicator={false}>
                     <MapView style={{ height: 300 }} provider='google'
                        customMapStyle={darkModeOn ? mapStyle : mapStyleLight}
                        initialRegion={{
                           latitude: userLocation.coords.latitude,
                           longitude: userLocation.coords.longitude,
                           latitudeDelta: 0.05,
                           longitudeDelta: 0.05,
                        }}

                        region={pin && {
                           latitude: pin.latitude,
                           longitude: pin.longitude,
                           latitudeDelta: (distance / 35000),
                           longitudeDelta: (distance / 35000)
                        }}
                     >
                        <Marker coordinate={pin} draggable={true} onDragEnd={(e) => setPin(e.nativeEvent.coordinate)}>
                           {description && <Text className={`${darkModeOn ? `bg-${lightMode}` : `bg-black`} p-2 `}>{description}</Text>}
                           {pic ? <ImageBackground source={{ uri: pic }} style={{ width: 50, height: 50 }} imageStyle={{ borderRadius: 50 }} /> :
                              video ? <Video
                                 source={{ uri: video.uri }}
                                 isMuted={true}
                                 shouldPlay
                                 isLooping
                                 style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 50,
                                 }}
                              />
                                 : null}
                        </Marker>
                        {!maxDistance &&
                           <Circle center={pin} radius={distance} strokeColor={darkModeOn ? `${lightMode}` : "green"} strokeWidth={5} />}
                     </MapView>
                     <View className='mt-2 items-center'>
                        <Text className='text-green-800 text-xl'>DESCRIPTION</Text>
                     </View>
                     <View className="w-full items-center" style={{ height: 100 }}>
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
                        <Text className='text-green-800 text-xl'>SUPPLY : {supply} (beta)</Text>
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
                        <Properties props={profile._username_} propsTitle={'USERNAME'} />
                        <Properties props={profile.__pubkey__} propsTitle={'CREATOR'} />
                        <Properties props={`${maxDistance ? NFTsGlobal : `${(distance / 1000)} km`}`} propsTitle={'VISIBILITY'} />
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