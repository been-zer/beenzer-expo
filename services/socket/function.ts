import { PublicKey } from '@solana/web3.js'
import { Socket } from "socket.io-client";
import { ILogs, IMessage, INFT, IProfile, UserNFT } from "../../Types";

export const socketMint = (
   socket: Socket,
   buffer: Buffer,
   type: string,
   creator: string,
   supply: number = 1,
   floor: number = 1,
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
   console.log('socketMint', buffer.length, type, creator, supply, username, description, city, latitude, longitude, distance, maxLat, minLat, maxLong, minLong)
   socket.emit(
      "mintNFT",
      buffer,
      type,
      creator,
      supply,
      floor,
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

export const socketGetLogs = (socket: Socket, pubkey: string) => {
   socket.emit("getLogs", pubkey);
   return new Promise<ILogs[]>((resolve) => {
      socket.on("getLogsRes", (res: ILogs[]) => {
         resolve(res);
      });
   });
};

export const videoToGifSocket = (socket: Socket, video: Buffer) => {
   socket.emit("videoToGif", video);
   return new Promise<Buffer>((resolve) => {
      socket.on("videoToGifRes", (gif: Buffer) => {
         console.log('res', gif)
         resolve(gif);
      });
   });
};

export const firstLogin = (socket: Socket) => {
   return new Promise((resolve) => {
      socket.on("isNewUser", (resp: boolean) => {
         resolve(resp);
      });
   });
};

export const checkUsernameAvailability = (username: String, socket: Socket) => {
   socket.emit('userName', username)
   return new Promise<boolean>((resolve) => {
      socket.on('userNameAv', (data: any) => {
         resolve(data)
      })
   })
}

export const handleNewUserCreated = (socket: Socket, pubkey: PublicKey | string, username: string, appuser: boolean) => {
   socket.emit('newUser', pubkey, username, appuser)
   return new Promise((resolve) => {
      socket.on('newUserCreated', async (resp: boolean) => {
         resolve(resp)
      })
   })
}

export const socketUserInfo = (socket: Socket, pubkey: string) => {
   socket.emit('getUser', pubkey)
   return new Promise<IProfile>((resolve) => {
      socket.on('getUserRes', (receivedInfos: IProfile) => {
         resolve(receivedInfos)
      })
   })
}

export const socketUserNFTs = (socket: Socket, pubkey: string) => {
   socket.emit('getUserNFTs', pubkey);
   return new Promise<UserNFT[]>((resolve) => {
      socket.on('userNFTs', (receivedNfts: UserNFT[]) => {
         resolve(receivedNfts)
      });
   })
}

export const updateUserProfile = (socket: Socket, pubkey: PublicKey | string, update: string, value: string) => {
   socket.emit('updateUser', pubkey, update, value)
}

export const socketSeachFriends = (socket: Socket, searchQuery: string) => {
   socket.emit("searchUsers", searchQuery);
   return new Promise<IProfile[]>((resolve) => {
      socket.on("searchUsersRes", (users: IProfile[]) => {
         resolve(users);
      });
   });
}

export const socketAddFriend = (socket: Socket, pubkey: string, pubkey2: string) => {
   socket.emit('addFriend', pubkey, pubkey2);
   return new Promise<boolean>((resolve) => {
      socket.on("addFriendRes", (res: boolean) => {
         resolve(res);
      });
   });
}

export const socketDelFriend = (socket: Socket, pubkey: string, pubkey2: string) => {
   socket.emit('deleteFriend', pubkey, pubkey2);
   return new Promise<boolean>((resolve) => {
      socket.on("deleteFriendRes", (res: boolean) => {
         resolve(res);
      });
   });
}

export const socketGetFriends = (socket: Socket, pubkey: string) => {
   socket.emit('getUserFriends', pubkey);
   return new Promise<IProfile[]>((resolve) => {
      socket.on("userFriends", (friends: IProfile[]) => {
         resolve(friends);
      });
   });
}

export const socketGetFollowing = (socket: Socket, pubkey: string) => {
   socket.emit('getUserFollows', pubkey);
   return new Promise<IProfile[]>((resolve) => {
      socket.on("getUserFollowsRes", (follows: IProfile[]) => {
         resolve(follows);
      });
   });
}

export const socketGetFollower = (socket: Socket, pubkey: string) => {
   socket.emit('getUserFollowers', pubkey);
   return new Promise<IProfile[]>((resolve) => {
      socket.on("getUserFollowersRes", (followers: IProfile[]) => {
         resolve(followers);
      });
   });
}

export const socketGetMessages = (socket: Socket, pubkey: string, pubkey2: string) => {
   socket.emit('getMessages', pubkey, pubkey2);
   return new Promise<IMessage[]>((resolve) => {
      socket.on("getMessagesRes", (messages: IMessage[]) => {
         resolve(messages);
      });
   });
}

export const socketSendMessages = (socket: Socket, receiver: string, sender: string, message: string) => {
   socket.emit('newMessage', receiver, sender, message);
   return new Promise<boolean>((resolve) => {
      socket.on("newMessageRes", (res: boolean) => {
         resolve(res);
      });
   });
}

export const socketLikeMessage = (socket: Socket, pubkey1: string, pubkey2: string, timestamp: number) => {
   socket.emit('likeMessage', pubkey1, pubkey2, timestamp);
   return new Promise((resolve) => {
      socket.on("likeMessageRes", (res: boolean) => {
         resolve(res);
      }
      );
   });
}

export const socketUnlikeMessage = (socket: Socket, pubkey1: string, pubkey2: string, timestamp: number) => {
   socket.emit('unLikeMessage', pubkey1, pubkey2, timestamp);
   return new Promise((resolve) => {
      socket.on("unLikeMessageRes", (res: boolean) => {
         resolve(res);
      }
      );
   });
}

export const socketGetMapNFTs = (socket: Socket, latUser: number, longUser: number) => {
   socket.emit('getMapNFTs', latUser, longUser);
   return new Promise<INFT[]>((resolve) => {
      socket.on("mapNFTs", (res: INFT[]) => {
         resolve(res);
      }
      );
   });
}

export const socketGetFriendsFeed = (socket: Socket, pubkey: string, latUser: number, longUser: number) => {
   socket.emit('getFeed', pubkey, latUser, longUser);
   return new Promise<INFT[]>((resolve) => {
      socket.on("getFeedRes", (res: INFT[]) => {
         resolve(res);
      }
      );
   });
}
