import { View, Text, Modal, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native'
import { atomUserNFTs } from '../services/globals/'
import { useAtom } from 'jotai'
import { INFT } from '../Types'

const EditProfilePic = ({ setModalVisible, setSelectedPicture, modalVisible, setButtonInactive, setUnsavedChanges }: any) => {

   const [userNFTs, setUserNFTs] = useAtom(atomUserNFTs)
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
         <SafeAreaView className='bg-zinc-900 items-center flex-1'>
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
               <Text className='text-white text-2xl mt-2 h-full'>No BEENZER yet</Text>
            }
         </SafeAreaView>
      </Modal>
   )
}

export default EditProfilePic