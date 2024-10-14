import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f2f5;
  position: relative;
`;

const Title = styled.h1`
  font-size: 36px;
  color: #333;
  margin-bottom: 20px;
`;

const UserInfo = styled.div`
  margin-top: 20px;
  font-size: 18px;
  color: #555;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-top: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const SignOutButton = styled(Button)`
  position: absolute;
  top: 20px;
  right: 20px;
  margin-top: 0;
`;

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        navigate("/signup");
      }
    });
  }, [navigate]);

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setUser(null);
        console.log("Signed out successfully");
        navigate("/signup");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <Container>
      <Title>Welcome to the Home Page</Title>
      {user && (
        <>
          <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
          <UserInfo>
            <p>Signed in as: {user.email}</p>
          </UserInfo>
        </>
      )}
    </Container>
  );
};

export default Home;
