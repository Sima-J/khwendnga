import {
  FETCH_ASSIGNMENT_REQUEST,
  FETCH_ASSIGNMENT_SUCCESS,
  FETCH_ASSIGNMENT_FAILURE,
} from './ActionTypes';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../';
import { useParams } from 'react-router-dom';

export const FetchAssignmentRequest = () => {
  return {
    type: FETCH_ASSIGNMENT_REQUEST,
  };
};

export const FetchAssignmentSuccess = (data) => {
  return {
    type: FETCH_ASSIGNMENT_SUCCESS,
    payload: data,
  };
};

export const FetchAssignmentFailure = (error) => {
  return {
    type: FETCH_ASSIGNMENT_FAILURE,
    payload: error,
  };
};

export const FetchAssignment = () => {
  const { id } = useParams();

  return async (dispatch) => {
    dispatch(FetchAssignmentRequest());
    console.error('fetch');

    try {
      const q = query(
        collection(db, 'assignments'),
        where('courseId', '==', id)
      );
      console.log(id);
      const docm = await getDocs(q);

      const data = docm.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(data);
      dispatch(FetchAssignmentSuccess(data));
    } catch (error) {
      dispatch(FetchAssignmentFailure(error));
      console.error('error');
    }
  };
};
