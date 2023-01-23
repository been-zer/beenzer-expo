import { StyleSheet, View, FlatList, Dimensions } from "react-native";
import { atomUserNFTs } from '../services/globals'
import { useAtom } from 'jotai'
import FeedsItem from "./FeedsItem";
import { INFT } from "../Types";
import { useEffect } from "react";

const Feed = ({ feedItems, setHideMenu }: {
   feedItems: INFT[], setHideMenu: React.Dispatch<React.SetStateAction<boolean>>
}) => {

   useEffect(() => {
      setHideMenu(true)
   }, [])

   return (
      <View className="flex-1 w-full h-full">
         <FlatList
            data={feedItems}
            renderItem={({ item }) => <FeedsItem feedItem={item} />}
            keyExtractor={(item) => item.__token__}
            snapToAlignment="start"
            decelerationRate={"fast"}
            snapToInterval={Dimensions.get("window").height}
         />
      </View>
   );
}


export default Feed