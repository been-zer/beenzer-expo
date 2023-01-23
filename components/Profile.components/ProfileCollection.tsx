import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { atomUserNFTs, atomProfile } from '../../services/globals'
import { INFT } from '../../Types'
import Properties from '../Properties'
import ProfileMap from './ProfileMap'
import { ActivityIndicator } from 'react-native-paper'
import { atomDarkModeOn, atomDarkMode, atomLightMode } from '../../services/globals/darkmode'

const ProfileCollection = ({ setShowDetails, showDetails, dataNFT }: {
   showDetails: boolean, setShowDetails: any,
   dataNFT: INFT[]
}) => {
   const [profile, setProfile] = useAtom(atomProfile);
   const [NFTselected, setNFTselected] = useState<INFT | null>(null);
   const [darkModeOn, setDarkModeOn] = useAtom(atomDarkModeOn);
   const [darkMode, setDarkMode] = useAtom(atomDarkMode);
   const [lightMode, setLightMode] = useAtom(atomLightMode);

   const handleShowDetails = (item: INFT) => {
      setShowDetails(true);
      setNFTselected(item);
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
                     const borderColor = item._creator === profile[0].__pubkey__ ? 'black' : 'green';
                     return (
                        <>
                           <TouchableOpacity onPress={() => handleShowDetails(item)} >
                              <View className="flex flex-col items-center">
                                 <Text className={`${darkModeOn ? `text-${lightMode}` : 'text-black'} font-bold`}>BEENZER #{item._id_}</Text>
                                 {item._asset ?
                                    <Image
                                       source={{ uri: item._asset }}
                                       style={{ width: 150, height: 150, marginRight: 10, marginLeft: 10, borderWidth: 1, borderColor, borderRadius: 10, marginBottom: 10 }}
                                    /> : <ActivityIndicator
                                       className="self-center m-10"
                                       size="large"
                                       color="green"
                                    />}
                              </View>
                           </TouchableOpacity>
                        </>
                     );
                  }}
                  keyExtractor={(item) => item.__token__}
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
                     Beenzer #{NFTselected?._id_}
                  </Text>
                  <View className="flex justify-center items-center mr-2 ml-2 ">
                     <Image
                        style={{ height: 500, width: 500, resizeMode: 'center' }}
                        className="shadow-md shadow-white rounded-2xl items-center "
                        source={{ uri: NFTselected?._asset }} />
                  </View>
               </View>
               <View className='mt-2 items-center '>
                  <Text className='text-green-800 text-xl '>PROPERTIES</Text>
               </View>
               <View className='flex-col mt-2 justify-center'>
                  <Properties props={NFTselected?._description} propsTitle={'DESCRIPTION'} />
                  <Properties props={NFTselected?._latitude} propsTitle={'LATITUDE'} />
                  <Properties props={NFTselected?._longitude} propsTitle={'LONGITUDE'} />
                  <Properties props={NFTselected?._city} propsTitle={'CITY'} />
                  <Properties props={NFTselected?._username} propsTitle={'USERNAME'} />
                  <Properties props={NFTselected?._creator} propsTitle={'CREATOR'} />
                  <Properties props={NFTselected?._distance} propsTitle={'VISIBILITY'} />
                  <Properties props={NFTselected?._minlat} propsTitle={'MIN LAT'} />
                  <Properties props={NFTselected?._maxlat} propsTitle={'MAX LAT'} />
                  <Properties props={NFTselected?._minlon} propsTitle={'MIN LON'} />
                  <Properties props={NFTselected?._maxlon} propsTitle={'MAX LON'} />
               </View>
               <ProfileMap uniqueNFTs={NFTselected} dataNFT={null} viewMap={undefined} />
            </>
         }
      </>
   )
}

export default ProfileCollection
