import { View, Text, TouchableOpacity, Alert, SafeAreaView, ScrollView } from "react-native"

const BeenzerAudio = () => {
   return (
      <TouchableOpacity
         className=" w-52 bg-green-600  p-4 rounded-2xl mt-4 mb-4"
         onPress={() => Alert.alert("Coming soon 😉")}
      >
         <Text className="font-semibold text-center ml-6">
            New Beenzer 🎤
         </Text>
      </TouchableOpacity>
   )
}

export default BeenzerAudio