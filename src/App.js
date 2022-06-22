import './App.css';
import { useDispatch } from 'react-redux';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import AuthProvider from './context/auth';
import PrivateRoute from './components/PrivateRoute';
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
} from './view';
import { FetchCourses } from './controller';

function App() {
  const dispatch = useDispatch();

  dispatch(FetchCourses());

  return (
    <AuthProvider>
      <HashRouter>
        <NavbarView />
        <Switch>
          <Route path="/register" component={RegisterView} />
          <Route path="/login" component={LoginView} />
          <PrivateRoute path="/profile" component={ProfileView} />
          <PrivateRoute path="/chat" component={Home} />
          <PrivateRoute exact path="/" component={HomeView} />
          <PrivateRoute path="/addCourse" component={CourseFormView} />
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
