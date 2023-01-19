import { Camera, CameraCapturedPicture, CameraType, FlashMode } from 'expo-camera';
import * as ScreenOrientation from 'expo';
import { useState, useRef } from 'react';
import { Button, Dimensions, Text, TouchableOpacity, View, ImageBackground, Image, ScrollView, SafeAreaView } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
import { atomPic, atomDataPic, atomKeepPic } from '../services/globals';
import { useAtom } from 'jotai';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { } from 'react-native-paper'
import { BoltIcon, BoltSlashIcon, ArrowPathRoundedSquareIcon } from "react-native-heroicons/solid";
import { atomDarkModeOn, atomDarkMode, atomLightMode } from '../services/globals/darkmode';


export default function Picture() {
   const [type, setType] = useState(CameraType.back);
   const [permission, requestPermission] = Camera.useCameraPermissions();
   const cameraRef = useRef<Camera>(null);
   const [pic, setPic] = useAtom(atomPic);
   const [portrait, setPortrait] = useState<boolean>(true);
   const [camReady, setCamReady] = useState<boolean>(false);
   const navigation = useNavigation<NavigationProp<ParamListBase>>();
   const [clicked, setClicked] = useState<boolean>(true);
   const [dataPic, setDatapic] = useAtom(atomDataPic)
   const [flash, setFlash] = useState<FlashMode>(FlashMode.off);
   const [darkModeOn, setDarkModeOn] = useAtom(atomDarkModeOn);
   const [darkMode, setDarkMode] = useAtom(atomDarkMode);
   const [lightMode, setLightMode] = useAtom(atomLightMode);

   if (!permission) {
      // Camera permissions are still loading
      return <View />;
   }

   if (!permission.granted) {
      // Camera permissions are not granted yet
      return (
         <View className={`flex-1 justify-center ${darkModeOn ? `bg-${darkMode}` : `bg-${lightMode}`}`}>
            <Text style={{
               textAlign: 'center', color:
                  darkModeOn ? `${lightMode}` : 'black'
            }}>
               We need your permission to show the camera</Text>
            <Button onPress={requestPermission} title="grant permission" />
         </View >
      );
   }

   const toggleCameraType = () => {
      setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
   }

   const cameraReady = () => {
      setCamReady(true);
   }

   const takePicture = async () => {
      setClicked(false);
      if (camReady && cameraRef.current) {
         const data = await cameraRef.current.takePictureAsync({
            base64: true,
            quality: 0.5,
         }
         );
         setDatapic(data as CameraCapturedPicture)
         setPortrait(data.width < data.height);
         if (type === CameraType.front) {
            const flipped = await ImageManipulator.manipulateAsync(
               data.uri,
               [{ flip: ImageManipulator.FlipType.Horizontal }],
            );
            setPic(flipped.uri);
         } else {
            setPic(data.uri);
         }
      }
   }

   const handleSave = () => {
      setClicked(true);
      navigation.navigate('PostBeenzer');
   }

   return (
      <>
         <View className='flex-1'>
            {pic ?
               (
                  <>
                     <SafeAreaView className={`flex-1 justify-center items-center ${darkModeOn ? `bg-${darkMode}` : `bg-${lightMode}`}`}>
                        <ImageBackground
                           source={{ uri: pic }}
                           resizeMode="contain"
                           style={{
                              transform: [{ rotate: portrait ? '0deg' : '90deg' }],
                              flex: 1,
                              width: '100%',
                           }}>
                        </ImageBackground>
                        <View className='flex-row mt-2'>
                           <TouchableOpacity className="mr-1 w-1/4 border border-red-600  p-4 rounded-2xl" onPress={() => (
                              setPic(""), setClicked(true)
                           )} >
                              <Text className="font-semibold text-red-600 text-center" >Cancel</Text>
                           </TouchableOpacity>
                           <TouchableOpacity className="ml-1 w-1/4 border border-green-600  p-4 rounded-2xl" onPress={handleSave} >
                              <Text className="font-semibold text-green-500 text-center" >Keep</Text>
                           </TouchableOpacity>

                        </View>
                     </SafeAreaView>
                  </>
               ) :

               (
                  <Camera
                     className='flex-1'
                     flashMode={flash}
                     type={type} ref={cameraRef} onCameraReady={cameraReady}>
                     <View className="flex-1 flex-row content-center">
                        < View className='flex-1 flex-col justify-end pb-5'>
                           <View className='flex-row justify-evenly'>
                              <TouchableOpacity
                                 className='brounded-2xl '
                                 onPress={() => setFlash(flash === FlashMode.off ? FlashMode.on : flash === FlashMode.on ? FlashMode.auto : FlashMode.off)}>
                                 <Text className='text-white text-xl '>{flash === FlashMode.on ? <BoltIcon color='green' size={65} /> : flash === FlashMode.off ? <BoltSlashIcon color='green' size={65} /> : flash === FlashMode.auto ? 'auto' : ''}</Text>
                              </TouchableOpacity >
                              <TouchableOpacity className=" rounded-2xl  w-1/4" onPress={toggleCameraType}>
                                 <ArrowPathRoundedSquareIcon size={65} color="green" />
                              </TouchableOpacity>
                           </View>
                           <TouchableOpacity className=" mb-5 w-3/4 self-center border border-green-500 p-4 rounded-2xl" disabled={!clicked} onPress={() => takePicture()}>
                              <Text className="font-semibold text-center text-2xl text-white "> Beenzer 📷 </Text>
                           </TouchableOpacity>
                        </View>
                     </View>
                  </Camera >
               )
            }
         </View >
      </>
   );
}

