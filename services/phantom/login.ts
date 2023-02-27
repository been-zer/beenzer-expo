import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import { Buffer } from "buffer";
global.Buffer = global.Buffer || Buffer;
import * as Linking from "expo-linking";
import bs58 from "bs58";
import {
   clusterApiUrl,
} from "@solana/web3.js";
import { buildUrl } from "./functions";

const NETWORK = clusterApiUrl("mainnet-beta");

const onConnectRedirectLink = Linking.createURL("onConnect");

export const connect = async (dappKeyPair: nacl.BoxKeyPair) => {
   const params = new URLSearchParams({
      dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
      cluster: "mainnet-beta",
      app_url: "https://phantom.app",
      redirect_link: onConnectRedirectLink,
   });

   const url = buildUrl("connect", params);
   Linking.openURL(url);
};
