
import { Dimensions, StyleSheet, View, Text, Image, Alert, SafeAreaView, Modal, TouchableOpacity, ImageBackground, ScrollView } from "react-native";
import { useState } from "react";
import { INFT, UserNFT } from "../Types";
import { atomDarkModeOn, atomDarkMode, atomLightMode } from "../services/globals/darkmode";
import { useAtom, } from "jotai";
import Properties from "../components/Properties";
import ProfileMap from "../components/Profile.components/ProfileMap";
import { ActivityIndicator } from "react-native-paper";
import { Video } from 'expo-av';
import { atomModalVisible } from "../services/globals/";


const FeedsItem = ({ feedItem }: {
   feedItem: INFT,
}) => {

   const [darkMode, setDarkMode] = useAtom(atomDarkMode);
   const [lightMode, setLightMode] = useAtom(atomLightMode);
   const [darkModeOn, setDarkModeOn] = useAtom(atomDarkModeOn);
   const [modalVisible, setModalVisible] = useAtom(atomModalVisible);

   const handleModal = () => {
      setModalVisible(!modalVisible)
   }

   return (
      <SafeAreaView style={styles.container} className={`${darkModeOn ? `bg-${darkMode}` : `bg-white`}`}>
         {feedItem &&
            <>
               {feedItem._asset ? (
                  <View className="flex justify-start mt-2">
                     <Video source={{ uri: feedItem._asset }} isMuted={true} shouldPlay isLooping style={{ width: "100%", height: "91%" }}
                        className={`rounded-2xl ${modalVisible ? 'opacity-5' : `opacity-100`}`}>
                        {!modalVisible &&
                           <TouchableOpacity
                              className={`${darkModeOn ? `bg-${darkMode}` : `bg-white`} justify-center content-center rounded-full w-10 h-10 self-end mt-96 mr-2 z-10`}
                              activeOpacity={0} onPress={handleModal}>
                              <Text className={`${darkModeOn ? `text-${lightMode}` : `text-black`} self-center`}>+</Text>
                           </TouchableOpacity>}
                     </Video>
                  </View>
               ) : (
                  <ImageBackground
                     source={{ uri: feedItem._image }}
                     style={{
                        width: "100%", height: "91%",
                        borderRadius: 10,
                     }}
                     className={`${modalVisible ? 'opacity-5' : `opacity-100`}`}
                  >
                     {!modalVisible &&
                        <TouchableOpacity
                           className={`${darkModeOn ? `bg-${darkMode}` : `bg-white`} justify-center content-center rounded-full w-10 h-10 self-end mt-96 mr-2 z-10`}
                           activeOpacity={0} onPress={handleModal}>
                           <Text className={`${darkModeOn ? `text-${lightMode}` : `text-black`} self-center`}>+</Text>
                        </TouchableOpacity>}
                  </ImageBackground>
               )}
               <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => setModalVisible(false)}
               >
                  <SafeAreaView >
                     <ScrollView>
                        <View className="flex flex-row justify-between mt-5">
                           <Properties props={feedItem._username} propsTitle={'Creator'} />
                           <Properties props={feedItem._description} propsTitle={'DESCRIPTION'} />
                           <Properties props={feedItem._city} propsTitle={'CITY'} />
                        </View>
                        <ProfileMap uniqueNFTs={feedItem} dataNFT={null} viewMap={15} />
                        <Properties props={feedItem._visibility} propsTitle={'VISIBILITY'} />
                        <View className="flex flex-row justify-between">
                           <Properties props={feedItem._date} propsTitle={'DATE'} />
                           <TouchableOpacity
                              className={`border p-2 rounded-md ${darkModeOn ? `bg-${darkMode} border-${lightMode} ` : `bg-white`} justify-center `} activeOpacity={0} onPress={() => Alert.alert('Soon available')}>
                              <Text className={`${darkModeOn ? `text-${lightMode}` : `text-black`} `}>BUY / MINT</Text>
                           </TouchableOpacity>
                           <TouchableOpacity
                              className={` p-2 rounded-md ${darkModeOn ? `bg-${darkMode}  ` : `bg-white`} justify-center `} activeOpacity={0} onPress={() => setModalVisible(!modalVisible)}>
                              <Text className={`${darkModeOn ? `text-${lightMode}` : `text-black`} `}>Back</Text>
                           </TouchableOpacity>
                        </View>
                        <Properties props={feedItem._supply} propsTitle={'SUPPLY'} />
                        <View className="flex flex-row justify-between">
                           <Properties props={feedItem._creator} propsTitle={'CREATOR'} />
                        </View>
                     </ScrollView>
                  </SafeAreaView>
               </Modal>

            </>}
         {!feedItem && <ActivityIndicator className="self-center m-10" size="large" color="green" />}
      </SafeAreaView >
   )
}

export default FeedsItem;

const styles = StyleSheet.create({
   container: {
      height: Dimensions.get("window").height,
      width: Dimensions.get("window").width,
   },
});