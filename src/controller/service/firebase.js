import { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';
import { useHistory } from 'react-router-dom';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});
const LoginAdmin = async () => {
  const [data, setData] = useState({
    email: 'sima.jaza11@email.com',
    password: '12345678',
    error: null,
    loading: false,
  });
  const { email, password, error, loading } = data;

  const history = useHistory();
  setData({ ...data, error: null, loading: true });
  if (!email || !password) {
    setData({ ...data, error: 'All fields are required' });
  }
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);

    await updateDoc(doc(db, 'users', result.user.uid), {
      isOnline: true,
    });
    setData({
      email: '',
      password: '',
      error: null,
      loading: false,
    });
    history.replace('/register');
  } catch (err) {
    setData({ ...data, error: err.message, loading: false });
  }
};
export { auth, db, storage, LoginAdmin };
