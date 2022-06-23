import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { db, auth } from './controller';
import { useAuthState } from 'react-firebase-hooks/auth';
import { query, collection, getDocs, where } from 'firebase/firestore';
import { HashRouter, Switch, Route } from 'react-router-dom';
import {
  LoginView,
  NavbarView,
  FooterView,
  HomeView,
  CourseFormView,
  RegisterView,
  ProfileView,
  EditProfileView,
  CourseView,
  AddAssignmentView,
  ChatView,
  TeacherProfileView,
  StudentsAssigmentView,
} from './view';
import { FetchCourses } from './controller';
import AuthProvider from './controller/context/auth';
import PrivateRoute from './controller/PrivateRoute';
import './App.css';

function App() {
  const [user, loading] = useAuthState(auth);
  const [roleType, setRoleType] = useState('');
  const dispatch = useDispatch();

  dispatch(FetchCourses());

  const fetchUserRole = async () => {
    try {
      const q = query(collection(db, 'roles'), where('uid', '==', user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setRoleType(data.roleType);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (loading) return;

    fetchUserRole();
  }, [user, loading]);

  var Profile;
  if (roleType === 'student') {
    Profile = <PrivateRoute path="/profile" component={ProfileView} />;
  } else if (roleType === 'teacher') {
    Profile = <PrivateRoute path="/profile" component={TeacherProfileView} />;
  } else {
    Profile = <PrivateRoute path="/profile" component={ProfileView} />;
  }

  return (
    <AuthProvider>
      <HashRouter>
        <NavbarView />
        <Switch>
          <Route path="/register" component={RegisterView} />
          <Route path="/login" component={LoginView} />
          {Profile}
          <PrivateRoute path="/chat" component={ChatView} />
          <PrivateRoute exact path="/" component={HomeView} />
          <PrivateRoute path="/addCourse" component={CourseFormView} />
          <PrivateRoute path="/assignments" component={StudentsAssigmentView} />
          <PrivateRoute path="/editProfile/:id" component={EditProfileView} />
          <PrivateRoute path="/course/:id" component={CourseView} />
          <PrivateRoute
            path="/courses/:id/addAssignment"
            component={AddAssignmentView}
          />
        </Switch>

        <FooterView />
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
