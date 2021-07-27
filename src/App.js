import logo from './logo.svg';
import './App.css';
import React, { useRef, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
import UserContextProvider from './contexts/UserProvider';
import QuestionContextProvider from './contexts/QuestionProvider';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useParams,
} from "react-router-dom";
import SignIn from './components/SignIn';
import Main from './components/Main';
import ErrorPage from './components/Error';

function App() {
  return (
    <UserContextProvider>
      <QuestionContextProvider>
      <Router>
        <Switch>
          <Route path="/main/:user_id" component={Main} />
          <Route path="/error" component={ErrorPage} />
          <Route extract path="/" component={SignIn} />
        </Switch>
      </Router>
      </QuestionContextProvider>
    </UserContextProvider>
  );
}

export default App;
