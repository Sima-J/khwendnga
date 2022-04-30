import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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
import ChatView from './view/chatView';
import CourseView from './view/courseView';
import AddCourseView from './view/addCourseView';
// import NavbarView from './view/navbarView';
import LoginView from './view/loginView';
import ProfileView from './view/profileView';
import HomeView from './view/homeView';
import Course from './view/courseView';
import Register from './view/registerView';
import AssignementView from './view/assignmentView';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path={homeRoute} element={<HomeView />} />
          <Route path={profileRoute} element={<ProfileView />} />
          <Route path={courseRoute} element={<CourseView />} />
          <Route path={addCourseRoute} element={<AddCourseView />} />
          <Route path={courseDetailsRoute} element={<Course />} />
          <Route path={loginRoute} element={<LoginView />} />
          <Route path={chatRoute} element={<ChatView />} />
          <Route path={registerRoute} element={<Register />} />
          <Route path={assignmentRoute} element={<AssignementView />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
