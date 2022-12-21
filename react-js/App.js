import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Dashboard from './components/pages/Dashboard';
import AuthState from './context/auth/AuthState';
import AlertMessage from './components/layout/AlertMessage';
import ItemState from './context/item/ItemState';
import UserState from './context/user/UserState';
import SecureRoute from './components/routing/SecureRoute';
import Loading from './components/layout/Loading';
import LoadingState from './context/loading/LoadingState';
import MessageState from './context/message/MessageState';
import AdminDashboard from './components/pages/AdminDashboard';
import AdminLogin from './components/pages/AdminLogin';
import AllUsers from './components/pages/AllUsers';


function App() {
  return (
    <LoadingState>
      <MessageState>
        <AuthState>
          <ItemState>
            <UserState>
            <AlertMessage />
            <Router>
              <Fragment>
                <Loading />
                <NavBar />
                <Switch>
                  <SecureRoute exact path='/dashboard' component={Dashboard} />
                  <Route exact path='/' component={Home} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/admin-login' component={AdminLogin} />
                  <Route exact path='/admin-dashboard' component={AdminDashboard} />
                  <Route exact path='/show-all-users' component={AllUsers} />
                </Switch>
              </Fragment>
            </Router>
            </UserState>
          </ItemState>
        </AuthState>
      </MessageState>
    </LoadingState>
  );
}

export default App;
