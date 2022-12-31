import { atom } from 'jotai'
import { PublicKey } from '@solana/web3.js'
import nacl from 'tweetnacl'


export const atomDeepLink = atom("");
export const atomDappKeyPair = atom(nacl.box.keyPair());
export const atomSharedSecret = atom<Uint8Array | string>("");
export const atomSession = atom("");
export const atomPhantomWalletPublicKey = atom<PublicKey | string>("");
export const atomActiveScreen = atom("Home");

export const mapStyle = [
   {
      "elementType": "geometry",
      "stylers": [
         {
            "color": "#212121"
         }
      ]
   },
   {
      "elementType": "labels.icon",
      "stylers": [
         {
            "visibility": "off"
         }
      ]
   },
   {
      "elementType": "labels.text.fill",
      "stylers": [
         {
            "color": "#757575"
         }
      ]
   },
   {
      "elementType": "labels.text.stroke",
      "stylers": [
         {
            "color": "#212121"
         }
      ]
   },
   {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
         {
            "color": "#757575"
         }
      ]
   },
   {
      "featureType": "administrative.country",
      "elementType": "labels.text.fill",
      "stylers": [
         {
            "color": "#9e9e9e"
         }
      ]
   },
   {
      "featureType": "administrative.land_parcel",
      "stylers": [
         {
            "visibility": "off"
         }
      ]
   },
   {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
         {
            "color": "#bdbdbd"
         }
      ]
   },
   {
      "featureType": "poi",
      "stylers": [
         {
            "saturation": -55
         },
         {
            "lightness": -45
         }
      ]
   },
   {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
         {
            "color": "#757575"
         }
      ]
   },
   {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
         {
            "color": "#181818"
         }
      ]
   },
   {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
         {
            "color": "#616161"
         }
      ]
   },
   {
      "featureType": "poi.park",
      "elementType": "labels.text.stroke",
      "stylers": [
         {
            "color": "#1b1b1b"
         }
      ]
   },
   {
      "featureType": "road",
      "stylers": [
         {
            "color": "#00db0f"
         },
         {
            "saturation": -70
         },
         {
            "lightness": -25
         }
      ]
   },
   {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [
         {
            "color": "#2c2c2c"
         }
      ]
   },
   {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
         {
            "color": "#8a8a8a"
         }
      ]
   },
   {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
         {
            "color": "#373737"
         }
      ]
   },
   {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
         {
            "color": "#3c3c3c"
         }
      ]
   },
   {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
         {
            "color": "#4e4e4e"
         }
      ]
   },
   {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
         {
            "color": "#616161"
         }
      ]
   },
   {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
         {
            "color": "#757575"
         }
      ]
   },
   {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
         {
            "color": "#000000"
         }
      ]
   },
   {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
         {
            "color": "#3d3d3d"
         }
      ]
   }
]



