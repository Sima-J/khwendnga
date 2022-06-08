import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBG346JM_BWGcL7yS1Dg1MIQWHNykaMfcM',

  authDomain: 'khwendnga.firebaseapp.com',

  databaseURL: 'https://khwendnga-default-rtdb.firebaseio.com',

  projectId: 'khwendnga',

  storageBucket: 'khwendnga.appspot.com',

  messagingSenderId: '237854042689',

  appId: '1:237854042689:web:37322f204325d8e19db4c0',

  measurementId: 'G-BJKQH2MZTT',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (
  email,
  password,
  image,
  roleType,
  firstName,
  middleName,
  lastName,
  city,
  street,
  phone,
  grade,
  gName,
  gPhone,
  gEmail
) => {
  try {
    const res = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
      image,
      roleType,
      firstName,
      middleName,
      lastName,
      city,
      street,
      phone,
      grade,
      gName,
      gPhone,
      gEmail
    );
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      authProvider: 'local',
      email,
      password,
      image,
      firstName,
      middleName,
      lastName,
      city,
      street,
      phone,
      grade,
      gName,
      gPhone,
      gEmail,
    });
    await addDoc(collection(db, 'roles'), {
      uid: user.uid,
      roleType,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};
export {
  auth,
  db,
  storage,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
};
