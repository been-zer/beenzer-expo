import { View, Text, } from 'react-native'
import { atomDarkModeOn, atomDarkMode, atomLightMode } from '../../services/globals/darkmode'
import { useAtom } from 'jotai'
import GradientText from '../GradientText'


const ProfileBio = ({ name, description }: { name: string, description: string }) => {
   const [darkModeOn, setDarkModeOn] = useAtom(atomDarkModeOn);
   const [darkMode, setDarkMode] = useAtom(atomDarkMode);
   const [lightMode, setLightMode] = useAtom(atomLightMode);

   return (
      <View className="flex flex-col items-center mb-3">
         <Text className={`${darkModeOn ? `text-${lightMode}` : 'text-black'} text-2xl uppercase font-extrabold p-4`}>
            {name}
         </Text>
         <GradientText text={description || "No description yet :("} className="uppercase font-extrabold mb-2" />
      </View>
   )
}

export default ProfileBio