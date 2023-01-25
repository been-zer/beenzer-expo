export interface ILocation {
   city: string | null
   coords: LocationObjectCoords;
   timestamp: number;
   mocked?: boolean | undefined
}

export interface coordinates {
   latitude: number;
   longitude: number;
}

export interface LocationObjectCoords {
   latitude: number;
   longitude: number;
   altitude: number | null;
   accuracy: number;
   altitudeAccuracy: number | null;
   heading: number | null;
   speed: number | null;
}

export interface IProfile {
   __pubkey__: string;
   _appuser: boolean;
   _birthdate: string;
   _city: string;
   _country: string;
   _created_at: string;
   _description: string;
   _discord: string;
   _email: string;
   _flag: string;
   _instagram: string;
   _lastname: string;
   _magiceden: string;
   _name: string;
   _opensea: string;
   _pfp: string;
   _phone: string;
   _telegram: string;
   _tiktok: string;
   _timestamp: string;
   _twitter: string;
   _username_: string;
   _verified: boolean;
   _youtube: string;
}

export interface INFT {
   _id_: number;
   __token__: string;
   _supply: number;
   _creator: string;
   _username: string;
   _asset: string;
   _type: string;
   _description: string;
   _city: string;
   _latitude: number;
   _longitude: number;
   _distance: string;
   _maxlat: string;
   _minlat: string;
   _maxlon: string;
   _minlon: string;
   _date: string;
   _time: string;
   _timestamp: number;
}

export interface IDisplay {
   description?: string;
   creator?: any,
   username?: string,
   date?: string,
   time?: string,
   city?: string,
   latitude?: number,
   longitude?: number
}

export interface IUpdateUser {
   _username_?: string,
   _description?: string,
   _name?: string,
   _lastname?: string,
   _email?: string,
   _birthdate?: string,
   _phone?: string,
   _city?: string,
   _country?: string,
   _pfp?: string,
}

export interface IMessage {
   _emoji: string,
   _liked: boolean,
   _message: string,
   _owner: string,
   _timestamp: number,
   date: string | number,
}

export interface IVideo {
   uri: string
}