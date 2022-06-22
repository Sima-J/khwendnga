import { combineReducers } from 'redux';
import AssignmentReducer from './assignment/AssignmentReducer';
import CoursesReducer from './course/CourseReducer';

const RootReducer = combineReducers({
  courses: CoursesReducer,
  assignments: AssignmentReducer,
});

export default RootReducer;
