import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
  homeRoute,
  profileRoute,
  loginRoute,
  chatRoute,
  addCourseRoute,
  courseDetailsRoute,
  courseRoute,
  registerRoute,
  assignmentRoute,
} from './router';
import ChatView from './view/container/chat/chatView';
import AddCourseView from './view/container/course/addCourseView';
// import NavbarView from './view/navbarView';
import LoginView from './view/container/authentication/loginView';
import ProfileView from './view/container/profile/profileView';
import HomeView from './view/container/home/homeView';
import CourseView from './view/container/course/courseView';
import Register from './view/container/authentication/registerView';
import AssignementView from './view/container/assignment/assignmentView';
import { FetchCourses } from './controller';
import './App.css';

function App() {
  const dispatch = useDispatch();

  dispatch(FetchCourses());
  return (
    <>
      <Routes>
        <Route path={homeRoute} element={<HomeView />} />
        <Route path={profileRoute} element={<ProfileView />} />
        <Route path={courseRoute} element={<CourseView />} />
        <Route path={addCourseRoute} element={<AddCourseView />} />
        <Route path={loginRoute} element={<LoginView />} />
        <Route path={chatRoute} element={<ChatView />} />
        <Route path={registerRoute} element={<Register />} />
        <Route path={assignmentRoute} element={<AssignementView />} />
      </Routes>
    </>
  );
}

export default App;
