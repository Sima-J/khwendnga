import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBG346JM_BWGcL7yS1Dg1MIQWHNykaMfcM',

  authDomain: 'khwendnga.firebaseapp.com',

  projectId: 'khwendnga',

  storageBucket: 'khwendnga.appspot.com',

  messagingSenderId: '237854042689',

  appId: '1:237854042689:web:37322f204325d8e19db4c0',

  measurementId: 'G-BJKQH2MZTT',
};

firebase.initializeApp(firebaseConfig);
export default firebase;
const db = firebase.firestore();
const storage = firebase.storage();
const storageRef = firebase.storage().ref();
const increament = firebase.firestore.FieldValue.increment(1);
export { db };
export { storageRef };
export { storage };
export { increament };
