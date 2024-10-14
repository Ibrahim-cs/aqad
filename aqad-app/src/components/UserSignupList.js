import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f2f5;
  min-height: 100vh;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 100%;
  max-width: 600px;
`;

const ListItem = styled.li`
  background-color: white;
  padding: 15px;
  margin: 10px 0;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Email = styled.span`
  font-size: 16px;
  color: #333;
`;

const UserSignupList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let localUsers = [];
        const querySnapshot = await getDocs(collection(db, "users"));
        console.log("Query Snapshot:", querySnapshot);
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
          localUsers.push(doc.data());
        });
        setUsers(localUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Container>
      <Title>All User's</Title>
      <List>
        {users.map((user, index) => (
          <ListItem key={index}>
            <Email>{user.email}</Email>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default UserSignupList;
