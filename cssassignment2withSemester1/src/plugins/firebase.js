import firebase from 'firebase/app'

// Import needed firebase modules
import 'firebase/auth'

// Firebase app config
const config = {
  apiKey: 'AIzaSyCWrC-yiWsG5gLdBgo5vyteip1x2I8Fs2Q',
  authDomain: 'cssassignment2-e31a9.firebaseapp.com',
  databaseURL: 'https://cssassignment2-e31a9-default-rtdb.europe-west1.firebasedatabase.app/',
  projectId: 'cssassignment2-e31a9',
  storageBucket: 'cssassignment2-e31a9.appspot.com',
  messagingSenderId: '402064815453',
  appId: '1:402064815453:web:d6a2a7fcfc9292547ea4b4'
}

// Init our firebase app
firebase.initializeApp(config)
