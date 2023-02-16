import { View, Text, SafeAreaView, ScrollView, Alert, TouchableOpacity, Image } from 'react-native'
import { useAtom } from 'jotai'
import { atomProfile } from '../services/globals'
import EditInfos from '../components/Profile.components/EditInfos'
import { useEffect, useState } from 'react'
import { INFT, IUpdateUser } from '../Types'
import EditProfilePic from '../components/Profile.components/EditProfilePic'
import { updateUserProfile } from '../services/socket/function'
import { atomSOCKET } from '../services/socket'
import { atomDarkModeOn, atomDarkMode, atomLightMode } from '../services/globals/darkmode'
import { socketUserInfo } from '../services/socket/function'


const EditProfile = () => {

   const [profile, setProfile] = useAtom(atomProfile)
   const [modalVisible, setModalVisible] = useState(false);
   const [selectedPicture, setSelectedPicture] = useState<string>(profile._pfp);
   const [SOCKET] = useAtom(atomSOCKET)
   const [buttonInactive, setButtonInactive] = useState(true)
   const [unsavedChanges, setUnsavedChanges] = useState(false)
   const [darkModeOn, setDarkModeOn] = useAtom(atomDarkModeOn);
   const [darkMode, setDarkMode] = useAtom(atomDarkMode);
   const [lightMode, setLightMode] = useAtom(atomLightMode);
   const [newData, setNewData] = useState<IUpdateUser>({
      _username_: profile?._username_,
      _lastname: profile?._lastname,
      _description: profile?._description,
      _name: profile?._name,
      _email: profile?._email,
      _birthdate: profile?._birthdate,
      _city: profile?._city,
      _country: profile?._country,
      _phone: profile?._phone,
   })

   useEffect(() => {
      getInfoUser()
   }, [unsavedChanges])

   const openPictureModal = () => {
      setModalVisible(true);
   }

   const updateUser = () => {
      updateUserProfile(SOCKET, profile.__pubkey__, '_username_', newData._username_ || "")
      updateUserProfile(SOCKET, profile.__pubkey__, '_pfp', `__${selectedPicture}`)
      updateUserProfile(SOCKET, profile.__pubkey__, '_description', `__${newData?._description}` || "")
      updateUserProfile(SOCKET, profile.__pubkey__, '_name', newData?._name || "")
      updateUserProfile(SOCKET, profile.__pubkey__, '_email', newData?._email || "")
      updateUserProfile(SOCKET, profile.__pubkey__, '_birthdate', newData?._birthdate || "")
      updateUserProfile(SOCKET, profile.__pubkey__, '_phone', newData?._phone || "")
      updateUserProfile(SOCKET, profile.__pubkey__, '_city', newData?._city || "")
      updateUserProfile(SOCKET, profile.__pubkey__, '_country', newData?._country || "")
      updateUserProfile(SOCKET, profile.__pubkey__, '_lastname', newData?._lastname || "")
      setButtonInactive(true)
      setUnsavedChanges(false)
   }

   const getInfoUser = async () => {
      try {
         const receivedInfos = await socketUserInfo(SOCKET, profile.__pubkey__);
         setProfile(receivedInfos);
      } catch (e) {
         console.error(e);
      }
   }


   return (
      <SafeAreaView className={`${darkModeOn ? `bg-${darkMode}` : `bg-${lightMode}`} flex-1`} >
         <ScrollView>
            <View className='items-center'>
               <TouchableOpacity onPress={openPictureModal} >
                  <Image className=" h-28 w-28 rounded-full"
                     source={selectedPicture ? { uri: selectedPicture } : profile._pfp ? { uri: profile._pfp } : require("../assets/newUser.png")}
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