import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavContainer = styled.div`
  width: 200px;
  height: 100vh;
  background-color: #f0f2f5;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const NavItem = styled(Link)`
  margin: 10px 0;
  text-decoration: none;
  color: #333;
  font-size: 18px;

  &:hover {
    color: #007bff;
  }
`;

const NavBar = () => {
  return (
    <NavContainer>
      <NavItem to="/">Home</NavItem>
      <NavItem to="/dashboard">Dashboard</NavItem>
      <NavItem to="/contact">Contact</NavItem>
      <NavItem to="/profile">Profile</NavItem>
      <NavItem to="/users">Users</NavItem>
    </NavContainer>
  );
};

export default NavBar;
