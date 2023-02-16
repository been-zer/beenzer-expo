import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { Dispatch, useEffect, useState } from 'react'
import { IUpdateUser } from '../../Types'
import { CheckCircleIcon, XCircleIcon } from 'react-native-heroicons/outline'
import { checkUsernameAvailability } from '../../services/socket/function'
import { atomSOCKET } from '../../services/socket'
import { useAtom } from 'jotai'
import { atomRegex, atomProfile } from '../../services/globals/index'
import { atomDarkModeOn, atomLightMode } from '../../services/globals/darkmode'


const EditInfos = ({
   userInfo,
   setButtonInactive,
   sockName,
   newData,
   setNewData,
   setUnsavedChanges }: {
      userInfo: string, sockName: string, newData: IUpdateUser | undefined, setNewData: Dispatch<React.SetStateAction<IUpdateUser>>,
      setButtonInactive: React.Dispatch<React.SetStateAction<boolean>>, setUnsavedChanges: React.Dispatch<React.SetStateAction<boolean>>
   }) => {

   const [SOCKET] = useAtom(atomSOCKET)
   const [usernameAvailable, setUsernameAvailable] = useState<boolean>(true)
   const [errorText, setErrorText] = useState<string>('')
   const [regex] = useAtom(atomRegex)
   const [profile, setProfile] = useAtom(atomProfile)
   const [valueChanged, setValueChanged] = useState<boolean>(false)
   const [props, setProps] = useState<string | undefined>('')
   const [darkModeOn, setDarkModeOn] = useAtom(atomDarkModeOn);
   const [lightMode, setLightMode] = useAtom(atomLightMode);
   const [pad, setPad] = useState<number>(2)

   const handleChange = async (text: string) => {
      if (text.match(regex)) {
         Alert.alert('No SQL injection please 🤓');
         setButtonInactive(true);
         setUsernameAvailable(false);
         text = text.replace(regex, '');
      }
      if (userInfo === 'Username') {
         text = text.toLowerCase();
         if (text === profile._username_) {
            setErrorText("");
            setNewData((prev) => ({ ...prev, [sockName]: text }));
            setButtonInactive(false);
         }
         else if (text.includes(' ')) {
            setErrorText("No spaces allowed 🥲");
         }
         else if (text.length < 3) {
            setErrorText("Minimum 3 letters please 🥲");
            setButtonInactive(true);
            setUsernameAvailable(false);
            setNewData((prev) => ({ ...prev, [sockName]: text }));
         }
         else {
            setErrorText("");
            setNewData((prev) => ({ ...prev, [sockName]: text }));
            const check = async () => {
               const availability = await checkUsernameAvailability(text, SOCKET)
               console.log(availability, 'availability')
               setUsernameAvailable(availability);
               if (availability) {
                  setButtonInactive(false);
               } else {
                  setButtonInactive(true);
                  setErrorText("Username already taken 🥲");
               }
            }
            const ans = check();
            console.log(ans, 'ans')
         }
      }
      else if (userInfo !== 'Username') {
         setButtonInactive(false);
         setNewData((prev) => ({ ...prev, [sockName]: text }));
         setValueChanged(true);
      }
      setUnsavedChanges(true);
   }

   let valueToChange: string | undefined;

   switch (userInfo) {
      case 'Username':
         valueToChange = newData?._username_;
         break;
      case 'Bio':
         valueToChange = newData?._description;
         break;
      case 'Firstname':
         valueToChange = newData?._name;
         break;
      case 'Email':
         valueToChange = newData?._email;
         break;
      case 'Birthday':
         valueToChange = newData?._birthdate;
         break;
      case 'Phone':
         valueToChange = newData?._phone;
         break;
      case 'City':
         valueToChange = newData?._city;
         break;
      case 'Country':
         valueToChange = newData?._country;
         break;
      case 'Lastname':
         valueToChange = newData?._lastname;
         break;
      default:
         break;
   }

   const handleFocus = () => {
      console.log('focus')
      setPad(20)
   }

   return (
      <View className='p-2'>
         <Text className='text-green-500'>{userInfo}</Text>
         <View className='flex-row border-2 border-green-600 rounded-lg p-2 w-full h-16'>
            <TextInput
               onFocus={handleFocus}
               value={valueToChange}
               className=' text-white flex-1'
               onChangeText={handleChange}
               style={{ color: darkModeOn ? `${lightMode}` : 'black' }}
            />
            <View className=''>
               {
                  userInfo === 'Username' ? usernameAvailable ? (<CheckCircleIcon color='green' />) : (<XCircleIcon color='red' />)
                     : null}
               {
                  userInfo !== 'Username' ? valueChanged ? (<CheckCircleIcon color='green' />) : null
                     : null
               }
            </View>
         </View>
         <Text className='text-red-500'>{errorText}</Text>
      </View >
   )
}

export default EditInfos