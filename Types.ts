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

export interface ILogs {
   _logs: string;
   _pubkey: string;
   _timestamp: string;
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
   __token__: string;
   _asset: string;
   _ccy: string;
   _city: string;
   _creator: string;
   _date: string;
   _description: string;
   _floor: number;
   _id_: string;
   _image: string;
   _latitude: number;
   _longitude: number;
   _maxlat: number;
   _maxlon: number;
   _metadata: string;
   _minlat: number;
   _minlon: number;
   _name: string;
   _supply: number;
   _time: string;
   _timestamp: string;
   _type: string;
   _username: string;
   _visibility: string;
}

export interface UserNFT {
   master: string;
   editions: EditionId[];
   amount: number;
   supply: number;
   floor: number;
   ccy: string;
   creator: string;
   username: string;
   image_uri: string;
   asset_uri: string;
   type: string;
   name: string;
   description: string;
   date: string;
   time: string;
   city: string;
   lat: number;
   lon: number;
   visibility: string;
   maxlat: number;
   minlat: number;
   maxlon: number;
   minlon: number;
   metadata_uri: string;
}

export interface EditionId {
   token: string;
   id: number;
   timestamp: number;
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