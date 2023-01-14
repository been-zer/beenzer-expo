import * as Linking from "expo-linking"; import bs58 from "bs58";
import { encryptPayload, buildUrl } from "./functions";

const onDisconnectRedirectLink = Linking.createURL("onDisconnect");

export const disconnect = async (session: string, dappKeyPair: any, sharedSecret: any) => {
   const payload = {
      session,
   };
   const [nonce, encryptedPayload] = encryptPayload(payload, sharedSecret);

   const params = new URLSearchParams({
      dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
      nonce: bs58.encode(nonce),
      redirect_link: onDisconnectRedirectLink,
      payload: bs58.encode(encryptedPayload),
   });

   const url = buildUrl("disconnect", params);
   Linking.openURL(url);
};