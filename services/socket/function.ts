import { PublicKey } from '@solana/web3.js'
import { Socket } from "socket.io-client";
import { INFT, IProfile } from "../../Types";

export const socketMint = (
   Socket: Socket,
   buffer: Buffer,
   type: String,
   creator: String,
   supply: Number = 1,
   username: String,
   description: String,
   city: String,
   latitude: Number,
   longitude: Number
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
      longitude
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

export const socketUserNFTs = (Socket: Socket) => {
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





// export const socketUserNFTs = async () => {
//    SOCKET.on("userNFTs", (nfts: Array<any>) => {
//       console.log('userNFTs', nfts);
//       return nfts;
//    });
// };

// export const socketUserFriends = async () => {
//    Socket.on("userFriends", (friends: Array<any>) => {
//       console.log(friends);
//       return friends;
//    });
// };

// export const socketSearchUser = (search: any) => {
//    Socket.emit("searchUsers", search);
//    Socket.on("searchUsersRes", (users: Array<String>) => {
//       console.log("Usersssssssss", users);
//       search(users);
//    });
// };

// export const socketGetAllNFTs = () => {
//    Socket.emit("getAllNFTs", "please");
//    Socket.on("allNFTs", (nfts: Array<any>) => {
//       console.log('nft', nfts);
//       return nfts;
//    });
// };

// export const socketGetUser = (user: String) => {
//    Socket.emit("getUser", user);
//    Socket.on("getUserRes", (userRes: object) => {
//       console.log('socketGetUser', userRes);
//       return userRes;
//    });
// };

// export const socketAddFriend = (pubkey: String, pubkey2: String) => {
//    Socket.emit("addFriend", pubkey, pubkey2);
//    Socket.on("addFriendRes", (res: Boolean) => {
//       return res;
//    });
// };

// export const socketDeleteFriend = (pubkey: String, pubkey2: String) => {
//    Socket.emit("deleteFriend", pubkey, pubkey2);
//    Socket.on("deleteFriendRes", (res: Boolean) => {
//       return res;
//    });
// };

// export const socketGetMessages = (pubkey: string, pubkey2: string) => {
//    Socket.emit("getMessages", pubkey, pubkey2);
//    Socket.on("getMessagesRes", (messages: Array<Object>) => {
//       return messages;
//    });
// };

// export const socketNewMessage = (receiver: string, sender: string, message: string) => {
//    Socket.emit("newMessage", receiver, sender, message);
//    Socket.on("newMessageRes", (res: Boolean) => {
//       if (res) {
//          Socket.emit("getMessages", receiver);
//          Socket.on("getMessagesRes", (messages: Array<Object>) => {
//             return messages;
//          });
//       };
//    });
// };

// export const socketLikeMessage = (friends: Array<String>, timestamp: Number) => {
//    Socket.emit("likeMessage", friends, timestamp);
//    Socket.on("likeMessageRes", (res: Boolean) => {
//       return res;
//    });
// };

// export const socketAddEmoji = (friends: Array<String>, timestamp: Number, emoji: String) => {
//    Socket.emit("addEmoji", friends, timestamp, emoji);
//    Socket.on("addEmojiRes", (res: Boolean) => {
//       return res;
//    });
// };
