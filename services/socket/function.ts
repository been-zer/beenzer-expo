import { PublicKey } from '@solana/web3.js'
import { Socket } from "socket.io-client";
import { IMessage, INFT, IProfile } from "../../Types";

export const socketMint = (
   Socket: Socket,
   buffer: Buffer,
   type: string,
   creator: string,
   supply: number = 1,
   username: string,
   description: string,
   city: string,
   latitude: number,
   longitude: number,
   distance: string,
   maxLat: string,
   minLat: string,
   maxLong: string,
   minLong: string,
) => {
   Socket.emit(
      "newMint",
      buffer,
      type,
      creator,
      supply,
      username,
      description,
      city,
      latitude,
      longitude,
      distance,
      maxLat,
      minLat,
      maxLong,
      minLong,
   );
   return true
};

export const firstLogin = (Socket: Socket) => {
   return new Promise((resolve) => {
      Socket.on("isNewUser", (resp: boolean) => {
         resolve(resp);
      });
   });
};

export const checkUsernameAvailability = (username: String, Socket: Socket) => {
   return new Promise<boolean>((resolve) => {
      console.log(username)
      Socket.emit('userName', username)
      Socket.on('userNameAv', (data: any) => {
         console.log('userNameAv', data)
         resolve(data)
      })
   })
}

export const handleNewUserCreated = (Socket: Socket, pubkey: PublicKey | string, username: string, appuser: boolean) => {
   return new Promise((resolve) => {
      Socket.emit('newUser', pubkey, username, appuser)
      Socket.on('newUserCreated', async (resp: boolean) => {
         resolve(resp)
      })
   })
}

export const socketUserInfo = (Socket: Socket) => {
   return new Promise<IProfile[]>((resolve) => {
      Socket.on('userInfo', (receivedInfos: IProfile[]) => {
         resolve(receivedInfos)
      });
   })
}

export const socketUserNFTs = (Socket: Socket, pubkey: string) => {
   Socket.emit('getUserNFTs', pubkey);
   return new Promise<INFT[]>((resolve) => {
      Socket.on('userNFTs', (receivedNfts: INFT[]) => {
         resolve(receivedNfts)
      });
   })
}


export const updateUserProfile = (Socket: Socket, pubkey: PublicKey | string, update: string, value: string) => {
   Socket.emit('updateUser', pubkey, update, value)
}

export const socketSeachFriends = (Socket: Socket, searchQuery: string) => {
   Socket.emit("searchUsers", searchQuery);
   return new Promise<IProfile[]>((resolve) => {
      Socket.on("searchUsersRes", (users: IProfile[]) => {
         resolve(users);
      });
   });
}

export const socketAddFriend = (Socket: Socket, pubkey: string, pubkey2: string) => {
   Socket.emit('addFriend', pubkey, pubkey2);
   return new Promise<boolean>((resolve) => {
      Socket.on("addFriendRes", (res: boolean) => {
         resolve(res);
      });
   });
}

export const socketDelFriend = (Socket: Socket, pubkey: string, pubkey2: string) => {
   Socket.emit('deleteFriend', pubkey, pubkey2);
   return new Promise<boolean>((resolve) => {
      Socket.on("deleteFriendRes", (res: boolean) => {
         resolve(res);
      });
   });
}

export const socketGetFriends = (Socket: Socket, pubkey: string) => {
   Socket.emit('getUserFriends', pubkey);
   return new Promise<IProfile[]>((resolve) => {
      Socket.on("userFriends", (friends: IProfile[]) => {
         resolve(friends);
      });
   });
}

export const socketGetFollowing = (Socket: Socket, pubkey: string) => {
   Socket.emit('getUserFollows', pubkey);
   return new Promise<IProfile[]>((resolve) => {
      Socket.on("getUserFollowsRes", (follows: IProfile[]) => {
         resolve(follows);
      });
   });
}

export const socketGetFollower = (Socket: Socket, pubkey: string) => {
   Socket.emit('getUserFollowers', pubkey);
   return new Promise<IProfile[]>((resolve) => {
      Socket.on("getUserFollowersRes", (followers: IProfile[]) => {
         resolve(followers);
      });
   });
}

export const socketGetMessages = (Socket: Socket, pubkey: string, pubkey2: string) => {
   Socket.emit('getMessages', pubkey, pubkey2);
   return new Promise<IMessage[]>((resolve) => {
      Socket.on("getMessagesRes", (messages: IMessage[]) => {
         resolve(messages);
      });
   });
}

export const socketSendMessages = (Socket: Socket, receiver: string, sender: string, message: string) => {
   Socket.emit('newMessage', receiver, sender, message);
   return new Promise<boolean>((resolve) => {
      Socket.on("newMessageRes", (res: boolean) => {
         resolve(res);
      });
   });
}

export const socketLikeMessage = (Socket: Socket, pubkey1: string, pubkey2: string, timestamp: number) => {
   Socket.emit('likeMessage', pubkey1, pubkey2, timestamp);
   return new Promise((resolve) => {
      Socket.on("likeMessageRes", (res: boolean) => {
         resolve(res);
      }
      );
   });
}

export const socketGetMapNFTs = (Socket: Socket, latUser: number, longUser: number) => {
   Socket.emit('getMapNFTs', latUser, longUser);
   return new Promise<INFT[]>((resolve) => {
      Socket.on("mapNFTs", (res: INFT[]) => {
         resolve(res);
      }
      );
   });
}