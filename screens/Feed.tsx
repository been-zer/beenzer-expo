import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { atomUserNFTs } from '../services/globals'
import { useAtom } from 'jotai'

const Feed = () => {

   const [userNFTs, setUserNFTs] = useAtom(atomUserNFTs)

   return (
      <ScrollView>
         {userNFTs && userNFTs.map((nft, index) => {
            return (
               <View key={index}>
                  <Text>{nft._username}</Text>
                  <Image source={{ uri: nft._asset }} />
               </View>
            )
         })
         }
      </ScrollView>
   )
}

export default Feed