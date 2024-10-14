export const saveUserData = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUserData = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const deleteUserData = () => {
  localStorage.removeItem("user");
};
