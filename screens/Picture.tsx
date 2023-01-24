import { Camera, CameraCapturedPicture, CameraType, FlashMode } from 'expo-camera';
import { useState, useRef, useEffect } from 'react';
import { Button, Dimensions, Text, TouchableOpacity, View, ImageBackground, Image, ScrollView, SafeAreaView, Platform, Alert } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
import { atomPic, atomDataPic, atomVideo } from '../services/globals';
import { useAtom } from 'jotai';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { } from 'react-native-paper'
import { BoltIcon, BoltSlashIcon, ArrowPathRoundedSquareIcon } from "react-native-heroicons/solid";
import { atomDarkModeOn, atomDarkMode, atomLightMode } from '../services/globals/darkmode';
import { Video } from 'expo-av';

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
   const [isRecording, setIsRecording] = useState<boolean>(false);
   const [video, setVideo] = useAtom(atomVideo);

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

   const recordVideo = async () => {
      setIsRecording(true);
      let options = {
         quality: '1080p',
         maxDuration: 60,
         mute: true,
         mirror: type === CameraType.front ? true : false,
      }
      if (camReady && cameraRef.current) {
         cameraRef.current.recordAsync(options).then(recordVideo => {
            setVideo(recordVideo), console.log('recordVideo', recordVideo);
         });
      }
   }

   const stopVideo = () => {
      setIsRecording(false);
      cameraRef.current?.stopRecording();
   }

   const takePicture = async () => {
      setClicked(false);
      if (camReady && cameraRef.current) {
         const data = await cameraRef.current.takePictureAsync({
            base64: true,
            quality: 0.8,
            skipProcessing: true,
         }
         );
         setDatapic(data as CameraCapturedPicture)
         if (data.width > data.height && Platform.OS === 'ios') {
            Alert.alert('To use Landscape mode, please use lock orientation in your device settings');
            setPic('')
            setClicked(true)
            return
         }
         if (type === CameraType.front) {
            const flipped = await ImageManipulator.manipulateAsync(
               data.uri,
               [{ flip: ImageManipulator.FlipType.Horizontal }],
            );
            setPic(flipped.uri);
         } else {
            console.log('data', data)
            setPic(data.uri);
         }
      }
   }

   const handleSave = () => {
      setClicked(true);
      navigation.navigate('PostBeenzer');
   }

   if (video) {
      return (
         <View className={`flex-1 ${darkModeOn ? `bg-${darkMode}` : `bg-${lightMode}`}`}>
            <View className='flex-1'>
               <Video
                  source={{ uri: video.uri }}
                  shouldPlay
                  isLooping
                  isMuted
                  style=
                  {{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}

               />
            </View>
            <View className='flex-1 justify-end mb-20 z-1'>
               <View className='flex-row self-center'>
                  <TouchableOpacity className="mr-1 w-1/3 border-4 border-red-600  p-4 rounded-2xl" onPress={() => (
                     setVideo(null), setClicked(true)
                  )} >
                     <Text className="font-semibold text-2xl text-red-600 text-center" >Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="ml-1 w-1/3  border-4 border-green-600  p-4 rounded-2xl" onPress={handleSave} >
                     <Text className="font-semibold text-2xl text-green-500 text-center" >Keep</Text>
                  </TouchableOpacity>
               </View>
            </View>
         </View>
      )
   }


   return (
      <>
         <View className='flex-1'>
            {pic ?
               (
                  <>
                     <ImageBackground
                        source={{ uri: pic }}
                        resizeMode="contain"
                        className='bg-zinc-800 rounded-2xl z-0'
                        style={
                           {
                              width: portrait ? Dimensions.get('window').width : Dimensions.get('window').height,
                              height: portrait ? Dimensions.get('window').height : Dimensions.get('window').width,
                           }
                        }>
                        <View className='flex-1 justify-end mb-10 z-1'>
                           <View className='flex-row self-center'>
                              <TouchableOpacity className="mr-1 w-1/3 border-4 border-red-600  p-4 rounded-2xl" onPress={() => (
                                 setPic(""), setClicked(true)
                              )} >
                                 <Text className="font-semibold text-2xl text-red-600 text-center" >Cancel</Text>
                              </TouchableOpacity>
                              <TouchableOpacity className="ml-1 w-1/3  border-4 border-green-600  p-4 rounded-2xl" onPress={handleSave} >
                                 <Text className="font-semibold text-2xl text-green-500 text-center" >Keep</Text>
                              </TouchableOpacity>
                           </View>
                        </View>
                     </ImageBackground>
                  </>
               ) :
               (
                  <Camera
                     ratio='16:9'
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
                           <TouchableOpacity className=" mb-5 w-3/4 self-center border border-green-500 p-4 rounded-2xl" onLongPress={recordVideo} onPressOut={stopVideo} onPress={() => takePicture()}>
                              <Text className="font-semibold text-center text-2xl text-white ">{isRecording ? `Stop recording ` : 'Beenzer 📷 🎥 '}</Text>
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