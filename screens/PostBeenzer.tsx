import {
   View, Text, ScrollView, SafeAreaView, ImageBackground, ActivityIndicator,
   StyleSheet, TextInput, TouchableOpacity
} from 'react-native'
import {
   atomPic, atomPin, atomUserLocation, atomPinCity, atomPhantomWalletPublicKey, atomProfile, mapStyle,
   atomDescription, atomSession, atomSharedSecret, atomDappKeyPair, atomTransacSuccess, atomDataPic,
   atomDistance, atomSupply
} from '../services/globals'
import { useAtom } from 'jotai'
import MapView, { Marker, Callout, Circle } from 'react-native-maps'
import { useEffect, useLayoutEffect, useRef } from 'react'
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
   const [userLocation] = useAtom(atomUserLocation)
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
   const [distance, setDistance] = useAtom(atomDistance)
   const [supply, setSupply] = useAtom(atomSupply)

   const scrollToBottom = () => {
      if (scrollViewRef.current) {
         scrollViewRef.current.scrollToEnd({ animated: true })
      }
   }

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
   }, [userLocation])

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
         )
         setTransacSuccess(false)
      }
   }, [transacSuccess])

   const createBeenzer = () => {
      signAndSendTransaction(session, phantomWalletPublicKey, sharedSecret, dappKeyPair)
   }

   return (
      <>
         <SafeAreaView className={`${darkModeOn ? `bg-${darkMode}` : `bg-${lightMode}`}`} style={StyleSheet.absoluteFillObject} >
            {
               userLocation.coords &&
               <ScrollView className="flex-1 ml-5 mr-5" ref={scrollViewRef} showsVerticalScrollIndicator={false}>
                  <MapView style={{ height: 300 }} provider='google'
                     customMapStyle={mapStyle}
                     initialRegion={{
                        latitude: userLocation.coords.latitude,
                        longitude: userLocation.coords.longitude,
                        latitudeDelta: 0.02,
                        longitudeDelta: 0.02,
                     }}
                  >
                     <Marker
                        coordinate={pin}
                        // title={description}
                        // focusable={true}
                        // description={description}
                        draggable={true}
                        onDragEnd={(e) => setPin(e.nativeEvent.coordinate)}

                     >
                        <Text className=
                           {`${darkModeOn ? `bg-${lightMode}` : `bg-black`} p-2 `}

                        >{description}</Text>
                        {pic && <ImageBackground
                           source={{ uri: pic }}
                           style={{ width: 50, height: 50 }}
                           imageStyle={{ borderRadius: 50 }}
                        />}
                        {/* <Callout> */}
                        {/* <Text>My Callout</Text>
                     <ImageBackground
                        source={{ uri: pic }}
                        style={{ width: 50, height: 50 }}
                     /> */}
                        {/* </Callout> */}
                     </Marker>
                     <Circle center={pin} radius={distance}
                        strokeColor={darkModeOn ? `${lightMode}` : "black"}
                        strokeWidth={5}


                     />
                  </MapView>
                  <View className='mt-2 items-center'>
                     <Text className='text-green-800 text-xl'>DESCRIPTION</Text>
                  </View>
                  <View className="w-full items-center">
                     <TextInput
                        textAlign='center'
                        className={`${darkModeOn ? `text-${lightMode}` : `text-black`}`}
                        onFocus={scrollToBottom}
                        style={styles.input}
                        blurOnSubmit={true}
                        multiline={true}
                        placeholder={description || "Insert a description.."}
                        onChangeText={(newText: string) => setDescription(newText)}
                        placeholderTextColor={darkModeOn ? `${lightMode}` : "black"}
                     />
                  </View>
                  <View className='mt-2 items-center'>
                     <Text className='text-green-800 text-xl'>DISTANCE : {distance / 1000} km</Text>
                  </View>
                  <Slider
                     className="mt-2 "
                     minimumValue={1000}
                     maximumValue={50000}
                     minimumTrackTintColor="#FFFFFF"
                     maximumTrackTintColor="#000000"
                     step={1000}
                     onValueChange={(value) => setDistance(value)}
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
                     <TouchableOpacity
                        className="mt-2 w-full bg-green-600  p-4 rounded-2xl"
                        onPress={createBeenzer}
                     >
                        <Text className="font-semibold text-center">
                           {" "}
                           Drop Beenzer 📍 Mint NFT
                        </Text>
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
                  </View>
               </ScrollView>
            }
            {!userLocation.coords &&
               <SafeAreaView className="items-center justify-center content-center">
                  <ActivityIndicator
                     className="self-center m-10"
                     size="large"
                     color="green"
                  />
               </SafeAreaView>
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