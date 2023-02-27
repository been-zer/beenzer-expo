import { useEffect } from 'react'
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import nacl from "tweetnacl";
import { decryptPayload } from "../services/phantom/functions";
import * as Linking from "expo-linking";
import { PublicKey } from "@solana/web3.js";
import bs58 from "bs58";
import { atom, useAtom } from "jotai";
import {
   atomDappKeyPair, atomSharedSecret, atomSession, atomPhantomWalletPublicKey, atomTransacSuccess,
   atomPic,
   atomDisplay, atomIsLogin
} from "../services/globals";
import { atomSOCKET } from "../services/socket";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { Vibration, Alert } from 'react-native';
import { firstLogin } from "../services/socket/function";
import { socketConnection } from "../services/socket/connexion";

const PhantomEffect = ({ deepLink }: { deepLink: string }) => {

   const [dappKeyPair] = useAtom(atomDappKeyPair)
   const [sharedSecret, setSharedSecret] = useAtom(atomSharedSecret)
   const [session, setSession] = useAtom(atomSession)
   const [phantomWalletPublicKey, setPhantomWalletPublicKey] = useAtom(atomPhantomWalletPublicKey)
   const navigation = useNavigation<NavigationProp<ParamListBase>>();
   const [SOCKET] = useAtom(atomSOCKET);
   const [transacSuccess, setTransacSuccess] = useAtom(atomTransacSuccess);
   const [Pic, setPic] = useAtom(atomPic);
   const [display, setDisplay] = useAtom(atomDisplay);
   const [isLogin, setIsLogin] = useAtom(atomIsLogin);

   // handle inbounds links
   useEffect(() => {
      SOCKET.emit("clientLogs", "entering connexion function")
      if (!deepLink) return;
      SOCKET.emit("clientLogs", "deepLink : " + deepLink)

      const url = new URL(deepLink);
      const params = url.searchParams;
      SOCKET.emit("clientLogs", "deepLink : " + deepLink)

      if (params.get("errorCode")) {
         SOCKET.emit("clientLogs", "error code : " + params.get("errorCode"))
         if (params.get("errorCode") === '-32603') {
            Alert.alert("Error", "An error occurred while connecting to Phantom. Make sure you have SOL in your wallet.")
            console.log("Error code", params.get("errorCode"));
         }
         else { Alert.alert("An error occurred while connecting to Phantom.") }
         return;
      }

      if (/onConnect/.test(deepLink)) {
         SOCKET.emit("clientLogs", "onConnect")
         const sharedSecretDapp = nacl.box.before(
            bs58.decode(params.get("phantom_encryption_public_key")!),
            dappKeyPair.secretKey
         );

         const connectData = decryptPayload(
            params.get("data")!,
            params.get("nonce")!,
            sharedSecretDapp
         );
         setSharedSecret(sharedSecretDapp);
         setSession(connectData.session);
         setPhantomWalletPublicKey(new PublicKey(connectData.public_key));
         socketConnection(connectData.public_key, SOCKET);
         setIsLogin(true);
         SOCKET.emit("clientLogs", "connexion successfull")
         const getNewUserStatus = async () => {
            const newUser = await firstLogin(SOCKET);
            if (newUser) {
               navigation.navigate("Credentials");
               SOCKET.emit("clientLogs", "navigate to credentials")
            } else {
               navigation.navigate("Home");
               SOCKET.emit("clientLogs", "navigate to home")
            }
         }
         getNewUserStatus();
      }
      else if (/onSignAndSendTransaction/.test(deepLink)) {
         const signAndSendTransactionData = decryptPayload(
            params.get("data")!,
            params.get("nonce")!,
            sharedSecret as any
         );
         console.log('signAndSendTransactionData', signAndSendTransactionData)
         setDisplay("Logs");
         navigation.navigate("Notifications");
         setTransacSuccess(true);
      }
      else if (/onDisconnect/.test(deepLink)) {
         console.log('disconnect', phantomWalletPublicKey)
      }
      SOCKET.emit("clientLogs", "end of connexion function")

   }, [deepLink]);

   return null;
};

export default PhantomEffect;
