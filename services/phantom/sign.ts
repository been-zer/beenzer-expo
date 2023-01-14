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
import { encryptPayload } from "./functions";
import { createTransferTransaction } from "./functions";

const NETWORK = clusterApiUrl("mainnet-beta");

const onConnectRedirectLink = Linking.createURL("onConnect");
const onSignAndSendTransactionRedirectLink = Linking.createURL("onSignAndSendTransaction");

export const signAndSendTransaction = async (session: string, pubkey: any, sharedSecret: any, dappKeyPair: any) => {
   const transaction = await createTransferTransaction(pubkey);
   const serializedTransaction = transaction.serialize({
      requireAllSignatures: false,
   });
   const payload = {
      session,
      transaction: bs58.encode(serializedTransaction),
   };
   const [nonce, encryptedPayload] = encryptPayload(payload, sharedSecret);
   const params = new URLSearchParams({
      dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
      nonce: bs58.encode(nonce),
      redirect_link: onSignAndSendTransactionRedirectLink,
      payload: bs58.encode(encryptedPayload),
   });
   const url = buildUrl("signAndSendTransaction", params);
   Linking.openURL(url);
};
