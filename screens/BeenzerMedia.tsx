import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, Alert, SafeAreaView, ScrollView } from "react-native"
import { useAtom } from "jotai";

const BeenzerMedia = ({ title, menu }: { title: string, menu: string }) => {

   const navigation = useNavigation<NavigationProp<ParamListBase>>();

   const handleClick = (beenzer: string) => {
      if (beenzer === 'audio') {
         Alert.alert('Audio Beenzer', 'Coming soon')
      } else if (beenzer === 'photo') {
         navigation.navigate('Picture')
      } else if (beenzer === 'video') {
         navigation.navigate('Picture')
      }
   }

   return (
      <TouchableOpacity
         className=" w-52 bg-green-600  p-4 rounded-2xl mt-4 mb-4"
         onPress={() => handleClick(menu)}
      >
         <Text className="font-semibold text-center ml-6">
            {title}
         </Text>
      </TouchableOpacity>
   )
}

export default BeenzerMedia