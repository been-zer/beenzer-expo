import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import { Video } from 'expo-av';
import { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { atomUserNFTs, atomProfile } from '../../services/globals'
import { INFT, UserNFT } from '../../Types'
import Properties from '../Properties'
import ProfileMap from './ProfileMap'
import { ActivityIndicator } from 'react-native-paper'
import { atomDarkModeOn, atomDarkMode, atomLightMode } from '../../services/globals/darkmode'
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

const ProfileCollection = ({ setShowDetails, showDetails, dataNFT, setSelectedTab }: {
   showDetails: boolean, setShowDetails: any,
   dataNFT: UserNFT[], setSelectedTab: any
}) => {
   const [profile, setProfile] = useAtom(atomProfile);
   const [NFTselected, setNFTselected] = useState<UserNFT>({} as UserNFT);
   const [darkModeOn, setDarkModeOn] = useAtom(atomDarkModeOn);
   const [darkMode, setDarkMode] = useAtom(atomDarkMode);
   const [lightMode, setLightMode] = useAtom(atomLightMode);

   const handleShowDetails = (item: UserNFT) => {
      setShowDetails(true);
      setNFTselected(item);
      setSelectedTab('')
   }


   return (
      <>
         {!showDetails && dataNFT.length > 0 &&
            <View className="flex flex-col items-center">
               <FlatList
                  className='mt-2'
                  data={dataNFT}
                  numColumns={2}
                  renderItem={({ item }) => {
                     const borderColor = item.creator === profile.__pubkey__ ? 'black' : 'green';
                     return (
                        <>
                           <TouchableOpacity onPress={() => handleShowDetails(item)} >
                              <View className="flex flex-col items-center">
                                 <Text className={`${darkModeOn ? `text-${lightMode}` : 'text-black'} font-bold`}>{item.name}</Text>
                                 {item.image_uri ?
                                    <Image
                                       source={{ uri: item.image_uri }}
                                       style={{ width: 150, height: 150, marginRight: 10, marginLeft: 10, borderWidth: 1, borderColor, borderRadius: 10, marginBottom: 10 }}
                                    />
                                    : <ActivityIndicator
                                       className="self-center m-10"
                                       size="large"
                                       color="green"
                                    />}
                              </View>
                           </TouchableOpacity>
                        </>
                     );
                  }}
                  keyExtractor={(item) => item.image_uri}
               />
            </View>
         }
         {dataNFT.length == 0 &&
            <View className='flex justify-center items-center'>
               <Text className='text-white text center text-2xl mt-2'>Empty :(</Text>
            </View>}
         {showDetails &&
            <>
               <View className="flex justify-center align-center ">
                  <Text className='text-2xl font-bold text-white text-center'>
                     {NFTselected?.name}
                  </Text>
                  <View className="flex justify-center items-center mr-2 ml-2 ">
                     {NFTselected?.asset_uri ? (
                        <Video source={{ uri: NFTselected.asset_uri }} isMuted={true} shouldPlay isLooping
                           className="shadow-md shadow-white rounded-2xl items-center w-full h-96" />) : (
                        <Image
                           style={{ height: 500, width: 500, resizeMode: 'center' }}
                           className="shadow-md shadow-white rounded-2xl items-center "
                           source={{ uri: NFTselected?.image_uri }} />)}
                  </View>
               </View>
               <View className='mt-2 items-center '>
                  <Text className='text-green-800 text-xl '>PROPERTIES</Text>
               </View>
               <View className='flex-col mt-2 justify-center'>
                  <Properties props={NFTselected?.description} propsTitle={'DESCRIPTION'} />
                  <Properties props={NFTselected?.lat} propsTitle={'LATITUDE'} />
                  <Properties props={NFTselected?.lon} propsTitle={'LONGITUDE'} />
                  <Properties props={NFTselected?.city} propsTitle={'CITY'} />
                  <Properties props={NFTselected?.username} propsTitle={'USERNAME'} />
                  <Properties props={NFTselected?.creator} propsTitle={'CREATOR'} />
                  <Properties props={NFTselected?.visibility} propsTitle={'VISIBILITY'} />
                  <Properties props={NFTselected?.minlat} propsTitle={'MIN LAT'} />
                  <Properties props={NFTselected?.maxlat} propsTitle={'MAX LAT'} />
                  <Properties props={NFTselected?.minlon} propsTitle={'MIN LON'} />
                  <Properties props={NFTselected?.maxlon} propsTitle={'MAX LON'} />
               </View>
               <ProfileMap uniqueNFTs={NFTselected} dataNFT={null} viewMap={undefined} />
            </>
         }
      </>
   )
}

export default ProfileCollection
