
import { Dimensions, StyleSheet, Text, View, Image, ImageBackground, SafeAreaView, Modal, TouchableOpacity } from "react-native";
import { useState } from "react";
import { INFT } from "../Types";
import { atomDarkModeOn, atomDarkMode, atomLightMode } from "../services/globals/darkmode";
import { useAtom, } from "jotai";
import Properties from "../components/Properties";
import ProfileMap from "../components/Profile.components/ProfileMap";
import { ActivityIndicator } from "react-native-paper";

const FeedsItem = ({ feedItem }: { feedItem: INFT }) => {

   const [darkMode, setDarkMode] = useAtom(atomDarkMode);
   const [lightMode, setLightMode] = useAtom(atomLightMode);
   const [darkModeOn, setDarkModeOn] = useAtom(atomDarkModeOn);
   const [modalVisible, setModalVisible] = useState(false);


   return (
      <SafeAreaView style={styles.container} className={`${darkModeOn ? `bg-${darkMode}` : `bg-white`} item-center m-0`}>
         {feedItem &&
            <>
               <TouchableOpacity activeOpacity={1} onPress={() => setModalVisible(!modalVisible)}>
                  <Image
                     source={{ uri: feedItem._asset }}
                     resizeMode="cover"
                     style={{
                        width: '100%', height: '93%',
                     }}
                     className={`rounded-2xl ${modalVisible ? 'opacity-5' : `opacity-100`}`}
                  />
               </TouchableOpacity>
               <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => setModalVisible(false)}
               >
                  <SafeAreaView>
                     <Properties props={feedItem._username} propsTitle={'Creator'} />
                     <Properties props={feedItem._description} propsTitle={'DESCRIPTION'} />
                     <ProfileMap uniqueNFTs={feedItem} dataNFT={null} viewMap={15} />
                     <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                        <Properties props={feedItem._city} propsTitle={'CITY'} />
                        <Properties props={feedItem._distance} propsTitle={'VISIBILITY'} />
                        <Properties props={feedItem._date} propsTitle={'DATE'} />
                        <Properties props={feedItem._supply} propsTitle={'SUPPLY'} />
                        <Properties props={feedItem._creator} propsTitle={'CREATOR'} />
                     </TouchableOpacity>
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