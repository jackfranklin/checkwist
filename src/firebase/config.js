// @flow
import firebase from 'firebase'
// import 'firebase/auth'
// import 'firebase/database'

export const FIREBASE_DEV = {
  apiKey: 'AIzaSyCvSLfAPLQzoLG6BMXQSLcFfwuTrf10TGk',
  authDomain: 'checkwist-dev.firebaseapp.com',
  databaseURL: 'https://checkwist-dev.firebaseio.com',
  projectId: 'checkwist-dev',
  storageBucket: 'checkwist-dev.appspot.com',
  messagingSenderId: '219076333696',
}

export const FIREBASE_PROD = {
  apiKey: 'AIzaSyDuzqqZV4APn4YTHcA5F-B2RMv9G4mbfMQ',
  authDomain: 'checkwist.firebaseapp.com',
  databaseURL: 'https://checkwist.firebaseio.com',
  projectId: 'checkwist',
  storageBucket: 'checkwist.appspot.com',
  messagingSenderId: '415015667465',
}

export default firebase
