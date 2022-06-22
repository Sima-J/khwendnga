import {
  FETCH_COURSES_REQUEST,
  FETCH_COURSES_SUCCESS,
  FETCH_COURSES_FAILURE,
} from './ActionTypes';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '../';
import { useAuthState } from 'react-firebase-hooks/auth';

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
  const [user] = useAuthState(auth);

  return async (dispatch) => {
    dispatch(FetchCoursesRequest());
    console.error('fetch');

    try {
      const q = query(collection(db, 'users'), where('uid', '==', user?.uid));
      const docm = await getDocs(q);
      const data1 = docm.docs[0].data();

      console.log(data1.grade);
      const querySnapshot = await getDocs(
        query(
          collection(db, 'courses'),
          where('courseLevel', '==', data1.grade)
        )
      );

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
