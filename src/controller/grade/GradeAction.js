import {
  FETCH_GRADE_REQUEST,
  FETCH_GRADE_SUCCESS,
  FETCH_GRADE_FAILURE,
} from './ActionTypes';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../';

export const FetchGradeRequest = () => {
  return {
    type: FETCH_GRADE_REQUEST,
  };
};

export const FetchGradeSuccess = (data) => {
  return {
    type: FETCH_GRADE_SUCCESS,
    payload: data,
  };
};

export const FetchGradeFailure = (error) => {
  return {
    type: FETCH_GRADE_FAILURE,
    payload: error,
  };
};

export const FetchGrade = () => {

  return async (dispatch) => {
    dispatch(FetchGradeRequest());
    console.error('fetch');
    
    

    try {
      const q = collection(db, 'grade'),
      const docm = await getDocs(q);

      const data = docm.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(data);
      dispatch(FetchGradeSuccess(data));
    } catch (error) {
      dispatch(FetchGradeFailure(error));
      console.error('error');
    }
  };
};
