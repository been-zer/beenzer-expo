export interface ILocation {
   city: string | null
   coords: LocationObjectCoords;
   timestamp: number;
   mocked?: boolean | undefined
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