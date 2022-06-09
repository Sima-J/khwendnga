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
  return async (dispatch) => {
    dispatch(FetchCoursesRequest());
    console.error('fetch');

    try {
      const querySnapshot = await getDocs(collection(db, 'courses'));
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, ' => ', doc.data());
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(data);
      dispatch(FetchCoursesSuccess(data));
    } catch (error) {
      dispatch(FetchCoursesFailure(error));
      console.error('error');
    }
  };
};
