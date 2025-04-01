import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Login from "./pages/Auth/Login.jsx";
import SignUp from "./pages/Auth/SignUp.jsx";
import Home from "./pages/Dashboard/Home.jsx";
import Community from "./pages/Dashboard/Community.jsx";
import Meals from "./pages/Dashboard/Meals.jsx";
import Analytics from "./pages/Dashboard/Analytics.jsx";
import About from "./pages/Dashboard/About.jsx";
import UserProvider from './context/UserContext.jsx';
import { Toaster } from 'react-hot-toast';


const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Root/>} />
            <Route path="/login" exact element={<Login/>} />
            <Route path="/signup" exact element={<SignUp/>} />
            <Route path="/dashboard" exact element={<Home/>} />
            <Route path="/meals" exact element={<Meals/>} />
            <Route path="/community" exact element={<Community/>} />
            <Route path="/analytics" exact element={<Analytics/>} />
            <Route path="/about" exact element={<About/>} />
          </Routes>
        </Router>
      </div>

      <Toaster
        toastOptions = {{
          className:"",
          style: {
            fontSize: '13px'
          },
        }}
      />
    </UserProvider>
  )
}

export default App

const Root = () => {
  //Check if the token exists in local storage
  const isAuthenticated = !!localStorage.getItem("token");

  //Redirect to dashboard if authenticated, otherwise to login
  return isAuthenticated ? (
    <Navigate to = "/dashboard" />
  ) : (
    <Navigate to = "/login" />
  );
};