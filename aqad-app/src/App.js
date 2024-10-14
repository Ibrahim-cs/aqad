import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import styled from "styled-components";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import ContactForm from "./components/ContactForm";
import Profile from "./components/Profile";
import UserSignupList from "./components/UserSignupList";
import NavBar from "./components/NavBar";

const AppContainer = styled.div`
  display: flex;
`;

const ContentContainer = styled.div`
  flex: 1;
  padding: 20px;
`;

const App = () => {
  const location = useLocation();
  const hideNavBar =
    location.pathname === "/signup" || location.pathname === "/login";

  return (
    <AppContainer>
      {!hideNavBar && <NavBar />}
      <ContentContainer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/users" element={<UserSignupList />} />
        </Routes>
      </ContentContainer>
    </AppContainer>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
