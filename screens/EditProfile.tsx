import { View, Text, SafeAreaView, ScrollView, Alert, TouchableOpacity, Image } from 'react-native'
import { useAtom } from 'jotai'
import { atomProfile } from '../services/globals'
import EditInfos from '../components/Profile.components/EditInfos'
import { useState } from 'react'
import { INFT, IUpdateUser } from '../Types'
import EditProfilePic from '../components/Profile.components/EditProfilePic'
import { updateUserProfile } from '../services/socket/function'
import { atomSOCKET } from '../services/socket'
import { atomDarkModeOn, atomDarkMode, atomLightMode } from '../services/globals/darkmode'

const EditProfile = () => {

   const [profile, setProfile] = useAtom(atomProfile)
   const [modalVisible, setModalVisible] = useState(false);
   const [selectedPicture, setSelectedPicture] = useState<string>(profile[0]._pfp);
   const [SOCKET] = useAtom(atomSOCKET)
   const [buttonInactive, setButtonInactive] = useState(true)
   const [unsavedChanges, setUnsavedChanges] = useState(false)
   const [darkModeOn, setDarkModeOn] = useAtom(atomDarkModeOn);
   const [darkMode, setDarkMode] = useAtom(atomDarkMode);
   const [lightMode, setLightMode] = useAtom(atomLightMode);
   const [newData, setNewData] = useState<IUpdateUser>({
      _username_: profile[0]?._username_,
      _lastname: profile[0]?._lastname,
      _description: profile[0]?._description,
      _name: profile[0]?._name,
      _email: profile[0]?._email,
      _birthdate: profile[0]?._birthdate,
      _city: profile[0]?._city,
      _country: profile[0]?._country,
      _phone: profile[0]?._phone,
   })

   const openPictureModal = () => {
      setModalVisible(true);
   }

   const updateUser = () => {
      updateUserProfile(SOCKET, profile[0].__pubkey__, '_pfp', `__${selectedPicture}`)
      updateUserProfile(SOCKET, profile[0].__pubkey__, '_username_', newData._username_ || "")
      updateUserProfile(SOCKET, profile[0].__pubkey__, '_description', `__${newData?._description}` || "")
      updateUserProfile(SOCKET, profile[0].__pubkey__, '_name', newData?._name || "")
      updateUserProfile(SOCKET, profile[0].__pubkey__, '_email', newData?._email || "")
      updateUserProfile(SOCKET, profile[0].__pubkey__, '_birthdate', newData?._birthdate || "")
      updateUserProfile(SOCKET, profile[0].__pubkey__, '_phone', newData?._phone || "")
      updateUserProfile(SOCKET, profile[0].__pubkey__, '_city', newData?._city || "")
      updateUserProfile(SOCKET, profile[0].__pubkey__, '_country', newData?._country || "")
      updateUserProfile(SOCKET, profile[0].__pubkey__, '_lastname', newData?._lastname || "")
      setButtonInactive(true)
      setTimeout(() => {
         setUnsavedChanges(false)
      }
         , 3000)
   }


   return (
      <SafeAreaView className={`${darkModeOn ? `bg-${darkMode}` : `bg-${lightMode}`} flex-1`} >
         <ScrollView>
            <View className='items-center'>
               <TouchableOpacity onPress={openPictureModal} >
                  <Image className=" h-28 w-28 rounded-full"
                     source={selectedPicture ? { uri: selectedPicture } : profile[0]._pfp ? { uri: profile[0]._pfp } : require("../assets/newUser.png")}
                  />
                  <Text className='text-white mt-1'>Edit profile picture</Text>
               </TouchableOpacity>
            </View>
            <EditProfilePic setModalVisible={setModalVisible} setSelectedPicture={setSelectedPicture} modalVisible={modalVisible}
               setButtonInactive={setButtonInactive} setUnsavedChanges={setUnsavedChanges} />
            <View className='flex flex-col h-full mt-3 items-center'>
               <TouchableOpacity
                  className={buttonInactive ? "bg-green-600 rounded-lg w-80 h-10 p-3 opacity-50 items-center" : "bg-green-600 rounded-lg w-80 h-10 p-3"}
                  onPress={updateUser}
                  disabled={buttonInactive}>
                  <Text className="font-semibold text-center" > Save change</Text>
               </TouchableOpacity>
               {unsavedChanges && <Text className='text-red-500 mt-1 mb-1'>You have unsaved changes</Text>}
               <EditInfos userInfo='Username' sockName={'_username_'} newData={newData} setNewData={setNewData} setButtonInactive={setButtonInactive} setUnsavedChanges={setUnsavedChanges} />
               <EditInfos userInfo='Bio' sockName={'_description'} newData={newData} setNewData={setNewData} setButtonInactive={setButtonInactive} setUnsavedChanges={setUnsavedChanges} />
               <EditInfos userInfo='Firstname' sockName={'_name'} newData={newData} setNewData={setNewData} setButtonInactive={setButtonInactive} setUnsavedChanges={setUnsavedChanges} />
               <EditInfos userInfo='Lastname' sockName={'_lastname'} newData={newData} setNewData={setNewData} setButtonInactive={setButtonInactive} setUnsavedChanges={setUnsavedChanges} />
               <EditInfos userInfo='Email' sockName={'_email'} newData={newData} setNewData={setNewData} setButtonInactive={setButtonInactive} setUnsavedChanges={setUnsavedChanges} />
               <EditInfos userInfo='Birthday' sockName={'_birthdate'} newData={newData} setNewData={setNewData} setButtonInactive={setButtonInactive} setUnsavedChanges={setUnsavedChanges} />
               <EditInfos userInfo='Phone' sockName={'_phone'} newData={newData} setNewData={setNewData} setButtonInactive={setButtonInactive} setUnsavedChanges={setUnsavedChanges} />
               <EditInfos userInfo='City' sockName={'_city'} newData={newData} setNewData={setNewData} setButtonInactive={setButtonInactive} setUnsavedChanges={setUnsavedChanges} />
               <EditInfos userInfo='Country' sockName={'_country'} newData={newData} setNewData={setNewData} setButtonInactive={setButtonInactive} setUnsavedChanges={setUnsavedChanges} />
            </View>
            <View className='h-96' />
         </ScrollView>
      </SafeAreaView >
   )
}

export default EditProfile