import {
  FETCH_GRADE_REQUEST,
  FETCH_GRADE_SUCCESS,
  FETCH_GRADE_FAILURE,
} from './ActionTypes';

const initialState = {
  loading: false,
  data: [],
  grade: {},
};

const GradeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GRADE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_GRADE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case FETCH_GRADE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default GradeReducer;
