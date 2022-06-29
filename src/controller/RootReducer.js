import { combineReducers } from 'redux';
import AssignmentReducer from './assignment/AssignmentReducer';
import CoursesReducer from './course/CourseReducer';
import GradeReducer from './grade/GradeReducer';

const RootReducer = combineReducers({
  courses: CoursesReducer,
  assignments: AssignmentReducer,
  grades: GradeReducer,
});

export default RootReducer;
