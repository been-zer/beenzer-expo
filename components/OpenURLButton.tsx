import React, { useCallback } from "react";
import { Alert, Button, Linking, StyleSheet, View } from "react-native";


const OpenURLButton = ({ url, children }: any) => {
   const handlePress = useCallback(async () => {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
         await Linking.openURL(url);
      } else {
         Alert.alert(`Don't know how to open this URL: ${url}`);
      }
   }, [url]);
   return <Button title={children} onPress={handlePress} />;
};

export default OpenURLButton;