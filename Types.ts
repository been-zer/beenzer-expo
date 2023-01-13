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
   __token__: string;
   _asset: string;
   _city: string;
   _creator: string;
   _date: string;
   _description: string;
   _id_: string;
   _latitude: number;
   _longitude: number;
   _supply: number;
   _time: string;
   _timestamp: string;
   _type: string;
   _username: string;
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

