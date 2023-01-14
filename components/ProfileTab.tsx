import { View, Text, TouchableOpacity } from 'react-native'
import { useState } from 'react'

const ProfileTab = ({ title, component, setShowProfileTab, setShowDetails }: {
   title: string, component: string, setShowProfileTab: any,
   setShowDetails: any
}) => {

   return (
      <>
         <TouchableOpacity
            className=" shadow-xl shadow-white p-2 rounded-2xl border border-green-500 w-1/4 "
            onPress={() => (
               setShowProfileTab(component),
               component === 'Collection' ? setShowDetails(false) : null
            )}
         >
            <Text className="m-2 font-bold text-2xl text-center  text-green-500">
               {title}
            </Text>
         </TouchableOpacity>
      </>
   )
}

export default ProfileTab