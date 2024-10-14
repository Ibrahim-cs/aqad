import React, { useState, useEffect } from "react";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase"; // Ensure this path is correct
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 300px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 10px 0;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ContactForm = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      const { displayName, email, phone, address, uid } = currentUser;
      setUser({ name: displayName, email, phone, address });

      const fetchUserData = async () => {
        try {
          const userDoc = await getDoc(doc(db, "users", uid));
          if (userDoc.exists()) {
            setUser(userDoc.data());
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, []);

  const handleSave = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      const { uid } = currentUser;
      try {
        await setDoc(doc(db, "users", uid), user, { merge: true });
        console.log("Contact updated");
      } catch (error) {
        console.error("Error saving user data:", error);
      }
    }
  };

  const handleDelete = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      const { uid } = currentUser;
      try {
        await deleteDoc(doc(db, "users", uid));
        setUser({ name: "", email: "", phone: "", address: "" });
        console.log("Contact deleted");
      } catch (error) {
        console.error("Error deleting user data:", error);
      }
    }
  };

  return (
    <Container>
      <Title>Contact Form</Title>
      <Input
        type="text"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        placeholder="Name"
      />
      <Input
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
      />
      <Input
        type="tel"
        value={user.phone}
        onChange={(e) => setUser({ ...user, phone: e.target.value })}
        placeholder="Phone"
      />
      <Input
        type="text"
        value={user.address}
        onChange={(e) => setUser({ ...user, address: e.target.value })}
        placeholder="Address"
      />

      <Button onClick={handleSave}>Save</Button>
      <Button onClick={handleDelete}>Delete</Button>
    </Container>
  );
};

export default ContactForm;
