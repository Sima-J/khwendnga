import {
  FETCH_COURSES_REQUEST,
  FETCH_COURSES_SUCCESS,
  FETCH_COURSES_FAILURE,
} from './ActionTypes';
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from 'firebase/firestore';
import { db } from '../';

export const FetchCoursesRequest = () => {
  return {
    type: FETCH_COURSES_REQUEST,
  };
};

export const FetchCoursesSuccess = (data) => {
  return {
    type: FETCH_COURSES_SUCCESS,
    payload: data,
  };
};

export const FetchCoursesFailure = (error) => {
  return {
    type: FETCH_COURSES_FAILURE,
    payload: error,
  };
};

export const FetchCourses = () => {
  return (dispatch) => {
    dispatch(FetchCoursesRequest());
    // console.error('fetch');
    // const equipment = collection(db, 'courses');
    // const snapshot = getDocs(equipment);
    // const data = snapshot.map((doc) => ({
    //   id: doc.id,
    //   ...doc.data(),
    // }));
    // console.error(data);

    getDoc(doc(db, 'courses', 'sima')).then((docSnap) => {
      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
      } else {
        console.log('No such document!');
      }
    });
    //     const querySnapshot = await getDocs(collection(db, "cities"));
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    // });
    // db.collection('courses').doc().then((cityRef) => {
    //   cityRef.get()
    //     .then(doc => { /* do stuff */ })
    //     .catch(err => { /* error! */ });
    // });

    try {
      const equipment = collection(db, 'courses');
      const snapshot = getDocs(equipment);
      const data = snapshot.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.error('data');

      dispatch(FetchCoursesSuccess(data));
    } catch (error) {
      dispatch(FetchCoursesFailure(error));
      console.error('error');
    }
  };
};
