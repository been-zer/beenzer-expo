import { Text, View, } from "react-native";
import React, { useState, useEffect } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from '@react-native-masked-view/masked-view';

const GradientText = (props: any) => {
   return (
      <MaskedView maskElement={<Text style={[props.style, { backgroundColor: 'transparent' }]}> {props.text}</Text>}>
         <LinearGradient
            colors={['#1398b9', '#1dff00']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
         >
            <Text style={[props.style, { opacity: 0 }]}> {props.text}</Text>
         </LinearGradient>
      </MaskedView>
   );
}

export default GradientText;