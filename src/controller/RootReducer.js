import { combineReducers } from 'redux';
import CoursesReducer from './course/CourseReducer';

const RootReducer = combineReducers({
  courses: CoursesReducer,
});

export default RootReducer;
