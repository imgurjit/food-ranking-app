import { mockUsers } from "../services";

export const userService = {
  login,
  logout,
};

function login(username, password, success, failure) {
  const found = mockUsers.some((el) => el.username === username && el.password === password);
  if (found) {
    success("User logged In Successfully");
  } else {
    failure("Invalid Username or Password.");
  }
}

function logout(success, failure) {
  success("User logged out Successfully");
}
