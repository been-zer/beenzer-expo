import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const ProfilePic = ({ img, functionOnClick }: { img: string, functionOnClick: () => void }) => {

   return (
      <View className="'flex flex-row justify-center items-end'">
         <TouchableOpacity onPress={functionOnClick}>
            <Image className=" h-28 w-28 rounded-full mb-2" source={
               { img } ?
                  { uri: img } :
                  require("../../assets/newUser.png")
            }
            />
         </TouchableOpacity>
      </View>
   )
}

export default ProfilePic