import { View, Text, Modal, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native'
import { atomUserNFTs } from '../services/globals/'
import { useAtom } from 'jotai'
import { INFT } from '../Types'
import { atomDarkModeOn, atomDarkMode, atomLightMode } from '../services/globals/darkmode'

const EditProfilePic = ({ setModalVisible, setSelectedPicture, modalVisible, setButtonInactive, setUnsavedChanges }: any) => {

   const [userNFTs, setUserNFTs] = useAtom(atomUserNFTs)
   const [darkModeOn, setDarkModeOn] = useAtom(atomDarkModeOn);
   const [darkMode, setDarkMode] = useAtom(atomDarkMode);
   const [lightMode, setLightMode] = useAtom(atomLightMode);
   const closePictureModal = () => {
      setModalVisible(false);
   }
   const selectPicture = (picture: INFT) => {
      setSelectedPicture(picture._asset);
      setButtonInactive(false);
      setModalVisible(false);
      setUnsavedChanges(true);
   }

   return (

      <Modal
         animationType="slide"
         transparent={false}
         visible={modalVisible}
         onRequestClose={closePictureModal}
      >
         <SafeAreaView className={`${darkModeOn ? `bg-${darkMode}` : `bg-${lightMode}`} items-center flex-1`}>
            <TouchableOpacity onPress={closePictureModal}>
               <Text className='mb-5 text-red-600 font-extrabold text-xl'>Cancel</Text>
            </TouchableOpacity>
            {userNFTs.length > 0 &&
               <FlatList
                  numColumns={3}
                  data={userNFTs}
                  renderItem={({ item }) => (
                     <View className='items-center'>
                        <TouchableOpacity onPress={() => selectPicture(item)}>

                           <Image
                              source={{ uri: item._asset }}
                              style={{ marginBottom: 20 }}
                              className="h-28 w-28 rounded-full m-1"
                           />
                        </TouchableOpacity>
                     </View>
                  )}
                  keyExtractor={item => item.__token__}
               />}
            {userNFTs.length === 0 &&
               <Text className={`${darkModeOn ? `text-${lightMode}` : 'text-black'} text-2xl mt-2 h-full`}>No BEENZER yet</Text>
            }
         </SafeAreaView>
      </Modal>
   )
}

export default EditProfilePic