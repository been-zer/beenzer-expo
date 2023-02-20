import nacl from "tweetnacl";
import bs58 from "bs58";
import {
   clusterApiUrl,
   SystemProgram,
   Transaction,
   Connection,
   PublicKey,
} from "@solana/web3.js";
import Constants from 'expo-constants';



const NETWORK = clusterApiUrl("mainnet-beta");
const connection = new Connection(NETWORK);
const fees = Constants.manifest ? Constants.manifest.extra ? Constants.manifest.extra.REACT_APP_MINT_COST : null : null;


export const buildUrl = (path: string, params: URLSearchParams) =>
   `https://phantom.app/ul/v1/${path}?${params.toString()}`;

export const decryptPayload = (data: string, nonce: string, sharedSecret?: Uint8Array) => {
   if (!sharedSecret) throw new Error("missing shared secret");

   const decryptedData = nacl.box.open.after(bs58.decode(data), bs58.decode(nonce), sharedSecret);
   if (!decryptedData) {
      throw new Error("Unable to decrypt data");
   }
   return JSON.parse(Buffer.from(decryptedData).toString("utf8"));
};

export const encryptPayload = (payload: any, sharedSecret?: Uint8Array) => {
   if (!sharedSecret) throw new Error("missing shared secret");

   const nonce = nacl.randomBytes(24);

   const encryptedPayload = nacl.box.after(
      Buffer.from(JSON.stringify(payload)),
      nonce,
      sharedSecret
   );

   return [nonce, encryptedPayload];
};

export const createTransferTransaction = async (pubkey: any) => {
   if (!pubkey) throw new Error("missing public key from user");
   let transaction = new Transaction().add(
      SystemProgram.transfer({
         fromPubkey: pubkey,
         toPubkey: new PublicKey('BctLWb6Q9viYjeJ2gNCr4xkRHc91NyikRR1TWn1qGGYr'),
         lamports: fees * 1000000000, // 10000000 lamports = 0.01 SOL
      })
   );
   transaction.feePayer = pubkey;
   const anyTransaction: any = transaction;
   anyTransaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
   return transaction;
};
