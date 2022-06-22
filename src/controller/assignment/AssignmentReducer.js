import {
  FETCH_ASSIGNMENT_REQUEST,
  FETCH_ASSIGNMENT_SUCCESS,
  FETCH_ASSIGNMENT_FAILURE,
} from './ActionTypes';

const initialState = {
  loading: false,
  data: [],
  course: {},
};

const CourseReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ASSIGNMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ASSIGNMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case FETCH_ASSIGNMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default CourseReducer;
